import { supabase, getUserFromRequest, getUserInfoFromRequest, AuthError, ADMIN_EMAILS } from '../_lib/supabaseServer.ts'
import { makeCors } from '../_lib/cors.ts'
import { isUrlSafe } from '../_lib/ssrfGuard.ts'
import { uploadFile, getSignedUrl } from '../_lib/storage.ts'
import { callGeminiVision, callGeminiRepairGuidance, callGeminiDesignPreview } from '../_lib/gemini.ts'
import { captureEnhanced } from './capture.ts'
import { normalizeImage, generateOverlay } from './normalize.ts'
import { runAllChecks } from './deterministic.ts'
import { calculateScore, mergeAndPrioritize } from './score.ts'
import { embedText } from '../_lib/embedding.ts'
import { retrieveRAGContext } from '../_lib/rag.ts'
import type { Finding, DesignSystemConfig } from '../_lib/types.ts'

// ─── Shared helpers ────────────────────────────────────────────────────────────

async function isRateLimited(userId: string, userEmail: string | undefined): Promise<boolean> {
  if (ADMIN_EMAILS.has(userEmail ?? '')) return false
  const monthStart = new Date()
  monthStart.setDate(1)
  monthStart.setHours(0, 0, 0, 0)
  const { count } = await supabase.from('scans')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('status', 'completed')
    .gte('created_at', monthStart.toISOString())
  return (count ?? 0) >= 7
}

// ─── POST /v1/scans ────────────────────────────────────────────────────────────

export async function handleCreateScan(req: Request): Promise<Response> {
  const { corsResponse, corsError } = makeCors(req)
  let userId: string
  let userEmail: string | undefined
  try {
    const info = await getUserInfoFromRequest(req)
    userId = info.id
    userEmail = info.email
  } catch (e) {
    return corsError(e instanceof AuthError ? 'Unauthorized' : String(e), 401)
  }

  const contentType = req.headers.get('content-type') ?? ''
  let inputType: 'url' | 'screenshot'
  let inputUrl: string | null = null
  let inputFilename: string | null = null
  let fileBuffer: Uint8Array | null = null
  let designSystemConfig: DesignSystemConfig | null = null

  if (contentType.includes('multipart/form-data')) {
    const form = await req.formData()
    const file = form.get('file') as File | null
    if (!file) return corsError('No file provided', 400)
    if (file.size > 10 * 1024 * 1024) return corsError('File too large (max 10MB)', 400)
    if (file.size < 1024) return corsError('File too small to be a valid image', 400)
    const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp']
    if (!ALLOWED_TYPES.includes(file.type)) return corsError('Invalid file type. Upload PNG, JPG or WEBP.', 400)
    inputType = 'screenshot'
    inputFilename = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 100)
    fileBuffer = new Uint8Array(await file.arrayBuffer())
    const dsRaw = form.get('design_system_config')
    if (dsRaw) {
      try { designSystemConfig = JSON.parse(dsRaw as string) } catch { /* ignore */ }
    }
  } else {
    const body = await req.json()
    if (!body.url) return corsError('url is required', 400)
    if (!isUrlSafe(body.url)) return corsError('URL is not allowed', 400)
    inputType = 'url'
    inputUrl = body.url
    if (body.design_system_config && typeof body.design_system_config === 'object') {
      designSystemConfig = body.design_system_config
    }
  }

  // Rate limit: 7 completed scans per calendar month on free plan (admin accounts exempt)
  if (await isRateLimited(userId, userEmail)) return corsError('Rate limit: max 7 scans per month on free plan', 429)

  // Insert scan row immediately, return scan_id
  const { data: scan, error: insertError } = await supabase
    .from('scans')
    .insert({
      user_id: userId,
      input_type: inputType,
      input_url: inputUrl,
      input_filename: inputFilename,
      status: 'pending',
      design_system_config: designSystemConfig ?? null,
    })
    .select('id')
    .single()

  if (insertError || !scan) {
    console.error('[createScan] DB insert failed:', insertError?.message)
    return corsError('Failed to create scan', 500)
  }

  const scanId = scan.id

  // Fire background processing
  EdgeRuntime.waitUntil(processScan(scanId, userId, { inputType, inputUrl, fileBuffer, inputFilename, designSystemConfig }))

  return corsResponse({ scan_id: scanId }, 202)
}

// ─── Background processor ─────────────────────────────────────────────────────

async function processScan(
  scanId: string,
  userId: string,
  input: {
    inputType: 'url' | 'screenshot'
    inputUrl: string | null
    fileBuffer: Uint8Array | null
    inputFilename: string | null
    designSystemConfig: DesignSystemConfig | null
  }
): Promise<void> {
  try {
    await supabase.from('scans').update({ status: 'processing' }).eq('id', scanId)

    const basePath = `${userId}/scans/${scanId}`
    let normalizedBytes: Uint8Array
    let dom1440 = null
    let axeViolations = null
    let dom375 = null
    let domPath: string | null = null

    // ── Phase 1: Capture ──────────────────────────────────────────────────────
    if (input.inputType === 'url' && input.inputUrl) {
      // Single Browserless session: screenshot + DOM@1440 + axe + DOM@375
      // This avoids two sequential Browserless calls which would exceed the 150s waitUntil limit.
      const enhanced = await captureEnhanced(input.inputUrl)
      dom1440 = enhanced.dom1440
      axeViolations = enhanced.axeViolations
      dom375 = enhanced.dom375

      // Decode screenshot from base64 returned by the /function endpoint
      let originalBytes: Uint8Array
      if (enhanced.screenshotBase64) {
        const { decodeBase64 } = await import('jsr:@std/encoding/base64')
        originalBytes = decodeBase64(enhanced.screenshotBase64)
      } else {
        // Fallback: shouldn't happen but guard against empty screenshot
        throw new Error('Browserless returned no screenshot data')
      }

      normalizedBytes = await normalizeImage(originalBytes)

      const domJson = new TextEncoder().encode(JSON.stringify({ dom1440, axeViolations, dom375 }))
      domPath = `${basePath}/dom-snapshot.json`

      await Promise.all([
        uploadFile(`${basePath}/original.png`, originalBytes, 'image/png'),
        uploadFile(`${basePath}/normalized.png`, normalizedBytes, 'image/png'),
        uploadFile(domPath, domJson, 'application/json'),
      ])

      console.log(`[${scanId}] Capture: dom1440=${dom1440.length} elements, axe=${axeViolations.length} violations, dom375=${dom375.length} elements`)

      await supabase.from('scans').update({
        original_path: `${basePath}/original.png`,
        normalized_path: `${basePath}/normalized.png`,
        dom_path: domPath,
      }).eq('id', scanId)

    } else if (input.fileBuffer) {
      normalizedBytes = await normalizeImage(input.fileBuffer)
      const ext = input.inputFilename?.split('.').pop() ?? 'png'
      await uploadFile(`${basePath}/original.${ext}`, input.fileBuffer, `image/${ext}`)
      await uploadFile(`${basePath}/normalized.png`, normalizedBytes, 'image/png')

      await supabase.from('scans').update({
        original_path: `${basePath}/original.${ext}`,
        normalized_path: `${basePath}/normalized.png`,
      }).eq('id', scanId)
    } else {
      throw new Error('No valid input')
    }

    // ── Phase 2: Deterministic checks (including axe + mobile) ───────────────
    let deterministicFindings: Finding[] = []

    if (dom1440 && dom1440.length > 0) {
      deterministicFindings = runAllChecks(
        dom1440,
        axeViolations ?? undefined,
        dom375 ?? undefined,
        input.designSystemConfig ?? undefined
      )
      await supabase.from('scans').update({ det_status: 'completed' }).eq('id', scanId)
    } else {
      await supabase.from('scans').update({ det_status: 'skipped' }).eq('id', scanId)
    }

    // ── Phase 3: Gemini Vision ─────────────────────────────────────────────────
    let aiFindings: Finding[] = []

    try {
      const normalizedUrl = await getSignedUrl(`${basePath}/normalized.png`, 3600)
      aiFindings = await callGeminiVision(normalizedUrl, deterministicFindings)
      await supabase.from('scans').update({ ai_status: 'completed' }).eq('id', scanId)
    } catch (aiErr) {
      console.error(`[${scanId}] Gemini Vision failed:`, aiErr)
      await supabase.from('scans').update({
        ai_status: 'failed',
        ai_error: String(aiErr),
      }).eq('id', scanId)
    }

    // ── Phase 4: Merge, RAG-enriched repair guidance, score, overlay ──────────
    const merged = mergeAndPrioritize(deterministicFindings, aiFindings)

    // RAG-enriched repair guidance: retrieve WCAG/design-pattern context for each det finding
    let finalFindings = merged
    if (deterministicFindings.length > 0) {
      try {
        const detOnly = merged.filter(f => f.source === 'deterministic')
        if (detOnly.length > 0) {
          // Build RAG context by retrieving relevant knowledge base entries for all findings
          const ragContextParts = await Promise.all(
            detOnly.slice(0, 5).map(f => retrieveRAGContext(f).catch(() => ''))
          )
          const ragContext = ragContextParts.filter(Boolean).join('\n\n---\n\n')
          const improved = await callGeminiRepairGuidance(detOnly, ragContext)
          const improvedMap = new Map(improved.map(f => [f.title, f]))
          finalFindings = merged.map(f => f.source === 'deterministic' ? (improvedMap.get(f.title) ?? f) : f)
        }
      } catch {
        // Non-blocking — keep original guidance
      }
    }

    const { overall, categoryScores } = calculateScore(finalFindings)

    const overlayBytes = await generateOverlay(normalizedBytes, finalFindings)
    await uploadFile(`${basePath}/overlay.png`, overlayBytes, 'image/png')

    // Insert findings rows
    if (finalFindings.length > 0) {
      const { data: insertedFindings } = await supabase.from('findings').insert(
        finalFindings.map(f => ({
          scan_id: scanId,
          user_id: userId,
          category: f.category,
          severity: f.severity,
          title: f.title,
          evidence_type: f.evidence_type,
          evidence: f.evidence,
          why_it_matters: f.why_it_matters,
          repair_guidance: f.repair_guidance,
          ai_fix_instruction: f.ai_fix_instruction,
          metric_value: f.metric_value ?? null,
          score_impact: f.score_impact ?? ({ critical: -20, high: -12, medium: -7, low: -3 }[f.severity] ?? null),
          source: f.source,
        }))
      ).select('id, title, why_it_matters')

      // Phase 3: Embed findings for similarity search (non-blocking)
      if (insertedFindings && insertedFindings.length > 0) {
        EdgeRuntime.waitUntil(embedAndStoreFindingsAsync(insertedFindings, userId))
      }
    }

    await supabase.from('scans').update({
      status: 'completed',
      score: overall,
      category_scores: categoryScores,
      finding_count: finalFindings.length,
      overlay_path: `${basePath}/overlay.png`,
      completed_at: new Date().toISOString(),
    }).eq('id', scanId)

  } catch (err) {
    console.error(`[${scanId}] processScan failed:`, err)
    await supabase.from('scans').update({
      status: 'failed',
      error_message: 'Scan processing failed',
    }).eq('id', scanId)
  }
}

// Embed findings and store in finding_embeddings table — fire-and-forget
async function embedAndStoreFindingsAsync(
  findings: Array<{ id: string; title: string; why_it_matters: string }>,
  userId: string
): Promise<void> {
  for (const f of findings) {
    try {
      const text = `${f.title}. ${f.why_it_matters}`
      const embedding = await embedText(text)
      if (!embedding) continue
      await supabase.from('finding_embeddings').insert({
        finding_id: f.id,
        user_id: userId,
        embedding: JSON.stringify(embedding),
      })
    } catch (err) {
      console.error('[embedFindings] failed for finding', f.id, err)
    }
  }
}

// ─── GET /v1/scans ─────────────────────────────────────────────────────────────

export async function handleListScans(req: Request): Promise<Response> {
  const { corsResponse, corsError } = makeCors(req)
  let userId: string
  try { userId = await getUserFromRequest(req) } catch (e) { return corsError(String(e), 401) }

  const url = new URL(req.url)
  const page = Math.max(1, parseInt(url.searchParams.get('page') ?? '1') || 1)
  const limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get('limit') ?? '20') || 20))
  const offset = (page - 1) * limit

  const { data, error, count } = await supabase
    .from('scans')
    .select('*', { count: 'exact' })
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) return corsError(error.message, 500)

  return corsResponse({ scans: data, total: count ?? 0, page, limit })
}

// ─── GET /v1/scans/:id ─────────────────────────────────────────────────────────

export async function handleGetScan(req: Request, scanId: string): Promise<Response> {
  const { corsResponse, corsError } = makeCors(req)
  let userId: string
  try { userId = await getUserFromRequest(req) } catch (e) { return corsError(String(e), 401) }

  const { data, error } = await supabase
    .from('scans')
    .select('*')
    .eq('id', scanId)
    .eq('user_id', userId)
    .single()

  if (error || !data) return corsError('Scan not found', 404)

  return corsResponse(data)
}

// ─── GET /v1/scans/:id/findings ────────────────────────────────────────────────

export async function handleGetFindings(req: Request, scanId: string): Promise<Response> {
  const { corsResponse, corsError } = makeCors(req)
  let userId: string
  try { userId = await getUserFromRequest(req) } catch (e) { return corsError(String(e), 401) }

  const url = new URL(req.url)
  const includeDismissed = url.searchParams.get('include_dismissed') === 'true'

  let query = supabase
    .from('findings')
    .select('*')
    .eq('scan_id', scanId)
    .eq('user_id', userId)
    .order('score_impact', { ascending: true })

  if (!includeDismissed) {
    query = query.eq('dismissed', false)
  }

  const { data, error } = await query

  if (error) return corsError(error.message, 500)

  return corsResponse({ findings: data ?? [] })
}

// ─── GET /v1/scans/:id/artifacts ───────────────────────────────────────────────

export async function handleGetArtifacts(req: Request, scanId: string): Promise<Response> {
  const { corsResponse, corsError } = makeCors(req)
  let userId: string
  try { userId = await getUserFromRequest(req) } catch (e) { return corsError(String(e), 401) }

  const { data: scan, error } = await supabase
    .from('scans')
    .select('normalized_path, overlay_path, dom_path, original_path')
    .eq('id', scanId)
    .eq('user_id', userId)
    .single()

  if (error || !scan) return corsError('Scan not found', 404)

  const artifacts: Record<string, string | null> = {}

  for (const [key, path] of Object.entries(scan)) {
    if (path) {
      try {
        artifacts[key] = await getSignedUrl(path as string)
      } catch {
        artifacts[key] = null
      }
    } else {
      artifacts[key] = null
    }
  }

  return corsResponse(artifacts)
}

// ─── POST /v1/scans/:id/preview ───────────────────────────────────────────────

export async function handlePreviewScan(req: Request, scanId: string): Promise<Response> {
  const { corsResponse, corsError } = makeCors(req)
  let userId: string
  try { userId = await getUserFromRequest(req) } catch (e) { return corsError(String(e), 401) }

  const body = await req.json()
  const choices = body.choices
  if (!choices?.step1 || !choices?.step2 || !choices?.step3) {
    return corsError('choices.step1, step2, step3 are required', 400)
  }

  // Whitelist choices to prevent prompt injection
  const VALID_CHOICES = { step1: ['minimal', 'bold'], step2: ['contrast', 'refresh'], step3: ['accessibility', 'layout'] }
  for (const [k, v] of Object.entries(choices)) {
    if (!VALID_CHOICES[k as keyof typeof VALID_CHOICES]?.includes(v as string)) {
      return corsError(`Invalid value for ${k}`, 400)
    }
  }

  const { data: scan, error: scanErr } = await supabase
    .from('scans')
    .select('normalized_path')
    .eq('id', scanId)
    .eq('user_id', userId)
    .single()

  if (scanErr || !scan?.normalized_path) return corsError('Scan not found', 404)

  const { data: findingsData } = await supabase
    .from('findings')
    .select('severity, title, repair_guidance')
    .eq('scan_id', scanId)
    .eq('user_id', userId)
    .eq('dismissed', false)
    .order('score_impact', { ascending: true })
    .limit(7)

  const findings = findingsData ?? []

  try {
    const imageUrl = await getSignedUrl(scan.normalized_path, 3600)
    const { description, fix_prompt, preview_image_bytes } = await callGeminiDesignPreview(imageUrl, findings, choices)

    let preview_image_url: string | null = null
    if (preview_image_bytes) {
      const previewPath = `${userId}/scans/${scanId}/preview.png`
      await uploadFile(previewPath, preview_image_bytes, 'image/png')
      preview_image_url = await getSignedUrl(previewPath, 3600)
    }

    console.log(`[PREVIEW] ${scanId} completed — image: ${!!preview_image_bytes}`)
    return corsResponse({ description, fix_prompt, preview_image_url })
  } catch (err) {
    console.error(`[PREVIEW] ${scanId} failed:`, err)
    return corsError('Preview generation failed', 500)
  }
}

// ─── POST /v1/scans/:id/rescan ────────────────────────────────────────────────

export async function handleRescan(req: Request, scanId: string): Promise<Response> {
  const { corsResponse, corsError } = makeCors(req)
  let userId: string
  let userEmail: string | undefined
  try {
    const info = await getUserInfoFromRequest(req)
    userId = info.id
    userEmail = info.email
  } catch (e) { return corsError(String(e), 401) }

  // Fetch parent scan
  const { data: parent, error: parentErr } = await supabase
    .from('scans')
    .select('input_type, input_url, input_filename, design_system_config, status')
    .eq('id', scanId)
    .eq('user_id', userId)
    .single()

  if (parentErr || !parent) return corsError('Scan not found', 404)
  if (parent.status !== 'completed') return corsError('Can only rescan a completed scan', 400)
  if (parent.input_type === 'screenshot') return corsError('Screenshot scans cannot be rescanned — submit a new URL scan', 400)

  // Rate limit check
  if (await isRateLimited(userId, userEmail)) return corsError('Rate limit: max 7 scans per month on free plan', 429)

  const { data: newScan, error: insertErr } = await supabase
    .from('scans')
    .insert({
      user_id: userId,
      input_type: parent.input_type,
      input_url: parent.input_url,
      input_filename: parent.input_filename,
      design_system_config: parent.design_system_config,
      parent_scan_id: scanId,
      status: 'pending',
    })
    .select('id')
    .single()

  if (insertErr || !newScan) return corsError('Failed to create rescan', 500)

  const dsConfig = parent.design_system_config as DesignSystemConfig | null
  EdgeRuntime.waitUntil(processScan(newScan.id, userId, {
    inputType: parent.input_type,
    inputUrl: parent.input_url,
    fileBuffer: null,
    inputFilename: parent.input_filename,
    designSystemConfig: dsConfig,
  }))

  return corsResponse({ scan_id: newScan.id }, 202)
}

// ─── POST /v1/findings/:id/dismiss ────────────────────────────────────────────

export async function handleDismissFinding(req: Request, findingId: string): Promise<Response> {
  const { corsResponse, corsError } = makeCors(req)
  let userId: string
  try { userId = await getUserFromRequest(req) } catch (e) { return corsError(String(e), 401) }

  const { data, error } = await supabase
    .from('findings')
    .update({ dismissed: true, dismissed_at: new Date().toISOString() })
    .eq('id', findingId)
    .eq('user_id', userId)
    .select('id')

  if (error) return corsError(error.message, 500)
  if (!data || data.length === 0) return corsError('Finding not found', 404)

  return corsResponse({ success: true })
}

// ─── GET /v1/usage ─────────────────────────────────────────────────────────────

export async function handleGetUsage(req: Request): Promise<Response> {
  const { corsResponse, corsError } = makeCors(req)
  let userId: string
  let userEmail: string | undefined
  try {
    const info = await getUserInfoFromRequest(req)
    userId = info.id
    userEmail = info.email
  } catch (e) { return corsError(String(e), 401) }

  if (ADMIN_EMAILS.has(userEmail ?? '')) {
    return corsResponse({ scans_this_month: 0, limit: 999, plan: 'admin' })
  }

  const monthStart = new Date()
  monthStart.setDate(1)
  monthStart.setHours(0, 0, 0, 0)

  const { count } = await supabase.from('scans')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('status', 'completed')
    .gte('created_at', monthStart.toISOString())

  return corsResponse({ scans_this_month: count ?? 0, limit: 7, plan: 'free' })
}

// ─── DELETE /v1/scans/:id ──────────────────────────────────────────────────────

export async function handleDeleteScan(req: Request, scanId: string): Promise<Response> {
  const { corsResponse, corsError } = makeCors(req)
  let userId: string
  try { userId = await getUserFromRequest(req) } catch (e) { return corsError(String(e), 401) }

  const { error } = await supabase
    .from('scans')
    .delete()
    .eq('id', scanId)
    .eq('user_id', userId)

  if (error) return corsError(error.message, 500)

  return corsResponse({ success: true })
}
