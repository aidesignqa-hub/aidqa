/**
 * Tests for the URL validation logic copied from ScanInput.tsx.
 * This exercises the client-side gate before the server's SSRF guard.
 */

function isValidUrl(s: string): boolean {
  try {
    const u = new URL(s)
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch {
    return false
  }
}

function normaliseUrl(raw: string): string {
  let trimmed = raw.trim()
  if (trimmed && !/^https?:\/\//i.test(trimmed)) trimmed = 'https://' + trimmed
  return trimmed
}

describe('URL validation — isValidUrl', () => {
  // Happy paths
  it('accepts a plain https URL', () => {
    expect(isValidUrl('https://example.com')).toBe(true)
  })
  it('accepts a plain http URL', () => {
    expect(isValidUrl('http://example.com')).toBe(true)
  })
  it('accepts a URL with path and query', () => {
    expect(isValidUrl('https://app.example.com/path?q=1&r=2')).toBe(true)
  })

  // Rejection cases
  it('rejects empty string', () => {
    expect(isValidUrl('')).toBe(false)
  })
  it('rejects whitespace-only string', () => {
    expect(isValidUrl('   ')).toBe(false)
  })
  it('rejects javascript: protocol (XSS vector)', () => {
    expect(isValidUrl('javascript:alert(1)')).toBe(false)
  })
  it('rejects data: protocol', () => {
    expect(isValidUrl('data:text/html,<h1>hi</h1>')).toBe(false)
  })
  it('rejects ftp: protocol', () => {
    expect(isValidUrl('ftp://example.com')).toBe(false)
  })
  it('rejects a bare domain with no protocol', () => {
    // Without auto-prefix logic, bare domain is invalid
    expect(isValidUrl('example.com')).toBe(false)
  })
  it('rejects plain text', () => {
    expect(isValidUrl('not a url at all')).toBe(false)
  })
  it('rejects SQL injection payload', () => {
    expect(isValidUrl("'; DROP TABLE scans; --")).toBe(false)
  })
})

describe('URL normalisation (auto https prefix)', () => {
  it('leaves https:// URLs unchanged', () => {
    expect(normaliseUrl('https://example.com')).toBe('https://example.com')
  })
  it('leaves http:// URLs unchanged', () => {
    expect(normaliseUrl('http://example.com')).toBe('http://example.com')
  })
  it('adds https:// to bare domains', () => {
    expect(normaliseUrl('example.com')).toBe('https://example.com')
  })
  it('trims whitespace before checking', () => {
    const result = normaliseUrl('  https://example.com  ')
    expect(result).toBe('https://example.com')
  })
  it('does not double-prefix an existing https URL', () => {
    expect(normaliseUrl('https://example.com')).not.toMatch(/^https:\/\/https/)
  })
})
