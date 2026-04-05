---
source: "Web Typography Guide - Fonts & Hierarchy | design.dev"
url: "https://design.dev/guides/typography-web-design/"
author: null
date_published: "2025-10-28"
date_processed: "2026-04-03"
folder_type: "md-only"
topics: [typography, type-scale, font-pairing, web-fonts, responsive-typography, accessibility]
missing_images: 0
---

# Typography for Web Design

Complete guide to web typography. Learn type scales, hierarchy, font selection and pairing, spacing, web fonts, variable fonts, responsive typography, and accessibility best practices.

## Introduction

Typography is the art and technique of arranging type to make written language legible, readable, and appealing. On the web, good typography creates hierarchy, establishes tone, and guides users through content.

### Core Typography Concepts

**Legibility** — How easily individual characters can be distinguished. (`Character recognition`)

**Readability** — How easily text can be read and understood. (`Content comprehension`)

**Hierarchy** — Visual order and importance of text elements. (`Content structure`)

**Consistency** — Uniform typography patterns throughout design. (`Design system`)

> **Key Principle:** Typography should be invisible—users should read your content without noticing the typography itself. Good typography serves the content, never overshadows it.

---

## Type Scale

A type scale is a progression of font sizes that creates visual hierarchy and consistency. Common scales use mathematical ratios.

### Common Type Scale Ratios

| Scale Name       | Ratio | Example (16px base)           | Use Case                      |
| ---------------- | ----- | ----------------------------- | ----------------------------- |
| Minor Second     | 1.067 | 16, 17, 18, 19, 21, 22, 24    | Subtle, tight spacing         |
| Major Second     | 1.125 | 16, 18, 20, 23, 26, 29, 33    | Conservative designs          |
| Minor Third      | 1.2   | 16, 19, 23, 28, 33, 40, 48    | Most versatile, common choice |
| Major Third      | 1.25  | 16, 20, 25, 31, 39, 49, 61    | Clear hierarchy               |
| Perfect Fourth   | 1.333 | 16, 21, 28, 37, 50, 67, 89    | Bold, dramatic                |
| Augmented Fourth | 1.414 | 16, 23, 32, 45, 64, 91, 128   | Very bold                     |
| Perfect Fifth    | 1.5   | 16, 24, 36, 54, 81, 122, 183  | Strong contrast               |
| Golden Ratio     | 1.618 | 16, 26, 42, 68, 110, 178, 288 | Classic, harmonious           |

### Creating Your Type Scale

| Step                  | Description                                   | Example                              |
| --------------------- | --------------------------------------------- | ------------------------------------ |
| 1. Choose base size   | Start with body text size (typically 16-18px) | `font-size: 16px;`                   |
| 2. Select ratio       | Pick a ratio that fits your design style      | 1.25 (Major Third)                   |
| 3. Calculate sizes    | Multiply base by ratio for each step up       | 16 × 1.25 = 20px                     |
| 4. Define scale       | Create 6-8 sizes from smallest to largest     | 12, 14, 16, 20, 25, 31, 39, 49       |
| 5. Name sizes         | Use semantic names or numbers                 | xs, sm, base, lg, xl, 2xl, 3xl, 4xl  |

**Tip:** Use tools like [Modular Scale](https://www.modularscale.com/) or [Type Scale](https://type-scale.com/) to calculate and preview your scale.

---

## Typography Hierarchy

Hierarchy guides readers through content by establishing importance and relationships between elements.

### Heading Levels

| Element | Typical Size           | Weight  | Usage                    |
| ------- | ---------------------- | ------- | ------------------------ |
| `<h1>`  | 32-48px (2-3em)        | 700-900 | Page title, one per page |
| `<h2>`  | 24-32px (1.5-2em)      | 600-800 | Major sections           |
| `<h3>`  | 20-24px (1.25-1.5em)   | 600-700 | Subsections              |
| `<h4>`  | 18-20px (1.125-1.25em) | 600-700 | Sub-subsections          |
| `<h5>`  | 16-18px (1-1.125em)    | 600     | Minor headings           |
| `<h6>`  | 14-16px (0.875-1em)    | 600     | Smallest headings        |

### Body Text Styles

| Element    | Size    | Weight              | Usage                          |
| ---------- | ------- | ------------------- | ------------------------------ |
| Body Large | 18-20px | 400                 | Lead paragraphs, introductions |
| Body       | 16-18px | 400                 | Main content, default text     |
| Body Small | 14-16px | 400                 | Secondary content, captions    |
| Label      | 12-14px | 500-600             | Form labels, UI labels         |
| Caption    | 12-14px | 400                 | Image captions, footnotes      |
| Overline   | 10-12px | 600-700 (uppercase) | Eyebrows, categories           |

### Creating Hierarchy

| Technique | How It Works                        | CSS Example                  |
| --------- | ----------------------------------- | ---------------------------- |
| Size      | Larger text draws more attention    | `font-size: 2em;`            |
| Weight    | Bolder text appears more important  | `font-weight: 700;`          |
| Color     | Higher contrast = more prominence   | `color: #000; opacity: 0.9;` |
| Spacing   | More space around = more importance | `margin: 2em 0 1em;`         |
| Case      | Uppercase for emphasis (sparingly)  | `text-transform: uppercase;` |
| Style     | Italic for emphasis or distinction  | `font-style: italic;`        |

---

## Font Properties

Understanding CSS font properties is essential for controlling typography.

### Font Size

| Unit      | Description                    | Example                                  | Best For                                        |
| --------- | ------------------------------ | ---------------------------------------- | ----------------------------------------------- |
| `px`      | Absolute pixels                | `font-size: 16px;`                       | Precise control (not recommended for body text) |
| `em`      | Relative to parent font size   | `font-size: 1.5em;`                      | Component-scoped typography                     |
| `rem`     | Relative to root font size     | `font-size: 1.5rem;`                     | Most flexible, recommended                      |
| `%`       | Percentage of parent           | `font-size: 150%;`                       | Proportional scaling                            |
| `vw/vh`   | Viewport width/height          | `font-size: 5vw;`                        | Fluid typography                                |
| `clamp()` | Responsive between min and max | `font-size: clamp(1rem, 2.5vw, 2rem);`   | Responsive typography without media queries     |

### Font Weight

| Value | Name           | Common Use                   |
| ----- | -------------- | ---------------------------- |
| 100   | Thin           | Large display text only      |
| 200   | Extra Light    | Large display text           |
| 300   | Light          | Large body text, quotes      |
| 400   | Normal/Regular | Body text default            |
| 500   | Medium         | Emphasis, labels, UI text    |
| 600   | Semi Bold      | Subheadings, strong emphasis |
| 700   | Bold           | Headings, strong importance  |
| 800   | Extra Bold     | Display headings             |
| 900   | Black          | Extra heavy display text     |

### Other Font Properties

| Property                | Values                            | Description                              |
| ----------------------- | --------------------------------- | ---------------------------------------- |
| `font-style`            | normal, italic, oblique           | Text slant style                         |
| `font-variant`          | normal, small-caps                | Typographic variants                     |
| `font-stretch`          | condensed, normal, expanded       | Character width (variable fonts)         |
| `text-transform`        | uppercase, lowercase, capitalize  | Case transformation                      |
| `text-decoration`       | underline, line-through, overline | Text decoration lines                    |
| `font-feature-settings` | OpenType features                 | Advanced font features (ligatures, etc.) |

---

## Spacing & Vertical Rhythm

Proper spacing creates readability and visual harmony in typography.

### Line Height (Leading)

| Text Type           | Recommended Line Height | CSS Example           | Reason                             |
| ------------------- | ----------------------- | --------------------- | ---------------------------------- |
| Body text (16-18px) | 1.5-1.6                 | `line-height: 1.5;`   | Optimal readability for paragraphs |
| Large body (20px+)  | 1.4-1.5                 | `line-height: 1.45;`  | Slightly tighter for larger text   |
| Small text (14px-)  | 1.6-1.8                 | `line-height: 1.7;`   | More space for legibility          |
| Headings (large)    | 1.1-1.3                 | `line-height: 1.2;`   | Tighter for visual impact          |
| Display text (huge) | 1.0-1.1                 | `line-height: 1.05;`  | Very tight for hero text           |
| Buttons/UI          | 1.0                     | `line-height: 1;`     | Precise vertical centering         |

### Letter Spacing (Tracking)

| Use Case              | Value              | CSS Example                 |
| --------------------- | ------------------ | --------------------------- |
| Body text             | 0                  | `letter-spacing: 0;`        |
| Large headings        | -0.02em to -0.04em | `letter-spacing: -0.02em;`  |
| Small caps            | 0.05em to 0.1em    | `letter-spacing: 0.05em;`   |
| All caps              | 0.05em to 0.15em   | `letter-spacing: 0.1em;`    |
| Small text (captions) | 0.01em to 0.02em   | `letter-spacing: 0.015em;`  |

### Measure (Line Length)

| Metric              | Ideal Range         | CSS Example          |
| ------------------- | ------------------- | -------------------- |
| Characters per line | 45-75 (optimal: 66) | `max-width: 65ch;`   |
| Words per line      | 8-12 words          | `max-width: 600px;`  |
| Wide content        | 75-90 characters    | `max-width: 75ch;`   |
| Narrow content      | 35-45 characters    | `max-width: 40ch;`   |

### Paragraph Spacing

| Element    | Top Margin   | Bottom Margin  | CSS Example                     |
| ---------- | ------------ | -------------- | ------------------------------- |
| Paragraphs | 0            | 1em - 1.5em    | `p { margin: 0 0 1.25em; }`     |
| Headings   | 1.5em - 2em  | 0.5em - 1em    | `h2 { margin: 2em 0 0.75em; }`  |
| Lists      | 0            | 1em - 1.5em    | `ul { margin: 0 0 1.5em; }`     |
| List items | 0            | 0.25em - 0.5em | `li { margin-bottom: 0.5em; }`  |

> **Rule of Thumb:** Use `ch` units for max-width on text containers (1ch = width of the "0" character). This ensures consistent line lengths regardless of font choice.

---

## Font Pairing

Combining fonts effectively creates contrast and hierarchy while maintaining harmony.

### Font Pairing Principles

| Principle        | Description                                    | Example                          |
| ---------------- | ---------------------------------------------- | -------------------------------- |
| Contrast         | Pair fonts with distinct characteristics       | Serif heading + Sans-serif body  |
| Harmony          | Fonts should share similar proportions or mood | Both geometric or both humanist  |
| Limit pairs      | Use 2-3 font families maximum                  | One for headings, one for body   |
| Same font family | Use different weights and styles               | Roboto Light + Roboto Bold       |
| Superfamilies    | Use fonts designed to work together            | Merriweather + Merriweather Sans |

### Classic Font Combinations

| Headings         | Body            | Style              | Use Case                 |
| ---------------- | --------------- | ------------------ | ------------------------ |
| Playfair Display | Source Sans Pro | Elegant, editorial | Magazines, blogs         |
| Montserrat       | Merriweather    | Modern, readable   | Business, professional   |
| Oswald           | Lato            | Bold, contemporary | Marketing, landing pages |
| Raleway          | Open Sans       | Clean, minimalist  | Tech, startups           |
| Poppins          | Inter           | Geometric, modern  | Apps, dashboards         |
| Crimson Text     | Work Sans       | Classic, bookish   | Publishing, academia     |
| Space Grotesk    | Space Mono      | Tech, futuristic   | Developer tools          |

### Font Classification

| Category    | Characteristics                         | Examples                       | Best For                        |
| ----------- | --------------------------------------- | ------------------------------ | ------------------------------- |
| Serif       | Small lines at letter ends, traditional | Georgia, Times, Merriweather   | Long-form reading, print feel   |
| Sans Serif  | Clean, no decorative strokes            | Arial, Helvetica, Inter        | UI, screens, modern designs     |
| Slab Serif  | Thick, blocky serifs                    | Rockwell, Courier, Roboto Slab | Headings, mechanical feel       |
| Monospace   | Fixed-width characters                  | Courier, Consolas, Fira Code   | Code, technical content         |
| Display     | Decorative, attention-grabbing          | Lobster, Bebas Neue            | Headings, logos (use sparingly) |
| Handwriting | Script or casual writing style          | Pacifico, Dancing Script       | Accents, signatures             |

---

## Web Fonts

Web fonts allow you to use custom typefaces beyond system fonts. Understanding loading and implementation is crucial.

### Font Sources

| Source            | Pros                                         | Cons                                  | Best For                         |
| ----------------- | -------------------------------------------- | ------------------------------------- | -------------------------------- |
| Google Fonts      | Free, easy, CDN-hosted, variable fonts       | Privacy concerns, limited selection   | Most projects, quick starts      |
| Adobe Fonts       | High quality, large library, sync to desktop | Requires Creative Cloud subscription  | Professional design work         |
| Self-hosted       | Full control, privacy, performance tuning    | More setup, need to manage updates    | Production apps, GDPR compliance |
| System fonts      | Zero load time, familiar to users            | Limited variety, platform differences | Performance-critical apps        |
| Font marketplaces | Unique typefaces, commercial licenses        | Cost, licensing complexity            | Branding, unique identity        |

### @font-face Syntax

| Property        | Description                                      | Example                                    |
| --------------- | ------------------------------------------------ | ------------------------------------------ |
| `font-family`   | Name you'll use to reference the font            | `font-family: 'My Font';`                  |
| `src`           | Path to font files (woff2, woff, ttf)            | `src: url('font.woff2') format('woff2');`  |
| `font-weight`   | Weight this file represents                      | `font-weight: 400;`                        |
| `font-style`    | Style this file represents                       | `font-style: normal;`                      |
| `font-display`  | How font loads (swap, block, fallback, optional) | `font-display: swap;`                      |
| `unicode-range` | Character range to use this font for             | `unicode-range: U+0000-00FF;`              |

### Font File Formats

| Format  | Browser Support            | File Size                        | Recommendation                      |
| ------- | -------------------------- | -------------------------------- | ----------------------------------- |
| WOFF2   | All modern browsers (96%+) | Smallest (30% smaller than WOFF) | ✓ Use first, best compression       |
| WOFF    | All browsers (98%+)        | Small                            | ✓ Use as fallback for old browsers  |
| TTF/OTF | Universal                  | Large, uncompressed              | Use for development only            |
| EOT     | IE 6-11 only               | Large                            | Obsolete, skip unless supporting IE |
| SVG     | Legacy Safari              | Very large                       | Obsolete, not recommended           |

### System Font Stack

| Stack Type | CSS                                                                                |
| ---------- | ---------------------------------------------------------------------------------- |
| System UI  | `font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;`  |
| Serif      | `font-family: Georgia, Cambria, "Times New Roman", Times, serif;`                  |
| Sans Serif | `font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;`   |
| Monospace  | `font-family: "SF Mono", Monaco, "Cascadia Code", "Courier New", monospace;`       |

---

## Variable Fonts

Variable fonts contain multiple variations in a single file, offering flexibility and better performance.

### Variable Font Axes

| Axis         | CSS Property                  | Description                       | Typical Range   |
| ------------ | ----------------------------- | --------------------------------- | --------------- |
| Weight       | `font-weight`                 | Thickness of strokes              | 100-900         |
| Width        | `font-stretch`                | Horizontal compression/expansion  | 50%-200%        |
| Slant        | `font-style: oblique [angle]` | Angle of text slant               | -20deg to 20deg |
| Optical Size | `font-optical-sizing`         | Optimizations for different sizes | 6pt-72pt        |
| Italic       | `font-style: italic`          | Upright to italic                 | 0-1             |

### Custom Axes (font-variation-settings)

| Example Axis | Tag  | CSS                                     |
| ------------ | ---- | --------------------------------------- |
| Grade        | GRAD | `font-variation-settings: 'GRAD' 50;`   |
| Casual       | CASL | `font-variation-settings: 'CASL' 1;`    |
| Cursive      | CRSV | `font-variation-settings: 'CRSV' 0.5;`  |
| Monospace    | MONO | `font-variation-settings: 'MONO' 1;`    |

### Variable Font Benefits

| Benefit     | Description                                    | Example                                    |
| ----------- | ---------------------------------------------- | ------------------------------------------ |
| File size   | One file instead of multiple weights           | Inter: 1 variable file vs 18 static files  |
| Flexibility | Any value on axis, not just predefined weights | `font-weight: 450;` (not just 400 or 500)  |
| Animation   | Smooth transitions between variations          | Animate weight on hover                    |
| Responsive  | Adjust font characteristics at different sizes | Optical sizing for better legibility       |

### Popular Variable Fonts

| Font          | Axes                               | Source       | Best For                  |
| ------------- | ---------------------------------- | ------------ | ------------------------- |
| Inter         | Weight, Slant                      | Google Fonts | UI, body text             |
| Roboto Flex   | Weight, Width, Optical Size, Grade | Google Fonts | Versatile, UI             |
| Source Sans 3 | Weight, Width                      | Adobe Fonts  | Body text, professional   |
| Recursive     | Weight, Slant, Casual, Monospace   | Google Fonts | Code, playful designs     |
| Amstelvar     | 14 axes                            | Google Fonts | Experimentation, display  |

> **Browser Support:** Variable fonts are supported in all modern browsers (95%+). Always provide a fallback for older browsers.

---

## Responsive Typography

Typography should adapt to different screen sizes and reading contexts.

### Responsive Font Sizing Techniques

| Technique         | CSS Example                                              | Pros                                       | Cons                                         |
| ----------------- | -------------------------------------------------------- | ------------------------------------------ | -------------------------------------------- |
| Media queries     | `@media (min-width: 768px) { h1 { font-size: 3rem; } }` | Precise control, reliable                  | More code, breakpoint-dependent              |
| Viewport units    | `font-size: 5vw;`                                        | Fluid scaling                              | Can be too small/large, accessibility issues |
| clamp()           | `font-size: clamp(1rem, 2.5vw, 3rem);`                   | Fluid with limits, no media queries needed | Requires modern browser                      |
| calc() + vw       | `font-size: calc(1rem + 1vw);`                           | Fluid with base size                       | No max/min constraints                       |
| Container queries | `@container (min-width: 400px) { ... }`                  | Component-based responsive                 | Newer, limited support                       |

### Fluid Typography Formula

| Use Case   | clamp() Example                                         | Result                        |
| ---------- | ------------------------------------------------------- | ----------------------------- |
| Body text  | `font-size: clamp(1rem, 0.875rem + 0.5vw, 1.125rem);`  | 16px → 18px (scales between)  |
| H1 heading | `font-size: clamp(2rem, 1.5rem + 2vw, 4rem);`          | 32px → 64px                   |
| H2 heading | `font-size: clamp(1.5rem, 1.25rem + 1.5vw, 3rem);`     | 24px → 48px                   |
| Small text | `font-size: clamp(0.875rem, 0.875rem + 0.25vw, 1rem);` | 14px → 16px                   |

### Responsive Spacing

| Property          | Mobile    | Desktop | Fluid Example                                         |
| ----------------- | --------- | ------- | ----------------------------------------------------- |
| Line height       | 1.6-1.8   | 1.5-1.6 | Usually fixed value                                   |
| Paragraph spacing | 1.25em    | 1.5em   | `margin-bottom: clamp(1.25rem, 1rem + 1vw, 1.5rem);`  |
| Heading spacing   | 1.5em top | 2em top | `margin-top: clamp(1.5rem, 1rem + 2vw, 2.5rem);`      |
| Max width         | 100%      | 65ch    | `max-width: min(65ch, 100%);`                         |

### Mobile Typography Considerations

| Consideration     | Recommendation            | Why                                 |
| ----------------- | ------------------------- | ----------------------------------- |
| Minimum font size | 16px for body text        | Prevents mobile zoom on form inputs |
| Line length       | 45-60 characters          | Shorter lines for narrow screens    |
| Tap targets       | 44-48px minimum           | Easy tapping for links in text      |
| Line height       | Slightly larger (1.6-1.8) | Easier reading on small screens     |
| Font weight       | Avoid very light weights  | Harder to read on small screens     |

---

## Typography Accessibility

Accessible typography ensures content is readable for all users, including those with visual impairments.

### Minimum Requirements

| Requirement                  | WCAG Level | Guideline                                             |
| ---------------------------- | ---------- | ----------------------------------------------------- |
| Minimum font size            | AA         | 16px for body text (14px acceptable for large sites)  |
| Color contrast (normal text) | AA         | 4.5:1 ratio minimum                                   |
| Color contrast (large text)  | AA         | 3:1 ratio (18px+ or 14px+ bold)                       |
| Color contrast (enhanced)    | AAA        | 7:1 for normal, 4.5:1 for large                       |
| Text resize                  | AA         | Text must scale up to 200% without loss of content    |
| Line spacing                 | AA         | At least 1.5 for paragraphs                           |
| Paragraph spacing            | AA         | At least 2× font size                                 |

### Readable Typography Checklist

| Aspect          | Guideline                             | Why It Matters                                      |
| --------------- | ------------------------------------- | --------------------------------------------------- |
| Font size       | 16px minimum for body                 | Prevents mobile zoom, readable for most users       |
| Line height     | 1.5-1.6 for body text                 | Easier to track lines, helps dyslexic readers       |
| Line length     | 45-75 characters                      | Optimal reading comfort, reduces eye strain         |
| Alignment       | Left-aligned (for LTR languages)      | Easier to find next line, helps dyslexic readers    |
| Justification   | Avoid full justification              | Uneven spacing creates "rivers" that hinder reading |
| All caps        | Use sparingly, never for long text    | Harder to read, loses word shape recognition        |
| Italics         | Short phrases only                    | Extended italics harder to read                     |
| Link underlines | Underline or clear visual distinction | Color alone insufficient for color-blind users      |

### Dyslexia-Friendly Typography

| Guideline         | Recommendation                                                          |
| ----------------- | ----------------------------------------------------------------------- |
| Font choice       | Sans-serif fonts with distinct letterforms (Verdana, Arial, Comic Sans) |
| Letter spacing    | Slightly increased: `letter-spacing: 0.12em;`                           |
| Word spacing      | Slightly increased: `word-spacing: 0.16em;`                             |
| Line height       | 1.5-1.8 (more generous)                                                 |
| Paragraph spacing | 1.5-2× line height                                                      |
| Text alignment    | Left-aligned, ragged right (never justified)                            |
| Line length       | 60-70 characters (slightly shorter)                                     |

> **Accessibility Tip:** Never rely on color alone to convey meaning. Always use additional cues like font weight, underlines, or icons. Test your typography with actual users who have visual impairments.

---

## Best Practices & Common Mistakes

### Do's

**✓ Use rem for font sizes** — Respects user preferences, scales consistently. (`font-size: 1.5rem;`)

**✓ Establish type scale** — Creates consistent, harmonious hierarchy. (e.g. `16, 20, 25, 31, 39, 49`)

**✓ Limit font families** — 2-3 max for cohesive design. (One for headings, one for body)

**✓ Use font-display: swap** — Shows content immediately with fallback. (`font-display: swap;`)

**✓ Test at different sizes** — Ensure readability on all devices. (Mobile, tablet, desktop)

**✓ Check color contrast** — Minimum 4.5:1 for body text. (Use a contrast checker tool)

**✓ Set max-width on text** — Optimal line length for readability. (`max-width: 65ch;`)

**✓ Use system fonts when appropriate** — Zero load time, better performance. (`-apple-system, BlinkMacSystemFont`)

### Don'ts

**✗ Don't use px for font sizes** — Doesn't respect user preferences. **Instead:** Use rem or em.

**✗ Don't use too many fonts** — Slows loading, creates visual chaos. **Instead:** Limit to 2-3 families.

**✗ Don't use font-weight: normal/bold** — Vague, depends on browser defaults. **Instead:** Use numeric values (400, 700).

**✗ Don't justify body text** — Creates uneven spacing, rivers of white. **Instead:** Left-align for readability.

**✗ Don't use long lines** — Hard to track, causes eye strain. **Instead:** 45-75 characters per line.

**✗ Don't use font size < 16px** — Hard to read, triggers mobile zoom. **Instead:** 16px minimum for body.

**✗ Don't use all caps for long text** — Significantly harder to read. **Instead:** Use for short labels only.

**✗ Don't rely on color alone** — Excludes color-blind users. **Instead:** Add underlines, icons, or weight.

**✗ Don't use tight line-height on body** — Lines too close together. **Instead:** Use 1.5-1.6 for paragraphs.

**✗ Don't load unnecessary font weights** — Slows page load. **Instead:** Load only weights you use.

> **Golden Rule:** Typography should be invisible. When done right, users focus on content, not the type itself. Prioritize readability over creativity.
