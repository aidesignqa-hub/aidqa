import type { Finding } from './types.ts'
import { embedText, cosineSimilarity } from './embedding.ts'

// ─── Knowledge Base ───────────────────────────────────────────────────────────
// ~50 entries covering WCAG 2.1 AA, Apple HIG, Material Design 3, and design system best practices.
// Used for RAG-enriched repair guidance — retrieved by keyword overlap or embedding similarity.

export interface KnowledgeEntry {
  id: string
  category: string
  title: string
  content: string
  source: 'wcag' | 'hig' | 'material' | 'best-practice'
  keywords: string[]
}

export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  // ── WCAG Accessibility ────────────────────────────────────────────────────
  {
    id: 'wcag-1.4.3',
    category: 'accessibility',
    title: 'WCAG 1.4.3 — Contrast (Minimum)',
    content: 'Text and images of text must have a contrast ratio of at least 4.5:1, except for large text (18pt or 14pt bold) which requires at least 3:1. Level AA. Use tools like Contrast Ratio or WebAIM to measure. Fix by darkening text or lightening/darkening background. Common safe text colors on white: #595959 (7:1), #767676 (4.5:1 exact). On dark backgrounds: #AAAAAA meets AA for normal text.',
    source: 'wcag',
    keywords: ['contrast', 'color', 'text', 'wcag', 'aa', 'ratio', 'luminance', 'foreground', 'background'],
  },
  {
    id: 'wcag-1.4.11',
    category: 'accessibility',
    title: 'WCAG 1.4.11 — Non-text Contrast',
    content: 'UI components (buttons, inputs, checkboxes) and informational graphics must have at least 3:1 contrast ratio against adjacent colors. Borders on inputs need 3:1 against the background. Focus indicators need 3:1. Level AA.',
    source: 'wcag',
    keywords: ['contrast', 'border', 'input', 'button', 'focus', 'non-text', 'ui component'],
  },
  {
    id: 'wcag-1.4.12',
    category: 'accessibility',
    title: 'WCAG 1.4.12 — Text Spacing',
    content: 'Content must not lose or overlap when users override: line-height to 1.5× font-size, letter-spacing to 0.12× font-size, word-spacing to 0.16× font-size, spacing after paragraphs to 2× font-size. Fix: use line-height: 1.5 on body text. Do not use "normal" which resolves to ~1.2. Use relative units (em, rem) not px for spacing. Level AA.',
    source: 'wcag',
    keywords: ['line-height', 'letter-spacing', 'word-spacing', 'text spacing', 'body text'],
  },
  {
    id: 'wcag-1.4.4',
    category: 'accessibility',
    title: 'WCAG 1.4.4 — Resize Text',
    content: 'Text must be resizable up to 200% without loss of content or functionality. Fix: use rem/em for font sizes, not px. Set html font-size: 100% (16px) as base. Avoid using px for font sizes in components. Level AA.',
    source: 'wcag',
    keywords: ['font size', 'resize', 'rem', 'em', 'relative units', 'zoom'],
  },
  {
    id: 'wcag-2.4.7',
    category: 'accessibility',
    title: 'WCAG 2.4.7 — Focus Visible',
    content: 'Keyboard focus indicator must be visible. Fix: never use outline: none or outline: 0 without a replacement. Use a visible focus ring: outline: 2px solid #2563EB; outline-offset: 2px. Alternatively use box-shadow. Focus style must be visible on both light and dark backgrounds. Level AA.',
    source: 'wcag',
    keywords: ['focus', 'outline', 'keyboard', 'focus ring', 'focus visible', 'tab'],
  },
  {
    id: 'wcag-1.3.1',
    category: 'accessibility',
    title: 'WCAG 1.3.1 — Info and Relationships',
    content: 'Structure conveyed visually must be programmatically determinable. Use semantic HTML: headings (h1-h6) for hierarchy, lists (ul/ol) for list content, tables for tabular data, label elements or aria-label for form inputs. Do not use div/span to replace semantic elements. Level A.',
    source: 'wcag',
    keywords: ['semantic', 'html', 'heading', 'label', 'form', 'aria', 'structure'],
  },
  {
    id: 'wcag-4.1.2',
    category: 'accessibility',
    title: 'WCAG 4.1.2 — Name, Role, Value',
    content: 'All UI components must have an accessible name, role, and state. Fix: buttons need text content or aria-label. Icons-only buttons need aria-label. Custom widgets need ARIA role. Form inputs need associated label (for/id pair or aria-labelledby). Interactive divs need role="button" and tabindex="0". Level A.',
    source: 'wcag',
    keywords: ['aria', 'aria-label', 'role', 'button', 'input', 'label', 'name', 'accessible name'],
  },
  {
    id: 'wcag-1.1.1',
    category: 'accessibility',
    title: 'WCAG 1.1.1 — Non-text Content',
    content: 'All images must have alt text describing their purpose. Decorative images: alt="". Informative images: describe what the image communicates. Functional images (linked): describe the destination or function. Complex images (charts): provide full text description. Level A.',
    source: 'wcag',
    keywords: ['alt text', 'alt', 'image', 'img', 'non-text', 'decorative'],
  },
  {
    id: 'wcag-2.4.3',
    category: 'accessibility',
    title: 'WCAG 2.4.3 — Focus Order',
    content: 'If a page can be navigated sequentially, the focus order must preserve meaning and operability. Fix: ensure DOM order matches visual order. Avoid tabindex > 0. Use logical tab flow through the page: header → main → footer. Fix visual-only reordering via CSS (flexbox order, position: absolute) that breaks DOM order. Level A.',
    source: 'wcag',
    keywords: ['focus order', 'tab order', 'tabindex', 'keyboard navigation', 'dom order'],
  },
  {
    id: 'wcag-2.5.5',
    category: 'accessibility',
    title: 'WCAG 2.5.5 — Target Size',
    content: 'Interactive targets should be at least 44×44 CSS pixels. Fix: add padding to small buttons/links rather than increasing the element itself. Use min-height: 44px and min-width: 44px. Ensure touch targets on mobile are large enough to tap accurately. Level AAA, but 24×24 minimum is Level AA (WCAG 2.2).',
    source: 'wcag',
    keywords: ['touch target', 'target size', 'button size', 'tap', 'mobile', '44px'],
  },
  {
    id: 'wcag-2.4.6',
    category: 'accessibility',
    title: 'WCAG 2.4.6 — Headings and Labels',
    content: 'Headings and labels must be descriptive. Avoid generic headings like "Section 1". Headings must follow hierarchical order: h1 (one per page), then h2, h3 — do not skip levels. Labels must uniquely identify their control. Level AA.',
    source: 'wcag',
    keywords: ['heading', 'h1', 'h2', 'h3', 'heading order', 'heading hierarchy', 'label'],
  },
  {
    id: 'wcag-3.3.2',
    category: 'accessibility',
    title: 'WCAG 3.3.2 — Labels or Instructions',
    content: 'Form fields require visible labels. Do not rely on placeholder text alone — placeholder disappears on input. Each input needs a <label for="id"> or aria-label. Group related inputs with <fieldset> and <legend>. Required fields should be marked visually and programmatically (aria-required="true"). Level A.',
    source: 'wcag',
    keywords: ['form', 'label', 'placeholder', 'input', 'required', 'fieldset', 'legend'],
  },
  // ── Typography & Hierarchy ────────────────────────────────────────────────
  {
    id: 'type-scale',
    category: 'design_system',
    title: 'Type Scale — Modular, Consistent Sizing',
    content: 'A type scale creates clear visual hierarchy. Common scales: Minor Third (1.2×), Major Third (1.25×), Perfect Fourth (1.333×). Recommended sizes: body 16px, small text 14px, caption 12px, h3 20px, h2 24px, h1 32–48px. Limit to 4–5 distinct sizes. In Tailwind: text-sm (14), text-base (16), text-xl (20), text-2xl (24), text-4xl (36). Never use more than 5 font sizes in a single view.',
    source: 'best-practice',
    keywords: ['font size', 'type scale', 'heading', 'hierarchy', 'typography', 'modular scale'],
  },
  {
    id: 'type-weight',
    category: 'design_system',
    title: 'Font Weight Discipline',
    content: 'Limit font weights to 4: regular (400) for body, medium (500) for emphasis, semibold (600) for labels and subheadings, bold (700) for headings and CTAs. Never use 300 (light) — poor contrast and readability. 800/900 only for display text above 32px. In Tailwind: font-normal, font-medium, font-semibold, font-bold. Consolidate custom weights.',
    source: 'best-practice',
    keywords: ['font weight', 'bold', 'semibold', 'medium', 'type weight', 'font-weight'],
  },
  {
    id: 'heading-hierarchy',
    category: 'hierarchy',
    title: 'Heading Hierarchy — One h1, Sequential Levels',
    content: 'Every page should have exactly one h1 that describes the page purpose. Subsequent sections use h2, sub-sections use h3. Never skip heading levels (h1 → h3 without h2). This matters for SEO and screen readers. Visual size is achieved via CSS, not by choosing a lower heading level. h1 should be at least 1.5× body text size. h2 at least 1.25× body.',
    source: 'best-practice',
    keywords: ['heading', 'h1', 'h2', 'h3', 'hierarchy', 'heading order', 'skip levels', 'seo'],
  },
  // ── Spacing & Layout ──────────────────────────────────────────────────────
  {
    id: 'spacing-4px-grid',
    category: 'design_system',
    title: '4px Grid — Spatial Consistency',
    content: 'All spacing values (padding, margin, gap) should be multiples of 4px: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96. This creates visual rhythm and makes layouts feel intentional. In Tailwind CSS: p-1 (4px), p-2 (8px), p-3 (12px), p-4 (16px), p-6 (24px), p-8 (32px). Never use arbitrary values like 7px, 13px, 22px.',
    source: 'best-practice',
    keywords: ['spacing', 'padding', 'margin', 'gap', '4px', 'grid', 'rhythm', 'tokens'],
  },
  {
    id: 'spacing-rhythm',
    category: 'layout',
    title: 'Spacing Rhythm — Consistent Vertical Flow',
    content: 'Vertical rhythm makes layouts feel cohesive. Use consistent spacing between elements of the same type: same gap between cards, same margin between paragraphs. Dominant spacing value should account for >70% of all spacing. Outliers should be intentional (hero sections, section breaks). In Tailwind: use space-y-4 on lists, gap-6 on grids, mb-8 between sections.',
    source: 'best-practice',
    keywords: ['spacing', 'vertical rhythm', 'consistent', 'margin', 'padding', 'layout', 'whitespace'],
  },
  {
    id: 'layout-alignment',
    category: 'layout',
    title: 'Alignment — Strong Visual Grid',
    content: 'Elements should align to a consistent grid. Use flexbox or CSS Grid rather than manual margins. Left-align text content (right-align causes reader fatigue). Center-align only for short headings and CTAs. All elements in a section should share a common left edge. In Tailwind: use max-w-* with mx-auto for centering containers, not individual elements.',
    source: 'best-practice',
    keywords: ['alignment', 'grid', 'flex', 'left align', 'center', 'layout'],
  },
  {
    id: 'whitespace',
    category: 'layout',
    title: 'Whitespace — Generous, Intentional Breathing Room',
    content: 'Sufficient whitespace improves readability and perceived quality. Body text containers: max-width 65–75 characters (600–700px at 16px). Section padding: minimum 48–80px vertically on desktop. Card padding: 16–24px. Do not fill all space — white space is not wasted space. Cramped layouts signal low quality.',
    source: 'best-practice',
    keywords: ['whitespace', 'white space', 'breathing room', 'padding', 'cramped', 'max-width'],
  },
  // ── Color & Design System ─────────────────────────────────────────────────
  {
    id: 'color-tokens',
    category: 'design_system',
    title: 'Color Tokens — Semantic, Not Arbitrary',
    content: 'Define semantic color tokens: primary (brand action), secondary (supporting), success, warning, error, text-primary, text-secondary, text-muted, bg-surface, bg-page, border. Maximum 5–6 text colors in a view. Use CSS custom properties or Tailwind config. Never use hard-coded hex values in components — reference tokens. This makes theming and maintenance possible.',
    source: 'best-practice',
    keywords: ['color', 'tokens', 'palette', 'semantic color', 'design tokens', 'hex', 'css variables'],
  },
  {
    id: 'color-hierarchy',
    category: 'hierarchy',
    title: 'Color Hierarchy — Primary Action Must Stand Out',
    content: 'Primary CTA should be the most visually dominant interactive element on the page. Use brand primary color with high contrast. Secondary actions: outline or ghost style. Destructive actions: red. Disabled: muted gray. Never have two equally prominent CTAs competing — one must clearly be primary. In Tailwind: bg-blue-600 for primary, border border-blue-600 text-blue-600 for secondary.',
    source: 'best-practice',
    keywords: ['cta', 'call to action', 'button', 'primary', 'secondary', 'hierarchy', 'action'],
  },
  // ── Consistency ───────────────────────────────────────────────────────────
  {
    id: 'button-consistency',
    category: 'consistency',
    title: 'Button Consistency — One Style Per Role',
    content: 'All primary buttons must share identical styles: same border-radius, height, padding, font-weight. All secondary buttons share their own consistent style. Mixing border-radius values (some 4px, some 8px, some rounded-full) signals no design system. In Tailwind: create a consistent btn-primary class: rounded-md px-4 py-2 font-semibold bg-blue-600 text-white. Apply universally.',
    source: 'best-practice',
    keywords: ['button', 'border-radius', 'consistency', 'style', 'variant', 'height'],
  },
  {
    id: 'card-consistency',
    category: 'consistency',
    title: 'Card/Component Consistency',
    content: 'Repeated UI patterns (cards, list items, form fields) must be visually identical across a page. Same padding, same border-radius, same shadow, same spacing between elements inside. Inconsistent cards signal hand-coded components without a shared base. Create a single card component and reuse it. Tailwind: rounded-xl border border-gray-200 p-6 shadow-sm.',
    source: 'best-practice',
    keywords: ['card', 'component', 'consistent', 'pattern', 'list item', 'padding', 'border'],
  },
  // ── Mobile / Responsive ───────────────────────────────────────────────────
  {
    id: 'mobile-first',
    category: 'layout',
    title: 'Mobile-First Responsive Design',
    content: 'Design for 375px width first, then progressively enhance for larger screens. Common breakpoints: 375px (mobile), 768px (tablet), 1024px (desktop), 1440px (wide). No horizontal scroll on any viewport. Fixed-width elements (width: 300px) must be replaced with max-width: 300px + width: 100%. Use Tailwind responsive prefixes: sm:, md:, lg:. Test at real device sizes.',
    source: 'best-practice',
    keywords: ['mobile', 'responsive', 'breakpoint', 'overflow', 'horizontal scroll', '375px', 'viewport'],
  },
  {
    id: 'mobile-typography',
    category: 'accessibility',
    title: 'Mobile Typography Minimums',
    content: 'Body text minimum on mobile: 14px (preferably 16px). Caption/label minimum: 12px. Headline minimum: 20px. Avoid text-xs (12px) for anything more than labels/badges on mobile. Use responsive font sizes in Tailwind: text-sm md:text-base for body, text-xl md:text-2xl for headlines. iOS Safari enforces 16px minimum for inputs to prevent zoom — use input text-base.',
    source: 'best-practice',
    keywords: ['mobile', 'font size', 'typography', 'body text', 'readability', 'minimum', '14px', '16px'],
  },
  // ── Apple HIG ─────────────────────────────────────────────────────────────
  {
    id: 'hig-touch-targets',
    category: 'accessibility',
    title: 'Apple HIG — Minimum Touch Target Size',
    content: 'Apple Human Interface Guidelines specify 44×44pt minimum touch targets. On Retina displays this is 44×44 CSS pixels. Buttons, links, and interactive controls should meet this minimum. Increase target size via padding rather than changing visual size. A small icon can have padding: 10px to reach 44px total.',
    source: 'hig',
    keywords: ['touch target', '44px', 'apple', 'ios', 'hig', 'tap', 'interactive'],
  },
  {
    id: 'hig-contrast',
    category: 'accessibility',
    title: 'Apple HIG — Contrast and Legibility',
    content: 'Apple HIG recommends "increased contrast" as a user setting — interfaces must work at standard AND increased contrast. Use SF Pro system fonts for optimal rendering. Primary text: black/near-black on light backgrounds. Secondary text: minimum 60% opacity of primary (approximately 4.5:1 contrast). Avoid pure white text on colored backgrounds unless contrast is verified.',
    source: 'hig',
    keywords: ['contrast', 'legibility', 'apple', 'hig', 'text color', 'readability'],
  },
  // ── Material Design 3 ─────────────────────────────────────────────────────
  {
    id: 'material-elevation',
    category: 'hierarchy',
    title: 'Material Design 3 — Elevation and Tonal Surfaces',
    content: 'Use elevation (shadow + tonal overlay) to communicate hierarchy. Elevation levels: 0 = flat, 1 = card (shadow-sm), 2 = nav/dialog (shadow-md), 3 = modal (shadow-xl). Higher elevation = more prominent. In Tailwind: shadow-sm for cards, shadow-md for dropdowns, shadow-xl for modals. Tonal surfaces use a color tint at 5–16% opacity.',
    source: 'material',
    keywords: ['elevation', 'shadow', 'hierarchy', 'material', 'card', 'modal', 'dialog'],
  },
  {
    id: 'material-spacing',
    category: 'design_system',
    title: 'Material Design 3 — 4dp Spacing System',
    content: 'Material Design uses 4dp increments for all spacing. Compact spacing: 4dp (1 unit). Standard: 8dp (2 units), 12dp (3), 16dp (4). Comfortable: 24dp (6), 32dp (8). Generous: 48dp (12), 64dp (16). Component internal padding: 16dp standard. Section separation: 32–48dp. This matches the 4px grid best practice.',
    source: 'material',
    keywords: ['spacing', '4dp', 'material', 'padding', 'grid', 'tokens'],
  },
  {
    id: 'material-typography',
    category: 'design_system',
    title: 'Material Design 3 — Typography Scale',
    content: 'Material type scale: Display Large 57sp, Display Medium 45sp, Display Small 36sp, Headline Large 32sp, Headline Medium 28sp, Headline Small 24sp, Title Large 22sp, Title Medium 16sp (medium weight), Title Small 14sp (medium), Body Large 16sp, Body Medium 14sp, Body Small 12sp, Label Large 14sp (medium), Label Medium 12sp (medium), Label Small 11sp (medium). Use Body Large (16sp) for primary content.',
    source: 'material',
    keywords: ['typography', 'type scale', 'font size', 'material', 'headline', 'body', 'display'],
  },
  // ── UX Patterns ───────────────────────────────────────────────────────────
  {
    id: 'ux-cta-clarity',
    category: 'ux_readiness',
    title: 'Primary CTA — Single, Clear, Prominent',
    content: 'Every page/view needs one primary action the user should take. It should be the most visually dominant button. CTA label must be specific: "Start Free Trial" not "Submit". Position: above the fold on desktop, sticky on mobile. Never have two solid-fill buttons of equal prominence competing. Use filled style for primary, outlined for secondary, text for tertiary.',
    source: 'best-practice',
    keywords: ['cta', 'call to action', 'primary', 'button', 'action', 'above fold', 'clarity'],
  },
  {
    id: 'ux-form-feedback',
    category: 'ux_readiness',
    title: 'Form Feedback — Inline Validation',
    content: 'Validate on blur (when user leaves a field), not on submit. Show error messages immediately below each field in red. Success state: green checkmark. Required fields: mark with asterisk and explain "* required". Error messages: be specific — "Enter a valid email address" not "Invalid input". Use role="alert" on error messages for screen reader announcement.',
    source: 'best-practice',
    keywords: ['form', 'validation', 'error', 'inline', 'feedback', 'required', 'blur'],
  },
  {
    id: 'ux-empty-states',
    category: 'ux_readiness',
    title: 'Empty States — Meaningful and Actionable',
    content: 'Empty states (no data, no results) must explain why it is empty and what to do. Include: illustration or icon, heading explaining the state, body text with context, primary CTA to resolve it. Do not show a blank area. Examples: "No results found. Try adjusting your filters." + "Clear filters" button. "Your inbox is empty" + "Compose message" button.',
    source: 'best-practice',
    keywords: ['empty state', 'no data', 'zero state', 'empty', 'placeholder'],
  },
  // ── Accessibility — ARIA ─────────────────────────────────────────────────
  {
    id: 'aria-landmarks',
    category: 'accessibility',
    title: 'ARIA Landmarks — Page Structure for Screen Readers',
    content: 'Every page needs landmark roles for screen reader navigation. Required: <header role="banner">, <nav role="navigation">, <main role="main">, <footer role="contentinfo">. Optional: <aside role="complementary">, <section aria-label="...">. Do not use multiple <main> elements. Navigation landmarks with aria-label help distinguish multiple navs.',
    source: 'wcag',
    keywords: ['landmark', 'aria', 'navigation', 'main', 'header', 'footer', 'screen reader', 'banner'],
  },
  {
    id: 'aria-live',
    category: 'accessibility',
    title: 'ARIA Live Regions — Dynamic Content Announcements',
    content: 'Dynamic content updates (toast notifications, error messages, loading states) must be announced to screen readers. Use aria-live="polite" for non-urgent updates (success messages). Use aria-live="assertive" or role="alert" for errors. Do not use aria-live on large content areas — only on the notification container. Loading states: aria-busy="true" on the loading element.',
    source: 'wcag',
    keywords: ['aria-live', 'live region', 'dynamic', 'toast', 'notification', 'announcement', 'alert'],
  },
  {
    id: 'aria-modal',
    category: 'accessibility',
    title: 'Modal Dialogs — Focus Trap and ARIA',
    content: 'Modals require: role="dialog", aria-modal="true", aria-labelledby pointing to modal title. Trap focus inside modal — Tab should cycle within modal only. On open: move focus to first focusable element inside. On close: return focus to the trigger that opened it. Close on Escape key. Add aria-hidden="true" to background content when modal is open.',
    source: 'wcag',
    keywords: ['modal', 'dialog', 'focus trap', 'aria-modal', 'aria-labelledby', 'escape'],
  },
]

// Cache embeddings for knowledge base entries (computed lazily, once per process)
const _kbEmbeddingCache = new Map<string, number[]>()

/**
 * Retrieve top-K most relevant knowledge base entries for a finding.
 * Uses embedding similarity if available, falls back to keyword overlap.
 */
export async function retrieveRAGContext(finding: Finding, topK = 3): Promise<string> {
  const query = `${finding.title}. ${finding.why_it_matters}. Category: ${finding.category}.`

  let ranked: Array<{ entry: KnowledgeEntry; score: number }>

  // Try embedding similarity
  const queryEmbedding = await embedText(query)
  if (queryEmbedding) {
    // Embed all KB entries that aren't cached yet
    await Promise.allSettled(
      KNOWLEDGE_BASE.map(async (entry) => {
        if (_kbEmbeddingCache.has(entry.id)) return
        const text = `${entry.title}. ${entry.content}`
        const emb = await embedText(text)
        if (emb) _kbEmbeddingCache.set(entry.id, emb)
      })
    )

    ranked = KNOWLEDGE_BASE.map(entry => {
      const entryEmb = _kbEmbeddingCache.get(entry.id)
      const score = entryEmb ? cosineSimilarity(queryEmbedding, entryEmb) : 0
      return { entry, score }
    }).sort((a, b) => b.score - a.score)
  } else {
    // Fallback: keyword overlap scoring
    const queryWords = query.toLowerCase().split(/\W+/).filter(w => w.length > 3)
    ranked = KNOWLEDGE_BASE.map(entry => {
      const keywordMatches = entry.keywords.filter(k =>
        queryWords.some(w => k.includes(w) || w.includes(k))
      ).length
      const categoryBonus = entry.category === finding.category ? 2 : 0
      return { entry, score: keywordMatches + categoryBonus }
    }).sort((a, b) => b.score - a.score)
  }

  const top = ranked.slice(0, topK).filter(r => r.score > 0)
  if (top.length === 0) return ''

  return top.map(r =>
    `### ${r.entry.title} (${r.entry.source.toUpperCase()})\n${r.entry.content}`
  ).join('\n\n')
}
