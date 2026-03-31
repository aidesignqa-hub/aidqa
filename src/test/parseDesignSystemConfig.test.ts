/**
 * Tests for the design-system config parser in ScanInput.tsx.
 * Extracted to a pure function for testability.
 */

function parseDesignSystemConfig(raw: string): { colors: string[]; spacing: number[] } | null {
  if (!raw.trim()) return null
  const colors: string[] = []
  const spacing: number[] = []

  const hexMatches = raw.match(/#[0-9a-fA-F]{3,8}\b/g) ?? []
  for (const hex of hexMatches) {
    if (!colors.includes(hex.toUpperCase())) colors.push(hex.toUpperCase())
  }

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

describe('parseDesignSystemConfig', () => {
  it('returns null for empty string', () => {
    expect(parseDesignSystemConfig('')).toBeNull()
  })

  it('returns null for whitespace-only string', () => {
    expect(parseDesignSystemConfig('   \n\t  ')).toBeNull()
  })

  it('returns null when no colors or spacing tokens found', () => {
    expect(parseDesignSystemConfig('some random text without tokens')).toBeNull()
  })

  it('extracts a 6-digit hex color', () => {
    const result = parseDesignSystemConfig('color: #FF8B00;')
    expect(result?.colors).toContain('#FF8B00')
  })

  it('normalises hex colors to uppercase', () => {
    const result = parseDesignSystemConfig('color: #ff8b00;')
    expect(result?.colors).toContain('#FF8B00')
  })

  it('deduplicates repeated colors', () => {
    const result = parseDesignSystemConfig('#FF8B00 and #FF8B00 again')
    expect(result?.colors).toHaveLength(1)
  })

  it('extracts multiple distinct colors', () => {
    const result = parseDesignSystemConfig('#FF8B00 #2563EB #172B4D')
    expect(result?.colors).toHaveLength(3)
  })

  it('extracts px spacing values', () => {
    const result = parseDesignSystemConfig('--spacing: 16px;')
    expect(result?.spacing).toContain(16)
  })

  it('extracts rem spacing (converts to px at 16px base)', () => {
    const result = parseDesignSystemConfig('--spacing: 1rem;')
    expect(result?.spacing).toContain(16)
  })

  it('deduplicates spacing values', () => {
    const result = parseDesignSystemConfig('16px 16px 16px')
    expect(result?.spacing).toHaveLength(1)
  })

  it('handles a realistic CSS variables block', () => {
    const css = `
      :root {
        --color-brand: #FF8B00;
        --color-primary: #2563EB;
        --spacing-4: 16px;
        --spacing-8: 32px;
      }
    `
    const result = parseDesignSystemConfig(css)
    expect(result?.colors).toContain('#FF8B00')
    expect(result?.colors).toContain('#2563EB')
    expect(result?.spacing).toContain(16)
    expect(result?.spacing).toContain(32)
  })

  it('handles emoji and special characters gracefully (no crash)', () => {
    expect(() => parseDesignSystemConfig('🎨 #FF0000 ✨ 8px')).not.toThrow()
  })

  it('handles a 10000-character string without crashing', () => {
    const long = '#FF8B00 '.repeat(1250)
    expect(() => parseDesignSystemConfig(long)).not.toThrow()
  })

  it('handles SQL injection payload gracefully', () => {
    expect(() =>
      parseDesignSystemConfig("'; DROP TABLE scans; -- #FF0000")
    ).not.toThrow()
  })
})
