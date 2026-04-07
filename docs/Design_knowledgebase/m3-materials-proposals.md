# M3 Materials Proposals Export

Source reviewed: `docs/Design_knowledgebase/m3-materials-cleaned.md`

This file exports the proposal text generated in this conversation.
It includes:
- New proposal objects to add
- Enrichment proposals for existing knowledge base objects

## New Proposals

### `kb-a11y-new-001` — Landmark Labels
`rule | accessibility | landmark-labeling | severity: high | scope: full-page`

▎ If a page has multiple landmarks of the same type, such as more than one `navigation`, `region`, or `form`, each one should have a unique accessible label that explains its purpose.

Detection signals:
- DOM: find repeated landmark roles such as `nav`, `region`, `form`, or ARIA landmark roles
- Check whether repeated landmarks have unique `aria-label` or `aria-labelledby`
- Flag labels that repeat the role name without meaning, such as “navigation navigation”
- Flag repeated landmarks with no accessible label at all

### `kb-a11y-new-002` — Heading Structure
`rule | accessibility | heading-structure | severity: high | scope: full-page`

▎ Headings should reflect the real content hierarchy, not just visual styling. Do not skip heading levels, and use one clear page heading where appropriate.

Detection signals:
- DOM: extract all `h1`–`h6` elements in source order
- Flag skipped levels, such as `h2` followed by `h4`
- Flag pages with no `h1` when the page clearly has a main title
- Flag pages with multiple competing `h1` headings unless there is a clear structural reason

### `kb-a11y-new-003` — Target Spacing
`rule | accessibility | target-spacing | severity: medium | scope: both`

▎ Interactive targets placed next to each other should have enough space between them. As a Material guideline, about `8dp` or more separation improves accuracy and reduces accidental taps.

Detection signals:
- DOM: measure distance between adjacent interactive elements
- Flag clusters of icons or buttons that are tightly packed with little or no gap
- Check footers, toolbars, pagination, and icon groups for accidental-tap risk
- Treat this as a usability threshold, not a WCAG hard fail

### `kb-a11y-new-004` — Text In Images
`rule | accessibility | embedded-text-in-images | severity: high | scope: both`

▎ Important text must not exist only inside an image. If an image contains essential text, the same information should also appear in visible text, caption text, or accessible text.

Detection signals:
- Screenshot: look for meaningful text embedded inside images, banners, charts, or illustrations
- DOM: check whether the same information appears nearby in visible text, caption, alt text, or label text
- Flag promo blocks or cards where the key message exists only in the image
- Ignore purely decorative text treatments when the same message is already visible elsewhere

### `kb-cc-new-001` — Image Context Completeness
`principle | content-copy | image-context | severity: medium | scope: full-page`

▎ Informative images should work together with their caption and nearby text. Users should be able to understand why the image is there without relying on the image alone.

Detection signals:
- Screenshot: identify informative images such as diagrams, article images, product photos, or charts
- DOM: check for nearby caption text or adjacent explanatory copy
- Flag images that carry meaning but have no surrounding explanation
- Positive signal: caption or nearby text explains what the image shows and why it matters

### `kb-cc-new-002` — Truncation Recovery
`rule | content-copy | truncation-recovery | severity: medium | scope: both`

▎ Truncated text is acceptable only if users can still access the full meaning. Clipped labels, headings, or content without wrapping, expansion, or another recovery method are failures.

Detection signals:
- Screenshot: look for clipped text, ellipses, cut-off labels, and cropped headings
- DOM: compare visible containers against full text content
- Flag table cells, cards, nav items, and buttons where truncation hides essential meaning
- Do not flag intentional shortening when the full text is available nearby or on interaction and the UI clearly signals it

### `kb-a11y-new-005` — Label Purpose, Not Appearance
`rule | accessibility | label-purpose | severity: medium | scope: both`

▎ Accessibility labels should describe what something does or means, not what it looks like. Do not include role words like “button” or “menu” in the label when the role is already exposed by the element.

Detection signals:
- DOM: inspect `aria-label`, `aria-labelledby`, alt text, and accessible names
- Flag labels like `magnifying glass` when the purpose is `Search`
- Flag labels that repeat role names, such as `Settings button` or `Navigation menu`
- Positive signal: labels describe action or meaning, such as `Open settings` or `Search`

### `kb-cc-new-003` — Sentence Case Default
`rule | content-copy | sentence-case | severity: low | scope: both`

▎ Sentence case should be the default for product UI text. Avoid caps blocks and avoid all-caps text except for short, intentional labels.

Detection signals:
- Screenshot: look for headings, labels, buttons, or helper text written in all caps
- DOM: check text-transform and visible casing patterns
- Flag long labels or whole sentences in all caps
- Allow short all-caps cases only when clearly intentional, such as small overlines or compact utility labels

## Enrichment Proposals

### `kb-w-003` — Target Size
`enrichment | accessibility | target-size`

Add:
- Keep `24×24 CSS px` as the WCAG minimum
- Add Material guidance that touch targets should preferably be `48×48`
- Add pointer target guidance of `44×44`
- Add that adjacent targets should ideally have about `8px` spacing between them

New detection signals to add:
- Treat `24×24` as the minimum failure threshold
- Treat `44×44` pointer and `48×48` touch as stronger usability recommendations
- Flag controls that technically pass minimum size but are packed too tightly to tap reliably
- Check icon groups, toolbars, pagination, and footer clusters for both size and spacing together

### `kb-w-004` — Form Labels
`enrichment | accessibility | form-labels`

Add:
- Grouped inputs such as radio buttons and checkboxes should have a shared visible group label
- Landmark-like form areas should have meaningful labels when there are multiple forms on a page
- Format expectations should be visible when the required format is not obvious

New detection signals to add:
- Check radio groups and checkbox groups for an overarching label
- Check pages with multiple forms for labels that distinguish their purpose
- Flag fields that require a specific format when no visible format guidance is shown
- Treat placeholder-only format examples as insufficient if they disappear on input

### `kb-w-006` — Link Purpose
`enrichment | accessibility | link-purpose`

Add:
- Repeated generic visible link labels can be acceptable only if the surrounding context clearly differentiates them
- Accessible labels can help disambiguate repeated short links, but visible ambiguity should still be treated as a UX concern
- Buttons with generic text such as `Save` have the same ambiguity problem when there are several in one view

New detection signals to add:
- Flag multiple `Learn more`, `Read more`, `Details`, or `Save` actions shown in one area when destination or outcome is unclear
- Check whether nearby headings, card titles, or accessible labels actually disambiguate the repeated links
- Treat repeated generic links as higher severity when they point to different destinations
- Flag generic download labels with no document name or file context

### `kb-w-007` — Non-Text Content
`enrichment | accessibility | non-text-content`

Add:
- Accessible labels should describe purpose, not icon appearance
- Do not repeat role names inside labels
- Extend the rule beyond icon buttons to meaningful status icons, progress indicators, and interactive images

New detection signals to add:
- Flag labels like `magnifying glass`, `three dots`, or `gear` when the purpose is `Search`, `More options`, or `Settings`
- Flag labels like `Search button` or `Navigation menu` when role is already exposed
- Check progress bars, status icons, and interactive images for meaningful accessible names
- Positive signal: labels describe action, state, or outcome

### `kb-ty-008` — All-Caps Usage
`enrichment | typography | all-caps-usage`

Add:
- Sentence case should be treated as the default style for product text
- Caps blocks should be treated as an explicit anti-pattern, not just a readability concern
- Long all-caps headings, helper text, and dialog text should be treated more strictly

New detection signals to add:
- Flag sentence-length or paragraph-length all-caps text immediately
- Flag dialog body text, helper text, or descriptive text written in all caps
- Allow short overlines, tiny utility labels, or compact nav labels only when clearly intentional
- Treat mixed sentence-case UI with isolated caps blocks as inconsistency, not just typography

### `kb-ux-004` — Platform Conventions
`enrichment | ux-usability | platform-conventions`

Add:
- Structural conventions matter as well as visual placement
- On the web, users expect major areas such as navigation, main content, search, and supporting regions to map cleanly to recognizable page structure
- Headings and landmarks support the user’s sense of orientation, not just accessibility compliance

New detection signals to add:
- Check whether major page areas are structurally identifiable in DOM, not only visually obvious in the screenshot
- Flag pages where navigation or main content is visually present but structurally unclear
- Treat missing structural cues as a stronger issue on complex pages and applications
- Positive signal: visible structure and DOM structure reinforce each other

### `kb-nav-001` — Visible Navigation
`enrichment | navigation-ia | visible-navigation`

Add:
- Landmarks and headings should be included as orientation aids, not only active nav states and breadcrumbs
- Multiple navigation regions should be distinguishable by name
- Main content should be structurally identifiable so assistive tech users can orient quickly

New detection signals to add:
- Check for unique labels when multiple navigation regions exist
- Check whether the main content area is clearly identifiable in DOM
- Check whether page headings reinforce the current location
- Treat unlabeled repeated nav regions as a spatial-orientation failure

### `kb-cc-001` — CTA Copy
`enrichment | content-copy | cta-copy`

Add:
- Truncation should be considered a CTA clarity failure when clipping hides the outcome
- Short labels are fine only when the full meaning remains recoverable from context
- Sentence case should be the default CTA style unless a strong system reason suggests otherwise

New detection signals to add:
- Flag CTA labels truncated with ellipses when the missing text changes the meaning
- Flag clipped button labels in narrow cards, tables, and mobile layouts
- Treat repeated generic CTAs as more problematic when they are also truncated
- Prefer short sentence-case labels over shouty all-caps CTA text

### `kb-cc-002` — Copy Brevity
`enrichment | content-copy | copy-brevity`

Add:
- Brevity should not rely on clipping or ellipsis to create shortness
- Short copy still needs to be fully visible and recoverable
- Sentence case improves scanability and should be preferred over caps-heavy presentation

New detection signals to add:
- Flag shortened labels that become ambiguous because they are truncated rather than well-written
- Check whether condensed UI text remains understandable without hover or expansion
- Flag all-caps instructions or helper text that feel harder to scan even when short
- Treat “short but clipped” as worse than “slightly longer but fully clear”
