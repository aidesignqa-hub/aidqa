import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '@/components/NavBar'
import { Input } from '@/components/ui/input'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { getApiBaseUrl, getAuthHeaders } from '@/lib/apiBase'

function parseDesignSystemConfig(raw: string): { colors: string[]; spacing: number[] } | null {
  if (!raw.trim()) return null
  const colors: string[] = []
  const spacing: number[] = []

  // Extract hex colors
  const hexMatches = raw.match(/#[0-9a-fA-F]{3,8}\b/g) ?? []
  for (const hex of hexMatches) {
    if (!colors.includes(hex.toUpperCase())) colors.push(hex.toUpperCase())
  }

  // Extract px/rem spacing values
  const pxMatches = raw.match(/(\d+(?:\.\d+)?)px/g) ?? []
  for (const px of pxMatches) {
    const val = parseFloat(px)
    if (!spacing.includes(val)) spacing.push(val)
  }
  const remMatches = raw.match(/(\d+(?:\.\d+)?)rem/g) ?? []
  for (const rem of remMatches) {
    const val = Math.round(parseFloat(rem) * 16)
    if (!spacing.includes(val)) spacing.push(val)
  }

  if (colors.length === 0 && spacing.length === 0) return null
  return { colors, spacing }
}

function Spinner() {
  return (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  )
}

export default function ScanInput() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'url' | 'screenshot'>('url')
  const [url, setUrl] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [usage, setUsage] = useState<{ scans_this_month: number; limit: number; plan: string } | null>(null)
  const [dsRaw, setDsRaw] = useState('')
  const [dsOpen, setDsOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const submitting = useRef(false)

  useEffect(() => {
    getAuthHeaders().then(headers => {
      return fetch(`${getApiBaseUrl()}/v1/usage`, { headers })
        .then(async r => {
          if (!r.ok) return null
          try { return await r.json() } catch { return null }
        })
        .then(d => { if (d) setUsage(d) })
        .catch(() => {})
    }).catch(() => {})
  }, [])

  const isValidUrl = (s: string) => {
    try { const u = new URL(s); return u.protocol === 'http:' || u.protocol === 'https:' } catch { return false }
  }

  const handleUrlScan = async () => {
    if (submitting.current) return
    let trimmed = url.trim()
    if (trimmed && !/^https?:\/\//i.test(trimmed)) trimmed = 'https://' + trimmed
    if (!trimmed || !isValidUrl(trimmed)) { setError('Enter a valid URL (e.g. example.com)'); return }
    if (trimmed.length > 2048) { setError('URL too long'); return }
    setError(null)
    submitting.current = true
    setLoading(true)
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 30_000)
    try {
      const headers = await getAuthHeaders()
      const res = await fetch(`${getApiBaseUrl()}/v1/scans`, {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'url', url: trimmed, design_system_config: parseDesignSystemConfig(dsRaw) }),
        signal: controller.signal,
      })
      const data = await res.json()
      if (res.status === 401) { navigate('/login'); return }
      if (!res.ok) throw new Error(data.error ?? data.message ?? `Request failed (${res.status})`)
      navigate(`/scans/${data.scan_id}`)
    } catch (e) {
      setError(e instanceof Error && e.name === 'AbortError' ? 'Request timed out. Try again.' : String(e))
    } finally {
      clearTimeout(timeout)
      setLoading(false)
      submitting.current = false
    }
  }

  const handleFileScan = async () => {
    if (submitting.current) return
    if (!file) { setError('Select a file first'); return }
    setError(null)
    submitting.current = true
    setLoading(true)
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 30_000)
    try {
      const headers = await getAuthHeaders()
      delete (headers as Record<string, string>)['Content-Type']
      const form = new FormData()
      form.append('file', file)
      const res = await fetch(`${getApiBaseUrl()}/v1/scans`, {
        method: 'POST',
        headers,
        body: form,
        signal: controller.signal,
      })
      const data = await res.json()
      if (res.status === 401) { navigate('/login'); return }
      if (!res.ok) throw new Error(data.error ?? data.message ?? `Request failed (${res.status})`)
      navigate(`/scans/${data.scan_id}`)
    } catch (e) {
      setError(e instanceof Error && e.name === 'AbortError' ? 'Request timed out. Try again.' : String(e))
    } finally {
      clearTimeout(timeout)
      setLoading(false)
      submitting.current = false
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const dropped = e.dataTransfer.files[0]
    if (!dropped) return
    if (!/\.(png|jpe?g|webp)$/i.test(dropped.name)) {
      setError('Only PNG, JPG, or WEBP files are accepted')
      return
    }
    if (dropped.size > 10 * 1024 * 1024) {
      setError('File too large. Maximum size is 10 MB.')
      return
    }
    setFile(dropped)
    setError(null)
  }

  const isAdmin = usage?.plan === 'admin'
  const atLimit = usage && !isAdmin && usage.scans_this_month >= usage.limit
  const scansLeft = usage && !isAdmin ? Math.max(0, usage.limit - usage.scans_this_month) : null
  const progressPct = usage && !isAdmin ? Math.min(100, (usage.scans_this_month / usage.limit) * 100) : 0
  const btnDisabled = loading || !!atLimit

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <NavBar />
      <main className="max-w-2xl mx-auto px-4 py-12 space-y-5">

        {/* ── Two-column header: headline left, usage card right ── */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 items-start">

          {/* Headline */}
          <div>
            <span
              className="inline-flex items-center text-xs font-semibold rounded-full px-3 py-1"
              style={{ backgroundColor: '#f97316', color: '#000' }}
            >
              Design QA
            </span>
            <h1 className="text-3xl font-bold mt-3 mb-2 leading-tight text-[#f4f4f5]">
              Scan a page for design issues
            </h1>
            <p className="text-sm leading-relaxed text-[#a1a1aa]">
              Get a prioritized QA report from a live URL or screenshot. Catch layout, hierarchy, consistency, UX, and accessibility issues in minutes.
            </p>
          </div>

          {/* Usage stats card */}
          {usage && (
            <div className="bg-[#111113] rounded-2xl p-4 space-y-3 shrink-0 w-56 border border-[rgba(255,255,255,0.06)]">
              {isAdmin ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#f4f4f5]">Unlimited scans</span>
                    <span className="text-base text-[#f4f4f5]">∞</span>
                  </div>
                  <p className="text-xs text-[#a1a1aa]">Admin — no limits applied</p>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold" style={{ color: atLimit ? '#f87171' : '#f4f4f5' }}>
                      {atLimit ? 'No scans left' : `${scansLeft} scan${scansLeft === 1 ? '' : 's'} left`}
                    </span>
                    <span className="text-xs font-medium text-[#f97316]">This month</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#18181b]">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${progressPct}%`, backgroundColor: atLimit ? '#f87171' : '#f97316' }}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold text-[#f4f4f5]">Starter</p>
                      <p className="text-xs text-[#a1a1aa]">{usage.limit} scans / month</p>
                    </div>
                    <a
                      href="https://lp.aidesignqa.com#pricing"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold px-2.5 py-1.5 rounded-lg shrink-0 transition-colors border border-[rgba(255,255,255,0.06)] text-[#a1a1aa] bg-[#0a0a0b]"
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = '#f97316'
                        ;(e.currentTarget as HTMLElement).style.color = '#f97316'
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'
                        ;(e.currentTarget as HTMLElement).style.color = '#a1a1aa'
                      }}
                    >
                      Upgrade — €19/mo
                    </a>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* ── Main card ── */}
        <div className="bg-[#111113] rounded-2xl shadow-sm overflow-hidden border border-[rgba(255,255,255,0.06)]">

          {/* Tab switcher */}
          <div className="p-3">
            <div className="flex rounded-xl p-1 bg-[#18181b]">
              {(['url', 'screenshot'] as const).map(tab => (
                <button
                  key={tab}
                  className="flex-1 py-2 text-sm rounded-lg transition-all"
                  style={activeTab === tab ? {
                    backgroundColor: '#0a0a0b',
                    color: '#f4f4f5',
                    fontWeight: 600,
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
                  } : {
                    color: '#a1a1aa',
                    background: 'transparent',
                    border: '1px solid transparent',
                  }}
                  onClick={() => { setActiveTab(tab); setError(null) }}
                >
                  {tab === 'url' ? 'Scan URL' : 'Upload screenshot'}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="px-5 pb-2">
            {activeTab === 'url' ? (
              <div className="space-y-2">
                <label className="text-sm font-medium block text-[#f4f4f5]">Page URL</label>
                <Input
                  className="h-11 text-sm bg-[#18181b] border-[rgba(255,255,255,0.08)] text-white placeholder:text-[#71717a] placeholder:opacity-100 rounded-xl"
                  placeholder="https://your-page.com"
                  value={url}
                  onChange={e => { setUrl(e.target.value); if (error) setError(null) }}
                  onKeyDown={e => e.key === 'Enter' && handleUrlScan()}
                  disabled={loading || !!atLimit}
                />
                <p className="text-xs pt-0.5 text-[#a1a1aa]">
                  Use a public URL. Private or staged pages can be supported later via authenticated scans.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div
                  className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors"
                  style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                  onDrop={handleDrop}
                  onDragOver={e => e.preventDefault()}
                  onClick={() => fileInputRef.current?.click()}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#f97316'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'}
                >
                  {file ? (
                    <p className="text-sm font-medium text-[#f4f4f5]">
                      {file.name} ({(file.size / 1024 / 1024).toFixed(1)} MB)
                    </p>
                  ) : (
                    <>
                      <p className="text-sm mb-1 text-[#a1a1aa]">Drop a file or click to browse</p>
                      <p className="text-xs text-[#71717a]">PNG, JPG, WEBP — max 10 MB</p>
                    </>
                  )}
                  <input ref={fileInputRef} type="file" accept=".png,.jpg,.jpeg,.webp" className="hidden"
                    onChange={e => {
                      const f = e.target.files?.[0]
                      if (!f) return
                      if (f.size > 10 * 1024 * 1024) { setError('File too large. Maximum size is 10 MB.'); return }
                      setFile(f); setError(null)
                    }}
                  />
                </div>
                <p className="text-xs px-3 py-2 rounded-lg text-[#a1a1aa] bg-[#18181b]">
                  Screenshot scans provide layout and hierarchy analysis only. For precise contrast, spacing, and accessibility checks, scan a live URL.
                </p>
              </div>
            )}

            {/* Design system config */}
            <div className="mt-3">
              <button
                type="button"
                className="flex items-center gap-1 text-xs font-medium text-[#a1a1aa]"
                onClick={() => setDsOpen(o => !o)}
              >
                {dsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                Design system tokens (optional)
              </button>
              {dsOpen && (
                <div className="mt-2 space-y-1.5">
                  <textarea
                    className="w-full rounded-lg border text-xs font-mono resize-none px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f97316] bg-[#18181b] border-[rgba(255,255,255,0.08)] text-[#f4f4f5] placeholder:text-[#71717a]"
                    style={{ minHeight: '80px' }}
                    placeholder={`Paste Tailwind config or CSS variables, e.g.\n:root { --color-brand: #FF8B00; --spacing-4: 16px; }`}
                    value={dsRaw}
                    onChange={e => setDsRaw(e.target.value)}
                    rows={4}
                  />
                  <p className="text-xs text-[#a1a1aa]">
                    Custom tokens suppress false positives for your design system's brand colors and spacing values.
                  </p>
                </div>
              )}
            </div>

            {error && (
              <p className="mt-3 text-xs font-medium text-red-400">{error}</p>
            )}
          </div>

          {/* Feature grid — inside card, above action bar */}
          <div className="grid grid-cols-3 gap-2 px-5 py-4">
            {[
              { label: 'Covers', value: 'Layout, UX, accessibility, hierarchy, consistency' },
              { label: 'Input', value: 'Live URL or screenshot' },
              { label: 'Output', value: 'Prioritized findings with fix guidance' },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl p-3 border border-[rgba(255,255,255,0.06)]">
                <p className="text-xs uppercase tracking-wide font-medium mb-1 text-[#a1a1aa]">{label}</p>
                <p className="text-sm font-medium leading-relaxed text-[#f4f4f5]">{value}</p>
              </div>
            ))}
          </div>

          {/* Action bar */}
          <div className="px-5 py-4 flex items-center justify-between gap-4 border-t border-[rgba(255,255,255,0.06)]">
            <div>
              <p className="text-sm font-semibold text-[#f4f4f5]">Ready to scan</p>
              <p className="text-xs mt-0.5 text-[#a1a1aa]">Most reports are generated in under a minute.</p>
            </div>
            <button
              disabled={btnDisabled}
              onClick={activeTab === 'url' ? handleUrlScan : handleFileScan}
              className="shrink-0 rounded-full transition-colors flex items-center"
              style={{
                padding: '12px 24px',
                fontWeight: 600,
                fontSize: '1rem',
                border: 'none',
                cursor: btnDisabled ? 'not-allowed' : 'pointer',
                backgroundColor: atLimit ? '#18181b' : '#f97316',
                color: atLimit ? '#71717a' : '#000',
              }}
              onMouseEnter={e => {
                if (!btnDisabled && !atLimit) (e.currentTarget as HTMLElement).style.backgroundColor = '#ea6c0a'
              }}
              onMouseLeave={e => {
                if (!btnDisabled && !atLimit) (e.currentTarget as HTMLElement).style.backgroundColor = '#f97316'
              }}
            >
              {loading && <Spinner />}
              {loading ? 'Scanning…' : 'Scan Page'}
            </button>
          </div>
        </div>

      </main>
    </div>
  )
}
