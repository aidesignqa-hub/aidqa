/**
 * Tests for apiBase.ts — getApiBaseUrl() and auth header utility.
 * Supabase client is mocked to isolate the unit.
 *
 * IMPORTANT: vi.mock() is hoisted to the top of the file by Vitest, even when
 * written inside describe/beforeEach.  The factory must contain NO references
 * to outer-scope variables.  We define the mock at module level with vi.fn()
 * stubs, then configure per-test behaviour via vi.mocked() in beforeEach.
 */
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'

// ── Module-level mock (factory must be variable-free) ─────────────────────────
vi.mock('@/lib/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      refreshSession: vi.fn(),
    },
  },
}))

const FAKE_TOKEN = 'test-jwt-token-abc123'
const FAKE_ANON  = 'anon-key-xyz'

// ── getApiBaseUrl ─────────────────────────────────────────────────────────────

describe('getApiBaseUrl', () => {
  beforeEach(() => { vi.resetModules() })
  afterEach(()  => { vi.unstubAllEnvs() })

  it('returns the base URL without trailing slash', async () => {
    vi.stubEnv('VITE_API_BASE_URL', 'https://api.example.com/')
    const { getApiBaseUrl } = await import('@/lib/apiBase')
    expect(getApiBaseUrl()).toBe('https://api.example.com')
  })

  it('returns empty string when env var is absent', async () => {
    vi.stubEnv('VITE_API_BASE_URL', '')
    const { getApiBaseUrl } = await import('@/lib/apiBase')
    expect(getApiBaseUrl()).toBe('')
  })
})

// ── getAuthHeaders — empty session ────────────────────────────────────────────

describe('getAuthHeaders with no session', () => {
  beforeEach(async () => {
    vi.resetModules()
    // After resetModules the mock factory re-runs on next import; grab fresh ref
    const { supabase } = await import('@/lib/supabaseClient')
    vi.mocked(supabase.auth.getSession).mockResolvedValue({ data: { session: null }, error: null })
    vi.mocked(supabase.auth.refreshSession).mockResolvedValue({ data: { session: null }, error: null })
  })

  afterEach(() => { vi.restoreAllMocks() })

  it('returns an empty object when there is no active session', async () => {
    const { getAuthHeaders } = await import('@/lib/apiBase')
    const headers = await getAuthHeaders()
    expect(headers).toEqual({})
  })

  it('does not throw when session is null', async () => {
    const { getAuthHeaders } = await import('@/lib/apiBase')
    await expect(getAuthHeaders()).resolves.not.toThrow()
  })
})

// ── getAuthHeaders — valid session ────────────────────────────────────────────

describe('getAuthHeaders with a valid session', () => {
  beforeEach(async () => {
    vi.resetModules()
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', FAKE_ANON)
    const { supabase } = await import('@/lib/supabaseClient')
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: {
        session: {
          access_token: FAKE_TOKEN,
          expires_at: Math.floor(Date.now() / 1000) + 3600, // not expiring
        },
      },
      error: null,
    })
    vi.mocked(supabase.auth.refreshSession).mockResolvedValue({ data: { session: null }, error: null })
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllEnvs()
  })

  it('returns Authorization bearer token', async () => {
    const { getAuthHeaders } = await import('@/lib/apiBase')
    const headers = await getAuthHeaders()
    expect(headers['Authorization']).toBe(`Bearer ${FAKE_TOKEN}`)
  })

  it('returns apikey header', async () => {
    const { getAuthHeaders } = await import('@/lib/apiBase')
    const headers = await getAuthHeaders()
    expect(headers['apikey']).toBe(FAKE_ANON)
  })

  it('does not call refreshSession when token is not expiring', async () => {
    const { supabase } = await import('@/lib/supabaseClient')
    const { getAuthHeaders } = await import('@/lib/apiBase')
    await getAuthHeaders()
    expect(vi.mocked(supabase.auth.refreshSession)).not.toHaveBeenCalled()
  })
})
