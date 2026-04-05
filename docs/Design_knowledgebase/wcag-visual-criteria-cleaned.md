---
publisher: "w3.org"
lang: "en"
title: "Web Content Accessibility Guidelines (WCAG) 2.2 — Visual Criteria Reference"
original_title: "Web Content Accessibility Guidelines (WCAG) 2.2"
author: "Alastair Campbell, Chuck Adams, Rachael Bradley Montgomery, Michael Cooper, Andrew Kirkpatrick"
date: "2024-12-12T12:00:00.000Z"
source: "WCAG 2.2 Full Document (W3C Recommendation) + Kris Rivenburgh's WCAG 2.2 AA Guide (PDF)"
url: "https://www.w3.org/TR/WCAG22/"
pdf_guide_source: "Kris Rivenburgh — Kris's WCAG 2.2 AA Guide (accessible.org, updated April 21, 2024)"
date_processed: "2026-04-03"
folder_type: "wcag-spec"
filter_applied: "visually-detectable-only"
criteria_included: 32
criteria_excluded: 23
levels_covered: ["A", "AA"]
auditor_note: "This file is filtered for a VISION MODEL auditing website screenshots and DOM. All criteria requiring keyboard navigation testing, screen reader inspection, audio/video review, server-side checks, or HTML attribute inspection beyond visible DOM are excluded."
---

# WCAG 2.2 — Visual Criteria Reference
### For Vision Model Design QA Auditing

> **Scope:** Only Level A and AA success criteria detectable in a screenshot or measurable via DOM inspection are included. AAA criteria and non-visual criteria are excluded. See metadata for full counts.

---

## Color & Contrast

---

### [1.4.1] Use of Color

**Level:** A
**Principle:** Perceivable

**Plain rule:** Never use color as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element — always pair color with text, pattern, shape, or another non-color indicator.

**Measurable threshold:** None stated (binary: color-only or not).

**What to look for:**
- Form validation where only a red/green border indicates error or success, with no accompanying icon or text label
- Charts or graphs that use color-coded lines or segments with no labels, patterns, or legend text distinguishing them
- Required form fields marked solely with a colored asterisk or border, without a textual "required" indicator

**Common failure:** Marking required fields only in red and relying entirely on that color to communicate the requirement, without any text cue like "(required)" or an asterisk explained in text.

---

### [1.4.3] Contrast (Minimum)

**Level:** AA
**Principle:** Perceivable

**Plain rule:** Text and images of text must have a contrast ratio of at least 4.5:1 against their background; large-scale text (18pt / 14pt bold or larger) requires at least 3:1.

**Measurable threshold:**
- Normal text: **4.5:1** minimum contrast ratio
- Large text (≥18pt regular or ≥14pt bold): **3:1** minimum contrast ratio
- Inactive UI components, pure decoration, logotype text: no requirement

**What to look for:**
- Light gray body text on a white background (common in cards and sidebars)
- Small placeholder text inside form inputs that nearly disappears against the input background
- Colored text on a similarly-colored background (e.g., blue text on a dark navy header)

**Common failure:** Using light gray (#999 or similar) for body copy, hint text, or captions on a white (#fff) background, which typically produces a contrast ratio around 2.85:1 — well below the 4.5:1 threshold.

---

### [1.4.11] Non-text Contrast

**Level:** AA
**Principle:** Perceivable

**Plain rule:** UI components (borders of inputs, checkbox outlines, button edges, focus rings) and informational graphics must have a contrast ratio of at least 3:1 against adjacent colors.

**Measurable threshold:** **3:1** minimum contrast ratio for visual information required to identify UI components and states, and for parts of graphics required to understand the content.

**What to look for:**
- Checkbox or radio button outlines that are barely visible against a white background
- Unfocused text input borders that blend into the page background
- Chart segments or icon details that cannot be distinguished from their surrounding background

**Common failure:** Input field borders styled as `#ccc` (light gray) on a white `#fff` background — a contrast ratio of approximately 1.6:1, far below the 3:1 requirement.

---

## Typography & Text Readability

---

### [1.4.4] Resize Text

**Level:** AA
**Principle:** Perceivable

**Plain rule:** Text must be resizable up to 200% without assistive technology and without loss of content or functionality — no text should disappear, overlap, or become unreadable at double the default size.

**Measurable threshold:** **200%** text resize without loss of content or functionality.

**What to look for:**
- Text that overflows its container or gets clipped when browser zoom is set to 200%
- Navigation menus that collapse into an unclickable state or overlap other content at 200% zoom
- Fixed-height containers where text spills outside the visible box at larger sizes

**Common failure:** Using fixed pixel heights on elements containing text (`height: 40px`), which causes the text to overflow and be cut off when the user increases text size or browser zoom.

---

### [1.4.5] Images of Text

**Level:** AA
**Principle:** Perceivable

**Plain rule:** Use real, selectable text rather than images of text to convey information, except where the specific visual presentation is essential (e.g., a logo) or the image is purely decorative.

**Measurable threshold:** None stated (binary: real text or image of text).

**What to look for:**
- Headings or section titles that cannot be selected/highlighted when clicked, indicating they are rasterized images
- Promotional banners where price, discount text, or call-to-action copy is baked into a JPEG or PNG
- Social proof sections where testimonial quotes are embedded as images rather than actual text elements

**Common failure:** Marketing banners or hero images where all visible text (headline, subheadline, button label) is part of the image file, making it unscalable, unsearchable, and inaccessible.

---

### [1.4.10] Reflow

**Level:** AA
**Principle:** Perceivable

**Plain rule:** Content must be viewable and usable at a viewport width of 320 CSS pixels (equivalent to 400% zoom on a 1280px display) without requiring horizontal scrolling to read a line of text.

**Measurable threshold:** No horizontal scrolling required at **320 CSS pixels** wide (vertical content) or **256 CSS pixels** tall (horizontal content). Exceptions: data tables, complex diagrams, maps, and video players may require 2D scrolling.

**What to look for:**
- Page layout at 400% zoom that forces the user to scroll left and right to read a single line of body text
- Fixed-width containers that do not collapse responsively, causing content to overflow the viewport
- Side-by-side columns that do not stack vertically at narrow widths, making the narrower column unreadably small

**Common failure:** Fixed-width layouts or non-responsive designs where a two-column layout at 320px forces horizontal scrolling rather than stacking columns vertically.

---

### [1.4.12] Text Spacing

**Level:** AA
**Principle:** Perceivable

**Plain rule:** When a user overrides text spacing properties, no content or functionality is lost — specifically when line height is set to 1.5×, paragraph spacing to 2×, letter spacing to 0.12×, and word spacing to 0.16× the font size.

**Measurable threshold:**
- Line height: **≥1.5 × font size**
- Paragraph spacing: **≥2 × font size**
- Letter spacing: **≥0.12 × font size**
- Word spacing: **≥0.16 × font size**

**What to look for:**
- Text that overflows or is clipped when a browser bookmarklet forces expanded text spacing
- Truncated text (`text-overflow: ellipsis`) that becomes permanently cut off under expanded spacing
- Overlapping text in fixed-height containers where expanded line height pushes text out of bounds

**Common failure:** Fixed-height cards or CTA boxes where increasing line-height to 1.5 causes text to overflow the container, hiding the bottom lines entirely.

---

## Interactive Elements & Targets

---

### [2.4.7] Focus Visible

**Level:** AA
**Principle:** Operable

**Plain rule:** Any keyboard-operable interface must have a visible focus indicator so the user can see which element currently has keyboard focus.

**Measurable threshold:** None stated — focus indicator must be visible (not hidden or suppressed entirely).

**What to look for:**
- Interactive elements (links, buttons, inputs) that show no visible outline, ring, or style change when focused via keyboard Tab key
- CSS that globally suppresses the default browser focus ring (`outline: none` or `outline: 0`) without providing a custom replacement
- Focus indicator that is the same color as the element background, making it invisible

**Common failure:** Designers removing the default browser focus ring with `outline: none` on all focusable elements for aesthetic reasons without providing a custom visible alternative.

---

### [2.4.11] Focus Not Obscured (Minimum)

**Level:** AA
**Principle:** Operable

**Plain rule:** When a UI component receives keyboard focus, it must not be completely hidden by author-created content — pop-ups, chatbots, sticky headers and footers, and cookie banners must not fully cover the focused element.

**Measurable threshold:** Focused element must not be **entirely** hidden (partial obscuring is permitted under AA; full visibility is required at AAA).

**What to look for:**
- A sticky navigation bar that covers the top row of a form or the focused input field as the user tabs through
- A cookie consent banner at the bottom of the page that completely hides the last focusable elements in the footer
- A chat widget or floating button that overlaps and fully obscures a focused interactive element

**Common failure:** Sticky headers with a height of 60–80px that, when a user tabs to a link in the main content area near the top of the viewport, fully hide that focused element behind the header.

*(PDF guide note: "Pop-ups, chatbots, sticky headers and footers, etc. can potentially hide our focus indicator so this success criterion requires that our focus is never completely hidden.")*

---

### [2.5.7] Dragging Movements

**Level:** AA
**Principle:** Operable

**Plain rule:** Any functionality that requires a dragging movement (click-hold-drag) must also be achievable using a single pointer action (click to select, click to place) as an alternative.

**Measurable threshold:** None stated (binary: single-point alternative exists or not).

**What to look for:**
- Drag-and-drop interfaces (card sorting, kanban boards, file upload zones) that have no secondary "move to" button or menu option
- Sliders or range inputs that can only be adjusted by dragging the thumb handle, with no click-to-set-position fallback
- Reorderable list items that can only be repositioned via drag, without an alternative up/down button or dropdown

**Common failure:** Kanban-style task boards where the only way to move a card between columns is to click-hold-drag it, with no "Move to column" context menu or button alternative.

*(PDF guide note: "In effect, a user will have the ability to mouse click a box at Point A, release the mouse click, and then click on the place the user wants the box to go, Point B, and accomplish the same movement and placement of the box without the need to drag the box.")*

---

### [2.5.8] Target Size (Minimum)

**Level:** AA
**Principle:** Operable

**Plain rule:** Interactive elements must have a clickable/touchable target area of at least 24×24 CSS pixels, either through size alone or through adequate spacing from neighboring targets.

**Measurable threshold:** **24×24 CSS pixels** minimum target size or equivalent spacing. Exceptions: text links inline in sentences, targets where spacing provides the equivalent clearance, or when the target size is user-controlled.

**What to look for:**
- Small icon buttons (close ×, edit ✎, delete 🗑) that are 16×16px or smaller with no additional padding
- Tightly clustered social media icons where each icon is smaller than 24×24px and has no surrounding spacing
- Checkbox or radio button hit areas that are limited to the small visual indicator rather than extending to the label text

**Common failure:** Social media icon links in a site footer that are 20×20px with 2px margin between them — each icon plus its surrounding space totals less than 24×24px.

*(PDF guide note: "The key takeaway is that clickable or touchable interactive elements are at least 24 by 24 CSS pixels. Examples include buttons, sliders, checkboxes, form fields, submenu text links, linked icons, etc.")*

---

### [1.4.13] Content on Hover or Focus

**Level:** AA
**Principle:** Perceivable

**Plain rule:** Tooltip or popup content that appears on hover or focus must be dismissible without moving focus, hoverable without disappearing, and persistent until the user dismisses it.

**Measurable threshold:** None stated. Three conditions: Dismissible, Hoverable, Persistent.

**What to look for:**
- A custom tooltip that disappears as soon as the pointer moves off the trigger element, making it impossible to read or interact with the tooltip content
- Dropdown menus or submenus that close immediately when the cursor moves even slightly off the trigger, before reaching the menu items
- Hover-reveal content that cannot be dismissed by pressing Escape — forcing the user to move the pointer away to hide it

**Common failure:** Tooltips that display on hover of an element but disappear the instant the pointer leaves the trigger element's exact boundary, giving no time to read or interact with the tooltip.

---

## Visual Indicators & Feedback

---

### [3.3.1] Error Identification

**Level:** A
**Principle:** Understandable

**Plain rule:** When a form submission error is detected, identify the item that caused the error and describe the error in text — color alone, icons alone, or vague messages like "invalid" are not sufficient.

**Measurable threshold:** None stated (binary: error described in text or not).

**What to look for:**
- Form fields with a red border indicating an error, but no accompanying text message explaining what went wrong
- A generic "Please fix the errors above" message at the top of the form with no identification of which specific fields failed
- Validation icons (✗) next to fields with no text label describing the nature of the error

**Common failure:** Input fields that turn red on failed validation with only a red border and no text description of why the field is invalid or how to fix it.

---

### [3.3.2] Labels or Instructions

**Level:** A
**Principle:** Understandable

**Plain rule:** Every form input, control, or group of controls that requires user input must have a visible label or clear instructions — placeholder text alone does not count as a label.

**Measurable threshold:** None stated (binary: label present and visible or not).

**What to look for:**
- Form fields that use placeholder text as the only label, which disappears when the user starts typing
- A group of radio buttons with no visible group label explaining what the user is choosing between
- Date inputs, phone number fields, or postal code fields with no format instruction (e.g., "MM/DD/YYYY")

**Common failure:** Replacing the visible `<label>` element with placeholder text inside the input, which vanishes once the user begins typing and leaves them with no reference for what the field is asking.

---

### [3.3.3] Error Suggestion

**Level:** AA
**Principle:** Understandable

**Plain rule:** When an input error is detected and suggestions for correction are known, the suggestion must be provided to the user in the error message — not just "invalid entry" but "Enter a date in the format MM/DD/YYYY."

**Measurable threshold:** None stated (binary: correction suggestion present in text or not).

**What to look for:**
- Password field errors that say "Invalid password" without explaining the requirements (length, special characters, etc.)
- Email field errors that say "Invalid email" rather than "Enter a valid email address, e.g., name@example.com"
- Date fields that reject a user's entry without explaining the expected format

**Common failure:** Login forms that display "Incorrect username or password" but never tell the user what the password requirements are, forcing repeated guessing rather than guiding correction.

---

### [3.3.4] Error Prevention (Legal, Financial, Data)

**Level:** AA
**Principle:** Understandable

**Plain rule:** For pages that cause legal commitments, financial transactions, or the submission of user-controlled data, provide at least one of: a way to reverse the action, a way to check and correct before final submission, or a confirmation step.

**Measurable threshold:** None stated (binary: reversal / review / confirmation mechanism present or not).

**What to look for:**
- A "Buy Now" or "Submit Order" button that immediately processes a purchase without any order review or confirmation screen
- A form that, when submitted, cannot be undone and provides no confirmation dialog
- A delete action with no "Are you sure?" confirmation step and no undo mechanism

**Common failure:** E-commerce checkout flows where clicking "Place Order" immediately charges a card and provides no review step before submission, making accidental purchases irreversible.

---

### [2.2.2] Pause, Stop, Hide

**Level:** A
**Principle:** Operable

**Plain rule:** Any moving, blinking, or scrolling content that starts automatically, lasts more than 5 seconds, and is displayed alongside other content must provide a visible mechanism to pause, stop, or hide it.

**Measurable threshold:** Applies to content that (1) starts automatically, (2) lasts **more than 5 seconds**, and (3) is presented alongside other content.

**What to look for:**
- Auto-playing carousels or image sliders with no visible pause button
- Scrolling news tickers or marquee text with no stop control
- Animated banner advertisements or hero sections that loop indefinitely with no user control

**Common failure:** Hero section carousels that auto-advance through slides every 4–5 seconds indefinitely with no pause button, forcing low-vision users who need extra reading time to miss content.

---

### [2.3.1] Three Flashes or Below Threshold

**Level:** A
**Principle:** Operable

**Plain rule:** Pages must not contain anything that flashes more than 3 times per second, unless the flash is below the general flash and red flash luminance thresholds.

**Measurable threshold:** No more than **3 flashes per second**; or flash area must be below general flash and red flash thresholds.

**What to look for:**
- Animated GIFs or CSS animations that rapidly alternate between two high-contrast states
- Video content with strobe-effect sequences
- Loading animations or "pulse" effects that cycle faster than 3 times per second

**Common failure:** Attention-grabbing animated banners or "sale" notifications that flash rapidly between two contrasting colors (e.g., white and red) more than 3 times per second.

---

### [3.2.1] On Focus

**Level:** A
**Principle:** Understandable

**Plain rule:** Moving keyboard focus to a UI component must not automatically trigger a major context change (such as submitting a form, opening a new window, or navigating to a new page).

**Measurable threshold:** None stated (binary: context change on focus or not).

**What to look for:**
- A dropdown `<select>` menu that navigates the user to a new page as soon as a new option is highlighted via keyboard (before the user confirms their choice)
- A date picker that auto-submits or auto-navigates when the focused day is reached via Tab
- A live search field that triggers a page reload each time an item in the autocomplete list receives focus

**Common failure:** Select menus used as navigation links that fire `onChange` on the first keypress, immediately navigating away before the user can confirm their selection.

---

### [3.2.2] On Input

**Level:** A
**Principle:** Understandable

**Plain rule:** Changing the value of a UI component must not automatically cause a context change unless the user has been clearly warned of this behavior beforehand.

**Measurable threshold:** None stated (binary: unexpected context change occurs or not).

**What to look for:**
- Checkboxes or radio buttons that immediately navigate to a new page or open a modal when clicked, with no prior notice
- A toggle switch that submits a form or permanently saves a setting instantly on click with no confirmation
- A file upload input that immediately begins an upload and triggers a page reload on file selection

**Common failure:** "Country" or "language" select menus that immediately reload the entire page upon selection change without warning the user that the page will refresh.

---

## Layout & Structure

---

### [1.3.1] Info and Relationships

**Level:** A
**Principle:** Perceivable

**Plain rule:** Visual structure and relationships — headings, lists, tables, grouped form fields — must be implemented so that the structure is programmatically determinable, not just presented visually through formatting alone.

**Measurable threshold:** None stated (binary: structure programmatically determinable or not).

**What to look for:**
- Text that is visually styled to look like a heading (large, bold) but is implemented as plain `<div>` or `<p>` with no semantic heading element
- Data presented in a table-like grid layout using `<div>` elements with no `<table>`, `<th>`, or `<td>` markup
- Form fields visually grouped (with a border or background) but without a corresponding `<fieldset>` and `<legend>` for the group

**Common failure:** Using bold, large-font `<div>` or `<span>` elements to create the visual appearance of headings throughout a page, while the DOM contains no actual `<h1>`–`<h6>` heading elements.

---

### [1.3.3] Sensory Characteristics

**Level:** A
**Principle:** Perceivable

**Plain rule:** Instructions for understanding or operating content must not rely solely on sensory characteristics such as shape, color, size, visual location, or orientation — always include a text description.

**Measurable threshold:** None stated (binary: sensory-only instruction or not).

**What to look for:**
- Instructions that say "click the green button" or "use the button on the right" with no text label identifying the button by name
- Error messages that say "see the highlighted fields" without identifying which fields or what the error is
- Navigation guidance that says "the menu is the icon at the top left" without naming the menu or providing another identifier

**Common failure:** Form instructions that read "Fill in the fields marked in red" as the only means of identifying required or erroneous inputs, with no text label differentiating those fields.

---

### [1.3.4] Orientation

**Level:** AA
**Principle:** Perceivable

**Plain rule:** Content must work in both portrait and landscape display orientations unless a specific orientation is essential to the content's purpose (e.g., a piano app, bank check, or video player).

**Measurable threshold:** None stated (binary: orientation-locked or not, unless essential).

**What to look for:**
- Mobile pages that force landscape orientation when the device is held in portrait, displaying a "Please rotate your device" message for non-essential content
- Web apps that lock the viewport rotation via CSS or JavaScript without an essential functional reason
- Dashboard or form layouts that only render correctly in one orientation and break or clip in the other

**Common failure:** Mobile web applications that lock orientation to landscape using `screen.orientation.lock()` for standard content pages where portrait orientation would work fine.

---

### [2.4.1] Bypass Blocks

**Level:** A
**Principle:** Operable

**Plain rule:** A mechanism (typically a "skip to main content" link) must be available to allow users to bypass blocks of content that are repeated across pages, such as navigation menus.

**Measurable threshold:** None stated (binary: bypass mechanism present or not).

**What to look for:**
- Pages with no visible "Skip to main content" link appearing at or near the top of the page when the Tab key is first pressed
- Skip links that are present in the DOM but permanently hidden and never become visible on focus (CSS `display: none` or `visibility: hidden`)
- Pages with long repeated navigation blocks but no way to jump past them to the page's primary content

**Common failure:** Skip links added to the DOM but hidden with `display: none` instead of a visually-hidden-until-focused technique, making them invisible and non-functional for keyboard users.

---

### [2.4.4] Link Purpose (In Context)

**Level:** A
**Principle:** Operable

**Plain rule:** The purpose of every link must be determinable from the link text alone, or from the link text together with its surrounding context — avoid links labeled only "click here," "read more," or "learn more."

**Measurable threshold:** None stated (binary: purpose determinable from text and context or not).

**What to look for:**
- Multiple "Read more" links on a page where each link leads to a different article but all share identical link text
- "Click here" links with no surrounding context that explains where the link goes
- Download links labeled only "PDF" or "Download" appearing multiple times without indicating which document each refers to

**Common failure:** Blog listing pages where every article summary ends with a "Read more" link, making it impossible for a user navigating only by link text to know which article each link leads to.

---

### [2.4.5] Multiple Ways

**Level:** AA
**Principle:** Operable

**Plain rule:** More than one way to locate a web page within a set of related pages must be provided — for example, a navigation menu plus a search function, or a navigation menu plus a sitemap.

**Measurable threshold:** None stated (binary: multiple navigation pathways visible or not; exception: pages that are a step in a process).

**What to look for:**
- Sites that provide only a single navigation menu with no search bar, sitemap link, or breadcrumb navigation
- Multi-page processes (checkout, wizard) that provide only sequential navigation with no global site search (exception: these are acceptable)
- Single-page applications where the only navigation mechanism is a sidebar, with no alternative way to find content

**Common failure:** Small or medium websites that rely exclusively on a top navigation menu with no search functionality and no sitemap, making deep pages extremely difficult to locate.

---

### [2.4.6] Headings and Labels

**Level:** AA
**Principle:** Operable

**Plain rule:** Headings and form field labels must describe the topic or purpose of the content they introduce — they should be accurate and meaningful, not vague or placeholder text.

**Measurable threshold:** None stated (binary: headings/labels are descriptive or not).

**What to look for:**
- Section headings labeled "Section 1," "Column A," or "Content" that give no indication of what the section contains
- Form fields labeled "Field 1," "Input," or left with no label at all
- Page with multiple identical `<h2>` elements all reading "Learn More" or "Details"

**Common failure:** CMS-generated pages where heading text defaults to template placeholder copy ("Title Goes Here," "Your Heading") and was never replaced with meaningful content.

---

### [3.2.3] Consistent Navigation

**Level:** AA
**Principle:** Understandable

**Plain rule:** Navigation mechanisms that are repeated across multiple pages must appear in the same relative order on each page — the main menu, breadcrumb, search bar, and footer links should not randomly reorder between pages.

**Measurable threshold:** None stated (binary: navigation order consistent or not).

**What to look for:**
- A site where the primary navigation menu items appear in a different left-to-right order on the homepage vs. interior pages
- A breadcrumb trail that appears above the page title on some pages and below the hero image on others
- A site search field that is in the top-right corner on most pages but moves to the left sidebar on specific sections

**Common failure:** Redesigns or template inconsistencies where the header navigation order differs across page templates, disorienting users who have learned the original order.

---

### [3.2.4] Consistent Identification

**Level:** AA
**Principle:** Understandable

**Plain rule:** UI components that perform the same function across multiple pages must be labeled and visually identified consistently — the same icon, label, and design language every time.

**Measurable threshold:** None stated (binary: consistent identification or not).

**What to look for:**
- A search function that uses a magnifying-glass icon on one page and a "Search" text button on another, with no consistent treatment
- A "Shopping cart" link labeled "Cart" on some pages and "Basket" on others
- "Download PDF" buttons with different icons (arrow vs. cloud vs. floppy disk) for the same action across different sections of the site

**Common failure:** Sites where different teams or templates labeled the same cart functionality as "Cart," "Bag," and "Basket" across different page types, creating confusion for returning users.

---

### [3.2.6] Consistent Help

**Level:** A
**Principle:** Understandable

**Plain rule:** If help mechanisms (contact links, chat widgets, phone numbers, FAQ links) are repeated on multiple pages, they must appear in the same relative order and position on each of those pages.

**Measurable threshold:** None stated (binary: help mechanisms in consistent position or not).

**What to look for:**
- A live chat widget that appears in the bottom-right corner on product pages but is absent or repositioned on support pages
- A "Contact Us" footer link that changes relative position in the footer depending on the page template
- A help phone number that appears at the top of most pages but is buried mid-page on the checkout flow

**Common failure:** E-commerce sites where the chat widget appears on all product pages but is hidden on the checkout pages, removing access to help at the very moment it is most needed.

*(PDF guide note: "If you offer help on your website, this success criterion requires that you make help options consistent on your website so that users can easily find it.")*

---

## Images & Non-Text Content

---

### [1.1.1] Non-text Content

**Level:** A
**Principle:** Perceivable

**Plain rule:** Every meaningful image, icon, chart, and non-text element presented to the user must have a text alternative that serves the equivalent purpose; purely decorative images must be marked so they can be ignored.

**Measurable threshold:** None stated (binary: text alternative present and equivalent or not).

**What to look for:**
- Images that have no visible caption and whose `alt` attribute is empty or missing when the image conveys meaningful information
- Icon-only buttons (hamburger menu, close button, share icon) with no visible text label — look for whether the icon's purpose is communicated via text anywhere near it
- Informational charts or graphs where the data is embedded only in the image, with no text alternative, table, or caption communicating the same information

**Common failure:** Icon-only buttons (e.g., a search magnifying glass, a share icon) where the icon carries the entire meaning and no visible label or accessible description is present anywhere in the UI.

---

### [4.1.2] Name, Role, Value

**Level:** A
**Principle:** Robust

**Plain rule:** All UI components — form elements, links, custom controls — must have a programmatically determinable name and role, and their current state must be communicated; visually this means visible labels must be present and connected to their controls.

**Measurable threshold:** None stated (binary: name/role/value determinable or not).

**What to look for:**
- Custom toggle switches, accordion sections, or tab panels that have no visible label identifying their purpose
- Form inputs that have a visual label nearby but the label is positioned or styled in a way that makes the connection ambiguous (e.g., a label above a row of three inputs that could apply to any of them)
- Buttons whose visible label reads only as a symbol ("+" or "×") with no accompanying text label visible to the user

**Common failure:** Custom-built UI widgets (sliders, toggles, date pickers) that are styled to look functional but have no visible text name and no DOM label connecting the control to its purpose.

---

## Excluded Criteria Reference

The following success criteria at Levels A and AA were **excluded** from this knowledgebase because they cannot be reliably detected in a screenshot or by visual DOM inspection alone. They require keyboard interaction testing, screen reader verification, audio/video review, or server-side inspection.

| SC | Name | Reason Excluded |
|----|------|-----------------|
| 1.2.1 | Audio-only and Video-only (Prerecorded) | Requires audio/video playback review |
| 1.2.2 | Captions (Prerecorded) | Requires video playback to verify captions |
| 1.2.3 | Audio Description or Media Alternative | Requires audio playback review |
| 1.2.4 | Captions (Live) | Requires live audio review |
| 1.2.5 | Audio Description (Prerecorded) | Requires audio description playback |
| 1.3.2 | Meaningful Sequence | Requires DOM/reading-order inspection beyond visual |
| 1.3.5 | Identify Input Purpose | Requires HTML `autocomplete` attribute inspection |
| 1.4.2 | Audio Control | Requires audio playback to verify |
| 2.1.1 | Keyboard | Requires keyboard navigation testing |
| 2.1.2 | No Keyboard Trap | Requires keyboard interaction testing |
| 2.1.4 | Character Key Shortcuts | Requires keyboard testing |
| 2.2.1 | Timing Adjustable | Requires interactive session testing |
| 2.4.2 | Page Titled | Browser chrome — not visible in page screenshot |
| 2.4.3 | Focus Order | Requires sequential keyboard tabbing |
| 2.5.1 | Pointer Gestures | Requires gesture interaction testing |
| 2.5.2 | Pointer Cancellation | Requires pointer event testing |
| 2.5.3 | Label in Name | Requires screen reader / AT verification |
| 2.5.4 | Motion Actuation | Requires device motion testing |
| 3.1.1 | Language of Page | HTML `lang` attribute — not visible |
| 3.1.2 | Language of Parts | HTML `lang` on inline elements — not visible |
| 3.3.7 | Redundant Entry | Behavioral/session flow — not statically visual |
| 3.3.8 | Accessible Authentication (Minimum) | Backend/cognitive function — not visually detectable |
| 4.1.3 | Status Messages | Requires ARIA live region / AT testing |

---

*Sources: Web Content Accessibility Guidelines (WCAG) 2.2, W3C Recommendation, December 2024 — https://www.w3.org/TR/WCAG22/ | Kris Rivenburgh, Kris's WCAG 2.2 AA Guide, accessible.org, April 2024.*
