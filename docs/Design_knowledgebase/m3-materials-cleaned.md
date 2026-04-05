---
source: "Material Design 3 – Foundations (m3.material.io) + Google Codelabs"
url: "https://m3.material.io/foundations"
author: null
date_published: null
date_processed: "2026-04-04"
folder_type: "md-only"
topics:
  - accessibility
  - color-contrast
  - layout
  - interaction
  - content-design
  - design-tokens
missing_images: 0
source_files: 38 pages across 12 topic groups
duplicate_files_skipped: 7
---

# M3 Material Design 3 – Foundations

Design QA reference compiled from the Material Design 3 Foundations documentation and Google Codelabs. Covers accessibility, layout, interaction, content design, design tokens, and usability guidelines.

---

## Accessibility – Designing

### Color & Contrast

*Source: [https://m3.material.io/foundations/designing/color-contrast](https://m3.material.io/foundations/designing/color-contrast)*

Color and contrast can be used to help users see and interpret your app’s content, interact with the right elements, and understand actions.

Color can help communicate mood, tone, and critical information. Primary, secondary, and accent colors can be selected to support usability. Sufficient color contrast between elements can help users with low vision see and use your app.

![two colors applied to button container and UI surface with contrast that passes 3:1 minimum](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0quwwby-1.png?alt=media&token=f5750025-ccb3-4916-8d4d-6136a6ced9e4)

#### Contrast ratios

Color contrast is important for users to distinguish various text and non-text elements. Higher contrast makes the imagery easier to see, while low-contrast images may be difficult for some users to differentiate in bright or low light conditions, such as on a very sunny day or at night.

Contrast ratios represent how different one color is from another color, commonly written as 1:1 or 21:1. The greater the difference is between the two numbers in the ratio, the greater the difference in relative luminance between the colors. The contrast ratio between a color and its background ranges from 1-21 based on its luminance (the intensity of light emitted) according to the World Wide Web Consortium (W3C).

**The W3C recommends the following contrasts for body text and image text**

| Text type | Color contrast ratio |
| --- | --- |
| Large text (at 14 pt bold/18 pt regular and up) and graphics | At least 3:1 against the background |
| Small text | At least 4.5:1 against the background |

Disabled states do not need to meet contrast requirements.

#### Clustering elements

Some non-text elements, such as button containers, should meet a contrast ratio of 3:1 between their container color and the color of their background. Consider the following patterns for combining elements and tones, which are grounded in Material's research into contrast and functional changes when elements are combined.

[Learn more about color contrast for accessibility](https://m3.material.io/m3/pages/color/how-the-system-works#e1e92a3b-8702-46b6-8132-58321aa600bd)

Elements that are clustered with others, such as a group of buttons, require the user to distinguish each one from the group.

These elements benefit from 3:1 contrast between themselves and the background.

![Two colors applied to button container and UI surface with contrast that fails 3:1 minimum.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0qux0kv-2.png?alt=media&token=6e7cd553-db88-44c9-8f4e-edf7e43c5328)

The contrast of the button container color against the background color is less than Material's required contrast of 3:1

![Two colors applied to button container and UI surface with contrast that passes 3:1 minimum.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0qux3pf-3.png?alt=media&token=11307ebf-9f24-49b2-9667-b4db411ed819)

The container color exceeds Material's required minimum contrast of 3:1 against background color

Elements that stand on their own and apart from other elements on the screen, such as a FAB, are already distinguishable to users because of their prominence. These elements don’t benefit from 3:1 contrast between themselves and the background.

![Two colors applied to the FAB container and UI surface that fail the minimum contrast of 3:1.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0qux82l-4.png?alt=media&token=582f5c7a-5e7f-4f79-9e8d-bc5f091be371)

Standalone components, such as FABs, don’t need to meet Material's minimum contrast of 3:1 between the container and background colors because of their prominence

When placing components together in a cluster, use components or types of components that each achieve at least 3:1 contrast between themselves and the background.

![A cluster of three buttons with the same container color that fails the minimum contrast of 3:1 with the UI surface.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj3vo5t-5.png?alt=media&token=6437d00b-724d-4823-9377-9421334c5d6e)

Each button's container color has less than Material's required minimum contrast of 3:1 against the UI background, leading to poor contrast support for users with low vision

![A cluster of three buttons with the same container color that passes the minimum contrast of 3:1 with the UI surface.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj3vxr1-6.png?alt=media&token=c6dff750-9b13-4117-bafb-59dfc3198736)

Each button's container color has contrast of at least 3:1 against the UI background, leading to better contrast support for users with low vision

### Structure

*Source: [https://m3.material.io/foundations/designing/structure](https://m3.material.io/foundations/designing/structure)*

### Hierarchy

When navigation is easy, users understand where they are in your app and what’s important. To emphasize which information is important, multiple visual and textual cues like color, shape, text, and motion add clarity.

#### Types of feedback

Visual feedback (such as labels, colors, and icons) and touch feedback show users what is available in the UI.

#### Navigation

Navigation can have clear task flows with minimal steps, easy-to-locate controls and clear labeling. Focus control, or the ability to control keyboard and reading focus, can be implemented for frequently used tasks.

Every added button, image, and line of text increases the complexity of a UI. **Y** **ou can simplify how your UI is understood by using:**

- Clearly visible elements
- Sufficient contrast and size
- A clear hierarchy of importance
- Key information that is discernable at a glance

#### Levels of importance

**To convey an item’s relative level of importance:**

- Place important actions at the top or bottom of the screen (reachable with shortcuts)
- Place related items of a similar hierarchy next to each other

#### Visual hierarchy

To enable the screen reader to read out content in the intended order, it’s important for designers to collaborate with developers – both for writing out the HTML in the correct order, and understanding how screen readers will interpret designs.

While CSS determines the layout and appearance of a page, screen readers rely on the top-down structure of HTML on any platform (mobile or web). This structure creates a map for the screen reader to follow when reading the content.

![Example of a mobile app using 4 content cards in a 2 by 2 grid. They reading order is top left, to top right, then bottom left, then bottom right.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj3y443-1.png?alt=media&token=ca884e93-667e-4daf-bba9-50c94e16f4da)

An example of how content hierarchy in a screen can be identified in a logical reading order to optimize for the ways assistive tech, such as screen readers, may interpret information

### Web landmarks and headings

**Define content and UI layout to improve navigation and comprehension.**

Assistive technologies (AT) rely on clear, delineated structures to process page information, navigating primarily through the use of headings and landmarks. Many assistive technologies, such as screen readers, translate a design into a linear experience, which means that many users interact with content in hierarchical, predetermined order. Therefore, thinking through structural decisions in advance can improve the accessibility of a product.

**For web only**: Landmarks and headings help assistive-technology users orient themselves to a web page and allow for easy navigation and traversal across large sections of a document or page.

By **classifying and labeling sections of a page**, structural information that is conveyed visually through layout design can also be represented in code.

![Diagram of a website, showing different regions and their associated landmarks and headings.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj3ys8l-2.png?alt=media&token=c6967605-6ffd-4bfa-8e43-8aee74b6c589)

Example of a page diagram mapping the areas for a UI in order to consider the relative landmarks and headings

#### Identifying landmarks and headings

##### **1\. Define landmarks**

Landmarks are large blocks of content that establish the high-level structure of your layout. They're a set of Accessible Rich Internet Applications (ARIA) roles that provide easy access to, and important meaning for, common content areas of a web page.

There are eight landmark roles: **navigation, search, main, banner, complementary, contentinfo, region, and form**.

The eight landmark roles in the W3C ARIA guidelines include:

1. **Navigation**: Contains lists of navigation links (there can be multiple, in which case you should differentiate in label)
2. **Search**: A search field
3. **Main**: The main content area as defined by UX. There should be only one.
4. **Banner**: Typically the header; content repeated from page to page, often contains navigation and toolbars. There should be only one.
5. **Complementary**: A sidebar or aside to main content that can stand alone without the main content
6. **Contentinfo**: Typically the footer; contains information describing the site and its content (for example,  copyright). There should be only one.
7. **Region**: Content regions are important content blocks. They can be nested inside the “main” landmark. Regions should be labeled with names that make the purpose of that region clear.
8. **Form**: Takes and stores user info.

##### **Add accessibility labels**

Add **clear and specific labels** to any landmark roles that appear multiple times (regions or navigation typically). This will help users differentiate information.

Labels should be added to **all regions**, as well as any landmark where a label will enhance meaning. For example, explaining the contents or purpose of a sidebar.

**Don't repeat the landmark role within a label**.

![Diagram labeling two regions with a navigation role with the labels primary and pagination](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj3z6py-3.png?alt=media&token=584580d1-66d5-4100-8ce6-39f94f60751c)

This layout has two areas assigned the navigation role. Each landmark should get a unique label to help users tell the difference between elements.

##### **2\. Define headings**

Assistive technology users often navigate web pages with the help of headings. They create a clear hierarchy to help users navigate and take action.

- Identify headings based on content hierarchy, rather than visual styling
- Headings should not skip a level, for example, don't go from H2 to H4 without using an H3
- Map content on your pages to headings (H1–H6) in sequential order based on the hierarchy of your content
- A single H1 for the page title is recommended

![Diagram labeling different headings](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj3znk9-4.png?alt=media&token=ce4c0c6b-62a0-45e8-9480-62c8912bdde0)

Example of headings marked up in code

##### **Consider hierarchy in addition to style**

**Ensure that headings correspond with meaningful titles**. If they don't, consider changing the titles in the UI to benefit the experience of all users or adding a label for assistive tech.

Heading levels are informed by the layout's information architecture—the structural hierarchy that’s applied to a set of items. The page’s visual styling does not need to match the heading levels in terms of prominence and visual hierarchy.

### Target sizes

Material Design’s target guidelines can help users who aren’t able to see the screen, or who have difficulty with small touch targets, to tap elements in your app.

![Target guidelines on buttons for easy accessibility.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj401i4-2.png?alt=media&token=88af57b6-03f7-47bf-aea4-3c91b7fbd121)

#### Touch and pointer target sizes

Touch targets are the parts of the screen that respond to user input, extending beyond the visual bounds of an element. For example, an icon may appear to be 24 x 24dp, but the padding surrounding it comprises the full 48 x 48dp touch target.

For most platforms, consider making touch targets at least 48 x 48dp. A touch target this size results in a physical size of about 9mm, regardless of screen size. The recommended target size for touchscreen elements is 7-10mm. It may be appropriate to use larger touch targets to accommodate a larger spectrum of users.

Note: iOS recommends 44 x 44dp targets.

![A row of four 24dp icons and one 40dp icon](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0qv75bo-3-3p.png?alt=media&token=f8ec812a-ebd0-4d8f-8aa3-f81b7ed2e736)

Icons: 24dp

Star icon: 40dp

Touch target on both: 48dp

#### Pointer targets

Pointer targets are similar to touch targets, but are implemented by motion-tracking pointer devices such as a mouse or a stylus.

Consider making pointer targets minimums 44 x 44dp.

![A row of four icon buttons in the bottom app bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0qv7adh-5.png?alt=media&token=fa7b0249-32ad-4472-afc1-6e5a3be8e7f9)

Recommended target size for pointers: 44dp

#### Target spacing

In most cases, targets separated by 8dp of space or more promote balanced information density and usability.

![Three icons in a row with 48dp touch target size and three icons in a row with 8dp padding between icons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0qv7efk-6.png?alt=media&token=eee1f6f5-9c0a-46de-af8d-0ef5be1b8bd8)

Two groups of icons showing their overall spacing and the spacing between each other

Touch target size: 48dp

Padding: 8dp

### Flow

*Source: [https://m3.material.io/foundations/designing/flow](https://m3.material.io/foundations/designing/flow)*

### Focus order & key traversal

People should be able to navigate and interact with your app without the use of a traditional mouse or touch screen. To support navigation by keyboard, screen reader, or other assistive technology, goals should be achievable by using **tab**, **arrow**, **and other common navigation keys**.

Simplify your flows by:

- strategically ordering tab stops
- reducing overall page complexity

#### Use defaults

Avoid adding more work for yourself by using **predefined tab ordering,** unless a user journey needs special tailoring. The **default order follows the DOM** (the order of content as it's written in the source code) and **generally flows from left to right**; **top to bottom**. Keyboard navigation (key traversal) may be pre-defined within common components. Use the defaults unless you have a UX pattern or custom component that breaks from the default pattern.

#### Determining user flows

##### **1\. Group product use cases**

Group product use cases into primary and secondary user journeys. The priority of your use cases should influence the decisions you make about the priority of user flows.

##### **2\. Define initial focus and component-level focus**

Focus refers to which control is currently the active target of user interactions, such as mouse clicks or keyboard taps. Generally, the **tab** key moves focus between interactive elements.

Define the **initial focus** when a user loads a screen, as well as initial focus for components with multiple interactive elements, like a complex card or a dialog.

![A Google home screen showing the initial focus on the search bar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0qvgj8o-5.png?alt=media&token=dabd6a95-ac7c-4bba-bbc0-c348916035b8)

In the case of the Google homepage, even though there are links and buttons above and surrounding the search field on the page, it makes sense to put the user's initial focus on the element that supports the most common user goal

Focus is particularly important when an element is activated by the user or the user changes context.

For example, when a dialog is triggered, check for the following:

- Focus is set to the dialog component, likely to a specific interactive element within the dialog such as a text input field or edit button
- When the user closes or cancels the dialog, focus returns to the interactive element that initiated the action

![Diagram showing changing points of focus as a user opens and closes a calendar card.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj43qm4-6.png?alt=media&token=a3d35c37-a97f-4262-8451-6bfc922a671c)

1. Define initial focus and component-level focus

##### **3\. Define any atypical key traversal through the page and components**

Users should be able to complete the primary and secondary user journeys using tab, arrow keys, and other keyboard shortcuts.

![Card with three interactive elements in the top right corner.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj441r3-7.png?alt=media&token=ad672a23-24bb-45b6-b2f2-633553c3a1c8)

Navigating the interactive elements on a card via tab

**Tab** typically moves focus between interactive elements and is often used as primary navigation. **Tab +** **Shift** reverses direction.

**Arrow keys** are typically used to navigate within components (for example, moving between cells in a form or traversing items in a menu.)

**Enter** activates a link or button, or sends a form when a form item has focus.

![Diagram showing a group of three sub-elements, with navigation within the group assigned to arrow keys.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj44h3h-8.png?alt=media&token=d1d4349e-09f9-4ee5-ad33-143a7d576537)

In the case of unique layouts and use cases, it can help to group a collection of interactive elements as one tab stop, and use arrow keys to traverse sub-elements

1. Using Tab navigation to focus group
2. Using arrrow key to traverse sub-elements

### Keyboard shortcuts

Keyboard shortcuts help users access menus and app functions without using a mouse on desktop apps and websites.

#### Requirements

These requirements are important for helping speech users avoid activating multiple shortcuts at once and for keyboard-only users to minimize unwanted actions.

- Keyboard shortcuts should use a combination of two or more keys by default.
- Include a tutorial, list, or help center page of all custom keyboard shortcuts in your product. For example, Cmd+Z (Ctrl+Z) to undo deleting an event in Google Calendar.
- If a keyboard shortcut is activated with a single key, provide users with a way to take at least one of these actions:
  - **(Most preferred)** Remap the shortcut to include one or more non-printable keyboard keys.
  - **(Preferred)** Activate the shortcut only when a relevant component is focused.
  - **(Not preferred, only use as a temporary solution)** Turn off the keyboard shortcut.

### Elements

*Source: [https://m3.material.io/foundations/designing/elements](https://m3.material.io/foundations/designing/elements)*

### Labeling elements

Elements can be defined and labeled to enhance understanding of their function and reduce confusion for those navigating with assistive technology. Add accessibility labels to define roles and indicate decorative elements.

#### Visual elements that need labels

- Interactive icons or buttons with no visible text or not enough context in the text (for example, an edit button with a pencil icon)
- Interactive images
- Visual cues (including progress bars and error handling)
- Meaningful icons (such as status icons)
- Meaningful images (for example, diagrams, substantive photos, and illustrations)

#### Text elements need labels to add additional context

- Generic links (for example, "Learn more")
- Buttons with generic text (for example, "Save" when there are multiple such buttons on a page)

#### Elements that do not need labels

- Non-interactive UI text, as this will be automatically read by the screen reader
- Buttons with sufficient text (for example, "Download image")

#### Do not include the element name in labels

Do not use an element role (for example, button or menu) in your label. This identifier is automatically added when the element is assigned its proper role, typically by a developer.

#### Label language style

This article uses the general term accessibility label to refer to several different types, including ARIA labels and alt tags. When accessibility labels are implemented in code, they'll be translated to the appropriate type for the intended platform. Additionally, the term **role** is used to cover both general component control types and ARIA roles for web apps. [Learn more about writing alt text](https://m3.material.io/m3/pages/alt-text)

#### How to add labels

##### **1\. Label elements**

[Accessibility labels](https://m3.material.io/m3/pages/alt-text) assist users who cannot rely on a product's visual interface. Thoughtful labels help make the text-based experience as usable as the visual experience. Labels should concisely describe an element's content, purpose and behavior.

![Diagram showing the labels and roles assigned to on-screen icon buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm5r5d64m-9%20(1).png?alt=media&token=1dba85e2-6cc0-4d57-b63f-63de0da2c708)

Example: The accessibility labels for these icons describe their purpose—NOT what the icon looks like (for example, "magnifying glass")

##### **2\. Add labels for meaningful images and interactive elements**

Add labels to visuals that convey meaning or enhance content.

**Labels should be concise, descriptive, and convey the content and context of the image.**

This applies to infographics and other instructive images found in support docs.

![A microphone icon with the accessibility label "Voice Search."](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm5r5dvfi-10%20(1).png?alt=media&token=8b8ea120-72d0-4eec-9c95-24c19b76edc1)

check Do
The label “voice search” describes the user task (search) paired with the input method (voice)

![A microphone icon with the accessibility label "Microphone."](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj47jj9-11.png?alt=media&token=3a943687-0a16-42c7-9c58-612febe88641)

close Don’t Don't include the element type (button, menu, etc.) in your label. This will automatically be added by assigning the element the proper role.

##### **Hiding images**

Decorative icons and images that don't enhance the experience for a visually-impaired user should be annotated as decorative in order to hide them in code.

![Group of icons in a menu collectively described by the accessibility label N/A Hide Images.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm5r5epn6-12.png?alt=media&token=95690b3d-3cd2-4355-aaa6-10bee0a06677)

Mark decorative visual elements to "hide"

##### **3\. Assign a role to interactive elements**

ARIA roles apply to web apps and specify how to increase the accessibility of web pages on top of HTML.

- For web, assign ARIA roles for all interactive elements
- For non-web, assign roles based on your design system components (button, slider, menu, etc.)

Assign ARIA roles (web) or component type (mobile) to communicate desired interaction patterns into engineering action. Note that some visual elements may look the same, but are intended to behave differently.

Defining an interactive element's category by assigning it a role helps users of assistive technology establish expectations for how to interact with that element and anticipate what is likely to happen upon interaction.

![Element with the label "Got it button" and the role "Button."](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwkb4332-13.png?alt=media&token=1bc56ada-bfa2-4d87-9f79-9a97e1895d0f)

close Don’t
Don't include the control type in the label. Screen readers automatically add the control, so you’d be having it repeat (for example, “Got it button button”).

---

## Accessibility – Writing & Text

### Best Practices

*Source: [https://m3.material.io/foundations/writing/best-practices](https://m3.material.io/foundations/writing/best-practices)*

### Accessibility text

Accessibility text refers to text that is used by screen reader accessibility software, such as Google’s TalkBack on Android, Apple’s VoiceOver on iOS, and Freedom Scientific’s JAWS on desktop. Screen readers read aloud the on-screen text and elements (such as buttons), including both visible and nonvisible alternative text.

#### Adjacent text

To make an image more accessible, the text in and around images should consider presenting key information about the image.

![Stacked card with image, caption, and adjacent text identified.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj55hv4-8.png?alt=media&token=229d4f46-48c7-4ed4-99a2-ba2527936425)

1. Image
2. Caption
3. Adjacent text

#### Captions

Captions are the text that appear below an image. They explain contextual information about the image to help the reader understand how it relates to the content. Both sighted and screen reader users rely on captions for descriptions of images.

![Stacked card with image, alt text as caption, and adjacent text identified.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj5628d-9.png?alt=media&token=c1ceac48-0ee3-4822-b7b2-dba96be35c7e)

check Do
Use captions to help readers understand how the image relates to the content

#### Embedded text in images

Screen readers are unable to read text that is embedded in imagery. If there is essential information embedded as text in the image, include the essential information in the [alt text](https://m3.material.io/m3/pages/alt-text).

![Stacked card with image, caption overlayed on image, and adjacent text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj56jdc-10.png?alt=media&token=3712cd9c-c733-4fa1-aaff-5cad15b89ff0)

exclamation Caution
Take caution when embedding essential information anywhere a screenreader can't access, like text inside an image

#### Alternative text (Alt text)

Alt text helps translate a visual UI into a text-based UI. Alt text is a short label (up to 125 characters) in the code that describes an image for users who are unable to see them. Since alt text is only for images, there is no need to add “image of” or “picture of” to the alt text. A screen reader will read the alt text aloud in place of the image.

Alt text is valuable for sighted users, as well, because alt text appears if an image fails to load. Include targeted keywords to help inform the user about the image. Keywords can also improve search engine optimization (SEO).

[Learn more about writing alt text](https://m3.material.io/m3/pages/alt-text)

![A DJ standing in front of music equipment with alt text underneath describing image.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj573aa-7.png?alt=media&token=8b8899da-ed71-4e4f-822a-0005e637691e)

check Do Use alt text to convey what the image is showing in an informative, short phrase.
Alt text example: A DJ performs a set under lights and lasers

### Text color

#### Essential and non-essential elements

Informative images have essential and non-essential elements. Essential information should have a 3:1 minimum color contrast for large text and 4.5:1 for small text.

![SIM card installation with essential and non-essential elements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj57nfl-11.png?alt=media&token=170373e6-8391-4e97-a1dd-a5623716d0cb)

The illustration contains both essential and non-essential information:

1. Essential: The text meets all contrast ratios and size requirements
2. Essential: An illustrative visual representation of the instructions that follows color contrast guidelines
3. Non-essential: The decorative elements create background and personality for the illustration. They do not relay information and do not have to meet Material's contrast requirements.

### Text Truncation

*Source: [https://m3.material.io/foundations/writing/text-truncation](https://m3.material.io/foundations/writing/text-truncation)*

Information should always be available to readers, even if text is truncated or wrapped.

#### Background

Increased size of text, increased spacing between text, and translation into longer languages shouldn’t result in losing content. This requires designing for text truncation and creating designs flexible enough to accommodate any viewport size or increase in zoom. Some common methods of designing for larger text include text wrapping, increased height or width of components, and truncation with ellipses and hover or link.

#### Requirements

Content, understandability, and functionality must not be lost when users modify their type settings. There may be exceptions to these requirements for non-Latin alphabet languages.

#### Text wrapping

- “Wrapped” text extends from one line to another, increasing the height of the text container
- Text should be wrapped when it’s critical, to ensure understandability, or when there’s space in the component

![Body copy  text wrapped  inside a dialogue with an option to expand content.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj5ao0k-18.png?alt=media&token=9823f564-5494-43f3-85ad-21af8dd5b024)

check Do
Wrap text, and if it still doesn’t fit, provide a way for users to see more

![Body copy  text wrapped  inside a dialogue, cut off at the bottom, without an option to expand.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj5b36c-19.png?alt=media&token=f638592f-e9a7-446c-b7e3-84ef22c0d79c)

close Don’t
Don’t cut off text without providing a way for users to view it

#### Height and width of components

- Some components can extend vertically or horizontally for more text

![Layout of UI- cards of different sizes organized in a stacked grid.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj5bfye-20.png?alt=media&token=fa20bfc7-0b26-4ed1-a256-8cb933dbacb4)

check Do
Use flexible component containers that change size to fit their content

![A stretched UI card  with a small headline and a large photograph. ](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj5c5w5-21.png?alt=media&token=76cd69f0-f8db-4e21-8a38-221cd4d51984)

close Don’t
Avoid setting text size limits that don’t fit the space in a component. Use all space available.

#### Ellipses with hover or link

- Truncated text can be replaced with an ellipsis if the text is available through a tooltip or link
- Links can be used when they’re contained in the text that’s truncated, and when the link displays what's been truncated
- If there's an ellipsis, but no way to show the truncated text, it is not accessible
- Note that this option can add difficulty for some people

check Do
Use links to reveal truncated text when space is limited, such as the ability to click a linked card to see an expanded view of its text

![On a multiple selection list, the marked checkbox’s label is truncated by an ellipsis.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0qvmgvh-24.png?alt=media&token=db765429-c069-476c-85ef-f831e9bc6bd7)

close Don’t
Don’t truncate content without providing users another way to see it

### Text Resizing

*Source: [https://m3.material.io/foundations/writing/text-resizing](https://m3.material.io/foundations/writing/text-resizing)*

#### Background

People with low vision or those who prefer large text must be able to scale up the size of text in a UI. This adjustment is often performed through a device OS setting or in-app option.

UIs should support a minimum text increase of 200%.

Most components behave the same when text is resized:

- Text and line height scale up proportionally, multiplied by scale value
- Padding remains constant at 1x the default size
- Spacing between elements in a component remain constant at 1x the default size

![Padding is the same on the top and bottom edges of the buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj5gijr-8.png?alt=media&token=76c97c12-c912-435f-aca9-f06637257b7b)

Button text displayed at 1x, 1.3x, and 2x scales. All have top and bottom padding of 8dp.

![Button text displayed at 1x, 1.3x, and 2x scales. All have left and right padding of 24dp.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj5gt05-9.png?alt=media&token=876f39d6-c14f-4d45-bd7c-d945f82fff12)

Left and right padding remains constant at 24dp as the text size increases.

When text resizing isn't controlled by the device OS, offer multipliers such as 1.5x or 2x to allow users to increase the text size. Using multipliers to scale text can result in values with decimals, but this approach is more feasible for implementation.

To calculate a font's size using multipliers, take the **default** **font size** (density = 0) and **multiply it by the scale value**.

![Button with label text at 1x and 2x scale.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj5h7wy-10.png?alt=media&token=821d0159-4996-4342-a717-15f3a5d3b375)

For example, if a font is 14pt at 1x scale, then the font size should be 28pt when enlarged to 2x scale: (14pt) x (scale value 2) = 28.

Components that don't include text, like progress indicators, checkboxes, or radio buttons, aren't affected by text resizing.

![Icon button with the icon shown at 1x scale and incorrectly at 2x scale.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj5hl59-11.png?alt=media&token=0d6620aa-6743-4478-b6a8-cec7da279ca7)

close Don’t
When designing for text resizing, don't resize components without text

![Menu with labels at 1x scale.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj5hzv6-12.png?alt=media&token=0fbdf847-88fa-4bb6-86bd-7827ef797454)

UI text displayed at 1x

![Menu with labels at 2x scale.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj5iftq-13.png?alt=media&token=8b0674ad-6a2b-40a2-a54f-88e499dd6ae9)

UI text displayed at 2x in which only text and line height is enlarged; the padding between components remains the same as in the 1x UI.

#### Designing for large type

Large type is used regularly by people with low vision and those with difficulty processing written words. They tend to increase text size:

- To make it easier to read

- To limit interruptions and focus on one task

- To avoid overwhelming their senses

Use these methods to design a product to handle large type properly.

![Menu with labels at 2x scale.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm4bi7b7k-13-b.png?alt=media&token=622a927e-dd3e-4ecc-9cb6-2231e702ead5)

Text that is too small and dense can appear overwhelming and difficult to read

![Menu with labels at 1x scale.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm4bi7fz7-13-a.png?alt=media&token=ece17269-405b-472a-9c38-4d087535740d)

Larger text can help people focus on one decision at a time and improve understanding

#### Methods

Avoid common text resizing issues by increasing container size, reflowing layout, enabling scrolling, and adding tooltips.

![ Side by side of 4 commonly found issues when resizing text up.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj5iwyv-14.png?alt=media&token=b794a6a7-fe17-4365-95dd-8c85565c9d17)

1. Unresponsive container; unintentionally clipped text
2. Unresponsive text
3. Overlapping elements
4. Unwanted truncation

##### **Increase container size**

Resizing containers can prevent text from overlapping, clipping, or truncating.

Consider how text might reflow in a way that allows the eye to follow the end of one line to the beginning of the following line.

##### **Reflow the layout**

Consider reflowing the layout, especially when components grow very long. To accommodate larger text, components can be stacked on top of one another, rather than fixed side-by-side.

![ left: buttons placed side-by-side. Right: buttons stacked on top of one another.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj5jdor-15.png?alt=media&token=82a605c0-5cc9-4d32-897e-d07133b39012)

1. UI displayed at 1x: buttons positioned side-by-side in a standard layout
2. UI displayed at 2x: buttons stacked to fit the limited horizontal width after text is resized

##### **Enable content to scroll**

When long strings of enlarged text don’t fit on one screen, consider adding a scrollbar to provide access to more content.

Vertical scrolling is preferable to horizontal. Users should only be asked to scroll in one direction, rather than both vertically and horizontally.

![Dialog with a lot of text at 2x size. The text is cut off but accessible when scrolling.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj5ldz9-16.png?alt=media&token=164a658d-4e2a-4d67-a35c-c4cb051f3389)

Some screens may not be able to resize and display necessary content. In this situation a scrollbar can be used to access more text.

##### **Use touch & hold tooltips to provide enlarged labels**

Some components, such as app bars and navigation bars, position text in spaces with stricter space and character limits. In these situations, you can add a tooltip to display enlarged content in the UI.

In this case, the text size in the component remains displayed at 1x while the scaled up text is displayed in a tooltip on touch & hold.

Tooltips are the best choice for displaying enlarged text in:

- Top app bar
- Navigation bar
- Navigation rail
- Tabs, when fixed to the top of a screen and don’t move off-screen upon scrolling

![Tooltip on navigation rail displays scaled up label text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj5lr50-17.png?alt=media&token=c1272c3a-bf9b-473d-a942-4bb2c3221ffd)

check Do
Scale up text in an adjacent tooltip to maintain space in a UI for consuming content.

---

## Adaptive Design

### Adaptive Design Overview

*Source: [https://m3.material.io/foundations/adaptive-design](https://m3.material.io/foundations/adaptive-design)*

### What does adaptive mean?

Adaptive design is a collection of techniques that allows an interface to respond or change to contexts like:

- **The user**: Preferences and user settings

- **The device**: Watch, phone, foldable, tablet, desktop, or XR devices

- **Usage**: Screens may dynamically change as the user resizes windows or changes orientation, or when a user switches between devices

Designing adaptive experiences goes beyond customizable properties like color, typography, and shape. Individual components and entire layouts can adapt based on device and user context.

### Conditions

A condition is a signal that determines when and how an app should adapt. The Material adaptive system supports platform, window size, and input modality conditions.

![A spatial UI in XR, with a navigation rail orbiter to the left of an email inbox.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmk6f3lg8-01.png?alt=media&token=74d1144a-d1de-4737-ac4d-deb0916764f3)

**Device** conditions include full-screen, windowed, and spatialized environments, as well as device states like posture

![App window being resized horizontally.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmk6f4cv1-02.png?alt=media&token=e7d3d9fa-0920-412e-851b-1eb56884dcb8)

**Window size** conditions include window size classes and orientation

![Hand cursor hovering over a card.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmk6f4pej-03.png?alt=media&token=60ac81b2-8aa2-4c8e-87c7-3410dcd5415e)

**Input modality** conditions include methods like touch, stylus, peripherals, eye, and hand tracking

### Layout

The Material adaptive system uses panes
Panes are layout containers that house other components and elements within a single app. A pane can be: fixed, flexible, floating, or semi permanent.
[More on panes](https://m3.material.io/m3/pages/understanding-layout/parts-of-layout#73de653a-fc57-4a7c-bc3b-5b9e94207de8) and window size classes
A window size class is an opinionated breakpoint, the window size at which a layout needs to change to match available space, device conventions, and ergonomics.
[Learn more](https://m3.material.io/foundations/layout/applying-layout/window-size-classes) to organize content and adapt interface layouts.

Panes are the building blocks of layout; a pane is a single destination in the product. For example, in a messaging app, the list of messages is one pane, and a specific conversation thread is another.

![App screen presented on mobile, foldable, and tablet.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmk6f6ii1-04.png?alt=media&token=d146c75a-98f0-4b8b-91f3-a90d01fdd4ca)

Like the panes of glass that make up a window in the real world, panes in Material design are the primary segments of a digital layout, and can change based on context

### Components

Components can adapt in appearance, placement, and behavior based on factors like:

- Where components are placed in relation to their containers, content, and pane boundaries
- How components use space
- How components enable usage across different device and input types

Most Material components respond using three main strategies: resizing, hiding and showing, and presentation changes.

#### Resizing

Components should resize in response to their content and their placement in a layout.

For example, buttons
Buttons let people take action and make choices with one tap.
[More on buttons](https://m3.material.io/m3/pages/common-buttons/overview) may scale along with their parent container, or hug their contents and maintain a left or right alignment.

![A card with a button that spans the full width, and a card with a button that’s left-aligned and hugs its contents.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmk6f7z44-05.png?alt=media&token=a0e9f4e0-034e-4755-a8cc-ba790ba73b19)

Buttons can hug their contents or span their containers based on context

#### Hiding & showing

Components should hide and show information, or collapse and expand to selectively reveal content that best suits the space.

For example, list
Lists are continuous, vertical indexes of text and images.
[More on lists](https://m3.material.io/m3/pages/lists/overview) items may reveal descriptions or other additional information as their parent container scales.

![A list on mobile and on tablet. List items show additional text on tablet.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmk6f9q87-06.png?alt=media&token=5a00d7ca-de09-48df-9255-bba308ed7c89)

List items can reveal more text on a tablet

#### Presentation changes

Presentation changes include the orientation of elements and changes to specific properties, like color, type, and shape.

Components can also change configurations. For example:

- When a window size increases, a FAB
Floating action buttons (FABs) help people take primary actions.
[More on FABs](https://m3.material.io/m3/pages/fab/overview) can change sizes, like from medium to large

- Navigation bars
Navigation bars let people switch between UI views on smaller devices.
[More on navigation bars](https://m3.material.io/m3/pages/navigation-bar/overview) can change nav items from vertical to horizontal

![Extended FAB changing to standard FAB when an app window is made smaller.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmk6fannd-07.png?alt=media&token=05b42573-7e59-476c-aeef-6196195af189)

The extended FAB can change to a standard FAB when the app window is made smaller

### Getting started & resources

Canonical layouts, which address some of the most common layouts across apps, are the recommended starting point for adaptive designs. Learn more about each of the [canonical layouts](https://m3.material.io/foundations/layout/canonical-layouts/overview) in Material guidance, and look at inspirational examples on the [Android Developers site](https://developer.android.com/large-screens/gallery).

---

## Content Design

### Alt Text

*Source: [https://m3.material.io/foundations/content-design/alt-text](https://m3.material.io/foundations/content-design/alt-text)*

### How to write great alt text

#### Overview

Alternative text (alt text) refers to off-screen text that is used by screen reader accessibility software. Screen readers read out visible content such as paragraph and button text, as well as hidden content, including alt text for icons and headings.

Alt text also displays when an image doesn’t load. It tells people what they need to know about an image if they can’t see it.

![4 tin mugs and appropriate alt text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj77km2-1_do.png?alt=media&token=5d8da91e-0b52-4481-9553-127a76bfc20a)

check Do
Write alt text for images to provide context to screen reader users.

**Alt text: Two large and two small tin mugs.**

![4 tin mugs with file name as alt text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj782ss-2_don't.png?alt=media&token=384d5ff1-8b27-4ee8-be7a-a5f7e3c54373)

close Don’t
Avoid leaving the automatically generated file number as alt text.

**Alt text: jpg - 0223939-330**

#### When to use alt text

If you remove the image from the page and no information is lost, then the image is decorative and doesn’t need alt text or a caption.

An image can be marked decorative using a null alt attribute, such as **alt=””** in HTML, which will hide the content from screen reader users.

![A bitcoin decorative image in a crypto article.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj79l11-3.png?alt=media&token=3846da68-3efa-4372-adf9-2bd45ea752a9)

Images that don’t add information don’t need alt text.

**Alt text: “”**

#### Focus on the meaning of the image

Describe the context and overall meaning, rather than focusing on the details. For example, in a shopping app, focus on the item for sale rather than the things around it.

Alt text can also help improve SEO, but its primary purpose should be to make sites usable for all.

![Watering can in a shopping app and good alt text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj7a0ft-4_do.png?alt=media&token=2f96d201-e43d-4649-b123-6cd67734c085)

check Do
Focus on the important part of the image.

**Alt text: A Scandinavian-style, copper-handled, cream-colored watering can.**

![Watering can in a shopping app and overly detailed alt text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj7aw71-5_don't.png?alt=media&token=afa74e9c-4798-47ac-88c5-945eb26a2b85)

close Don’t
Avoid detailed descriptions that don’t contribute to the image’s meaning.

**Alt text: On a window sill, a child’s hands pours from copper handled cream colored watering can into a phoenix plant in a grey pot.**

#### Keep it short

The recommended length for alt text is 140 characters.

If alt text is too long, it may be cut off by some screen readers, which is a poor user experience.

![Relates idea of keeping alt text to a max of 140 characters.](https://lh3.googleusercontent.com/PRj_oYkwUTuzQUdGRjKqtfZ06uYy3M8Nql2VC6b06NAc25AnP4xAhLYDB4ygwCcFfjAbO7gxgQ7o100HwAtx3tXoJQvNTiAoz51wF8BJcYA=w40)

check Do
Write brief alt text.

**Alt text: A small happy dog hanging out the passenger window of a vintage car.**

![Long alt text can be overwhelming and ineffective.](https://lh3.googleusercontent.com/SjjCRROpmvOai7hbb6xB8KkxbDqAtj4WysgXym1u1NAv0MmomIBNZuBU_Qj41hrWYZrCJIMNyedImnC0AO2JdIrwXlUODzQJkCkUZLQGuwXc=w40)

close Don’t
Don’t write more than 140 characters of alt text.

**Alt text: An aqua colored vintage car is driven by a woman in a cowboy hat. A poodle-mix dog sits in the passenger seat with its tongue out and paws out the window.**

#### Don’t start alt text with “image of”

Screen readers announce “image” when they come across an image. If your start your alt text with “image of” a screen reader will announce “image, image of.”

![Makes the point of not  using “image of” to start alt text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj7cw95-8_do.png?alt=media&token=03bb0011-82a3-44b6-b0c5-2bc668b17087)

check Do
Describe the image, rather than the format.

**Alt text: A wooden box of artisan sourdough bread is carried by a baker.**

![Makes the point that poor alt text starts with “Image of.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj7dpkq-9_don't.png?alt=media&token=a54e16ec-76fd-4c27-91bc-4e711f29569f)

close Don’t
Avoid writing “image of." The screen reader will announce it’s an image.

**Alt text: Image of a wooden box of artisan sourdough bread is carried by a baker.**

### Context and nearby text

#### Context matters

Use adjacent text to establish the context and word choices for alt text. Adjacent text includes all of the text near an image, such as body text, captions, and headlines.

Don’t repeat the caption in alt text. It’s against best practices because the user will hear the same text twice, which is a poor experience.

Be consistent in your word choices. For example, don’t use “antique” in a caption and “vintage” in the alt text.

![Shopping app with image of a chair in a bathroom.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj7ehhx-10_do.png?alt=media&token=b33f3bf7-e11e-42c7-875d-41eb4c9579b3)

check Do
Alt text should always relate to the context.

**Alt text: Brown oak dining chair.**

![Home decorating blog post heading and caption and image of a wooden chair in bathroom.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj7f0me-11_do.png?alt=media&token=e6d18837-99bd-4348-ab91-84b4f1827bc9)

check Do
Change alt text for an image depending on where it’s used.

**Alt text:  Books on a wooden chair next to a vintage bathtub.**

#### Alt text is subjective

Alt text is another layer of creative expression and should support the goals and style of its context.

The same image should have different alt text in different settings. Use the information in the app or article and the caption to decide what to emphasize in the alt text.

![Shows idea of alt text supporting the caption.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj7flrw-12_do.png?alt=media&token=b732f29d-5521-44ba-bd62-47775e9cb1d1)

check Do
Make alt text consistent with the caption.

**Alt text: A well composed photo of a photographer waiting for the perfect shot of sailboats.**

![Shows idea of alt text  missing key information from the image.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj7i4ba-13_don't.png?alt=media&token=f31a3bd8-7131-450d-be00-2c8243537b4e)

close Don’t
Don’t ignore the caption. Information in alt text should correspond to adjacent text.

**Alt text: A black and white photo of a woman standing on a pier while looking at sailboats.**

![Shows idea of alt text focussing on the meaning of the image.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj7ik28-14_do.png?alt=media&token=15e46b26-7462-44ae-addd-c4b21b7247b1)

check Do
Focus on the meaning of the image.

**Alt text: A black and white photo of woman looking at sailboats from a pier.**

![Shows idea of alt text reinforcing the caption theme.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj7ixvo-15_do.png?alt=media&token=df2721d7-d6e1-484d-aaa0-bcf05584dbf3)

check Do
Use alt text to reinforce ideas in the caption.

**Alt text: A photographer stands on a pier between 2 dock posts looking at sailboats.**

![Shows idea of overly detailed alt text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj7jdth-16_don't.png?alt=media&token=c11e5c8f-7516-4945-a131-11a10d1b93a8)

close Don’t
Don’t write alt text with details that aren’t relevant to the context of the image.

**Alt text: A black and white photo of a female photographer looking at sailboats while standing between 2 dock posts on a Venetian pier.**

#### Captions should benefit all users

A caption should be useful to someone who can see the image clearly, as well as a screen reader user.

Good captions support the image rather than duplicating its information. A well-written caption makes it easier to write alt text.

![Alt text of “flying pigeons” supports the caption “Pigeons have a distinct silhouette.” ](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj7jync-17_do.png?alt=media&token=53a50c25-1c12-4fe8-9bc8-ed040a6fed9b)

check Do
Capture the meaning of the image in a few words.

**Alt text: Flying pigeons.**

![The caption and alt text are both “Pigeons have a distinct silhouette.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj7kb1h-18_don't.png?alt=media&token=614e6041-104c-42bb-b7fe-882bbebf7c06)

close Don’t
Don’t repeat the caption as the alt text.

**Alt text: Pigeons have a distinct silhouette.**

### Types of imagery

#### When to describe the type of image

Occasionally it benefits users to name the type of image. This can include:

- Chart
- Infographic
- Map
- Graph
- Screenshot
- Headshot
- Diagram

![Map with alt text that begins with “map of.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj7kr95-19.png?alt=media&token=365d9d72-d471-41a8-b631-da2d2b8a5648)

exclamation Caution
Be careful when using alt text that describes the type of image.

**Alt text: Map of Denver Rd. Park and surrounding area.**

#### Charts and graphs

Alt text is particularly important for visualizations such as charts and graphs.

Visualizations can either be editorial and meant to support a specific purpose or key takeaway, or more open-ended and used for general data analysis.

Consider the core purpose of the chart or graph, and what information someone would need to use it.

Link to the data that generated the chart or graph, if it’s available.

![Summary of interest in Manchester City, which is almost double that of Liverpool. Manchester interest peaks at 100 at 6pm. Liverpool peaks at 40 at 3am and 12:30pm.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm2ch16f9-20.png?alt=media&token=b9137da9-a144-41d4-8740-28cfcc2896cc)

Summarize the main purpose of the data. Here, the chart involves interest in Manchester City and Liverpool.

When possible, explain the key takeaways and meaning in context, rather than detailing every data point.

A general formula for chart alt text would be: “Summary of \[data type\] + \[reason for showing the chart\].”

![Alt text that summarizes the meaning of the chart.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm2ch1hb7-21_do.png?alt=media&token=bd84e22f-123c-44f2-b3b7-a8c80d8af77b)

check Do
Capture the meaning of the chart, along with key data points

**Alt text: Summary of interest in Manchester City, which is almost double that of Liverpool. Manchester interest peaks at 100 at 6pm. Liverpool peaks at 40 at 3am and 12:30pm.**

![Alt text for a chart that details too many data points. ](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm2ch1sqk-22_don't.png?alt=media&token=8d0111d7-e575-4e3c-b962-610f9abba5a4)

close Don’t
Avoid copying data points

**Alt text: Interest in Manchester City: 12am=40, 12pm=56, 6pm=100, 9pm=45. Liverpool interest 12am=20, 12:30pm=40, 6pm=30, 9pm=20.**

**Charts for editorial use**

Charts with an editorial focus are used to support a key takeaway. This takeaway and the main data points confirming it should be the focus of the alt text. To create the alt text, leverage existing content from the body text, labels, and any text in the graph.

For example, a chart from a weekly digest showing highlights of physical activity may have a written summary of the total change in step count. This can be used in the alt text.

![A fitness digest with a takeaway and metric highlighted in sample alt text.](https://lh3.googleusercontent.com/CC4kwz_5M0YHQVuek5qWAwu8l0xVMYkwAqURJ-Lf78aRn7LjioRLOu7K6PhAYR6UuQuW8_JxSX2NpnApgA7ViM4Ae41mfOhFCARh7KqsEYY=w40)

check Do
In charts with an editorial focus, highlight the main takeaway and metrics

**Alt text: Your step count was 55% higher this week vs last week with 4,106 additional steps on average.**

**Charts for analysis**

Charts for analysis are meant to be reviewed as a whole, and offer pieces of data to be analyzed. They can be dense, appear alongside related charts, and have many takeaways.

For charts that have one or two key takeaways, include these insights in the alt text.

To avoid introducing unintentional bias in charts with many possible takeaways, highlight opportunities for exploration, such as a link to the data’s source. Emphasize key data points or mention that there isn’t a single takeaway.

![Chart for analysis with alt text that describes general structure and provides link to data.](https://lh3.googleusercontent.com/gjndFHZVwRy0iP69fsNWwDGJZs56rrB1cX8u7qeldrLHU8GmM3hjs5Z6OYKOZbqyUfu_fITvXHrCwL8N4c9biSzTB6kJea0iN7lUyz5QAFk2=w40)

check Do
In charts used for analysis, mention the general structure, and highlight opportunities for more investigation

**Alt text: Comparison of annual high, avg, and low temperatures. Visit the link provided to explore the data in detail.**

![Chart for analysis with alt text that inaccurately summarizes it.](https://lh3.googleusercontent.com/y9frD2pxvtXLDo-_Xa4szOPAE86O8YYHrYEVoELpOt2FdrxvGvXf6L-j5l1CjsXmQataWeNqU38GskS2Vv9rQQZabfaZti8hyQ6gUpgHJRnnKA=w40)

close Don’t
Don’t summarize a chart used for analysis

**Alt text: High, average, and low temperatures varied widely over the course of the year.**

**Use interactive charts**

To improve the screen reader experience,  consider using interactive charts instead of static images, especially for complex visualizations that are used for analysis. For interactive charts, a tooltip can show additional detail for specific data points.

See [Top Tips for Data Accessibility](https://m3.material.io/blog/data-visualization-accessibility) for more ways to make these visualizations accessible.

![Chart for analysis with alt text that describes general structure and provides link to data.](https://lh3.googleusercontent.com/a56fvmo9FI_dcrUww32YzJbtxXg8mf4oe2I87LeaK6f1v4vcFy9DIJTXVdCpl3VGAaqDuk_JTRLLj1q2rNMkeXpCYy9nX9tLOMo9G7_8TjTF=w40)

Use interactive charts for complicated visualizations

#### Video and motion alt text

As with still images, if the animated information isn’t elsewhere on the screen, then it is informative and needs alt text.

Long-form video content uses video description to narrate the visual elements of a video, so it doesn’t need alt text.

Summarize the action in a video or animation

Alt text on informative GIFs or motion assets should highlight the important points. Think of a heading or title you might give it, and that’s likely your alt text.

![alt=""](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj7mf38-24_do.png?alt=media&token=643620a0-982c-4ddd-a14d-d3b40399f758)

check Do
Write alt text that summarizes the motion asset.

**Alt text: A tooltip labeled “star” appears when a cursor hovers over a star icon.**

![alt=""](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj7mptb-25_don't.png?alt=media&token=7bb7ce8d-e563-45b8-89d0-b47d4581e467)

close Don’t
Don’t write about every aspect of the motion.

**Alt text: A hand-shaped cursor lands on a star-shaped icon and then a tooltip labeled “star” appears below the star.**

### Global Writing – Word Choice

*Source: [https://m3.material.io/foundations/content-design/global-writing/word-choice](https://m3.material.io/foundations/content-design/global-writing/word-choice)*

### Word choice

#### Use global examples & explain local references

References to local places, holidays, and companies won’t always make sense to global audiences.

![Empty wishlist screen that references the holidays](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvuo362u-1_do.png?alt=media&token=59119125-04d2-473e-9a41-859798f114c1)

check Do
Use generalized, global examples. Most countries and cultures have holidays.

![Empty wishlist screen that references Christmas](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvuo41ao-2_don't.png?alt=media&token=58df821b-9db0-4490-8f56-55d57eb6fd51)

close Don’t
Don’t call out a specific country or culture’s holiday

If it doesn’t make sense to use a global example, explain the reference in the message description so the translator can substitute a locale-specific example. Some instances where local references should be called out include:

- Locations
- Names (common first names and nicknames)
- Currencies
- Temperatures
- Date formats
- Providers (internet and cable)

![Empty state that references New York with message description about replacing New York with a well-known city in other languages](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvuo4v88-3.png?alt=media&token=8bbd61e8-8d45-4125-a33a-047e948827d8)

exclamation Caution
Help translators understand the context by adding message descriptions

#### Use short, simple sentences

Break text into shorter sentences. Use bullets or separate content into sections with headings.

Other languages average at 1.5 times longer than English, so text that’s short may be long when translated.

![2 screens side by side, in English and German](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvuo5uis-4.png?alt=media&token=e3ea8daf-7f8d-4c62-9c7f-cfc5f920ee19)

Many languages, like German, are longer than English

#### Avoid abbreviations

Abbreviations don’t translate well and can be confusing out of context. Spell things out whenever possible.

However, common abbreviations for time are acceptable.

![Dialog with options that aren’t abbreviated](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvuo6t6b-5_do.png?alt=media&token=1d20754c-c742-4259-8d4a-f5cd4a065f77)

check Do
Use clear names to refer to things

![Dialog with options that are abbreviated](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvuo82rh-6.png?alt=media&token=b72d6fc9-1d79-4cce-9876-1ab85344f6b1)

exclamation Caution
Avoid abbreviations. If they're used, provide their meaning in message descriptions.

#### Clarify pronouns

Using pronouns, like “it,” can get tricky when translators are working with small, unconnected strings of text and when nouns have genders in many languages. Repeat the noun, or clarify the noun in a message description.

![Photo app with snackbar that reads “Couldn’t move photo”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvuo92qu-7_do.png?alt=media&token=5f9eac8b-0fc0-4a0b-a5f8-8b6b21391902)

check Do
Using nouns instead of, or in addition to, pronouns can help clarify future and past user actions

![Photo app with snackbar that reads “Couldn’t move it to ‘Travel’ folder because it’s unavailable”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvuoacju-8_don't.png?alt=media&token=7611a7d7-d03f-4112-a2ce-188781885865)

close Don’t
Avoid using pronouns when it’s unclear what nouns they’re referring to, especially when explaining user actions

#### Clarify “this” and “that”

Don’t start a sentence with "this" or "that" unless it's immediately followed by the noun. When the noun is unclear, the sentence is more difficult to translate.

![Form with clear writing that doesn’t use “this” or “that”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvuobsfb-9_do.png?alt=media&token=f0e3f5ac-e9e8-4851-9659-73264a34a79a)

check Do
Make sure it’s clear who text is referring to

![Form with a subhead that reads “This can be seen by your IT administrator.” It’s not clear what “this” refers to.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvuocbnw-10_don't.png?alt=media&token=635d9dcb-45aa-4588-b3c1-ac0ce0fb3471)

close Don’t
Avoid using “this” and “that”

#### Avoid idiomatic, colloquial, and polite expressions

Idiomatic or colloquial phrases can be confusing if the meaning isn’t clear. If you use them, clarify the purpose and context of the phrase to help the translator choose an appropriate alternative.

Avoid polite expressions, such as “Please,” “Sorry,” and “Thank you,” especially in error messages. However, "please" may be used when asking the user to do something inconvenient.

![Empty state with illustration that reads “Let’s go”](https://lh3.googleusercontent.com/fbOdPNZxbnWg8h1AtfrVzrHEfx87HqTbn1uV7XqiOCvs017tfdkalXYclDMLKuAlW2fhnxehv4sRAOflGxm7TFe7ckUfdhE57Pkwu57MUkZP=w40)

check Do
Clear, everyday language can be used in an expressive and whimsical way when paired with imagery

![Empty state with illustration that reads “Let’s get this party started”](https://lh3.googleusercontent.com/hIGnwFcZ-4N3wxDr7EvS9-3j_B_l5DbU24maq8wmMOyakUI4sgTD9O-Ab5Ck8oxjJx0samUsMnB-Vlg40cWx6Yx3S9SHTgoqj9uGcQk-yDPv=w40)

close Don’t
Idiomatic phrases can be difficult for everyone to understand and for translators to localize

#### Reduce technical jargon

Technical terms don't always translate. Descriptions should be simple, and in some cases literal, to avoid confusion when translating.

![Dialog that prompts people to sign up to try new products](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvuoeiu1-13_do.png?alt=media&token=435653ba-a996-4701-a42d-ae6e5421242f)

check Do
Plain language is easier for everyone to understand

![Wordy and confusing dialog that prompts people to sign up for new communication preferences](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvuoexnd-14_don't.png?alt=media&token=3138701a-0231-4b15-96a7-7d8a8a688e27)

close Don’t
Confusing language makes it difficult for people to understand the actions they’re taking

#### Clarify ambiguities

Some words have multiple meanings. For example, “traffic,” “filter,” and “change” can be used as either nouns or verbs. Avoid using both meanings of the word in the same string or body of text. If a word has the potential to be confusing, provide as much context as possible in the message description so the translation will be accurate.

![Screen displaying devices and speakers at home, next to bottom app bar with “home” button](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvuoff5i-15.png?alt=media&token=7965285d-9569-4187-a14a-3d91d781b94d)

Clarify words that have multiple meanings. “Home” could reference a homepage or where someone lives.

### Notifications

*Source: [https://m3.material.io/foundations/content-design/notifications](https://m3.material.io/foundations/content-design/notifications)*

Notifications should:

- Be about the user, not the product
- Be precise, timely, actionable, contextual, and relevant
- Give users easy controls to opt out
- Not be used to send unsolicited ads

![](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw53k6lt-1.png?alt=media&token=f0fb34d7-3f8a-4111-8b7f-89033fb27a28)

#### Put important information at the top

Put the most important info at the beginning and make it easy to understand. People skim rather than read, often in an F shape. When it makes sense, try to move the most critical information to the front of sentences, rather than the end, where it may get overlooked or truncated.

![Three notifications from Google apps that include the point of the notification in the header.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw53kfhk-2.png?alt=media&token=9c5b4033-2c38-4e18-85aa-5390cb29b785)

check Do
Prioritize the most important information

![Three notifications from Google apps that include app names repeated in the header, instead of important information.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw53kk0k-3.png?alt=media&token=90f1d8b9-c6cc-49ed-997b-6453a0644af4)

close Don’t
Don't waste characters on app names, niceties, or unimportant information

#### Tell users what they can do

If you’re prompting someone to take action, make that clear. CTAs should be concise, specific, and actionable. If you know what motivates people to take action, add it.

![Two notifications from Google maps that include actionable information in the header.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw53kq5j-4.png?alt=media&token=6137b006-1c0b-4cf2-94fc-128d12daa42f)

check Do
Clearly guide the user to their next action

![Two notifications from Google apps with non-actionable headers.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw53kvqx-5.png?alt=media&token=9b0ad64e-6f95-44de-8f5e-f12cb2ba2f58)

close Don’t
Don't bury next steps

#### Make it relevant and personal

A notification shouldn’t be sent to everyone. The more you broaden the audience and the message for a notification, the more you risk being irrelevant. Consider user segments, in-app behavior, and personalized information to make sure notifications go to people who will benefit most from them.

![A Google maps notification in Memphis, TN that’s personalized to the user’s location downtown.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw53l2ot-6.png?alt=media&token=4f5c0fd2-4f29-4a75-a5c6-0dafff49b473)

check Do
Be specific to capture user attention

![A Google maps notification in Memphis, TN that’s generic to the city, rather than the area.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw53l86v-7.png?alt=media&token=1da7ac0b-893b-4cbf-a2b7-0dac9c458820)

close Don’t
Don’t be so generic as to lose value

#### Avoid dynamic text

Dynamic text are words that are implemented by engineering to change based on the user or context, like adding a user’s campaign name to headline or “good afternoon” when users log in at certain times.

Try not to use dynamic text in notifications. It often breaks character limits, especially in headlines when translated. Text that gets truncated in the headline will not expand, even in expandable notifications. If you must use dynamic text in the headline, try to pair it with no more than one additional word. Create a backup notification that fits the character count when your primary notification won’t.

![Two notifications, one with dynamic text in the body, and the other with dynamic text in the header that’s formatted to always be short.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw53lep9-8.png?alt=media&token=74837af0-9c5a-4440-ae6a-1b31f806484a)

check Do
Place dynamic text in the notification body, where there is more space. If you place dynamic text in the title, keep it very short.

![Two notifications with dynamic text in the header that’s too long and truncates.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw53lk9g-9.png?alt=media&token=86ba3704-96ca-4aeb-9394-20ef722483e1)

close Don’t
Don’t place dynamic text in a long notification title

#### Mind your characters

Stay within these suggested character counts so text doesn’t get cut off:

- Title: <29 chars
- Collapsed body: <40 chars
- Expanded  body: <80 chars; start with collapsed body and add to it
- Button: 1-2 buttons (1-2 words each)

There’s more room for text on later versions of Android, but these limits are still recommended to prevent truncation on smaller devices.

![A short, relevant, and informative notification.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw53ls3l-10.png?alt=media&token=0975f21e-7522-40bb-acfb-28d8405bac9e)

check Do
Keep notifications short and information-dense

#### SMS messages

SMS helps users get messages when they might not have access to their Google Account. It’s used for important or urgent communication only.

SMS breaks into multiple messages after a certain number of characters, resulting in increased costs. To avoid this, stick to the following character limits:

- Latin languages:  <160 characters
- Non-latin languages: <134 characters

If translation is needed, let translators know about the character limits in the message description.

![An SMS notification that’s brief and truncates sensitive information.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw53lzfr-11.png?alt=media&token=ea00548e-29b5-471d-8ac2-e47206c29e54)

check Do
SMS messages should be brief and important

![An SMS notification that’s too long with too many links.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw53m528-12.png?alt=media&token=2be76632-4674-4858-b601-29bd9d4820df)

close Don’t
Don’t use full emails or website links for text length

#### Emoji with caution

Use emoji sparingly. Many don’t translate and aren’t universally understood across cultures. Experiments show that face and hand gesture emoji perform better than generic emoji because they tell a better story. Emoji should enhance content, not replace it.

Since it’s not clear to users whether emoji mean we’re sympathizing with them or attempting to project our feelings onto them, don’t use emoji to accentuate bad news. In experiments, there was a strong negative reaction to negative emoji, such as frowning face, anguished face, and weary face.

Gen Z adds another cultural nuance to emoji by [inventing new meanings](https://www.textnow.com/blog/the-next-generation-of-emojis-gen-z-explained/) that go beyond the official or literal [definitions](https://emojipedia.org/).

![A notification about coffee with a coffee emoji at the end of the header.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw53mcby-13.png?alt=media&token=22d82f3d-5533-472a-96cc-6407c99ca119)

check Do
Use emoji only to enhance a message

![A notification about high traffic volume on a route to work that uses upset emoji. A notification about coffee that substitutes a coffee emoji for the word “coffee.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw53mhmr-14.png?alt=media&token=faa05f8f-9a9c-4b5f-bb79-eed427812ccb)

close Don’t
Don’t add negative emotions to a message. Don’t replace words with emoji.

#### Don’t overdo delight

What seems funny or cute may not come across that way. When vying for limited user attention, be useful. Don’t focus on delight: delicately added and tested polish can better support Google’s brand.

![A notification that’s short and effective](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw53mqhm-15.png?alt=media&token=3e236ec8-a5a2-4629-8241-1a3afd37c40d)

check Do
Prioritize straightforward and useful messages

![A notification that’s meant to be funny, but comes across as creepy where the application calls the user “human.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw53mx58-16.png?alt=media&token=0b860837-dfa8-44ef-9ee6-bf98657a1617)

close Don’t
Jokes aren’t appropriate for notifications

#### Be day-specific

Use the days of the week. Don’t use “today,” “tomorrow,” “tonight,” or similar words. About 20% of users don’t see notifications on the day they’re sent, so “tomorrow” might be read when it’s “today” for the user.

An exception is when a notification auto-dismisses at a specific timestamp.

![](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw53n553-17.png?alt=media&token=58155094-2c32-4ec2-bddd-120f3f6697ac)

check Do
Specify the day of the week so that it makes sense if someone reads it the following day

![](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw53nb80-18.png?alt=media&token=67b73253-b600-4cf6-9fe6-65422e5f4582)

close Don’t
Don’t use relative terms like “today” or “tomorrow”

#### Don’t interrupt the flow

If you have notifications or emails related to the onboarding process, make sure they don’t trigger during onboarding.

![](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw53nkf2-19.png?alt=media&token=8026372e-8d39-4ce0-a778-81e633c335f8)

close Don’t
Don't prompt the user with a notification or email that might interrupt an important moment

#### Don’t name the product (again)

An app’s name or logo is already included in a notification’s design. Use the limited space for other information.

![](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw53ntem-20.png?alt=media&token=bb68096c-e27f-46f3-9de3-375ab98ceba3)

check Do
Use the available space for useful information

![](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw53nz6w-21.png?alt=media&token=9ccad6e0-2b10-4d67-85b3-91391d6d56f8)

close Don’t
Don’t waste space repeating information that is already included by the OS

#### Opting in and out

Give users a way to opt-out of notifications in context. If you don’t, they’ll have to dig into settings and may get frustrated. If you do offer opt-outs or opt-ins, make it clear what benefit the user is getting or losing.

![](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw53o6jr-22.png?alt=media&token=4a6e7dfa-4d4d-445d-b0bf-46fe7d9275b8)

check Do
Make it easy for users to start or stop receiving notifications

---

## Content Design – Style Guide

### UX Writing Best Practices

*Source: [https://m3.material.io/foundations/content-design/style-guide/ux-writing-best-practices](https://m3.material.io/foundations/content-design/style-guide/ux-writing-best-practices)*

#### Explain consequences

Emphasize the results of the user’s potential action in neutral, direct language. Avoid cautions or warnings that might sound alarming, intimidating, or condescending. Focus instead on communicating the consequences of a function.

!["Move to trash?" dialog with the message "Big birthday bash will be deleted after 30 days."](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvw0frl1-1_do.png?alt=media&token=fd980a50-2317-4d04-9c5e-edc4ec3b3ac9)

check Do
Tell users what will happen if they take an action and how they can undo it

!["Are you sure you want to move to trash?"dialog with the message "You'll be able to find "Big birthday bash" in your trash for 30 days."](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvw0g6jb-2_don't.png?alt=media&token=19fd1b16-a8ba-48d9-8f93-65784477a8a1)

close Don’t
Don’t misrepresent consequences or try to influence a user’s decision

#### Use scannable words and formats

People scan UI text in search of the most meaningful content to them. Help by using specific titles and headings that clearly describe a topic. When users are skimming or hurrying through an action, this organization helps them avoid mistakes and unintentional actions.

![Easily scannable content with different headings and subheadings on a card.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvw0gqx5-3.png?alt=media&token=143261b0-d6e9-413f-bfe8-a84897a2a764)

Use headings and subheads to prioritize and group information

#### Use sentence case

Unless otherwise specified, use sentence-style capitalization, where only the first letter of the first word in a sentence or phrase is capitalized. All text, including titles, headings, labels, menu items, navigation components, app bars, and buttons should use sentence-style capitalization.

Products and branded terms may also be capitalized.

![Sentence-style capitalization used for the title and consequence statement  in a dialog.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvw0hrme-4_do.png?alt=media&token=b558696c-198b-49f7-a82e-a07be8c4d4e3)

check Do
Capitalize the first word of a sentence or phrase

![Title casing used for the title  in a dialog.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvw0i4xj-5_don't.png?alt=media&token=eb1102dc-9681-481a-82f6-d437960d87f9)

close Don’t
Don’t use title case capitalization. Instead, use sentence case.

#### Use abbreviations sparingly

Spell out words whenever possible. Shortened forms of words can be difficult for people to understand and screen readers to read. Avoid Latin abbreviations in UI text such as e.g. or etc. Instead, use full phrases like "for example," or "and more."

![AM and PM abbreviations used on a clock app.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvw0j9q3-6_do.png?alt=media&token=0bcd700a-5234-48c1-9c4d-bbfb26f20012)

check Do
When an abbreviation is appropriate, make sure it’s formatted and spelled correctly to avoid confusion

![Abbreviations used for months and days on buttons when there is enough space to spell them out.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvw0jnlb-7_don't.png?alt=media&token=47375e5f-03fb-42a9-982b-93472c06b359)

close Don’t
Avoid using abbreviations when there’s space to spell out a word

### Word Choice

*Source: [https://m3.material.io/foundations/content-design/style-guide/word-choice](https://m3.material.io/foundations/content-design/style-guide/word-choice)*

### Pronouns

#### Use second person pronouns ("you")

Use the second-person pronouns “you” and “your” to help the user to feel like the UI is talking to them and referring to their actions

![Offline error message saying "Your mail isn't available. Try checking your Wi-Fi connection."](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvw0sjq7-2_do.png?alt=media&token=13fc6d8e-55a8-4898-ab44-217d9f020378)

check Do
Write from the user’s point of view to help them take action

![Offline error message saying "Mail not available."](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvw0syqf-3_don't.png?alt=media&token=78c69643-4223-4472-adb2-f54ecd4a6400)

close Don’t
Avoid writing that sounds impersonal and robotic

#### Don’t combine first and second person

Avoid mixing "me" or "my" with "you" or "your.” It can cause confusion to see both forms of address in the same context.

!["Your photos" is used in the description of a photo wall to emphasize the user's perspective. ](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvw0u3xh-4_do.png?alt=media&token=7b64a118-f24c-4794-8d22-b40b66f129f6)

check Do
Write from a user’s point of view by emphasizing their perspective with “you” and “your”

![My' is used in the title and 'Your' in the description of a photo album.  ](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvw0ulcc-5_don't.png?alt=media&token=b376455f-e152-45ae-a835-03d3abb951a2)

close Don’t
Don’t mix different forms of address in the same screen. Instead, use “you” and “your” or get rid of the pronoun.

#### Use caution with “I” and “we”

When written on behalf of a large, global company like Google, “we” or “I” may come across as robotic or disconcerting.

Focus on the user’s point of view, rather than Google’s, and consider if it’s possible to rewrite a phrase without “we.”

!["We're glad you're our customer" is the title of a survey by Google.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvw0v2kh-6_don't.png?alt=media&token=ea6ca8e5-3d2f-4fe6-8c07-c89c5c64950e)

close Don’t
Don’t use first person pronouns to speak for the voice of Google

!["My latest episode" and "My best match" are the titles used in a video app.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvw0vkq4-7_don't.png?alt=media&token=b8d52b0b-ff81-4bed-abd5-b07a86c6ff00)

close Don’t
Avoid using first person pronouns. Write from the user’s point of view by using second person pronouns or removing pronouns altogether.

Some legal texts may merit an exception: “I” or “my” (the first person) emphasizes ownership in agreements or acknowledgments. For example, “I agree to the terms of service.”

!["I agree" is used in the description of an agreement checkbox to emphasize on user's ownership.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvw0w6qo-8_do.png?alt=media&token=a70e73db-071d-467b-acd7-5056bb1e6698)

check Do
First person pronouns can help users understand when they’re making impactful decisions

![A part of Google ad message says, "Plus, we can assist with setting up your first campaign at no extra cost."](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvw0wp6c-9.png?alt=media&token=c189ddff-0ce6-4b2e-8cda-6f765a3aa16f)

exclamation Caution
Use caution with “we” or “our.” Even when these pronouns represent real people employed by Google, seeing first person pronouns in UI text can be confusing or jarring.

### Grammar & Punctuation

*Source: [https://m3.material.io/foundations/content-design/style-guide/grammar-and-punctuation](https://m3.material.io/foundations/content-design/style-guide/grammar-and-punctuation)*

This style guide is specific to English-language UX writing. Google generally follows [Associated Press (AP) style](http://www.apstylebook.com/).

#### Skip periods and unnecessary punctuation

To help readers scan text, avoid using periods and other unnecessary punctuation.

Avoid using periods to end single sentences, particularly in:

- Labels
- Tooltip text
- Bulleted lists
- Dialog body text
- Hyperlinked text

Use periods on:

- Multiple sentences
- Long or complex sentences, if it suits the context

![Example of a period removed at the end of a short sentence on a snackbar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvw1bx75-1_do.png?alt=media&token=49473808-3f5e-4f13-9e4b-68acf3e173d2)

check Do
Omit punctuation on single-line sentences

![Example of a period used at the end of a short sentence on a snackbar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvw1cb1g-2_don't.png?alt=media&token=91961273-1401-4a9a-bcbb-d11929dbca96)

close Don’t
Avoid using periods to end single sentences

#### Use contractions

Contractions can make a sentence easier to understand and scan.

However, sometimes "do not" can give more emphasis than "don't” when caution is needed.

![Dialog with the title "You can't edit".](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvw1cv3h-3_do.png?alt=media&token=14b84237-7b1f-4c62-9694-48d80ed1453d)

check Do
Avoid spelling out words that can be contractions

![Dialog with the title "You cannot edit".](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvw1dc07-4_don't.png?alt=media&token=e292423d-dd45-4f49-a4fc-478476ce62d3)

close Don’t
Phrases that aren’t contracted can feel stiff or overly formal

#### Use serial commas

Use the serial (or Oxford) comma, except before an ampersand.

Always place commas inside quotation marks.

![Serial comma used in an information text containing 3 items. ](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvw1dyhn-5_do.png?alt=media&token=c50f89f2-bea5-47a7-bdca-26f95f2c5ca4)

check Do
Use a serial comma in lists of three or more items

![Serial comma not used in an information text containing 3 items. ](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvw1ed7j-6_don't.png?alt=media&token=9b5a0ba0-8e27-445c-9ff6-23fe8b329b4c)

close Don’t
Don’t skip serial commas before “and”

#### Use commas for numbers between 1,000 and 1 million

Use commas for numbers over 1,000. Don’t use commas when identifying something, such as a:

- Street address
- Radio frequency
- Year

For numbers over 1 million, comma use depends on context. “Million” can be abbreviated with with “M” and the value can be rounded when the intent is to give people a sense of the volume, rather than the exact numbers.

![Music app showing song with 23 million views, which is abbreviated to 23M](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8oz05jn-21.png?alt=media&token=9b1c6786-ebd5-42ae-854c-d788d5f790e2)

check Do
Abbreviate “million” with “M” and don’t use commas when giving people a sense of volume

![Restaurant with 1,185 reviews, without abbreviation](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8oz1etk-22.png?alt=media&token=ca82f651-b87d-4974-aee6-b025e80b05ed)

check Do
Use commas in numbers between 1,000 and 1 million

#### Skip colons in headings

For headings on lists of items, do not use colons. For lists within body text, use a colon.

![Colon used after the introduction statement for a list.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvw1foj4-7.png?alt=media&token=3ce33d02-1561-43d7-89ff-4006ce22cd9a)

Use colons for lists within body text

#### Use exclamation points sparingly

Exclamation points can come across as shouting or overly friendly. Some exceptions include greetings or congratulatory messages.

![Exclamation mark used after "Congratulations".](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvw1gcch-8_do.png?alt=media&token=462e9bee-5331-418c-b6db-2a451a4aaa4c)

check Do
Exclamation marks can be used to emphasize celebratory moments

![Exclamation mark used after a general statement.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvw1gqon-9_don't.png?alt=media&token=a9a0970f-f7d2-48a5-b28c-9fe00de5b8a5)

close Don’t
Avoid using exclamation marks for empty states and common tasks. Save it for bigger accomplishments.

#### Use ellipses sparingly

Use ellipses to indicate an action in progress or incomplete text. Truncated text may appear with ellipses, but check with your engineering partners before implementing, as this often happens automatically.

Don’t add a space before ellipses. Omit ellipses from menu items or buttons that open a dialog or start a process.

![A process indicator shows a 45% completion state.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw6vvbq3-10.png?alt=media&token=b59241c5-1bd2-42ca-b81f-8132491ee58a)

check Do
Ellipses show an action in progress

![A button as part of a form has text saying "Saving" following by an ellipses.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flw6vvnys-11.png?alt=media&token=3dcb8673-f961-4959-89ee-7cbdef285fb5)

close Don’t
Don’t use ellipses in buttons or menu items

#### Use parentheses to define terms

Parentheses can be used to define acronyms or jargon or when referencing a source. They shouldn’t be used when adding a side note or an afterthought of a sentence.

![Parentheses used to define an acronym.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvw1iyrb-12_do.png?alt=media&token=72acc438-cbae-4c33-9c45-fc10594fdd72)

check Do
Use parentheses to define terms and jargon

![Parentheses used for adding an additional thought to a statement.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvw1jbk8-13_don't.png?alt=media&token=bdaaf3c1-458f-4945-81cb-d564cf903bdc)

close Don’t
Don’t use parentheses to add extra thoughts. If information is needed, include it in the sentence without parentheses for easier scanning and improved comprehension.

#### Skip ampersands in body text

The “&” symbol can be used instead of “and” in headlines, column headers, table headers, navigation labels, and buttons. However, when there’s room, spelling out “and” can improve readability and make scanning easier.

“And” should be spelled out in sentences and paragraphs, before the final item in a 3+ item list, and in email subject lines.

![Ampersand used in a heading.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvw1k4wr-14_do.png?alt=media&token=5cb67d6a-698b-4a69-a830-ee53e9073126)

exclamation Caution
Ampersands can be used in headlines where there's limited space

![Ampersand used in an email subject line.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flvw1kjxl-15_don't.png?alt=media&token=bf9223a5-7753-4ca4-aa5f-9c1ceda9335c)

close Don’t
Avoid ampersands in email subject lines

#### Use dashes with caution

Dashes and hyphens can interrupt a sentence and lead to a fragmented experience, so they should be used with caution. There are three kinds of dashes:

- Em dash: —
- En dash: –
- Hyphen: -

Em dashes are best avoided in UX writing, as they indicate a break in the flow of a sentence that could be simplified using a comma, period, or new sentence.

Use an en dash without spaces to indicate a range, such as 9 AM–Noon.

![En dash used for time range.](https://lh3.googleusercontent.com/_uEKiaxHVr36LuimHph9UhsY6X7un_odiopV67BWVRIDx7n3H65LyW0EJgt4Tl3dKhFvdRjE23csT99bJpEgV2U9w9_UUl3GG5RxaWq2R_M=w40)

Use an en dash without spaces for ranges

#### Use hyphens with care

Hyphens can help readers better understand how words relate to each other by binding closely related words. They can also be used to represent negative numbers, such as -100. Spaces should never be used surrounding hyphens.

Refer to the [Associated Press (AP) style guidelines](http://www.apstylebook.com/) if you are unsure whether an adjective or noun phrase needs a hyphen.

| **Rule** | **Examples** | **Why** |
| --- | --- | --- |
| **Hyphenate adjective phrases** | Case-by-case basis<br>Best-in-class performance<br>Once-in-a-lifetime opportunity | When multiple words are used together as an adjective, they should be hyphenated |
| Cell phone number<br>Chocolate chip cookie | However, proper nouns and common, easily understood adjective phrases don't need to be, such as "cell phone number" or "chocolate chip cookie" |
| **Hyphenate noun phrases**<br>A noun phrase is two or more words acting as a noun. These phrases are hyphenated in certain cases: | Sign-off<br>Drive-through<br>Go-ahead | Hyphenate a noun phrase if it contains a verb followed by an adverb |
| Higher-up<br>Most-read | Hyphenate an adjective phrase that is functioning as a noun |
| Jack-of-all-trades<br>Stick-in-the-mud | Some noun phrases, especially long or complicated ones, are always hyphenated |
| **Don't hyphenate verb phrases**<br>A verb phrase is two or more words acting as a verb. These should not be hyphenated. | Look out for falling rocks<br>Please drive in and drop off your car<br>Check in to the room when you arrive | Don't hyphenate a verb followed by an adverb or preposition if it's functioning as a verb phrase. For example, "check in" would not need a hyphen when used as a verb, such as "check in to the room," rather than as a noun, like "the next check-in." Also, note that since "in" is a part of the verb, it can't be combined with "to" to form "into," since check into doesn't mean the same as check in to. |

#### Use italics sparingly

Italics typically aren't easy to read. When emphasizing text, use bold weight instead.

However, italics can provide unique emphasis when applied to a single word or phrase, like a name or title.

![Dialog with Home Laptop in italics while rest of supporting text is not italicized.](https://lh3.googleusercontent.com/42pWq0mBsdFkJrlzC1rJ1oHs7VN7rytF1eBefAGhysAj2pqHAL-7eb1Unj9WW85YulRhkN6CVmJr1HLm7p2mii1BrWCdk3wrjRMR2pLYc80=w40)

check Do
Italicize a word or phrase

![Dialog with all supporting text in italics.](https://lh3.googleusercontent.com/c-DQ4Mos-YLcOuXNoWqyBApON-EiQNjHOs1e_iK1zKQ5C5vMXXWag_N8jVeD_Q3cgk8Mkhrd3ccBiCfPUkYZJbRIpxaOJeNIMJuY2J02cVv75g=w40)

close Don’t
Don’t italicize a sentence

#### Don’t use caps blocks

Avoid using caps blocks altogether; they're not accessible.

![UI for Maps showing description of a location with a single word in a caps block.](https://lh3.googleusercontent.com/ElbtD5F0JQXkNS2BO-eGlEZYyKImcg6scBro3-dwI-n-x8ksTbE3NbHqGiPC7nAxB0CSU9msT6q5U-OddRL2BMPRDjT6tLYQdhHf91ApGAn9Qw=w40)

close Don’t
Don't use caps block. Use sentence case for all product text.

---

## Customization & Design Tokens

### Customizing Material

*Source: [https://m3.material.io/foundations/customization](https://m3.material.io/foundations/customization)*

![Examples of 4 identical mobile UI screens using 4 different color sets](https://lh3.googleusercontent.com/l0kBY1USjWKqLXAIJUw0vNTbHKaOtWvOaXQ8Z56N8t4tYG-i5o4I3L9B2utKC1vZ8fQ_Z7eyluDSgXCATDbKQpYKnzzdh1S_UXdK3rgzK0I=w40)

### Dynamic color makes personal devices feel personal

M3 opens up new possibilities for both brand colors and individual color preferences to converge in one-of-a-kind experiences. The color system embraces the need for color to reflect an app’s design sensibility, while also honoring the settings that individuals choose for themselves.

By enabling dynamic color, an app can retain the colors that define and differentiate a product, while also giving users more control over the styles that matter most to them.

##### Applying a brand color system

With dynamic color and M3 color schemes, your app’s colors automatically adapt and integrate with user settings.

M3 supports systematic applications of custom parameters to help define and maintain the styles that convey your brand.

The color system automatically handles critical adjustments that provide accessible color contrast, legibility, interaction states, and component structure. Dynamic color also works for custom (non-Material) components.

![Animation showing 3 different source colors cascading through a UI to recolor elements on the screen](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fkuob4wl9-m3_Color-hiRes.gif?alt=media&token=1cd5b57b-ab91-4dca-9fe9-43011d9f2cde)

Apps can take on an array of colors from baseline schemes, user-generated dynamic colors, or custom colors

### Get started

To take advantage of personalization features, you’ll need to **build a custom color scheme with the M3 color system**.

In order for your app to respect a user's device and app-level settings, **you'll implement a custom theme that user-generated color schemes can map to**.

Additionally, using a custom theme ensures that your app has a fallback color scheme available for users who don't enable dynamic color.

![collage of views of a mobile UI that show a user's setting and preference for a green primary color flows through system UI harmoniously](https://lh3.googleusercontent.com/4UkK7WPkGF34M64YsnpmKQSmBeoJm1TqBbbNIWgHivMGGydJZLLyT4ihwR0TsiiG_mcovyLhOvGYdrYhn7UPHpDZMXzCx6WBRkmjPHySkM2F=w40)

A user-generated color scheme can flow through apps that use a custom theme

#### Set-up and tutorials

Dynamic color is both a user setting and a developer choice. You can apply dynamic color selectively to work alongside your brand color scheme. For example, a profile or account screen in your app can reflect a user’s color scheme settings, adding individuality to a personal space in an app.

##### Set-up

- Your existing brand parameters can be integrated with Material Design for consistent application across your product
- You can also start from scratch with Material Design and create a new, complete color system for a project

##### Dynamic color tutorial

The [dynamic color codelab](https://goo.gle/visualize-dynamic-color) is a hands-on walkthrough that helps visualize how designs and brand colors interact with dynamic color. It helps take you to the next steps in applying color to your designs using the [Material Theme Builder](https://goo.gle/material-theme-builder-figma) plugin for Figma.

##### Material Theme Builder

With built-in code export, the [Material Theme Builder](https://goo.gle/material-theme-builder-figma) Figma plugin makes it easy to visualize your designs, migrate to the M3 color system, and take advantage of dynamic color.

The Material Theme Builder creates **color and type tokens** that can be exported into multiple code formats. Tokens are an important tool for creating and maintaining a source of truth for style values. The Figma plugin creates tokens in the form of Figma styles to connect with existing mock-ups, brand style guides, and even design systems.

![Example of the start screen for the Material Theme Builder Figma plugin. The plugin UI is shown alongside a range of purple tones as an example of a color palette that can be generated.](https://lh3.googleusercontent.com/7geIR4r6fJRbDja4YLYpoyn2BiZtjp_s-MJvrJZXNGKRw8mUt7GCeBj3BeCaViBz8S89DA6zq5P835YGXGVT3q-0iQoTwjdJEGLBNt50tkpF=w40)

The Material Theme Builder Figma plugin helps you create custom color schemes and export to multiple code formats

### Custom color schemes

The Material Theme Builder helps create custom color experiences, whether you're working with established brand parameters or have yet to define your app's colors.

In the Material Theme Builder you can identify and input one or more color to define your color scheme. Adding a second or third color is optional and will influence the resulting color scheme.

Mapping your app colors to the custom scheme's source colors aligns the roles and logic of [dynamic color in M3](https://m3.material.io/m3/pages/dynamic-color/overview).

**Brand colors** can be added to the tool as a single-use color or as a complete brand palette with a range of tones that lend consistent, comprehensive color expression across your app.

If your app uses a single brand color or a limited brand palette, you can input your primary brand color as your custom color scheme's source color. The input color will be used to generate a scheme that provides you with complementary tones to round out a scheme.

![Four color swatches are seen first in isolation and then as inputs to the material theme builder UI. Then, the color inspiration and typeface combine in a final UI for a plant brand app.](https://lh3.googleusercontent.com/20rsancFoe-o-GeacNloK_tKMfa2E1ZYsJCkN4OqICgjrodGJXqXhWOw6Moan2UooPZ8LzfgmtCCHY-7gsBCmP64yPNUYPIoul4u4GmvHIS9=w40)

Examples of brand attributes (left) that can be used to generate and apply a dynamic color scheme (right)

#### Color roles

Depending on the purpose in a UI, key colors are assigned roles that map to elements in components. The five essential color groups with role assignments are:

- Primary
- Secondary
- Tertiary
- Neutral
- Neutral Variant

An input color generates a tonal palette that's used to fill the range of color roles needed, such as primary, on-primary, and primary container. [Learn more about using color roles](https://m3.material.io/m3/pages/color-roles/)

![A mobile UI is seen with diagram labels showing where specifc elements have been mapped to specific colors, such as on-surface, or primary.](https://lh3.googleusercontent.com/kqa_LNBbbacJHfLL5ADPfJIcqHAeVIz3KMqy2PFGFHqQz5ir51Ww0APxKJt5J7EfRehqidtv4kxSlvmx5Je3A5jmH_y_jXbHWGIwsGyTINBP=w40)

Examples of color roles in the Plant Care UI mapped to design tokens

### Design Tokens Overview

*Source: [https://m3.material.io/foundations/design-tokens/overview](https://m3.material.io/foundations/design-tokens/overview)*

- Tokens point to style values like colors, fonts, and measurements

- Use design tokens instead of hardcoded values

- Each token is named for how or where it’s used (for example, **md.comp.fab.primary.container.color** sets the container color for a FAB)

- Even if a token’s end value is changed, its name and use remain the same

![FAB container color token in a design mock, code, and product](https://lh3.googleusercontent.com/c9vp62g9BTHZ795In-3SH01cvbjuaHUgu67bdrisAMsV34Z_J2DjSxlSbuJj1eKq_lp4na46QCwYpX0HTDXqYWAMdGDn272etcMj8QU__laE2A=w40)

Using design tokens instead of hardcoded values can streamline the work of building, maintaining, and scaling products with a design system

### Resources

| Type | Link | Status |
| --- | --- | --- |
| Design | [Design Kit](http://goo.gle/m3-design-kit) (Figma) | Available |
| [Material Theme Builder Figma plugin](https://goo.gle/material-theme-builder-figma) | Available |
| Implementation | [Material baseline theme and tokens](https://github.com/material-foundation/material-tokens) (DSP) | Available |

### What’s a design token?

Design tokens are small, reusable design decisions that make up a design system's visual style. Tokens replace static values with self-explanatory names.

A design token consists of 2 things:

1. A code-like name, such as **md.ref.palette.secondary90**

2. An associated value, such as **#E8DEF8**

The token's value can be one of several things: A color, typeface, measurement, or even another token.

![Token md.ref.palette.secondary90 with arrow pointing to lilac color swatch #E8DEF8.](https://lh3.googleusercontent.com/Bknc9M3GEXT1mJKs0VEe_nz3SYJfp1jIUTB9Zu7QfDehLklj2o8KiaX2bWYh0MO_IkzOyIKHXLW3xuIZaui8e2mKYCAOy8wzg6VYF-m-LAA=w40)

Example of a reference token and its color value

Design tokens meaningfully connect style choices that would otherwise lack a clear relationship.

For example, if a designer's mock-ups and an engineer's implementation both reference the same token for the “secondary container color,” then they can be confident that the same color is being used in both places. This applies even if the hex value assigned to that token gets updated.

![Diagram of FAB indicating system tokens: Secondary for surface color and on secondary for icon color](https://lh3.googleusercontent.com/-2T43IjyCiZsBPO6YWZyjpxusIkShHOR9XwlIRkYdzfv821dNieHThO9QXoqXebE7OtOvUUWQ_5sS2A2uOB-J4sX3-15nngWQvDXuZCWej_Z=w40)

Example of tokens assigned to the secondary and on secondary color roles of a FAB’s container and icon, respectively

### Why are tokens important?

Tokens make it possible for a design system to have a single source of truth – a repository where style choices are recorded and changes can be tracked.

Because tokens are reusable and purpose-driven, they can define system-wide updates to themes and contexts. For example, you can use tokens to systematically apply a high-contrast color palette for improved visibility, or change the typographic scale to ensure that text is legible on a TV screen.

By using tokens for design and implementation, style updates propagate consistently through an entire product or suite of products. They also help designers and engineers "speak the same language,” reducing confusion during handoff from design to implementation.

![Diagram of how changing the value of a token cascades from design system into a product area and 3 products](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fkudi7oge-kpzr9qtu-tokens-why-importan%20(1).gif?alt=media&token=142f8c9b-0d26-48b6-a660-800be473b1af)

As design systems evolve, certain values will change. With design tokens, we can track changes and ensure consistency across our products.

### Deciding if tokens are right for you

##### **Tokens will be most helpful if:**

- You plan to update the design of your product or are building a product from scratch
- Your design system is applied across a suite of products or platforms
- You want to make it easy to maintain or update styles in the future
- You want to get the most out of the Material Design system, including features like dynamic color

##### **Tokens will be less helpful if:**

- You have an existing app using hard-coded values that is unlikely to change in the next year or two
- Your product does not have a design system

### Tokens & Material Design

In the past, Material styles were communicated through guidelines, design files, tools, and platform-specific component libraries.

With design tokens, you can now download, customize, and apply Material styles and integrate them across your design and development process.

Tokens allow decisions to be documented in a platform-agnostic and shareable format.

![Diagram of design token connected to design tool and platform code](https://lh3.googleusercontent.com/EKKzA023VSYZyglmlsQaMzNiDHpIB7GJi0JYVqOaKoYpbScua34HgJLWUi4abFbFvL3Nl5Ysyw-VAdugxXzR-FU5zfZ-sZLWoBLr-r5wsRG6=w40)

Design tokens provide a central repository for design choices, with a variety of integration points for engineers and designers

On this site, you’ll see tokens listed in interactive modules.

These modules let you quickly look up the default baseline value stored by tokens for color, font, font size, font weight, etc. They also show the relationship between a role, its system token, reference token, and stored pre-set value.

![A token module for the color system with 4 color swatches for the primary color set.](https://lh3.googleusercontent.com/MotwH3S7yKjoXqs5e2mDbXUwU6EoU3pN4RAnRIMDVOUnqoAO5PBSL5iEyu2fG7q7X25CjzVsYiNv1VoblTEfYAQgHZpX0Qd6iGZ5CcQcwhzC=w40)

Example of a token module

You’ll also see tokens in the specs tabs of component articles.

Tokens are first grouped by **state** (enabled, disabled, hover, etc) and then by **element**, which is the part of the component that a token or value applies to, such as the container or label text.

Columns include:

- **Name**– The component style aspect that the token applies to, such as color or font
- **Token ID** – The token defining the component style aspect
- **Description** – Optional descriptive info
- **Context/value** – The value stored in the token for a given context

![A token module for an elevated button organized by state (enabled, disabled, etc), then element (container, label text).](https://lh3.googleusercontent.com/blyXX25f2X086gJuC8nsR2Ka_UKdrEdTnHMwB0MmS5OhLAm6Mr1xJ_N1g_SA0SIdh38o_nKitS2dfo3clAVKc3EYFBodlpOScPWVLZQ7Axe-=w40)

The diagram and token module for elevated button

#### How to use token modules

Let's say you need to verify the color role for a filled button's label text.

Navigate to Common buttons > Specs, find the token module for filled buttons, and search for the "label text" tokens under elements.

Copy the color token and paste it in code, or compare it to the color role in Figma.

![How to find the label text color token.](https://lh3.googleusercontent.com/fpDbiFzrd8uG-JaTJJ8KBzsUeKOAUj3BH8Iv9YwsxGwcB7-jSSf6a127iDeYKS-QvDaL5I6wymDQ8S80XZQCDmqL6uzFQ0rf1WPPWRwk7ta4=w40)

Diagram and token table for filled button label color

### Parts of a token name

The parts of a token name are separated by periods and proceed from the most general information ("md") to the most specific ("on-secondary").

1. All token names in a design system start with the system name (such as “md” for Material Design)
2. An abbreviation for the token class: “ref” for reference tokens, “sys” for system tokens, and “comp” for component tokens
3. The token ends with descriptive words communicating the token’s role

![Diagram of the 3 parts of a design token name: system prefix, token type, and role description](https://lh3.googleusercontent.com/ELaR3gkzDVBDyQd2BLSaPqSgYm-MbQfELTFmqL2bmbKNWZSWqkDcPmb8c8E68DbF5lVdaJkt7ZXnewSDAHd7NvqZ1K6HEb5VITuO1lsb0AZC=w40)

1. Communicates design system
2. Communicates token class
3. Communicates token’s purpose

### Classes of tokens

There are three classes of tokens in Material:

1. Reference tokens

All available tokens with associated values.
2. System tokens

Decisions and roles that give the design system its character, from color and typography, to elevation and shape.
3. Component tokens

The design properties assigned to elements in a component, such as the color of a button icon.

With three classes of tokens, teams can update design decisions globally or apply a change to a single component.

![Color value stored in reference token stored in system token, stored in component token, appearing as the container color of a FAB](https://lh3.googleusercontent.com/-_3g9qggRt-nlWlYvWdW1T_gpm6ra7Rz9IPWjBjYYkhHJp1Vs0awKPz12P9QQdiwt5hIScJjfbbFeB4nwa0hYgocU0qWdCLOgPZ8ElWwuKqubQ=w40)

A button that receives its container color through a system of three tokens that define scalable color values. The color tokens point to a specific hex value that can easily change without impacting the token syntax.

#### Reference tokens

These tokens make up all of the style options available in a design system.

They usually point to a static value – such as a color hex code or font size – but can also point to other reference tokens. Reference tokens don't change based on context.

By providing a list of options, reference tokens give your team a starting point of approved colors, typography, measurements, etc.

All reference tokens start with the prefix **ref**.

![Token md.ref.palette.secondary90 pointing to #E8DEF8. Toke md.ref.typeface.plain-medium pointing to Roboto Medium](https://lh3.googleusercontent.com/cDiHf197RUviZB0cVugMQ610kBthFcsT6dKRcL62hYeJKXztvKAbHkhYSZ6fG6llh29-wBpe9_LVeqJ709s9v4gRdyHBPxo7PlBfMEfYMYY=w40)

Color and typography reference tokens and their values

#### System tokens

These are the decisions that systematize the design language for a specific theme or context.

System tokens define the purpose a reference token serves in the UI.

This is where theming occurs. The system token can point to different reference tokens depending on the context, such as a light or dark theme.

Whenever possible, system tokens should point to reference tokens rather than static values.

All system tokens start with the prefix **sys**.

![System token md.sys.color.secondary-container pointing to token md.ref.palette.secondary90 pointing to #E8DEF8. System token md.sys.typescale.label-medium.font pointing to token md.ref.typeface.plain-medium pointing to Roboto Medium](https://lh3.googleusercontent.com/reBkkzgx8GvOAJHnEJX20XF1y-lxMvYAmVvySpWxhkHSkUX-oU_NAmLxDGPGgLMMnQ1KYkCdfe9EqHIYMddFYnHOY-YHW8rNEQRR_bn8mw4u2Q=w40)

System tokens, reference tokens, and their values

#### Component tokens (in development)

These represent the elements required to compose a component, such as containers, label text, icons, states, and their values such as size, shape, color, or elevation.

Whenever possible, component tokens should point to a system or reference token, and not contain hardcoded values such as hex codes.

Not every stylistic choice of a component will be able to be expressed as a token, but whenever a design choice applies to multiple components of similar intent, a token should be used.

All component tokens start with the prefix **comp**.

![Extended FAB component tokens for container color and label text pointing to system tokens, pointing to reference tokens, pointing to resolved values](https://lh3.googleusercontent.com/FGD2VI87BOga9gqJRH3c_n5bOlpJ3fnEfaRcJrx3ewx6NmvRHK5pL4A2yba64JVgd5aDUzN9x_mQ3PDmUt6kBDNHKe26x4DmktH3m9Ubqr6S=w40)

Component tokens, system tokens, reference tokens, and their values

### Contexts

Tokens can point to different values depending on a set of conditions. These conditions are called contexts and their resulting values are called contextual values.

Examples of different contexts include: device form factors, dark theme, dense layouts, and right-to-left writing systems.

You can think of a context as a kind of tag. If a token value is tagged with dark theme then it will override the default token value in a dark theme context.

![Diagram of system token for background color pointing to different values depending on the theme context](https://lh3.googleusercontent.com/Zcuumtw10MHbA9FVmp00u1rqG--CKiX0l92dlLyWwXv9dJ3aTEEUsO98MkMRHlNEKjNWZ3s74t0ckaAbEt37HBwkBaS2FRk10ArgeVN5l2NDvQ=w40)

The same system token for background color can point to different reference tokens depending on the context: Light theme or dark theme

---

## Interaction

### Gestures

*Source: [https://m3.material.io/foundations/interaction/gestures](https://m3.material.io/foundations/interaction/gestures)*

- Gestures help people navigate, take action, or transform content

- UI elements should respond to gestures in real time

- Tap, scroll, and swipe are common gestures

### Resources

| Type | Link | Status |
| --- | --- | --- |
| Design | [Design Kit (Figma)](http://goo.gle/m3-design-kit) | Available |

### Types of gestures

#### Tap

People can navigate to destinations and interact with elements through touch.

Tapping a card opens an article

#### Double tap

Two quick taps allows people to zoom in and out of content.

Double tapping on a photo opens it to full screen

#### Long press

People can access additional functionality by pressing on elements for an extended time.

Long pressing a list item selects it

#### Scroll and pan

People can slide surfaces vertically, horizontally, or in any direction to move through content.

Vertical scrolling reveals more content

#### Swipe

People can navigate horizontally to:

- Switch between peer views like tabs

- Complete actions

Swiping a list item can reveal additional actions

#### Predictive back

On Android, a person can swipe left or right on certain components as a way to navigate to a previous destination. This gesture is called [predictive back](https://github.com/material-components/material-components-android/blob/master/docs/foundations/PredictiveBack.md).

Before completing the swipe, the person can decide to continue to the previous view or stay in the current view.

Compatible components are:

- Bottom sheet
Bottom sheets show secondary content anchored to the bottom of the screen.
[More on bottom sheets](https://m3.material.io/m3/pages/bottom-sheets/overview)

- Navigation bar
Navigation bars let people switch between UI views on smaller devices.
[More on navigation bars](https://m3.material.io/m3/pages/navigation-bar/overview)

- Navigation rail
Navigation rails let people switch between UI views on mid-sized devices.
[More on navigation rails](https://m3.material.io/m3/pages/navigation-rail/overview)

- Search bar
The search bar is a persistent and prominent search field at the top of the screen.
[More on search bars](https://m3.material.io/m3/pages/search/overview)

- Side sheet
Side sheets show secondary content anchored to the side of the screen.
[More on side sheets](https://m3.material.io/m3/pages/side-sheets/overview)

A predictive back swipe on a bottom sheet goes back to the previous screen

#### Drag

People can move elements around and slide surfaces in and out of view.

A list can be reordered by dragging a list item

#### Pick up and move

A long press and drag allows people to reorder content.

A calendar event can be picked up and moved to a new time

#### Pinch

People can scale surfaces to navigate between screens.

A photo can be pinched outward to a full screen view

#### Compound gestures

People can fluidly transition between various gestures, like panning and pinching in a map view.

A map UI can be navigated through a combination of pan and pinch

### Inputs

*Source: [https://m3.material.io/foundations/interaction/inputs](https://m3.material.io/foundations/interaction/inputs)*

- Design for touch, keyboard, and mouse interactions
- Embrace multiple input methods and gestures within your app

![Editing interface on a large screen device. The selected text is highlighted and the text cursor is visible.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwvoasbb-1.png?alt=media&token=2706b8e6-4f43-4a00-9f8c-313bf1ca33d1)

Designing for inputs allows people to use the inputs they prefer, like a mouse to highlight text on a tablet

### External inputs for devices

People can use external inputs like a mouse, keyboard, or stylus with their phone, tablet, foldable, TV, laptop, or desktop computer. When someone connects an external input to their device, they expect it to behave in familiar and useful ways. Designing for different input methods can make a product more usable and accessible on all screen sizes.

#### Common features of external inputs

##### **Mouse**

- Left and right click
- Mouse wheel
- Extra buttons

##### **Trackpad**

- Left and right click
- Gestures
- Haptics

##### **Physical keyboard**

- Replaces virtual keyboard
- Media keys
- Modifier keys

![Image of a mouse.](https://lh3.googleusercontent.com/EDnkwobNdIi9JnBJEISCm5eYhpIWsgVN2S_ZihqgFHsP7nILBYc1UC82xXCpptPSTQ9pgxBTFOGtAV0xHX_TzOrnyu-sstE1aqQhvG61pK4=w40)

![Image of a laptop keyboard and trackpad.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwvoce8y-3.png?alt=media&token=858a71ae-a1ab-403a-adb6-074566f3b0b0)

![Image of a keyboard.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwvocxli-4.png?alt=media&token=fe5784ee-f092-40d6-9c96-4b3b6e1b4a10)

#### Input device behaviors

Depending on the input device, designers and developers can implement behaviors that meet standard conventions and user expectations.

| Input device action | Anticipated behavior |
| --- | --- |
| Mouse and trackpad movement | Show a mouse cursor on the screen |
| Primary click | Treat mouse clicks differently than touch events |
| Secondary click | Activate context menus |
| Hover | Change component states |
| Highlight | Allow text to be selected by the mouse cursor |
| Mouse wheel and trackpad two finger drag | Scroll list vertically and horizontally |
| Trackpad pinch | Zoom an element or page |
| Physical keyboard | Hide and show on screen keyboard |

### Mouse and cursor interactions

When an external mouse input device is used, a mouse cursor should be shown, regardless of the device type.

A mouse may be connected to tablets, laptops, phones, foldables, and more. On some devices, it's possible to use an external input device simultaneously with touch input.

On devices that don't specifically recognize mouse or stylus input, the mouse is treated as touch input.

#### Primary click

A mouse click or stylus tap should demonstrate the same feedback as touch input. One example of this is showing the ripple for a pressed state.

![A view of a display with a visible mouse cursor.](https://lh3.googleusercontent.com/Cb5WD95kLIK5F45ql60cUftzpvrvxGv8UxPGKAQCkKOdBFnZJ1zMtrQR8zKkTi7R4Gh_-jmKSWccF5DlfUXp12m7AwMcHfzXmvaj3T9JYDAZ=w40)

A visible mouse cursor is seen when the external input is connected

#### Secondary click

##### Context menus

A secondary click (whether using a single button or two fingers on a trackpad) should activate a context menu. The context menu shows additional options for the object that's clicked. See [menus](https://m3.material.io/m3/pages/menus/overview) for more usage and guidelines.

![A context menu pop up from a link with the options: Open link in new window, Save link as, Copy link location, and Inspect.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwvoetuu-6.png?alt=media&token=a1d1943b-8906-4e9f-96bd-e23ba631d331)

The context menu should appear when right clicking with a mouse or trackpad

#### Hover

When using a mouse cursor, help users discover interactive objects by enabling visual changes. When the mouse rests on an interactive element, the hover state is a valuable cue for interaction. See [states](https://m3.material.io/m3/pages/interaction-states/applying-states#71c347c2-dd75-485b-892e-04d2900bd844) for styles and guidelines.

Hovering with a cursor (or stylus) should also invoke tooltips when applicable. See [tooltips](https://m3.material.io/m3/pages/tooltips/overview) for guidance.

![Icon button, floating action button, and menu items in their hovered and not hovered states.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwvofwmm-7.png?alt=media&token=c01eebb6-93d7-4e40-8156-947c480b8840)

1. Components without a hover state
2. Components with a hover state change applied

#### Cursors

Cursors appear when using external input devices like a mouse or trackpad. The cursor can change to communicate more information about interactive elements.

##### Pointer

By default, external input control should be rendered as a pointer.

![A cursor rendered as a pointer.](https://lh3.googleusercontent.com/MW8dKSHxn8lhooyCbNv66f5sACoziJe1wryABcQYzei0NB1QJHHHVqdgbSGRxVZWTaKG6OQ4cAwu1HAwUEN_eDJNYFdK8kegwkE4wVpABLjK=w40)

1. A pointer provides a visible indicator for input controls

##### Hand

The cursor should appear as a hand to indicate links or linked images.

![A link cursor (hand) shown when hovering over a linked image.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwvogkod-8.png?alt=media&token=d6119250-af14-4742-b20d-8f562a50274d)

1. The hand cursor is used for links and clickable images

##### Resize arrows

The cursor should change to resize arrows on the boundaries of resizable elements.

![A cursor at the edge of the screen as resize arrows.](https://lh3.googleusercontent.com/aRwe1YYgXEjJUzdpUE4zmut0gi_yxDBXooTLnGjJBam3RQxVhs2a49MKfwHQ8twxxBhfI2BBaK0ND-BaR9fLS1czLbpsxQDpYvUMTnnkGlc=w40)

1. Resize arrows indicate an element can be resized

##### I-beam

The cursor should appear as an I-beam when hovering on text. When manipulating editable text, the following interactions apply:

- Single click places the cursor

- Double click selects a word

- Triple click selects a paragraph

- Single click deselects text and repositions the cursor

![I-beam cursor hovering over selectable text.](https://lh3.googleusercontent.com/E5W_SctCrkKHCihIzCBXv5u805M6wtGVi3yUbX0aLhjAeI20kCi0iiEW7cC9D6ESJCGpjeIj7yxEtXpwaL20A8kzMlwF0yDx6HTcAfD2ZaQ=w40)

1. An I-beam cursor indicates selectable text

#### Text selection

When selecting text using a mouse, trackpad, or stylus:

- Highlight the selected area using a single color

- Don’t show touch controls next to the highlighted area

![Highlighted text in a single color.](https://lh3.googleusercontent.com/eubJ_19rLe9XCTY6isagTFwSDbS7CJ7cX0Cq1RREujdf6UYnHObBD2JkGz243IXVgGvLHghQxkZ7dGF4VlOxz9_q1wjLdf7XgiJlIXPv17OW7Q=w40)

1. Selected text shows a visible highlight

#### Text selection with touch control

When interacting using touch, always show touch controls, even if other inputs are connected.

When using a mouse, trackpad, or stylus, show the I-beam and context menu, even if it's a touch device.

![Touch controls are produced on selected text, with mouse and trackpad detected.](https://lh3.googleusercontent.com/xoKyWfrnOMhrSuigyo4npW9rNQIFurShW01IyOXNrkuYzbIrcj68iuZkXMDrO-aziTXQhk5ZOT-SPutDWlR9wumV1VjP6lTq5jwE2cpEPleH=w40)

When using a touchscreen to select text, show touch controls

![Selected text with a context menu, with mouse and trackpad detected.](https://lh3.googleusercontent.com/kalcMGlh7aH93geQ13BxCGUrfw2CvcwnPgHoh-XOSBfE-1g9ZCPCkv1fT84HLFASoOnWFb6MjXSBNiEFEGWXCDHourlTUpsxFwIEVFfCn13l=w40)

When using a mouse, trackpad, or stylus to select text, use the right-click context menu

#### Stylus input

When using a stylus, cursors are usually not necessary, unless they communicate tool properties such as brush size or shape.

![A cursor rendered as a circle.](https://lh3.googleusercontent.com/3EzjVm189HykitEGTOdtrYA8VZNhYTSJwWcXtLiP2DzGuC2vxDeeR21k8ixi3Dl1BSlkS7Z0-BhYiHyDqKWJc73KpFG8lg-XWkQUL88MMUli=w40)

1. The circle cursor indicates the selected stylus tool and size

### Mouse wheel and trackpad gestures

When an external mouse or touchpad is used, the mouse wheel and trackpad gesture allow more actions.

#### Vertical scroll

When a cursor is positioned on a list, the mouse wheel and two-finger touchpad gesture should allow vertical scrolling of the list.

Scrolling a vertical list using the mouse wheel or trackpad gestures. Note that only the detail panel under the cursor scrolls.

#### Touch scroll & mouse text selection

Upon touch and drag gesture, the text area will scroll. With a mouse interaction, dragging in a text area will select the text.

On a touch screen, dragging upward scrolls the field down

When using a mouse, dragging upward selects text and images

#### Horizontal scroll

Mouse users should be able to scroll with a mouse wheel to navigate horizontally scrolling fields. Trackpad users should be able to scroll using a two-finger horizontal gesture.

Carousels can scroll horizontally using a scroll wheel or trackpad

### Physical keyboard

When a physical keyboard is connected to a device, either externally or as a built-in laptop keyboard, users should be able to perform any actions that the virtual keyboard provides, and more.

#### Show and hide virtual keyboard

A virtual keyboard should appear or hide in response to the presence of a physical keyboard.

![Text being entered into a field with no on-screen keyboard displayed.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0b7vzhy-19.png?alt=media&token=7ae7282f-1e8d-4ce9-9fd5-7423bcf4e498)

check Do
When a physical keyboard is attached, hide the virtual keyboard

![Text being entered into a field with an on-screen keyboard.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0b7w8fa-20.png?alt=media&token=51ece2e1-122e-45bc-9c5d-7ddf5a72ba7d)

check Do
When a physical keyboard is removed, show the virtual keyboard

#### Common keyboard interactions

##### Enter key

People typically expect the **E** **nter** key on a physical keyboard to be enabled by developers to allow a common function like sending a message.

The **Enter** key typically triggers actions like sending a message

##### Spacebar control

People typically expect the **Spacebar** (or available media keys) to be enabled to play and pause music or video.

Pressing **Space** usually pauses and plays media

##### Tab focus

When keyboard users navigate a page using **Tab**, the focus on interactive items must follow a logical order. On most pages, that means left to right, top to bottom.

When focused from a keyboard or other input device, the focus state includes a ring-like keyboard focus indicator.

![Tab focus is on “small,” which is one of four size options for sweatshirts at an online store.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0b7yvt7-23.png?alt=media&token=0461477f-c0fb-48d3-b29b-fd0a463524c3)

Tab focus includes a visible keyboard focus indicator

![Tab focus is on “medium,” which is one of four size options for sweatshirts at an online store.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0b7zlqx-24.png?alt=media&token=ebdbbf64-30b6-48f0-9195-7278153eb547)

The focus state moves elements as the user presses **Tab** on their keyboard

##### Escape key

People typically expect the **Escape** key on a physical keyboard to dismiss elements, remove focus, or clear selections.

The **Escape** key should dismiss any visible modal elements like menus, dialogs, or bottom sheets

The **Escape** key should remove any visible focus indicators and set the focus order to 0

The **Escape** key should remove the text cursor when typing, but should not remove already-typed text

### Selection

*Source: [https://m3.material.io/foundations/interaction/selection](https://m3.material.io/foundations/interaction/selection)*

- Selection is shown through changes to surface color or other visible elements
- An entire component can be selected, or just certain parts in a component
- Selection can be performed via tap, cursor, keyboard, or voice

### Resources

| Type | Link | Status |
| --- | --- | --- |
| Design | [Design Kit (Figma)](http://goo.gle/m3-design-kit) | Available |

### Selection indicators

Selections are displayed using a check mark icon, a checkbox component, a change in surface color, or a combination.

Selections are inherited by the following components:

- Cards
- Checkboxes
- Chips
- Data tables
- Icon buttons
- List items
- Menu items
- Pickers
- Radio buttons
- Segmented buttons
- Sliders
- Switch

![Seven types of selected  components.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm1qhf1tb-1.png?alt=media&token=f7a2e8d1-09f7-4b98-acfb-ee5b4536933b)

Selected components:

1. Segmented buttons
2. Chips
3. List items
4. Checkboxes
5. Radio buttons
6. Switch
7. Slider

The following components use an active indicator to represent which item is currently selected:

- Navigation bar
- Navigation drawer
- Navigation rail
- Tabs

The color and shape of the active indicator varies between components. In these components, only one item should be selected at a time.

![Tabs and navigation drawer with one destination item selected. Selection is identified with an active indicator.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwvowprh-2.png?alt=media&token=92cf2e82-6fc5-4fd0-a0a3-815191a386ca)

Selected components with active indicators:

1. Tab
2. Navigation drawer

### Types of selection

#### Touch

On touch devices, select items using:

- Long press touch or two-finger touch
- Selection shortcut, if available, such as tapping an avatar

Items in a list selected via touch

#### Entering and exiting selection mode

To select an item and enter selection mode, long press the item or use a shortcut, such as tapping the item’s avatar. To select additional items, tap each of them.

To exit a selection mode, tap each selected item until they’re unselected, or tap an action on the toolbar.

Entering and exiting selection mode

#### Larger selections

To select multiple items simultaneously, long press and drag across items. Don’t use this gesture combination if it is already in use to pick up and move items, like cards.

check Do
**Long press** and **drag** can be used together to select items in batches

close Don’t
If the **long press** and **drag** combination is already in use to pick up and move components, like cards, then the combined gesture can’t also be used for selecting items in batches

#### Click

On desktop, checkboxes are always visible when selection is the primary activity. When selection is secondary, checkboxes (or other indicators) are displayed:

- As a single checkbox for that item on hover
- For all items after one item is selected

To make a selection, hover over an item to reveal a checkbox. The checkbox can then be clicked.

Checkboxes are visible by default in this table because selection is a primary activity

### States Overview

*Source: [https://m3.material.io/foundations/interaction/states/overview](https://m3.material.io/foundations/interaction/states/overview)*

- States have two visual indicators to ensure accessibility
- States can be combined, such as selection and hover
- Apply states consistently across components

### Resources

| Type | Link | Status |
| --- | --- | --- |
| Design | [Design Kit](http://goo.gle/m3-design-kit) | Available |

1\. [Enabled](https://m3.material.io/m3/pages/interaction-states/applying-states#39b2fc90-01db-41b5-b6f8-47be61ed1479) An enabled state communicates an interactive component or element.

2\. [Disabled](https://m3.material.io/m3/pages/interaction-states/applying-states#4aff9c51-d20f-4580-a510-862d2e25e931)

A disabled state communicates an inoperable component or element.

![Enabled button has a strong contrast between container and text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2n4rwz-1p-Enabled%20button.png?alt=media&token=d51bf56c-de76-4d8c-bcb7-29ef54bf1dd8)

Enabled button

![Disabled button has low contrast grey text on grey container.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2n5ghx-1p-Disabled%20button.png?alt=media&token=29088245-b4e1-4c89-8be5-2bd64aafca55)

Disabled button

3\. [Hover](https://m3.material.io/m3/pages/interaction-states/applying-states#71c347c2-dd75-485b-892e-04d2900bd844)

A hover state communicates when a user has placed a cursor above an interactive element.

4\. [Focused](https://m3.material.io/m3/pages/interaction-states/applying-states#bc6d6853-48ef-490e-8076-448e89e69f0f)

A focused state communicates when a user has highlighted an element, using an input method such as a keyboard or voice.

![Cursor positioned over a button.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2ndeib-1p-Hovered%20button.png?alt=media&token=82061a85-c778-492f-9faf-93ed72a377bf)

Hovered button

![The focused button has a strong contrast between container and text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2negg3-1p-Focused%20button.png?alt=media&token=fd25e436-79cc-46fc-97f6-f0bc86545c5e)

Focused button

5\. [Pressed](https://m3.material.io/m3/pages/interaction-states/applying-states#c3690714-b741-492d-97b0-5fc1960e43e6)

A pressed state communicates a user tap.

6\. [Dragged](https://m3.material.io/m3/pages/interaction-states/applying-states#c97582c4-5fef-42ce-9c34-71f8dcc5b8ad)

A dragged state communicates when a user presses and moves an element.

![The pressed button has a strong contrast between container and text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2qd3dz-1p-Pressed%20button.png?alt=media&token=dbcd674e-5bb0-4176-8362-e3451b8d538b)

Pressed button

![Dragged chip](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly2qdrga-1p-Dragged%20chip.png?alt=media&token=84e211bb-d118-44c7-b4d9-cb4b86e9f884)

Dragged chip

---

## Layout – Understanding Layout

### Parts of Layout

*Source: [https://m3.material.io/foundations/layout/understanding-layout/parts-of-layout](https://m3.material.io/foundations/layout/understanding-layout/parts-of-layout)*

---

#### Windows

A window frames and contains the product. The window is divided into two primary regions: the navigation region and body region.\
\
Multi-window views are a system UI feature used to display more than one app simultaneously.\
\
[Multi-window support guide for Android](https://developer.android.com/develop/ui/compose/layouts/adaptive/support-multi-window-mode)

### Navigation region

The navigation region holds primary navigation components and elements such as:\

- Navigation drawer\
- Navigation rail\
- Navigation bar\
  \
  Elements in this section help people navigate between destinations in an app or to access important actions.\
  \
  Place navigation components close to edges of the window where they’re easier to reach; on the left side for left-to-right (LTR) languages, and on the right side for right-to-left (RTL) languages.

### Body region

The body region contains most of the content in an app, including:

- Images
- Text
- Lists
- Cards
- Buttons
- App bar
- Search bar

Content in the body region is grouped into one or more panes.

### Panes

Just like panes of glass that make up a window in the real world, panes in Material Design make up the body region of the layout in a device window.

All content must be in a pane. A layout can contain 1–3 panes of various widths, which adapt dynamically to the window size class [More on window size classes](https://m3.material.io/m3/pages/applying-layout/window-size-classes) and the user’s language setting. For right-to-left (RTL) languages, navigation components will be on the right.

Users can navigate to or between panes. Presenting multiple panes at once can make the app more efficient and easier to use.

There are two pane types:\

- Fixed: Fixed width\
- Flexible: Responsive to available space, can grow and shrink\

All layouts need at least one flexible pane to be responsive to any window size.

### How panes adapt

In addition to flexible resizing, pane layouts can adapt using three strategies: show and hide, levitate, and reflow. When horizontal space allows, panes are presented next to each other in a row. When the window is resized or changes orientation, panes use these strategies to reorganize themselves, preserving context and meaning.

<figure>

<figcaption>Show and hide: Supporting panes enter and exit the screen based on available space</figcaption>
</figure>

<figure>

<figcaption>Levitate: One pane is placed on top of another</figcaption>
</figure>

<figure>

<figcaption>Reflow: Panes change position or orientation</figcaption>
</figure>

#### Containment

On most devices, panes can blend in with the background while others can use a different color for emphasis. This is called implicit grouping, and helps show relationships between panes.

In spatial environments, panes use a container color to separate panes from the passthrough or virtual environment.

### App bars

Panes can include a top app bar and bottom app bar.

Any nesting actions within the app bar should be hidden or revealed based on available width.

When layouts transition from one to two panes, avoid shifting elements between panes.

### Columns

Content in a pane can be displayed in multiple columns to segment and align content.

Columns are exclusive to a pane and are not used at the window level.

### Drag handle

Drag handles can be used to instantly resize panes in a layout. They adjust the width of flexible panes, and can fully collapse and expand fixed panes to quickly switch between a single-pane and two-pane layout.

<figure>

<figcaption>Drag handles can adjust pane size in a list-detail layout</figcaption>
</figure>

Drag handles can be used horizontally or vertically.

#### Drag handle tokens

Close

#### Usage

In expanded, large, and extra-large window sizes, two-pane layouts can be customized to snap to set widths when resized.The recommended custom widths are:\

- 360dp\
- 412dp\
- Split-pane with spacer centered visually

<figure>

<figcaption>Panes can snap to custom widths when a user releases the drag handle</figcaption>
</figure>

In a two-pane layout, the drag handle is placed in the spacer between the panes.

When a single pane is fully expanded, the handle is placed inside the right or left pane edge.

A touch region (A) around the drag handle takes priority over the back gesture, allowing people to perform a pane drag action instead of a system back gesture (B).

In a two-pane [list-detail](https://m3.material.io/m3/pages/canonical-layouts/list-detail) layout, the pane drag handle doesn't appear until an item is selected.

Avoid customizing the drag handle.

For products that can't use a drag handle, consider these other options for changing layouts:

- A toggle button to swap layouts
- In-app layout settings\

#### Drag handle accessibility

Avoid customizing the visual design of the drag handle.\
\
The drag handle should have a hover state, like changing size, to indicate that the handle can be moved. A cursor should change to a hand when hovering.\
\
By default, drag handles can only be dragged, not selected. Consider adding the ability to change layouts when tapped, double tapped, clicked, or activated using a keyboard. When using a keyboard, people should:\

- Use **Tab** to navigate to the drag handle.
- Use **Space** or **Enter** to activate the drag handle. This can automatically resize the panes to a recommended size, or it can select the handle so **Arrows** can move the handle to predefined sizes.

For screen readers, describe the function of the drag handle in the accessibility label (like “Resize layout”).\
\
Use roles like **button** to explain that it’s interactive, and states like **left pane expanded**, **right pane expanded**, or **panes equally sized** to explain its current position.

### Spacing

*Source: [https://m3.material.io/foundations/layout/understanding-layout/spacing](https://m3.material.io/foundations/layout/understanding-layout/spacing)*

### Grouping

Grouping is a method for connecting related elements that share a context, such as an image grouped with a caption. It visually relates elements and establishes boundaries to differentiate unrelated elements.

![Photo of dumplings with a caption reading “restaurants in the area”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxwwvqdk-1.png?alt=media&token=ee88043a-8222-4c39-912f-f0b6336ee653)

By placing a caption under an image this composition shows an explicit group

**Explicit grouping** uses visual boundaries such as outlines, dividers, and shadows to group related elements in an enclosed area. Explicit grouping can also indicate that an item is interactive, such as list items contained between dividers, or a card displaying an image and its caption.

![Container of a contact grouped with photo and caption](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxwwxa8g-2.png?alt=media&token=62385ee2-6bc3-492b-a60b-db12f75d2580)

The elements in this card are explicitly grouped

**Implicit grouping** uses close proximity and open space (rather than lines and shadows) to group related items. For example, a headline closely followed by a subhead and thumbnail image are implicitly grouped together by proximity and separated from other headline-subhead-thumbnail groups by open space.

![Carousel of images](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxwwyais-3.png?alt=media&token=1f6813ec-a502-4adb-abd9-7cb648575f45)

Images in a carousel are grouped by their proximity

### Margins

Margins are the spaces between the edge of a window area and the elements within that window area.

Margin widths are defined using fixed or scaling values for each window size class. To better adapt to the window, the margin width can change at different breakpoints. Wider margins are more appropriate for larger screens, as they create more open space around the perimeter of content.

See margin measurements for each window class: compact
Window widths smaller than 600dp, such as a phone in portrait orientation.
[More on compact window size class](https://m3.material.io/m3/pages/applying-layout/compact), medium
Window widths from 600dp to 839dp, such as a tablet or foldable in portrait orientation.
[More on medium window size class](https://m3.material.io/m3/pages/applying-layout/medium), expanded
Window widths 840dp to 1199dp, such as a tablet or foldable in landscape orientation, or desktop.
[More on expanded window size class](https://m3.material.io/m3/pages/applying-layout/expanded), large
Window widths 1200dp to 1599dp, such as desktop.
[More on large window size](https://m3.material.io/m3/pages/applying-layout/large-extra-large), and extra-large.
Window widths 1600dp and larger, such as ultra-wide monitors.
[More on extra-large window size](https://m3.material.io/m3/pages/applying-layout/large-extra-large)

![Screen highlighting vertical blue margin on left side of screen](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxwx04xw-1.png?alt=media&token=3a716354-4106-42c6-920c-3692da759a86)

A margin separates the edge of the screen from the elements on the screen

### Spacers

A spacer refers to the space between two panes
Panes are layout containers that house other components and elements within a single app. A pane can be: fixed, flexible, floating, or semi permanent.
[More on panes](https://m3.material.io/m3/pages/understanding-layout/parts-of-layout#667b32c0-56e2-4fc2-a618-4066c79a894e) in a layout. Spacers measure 24dp wide.

![Screen highlighting vertical blue margin on left side of screen](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxwx1ijr-5.png?alt=media&token=ab82125d-28cd-4500-a322-fd4c9606dd3c)

1. A spacer splits two panes from each other

A spacer can contain a drag handle
A drag handle adjusts the layout when there are 2 or more panes.
[More on drag handles](https://m3.material.io/m3/pages/understanding-layout/parts-of-layout#314a4c32-be52-414c-8da7-31f059f1776d) that adjusts the size and layout of the panes. The handle's touch target slightly overlaps the panes.

![Pane drag handle touch target overlapping two panes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxwx2hj1-6.png?alt=media&token=697c271a-165d-4dbd-af2b-e98b49b4a95d)

1. Drag handle touch target

### Padding

Padding refers to the space between UI elements. Padding can be measured vertically and horizontally and does not need to span the entire height or width of a layout. Padding is measured in increments of 4dp.

![Full screen-width photo with padding below it and text below the padding](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxwx3xmp-3.png?alt=media&token=f9885d4f-f041-4a92-b7ea-2179ea08c0ab)

1. Padding separates a headline from a image above

### Density

*Source: [https://m3.material.io/foundations/layout/understanding-layout/density](https://m3.material.io/foundations/layout/understanding-layout/density)*

### Overview

- Information density is the consideration of the amount of information visible on the screen
- The default target size should be at least 48x48 CSS pixels
- Users can change density as long as the density controls are accessible
- Apply density thoughtfully; not every layout needs it
- Layout and component scaling (component adaptation or component density) can allow users to scan, view, or compare more information at once

Information density

Component scaling

**Information density**

- Information density can be achieved through layout and design decisions without using component scaling
- Users may not benefit from increased density

**Component scaling**

- Components can adapt and change dimensions to allow users to scan, view, or compare different amounts of information
- Don't apply component scaling by default if it would result in a target below 48x48 CSS pixels

Information density and component scaling can be used together to provide more information and additional user control

### Information density

Information density refers to the amount of content (such as text, images, or videos) in a given screen space.

A layout’s spacing dimensions, including margins, spacers, and padding, can change to increase or decrease its information density. High density layouts can be useful when users need to scan, view, or compare a lot of information, such as in a data table. Increasing the layout density of lists, tables, and long forms makes more content available on-screen.

Consider density settings in the context of a device. Although a user may prefer a denser layout for desktop, they may not for mobile. Density shouldn’t automatically change across window-size classes or device orientation without users changing it.

![High density layout](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flzjckoeo-3.png?alt=media&token=1586220d-a76c-4bf0-b086-ac4b932144c2)

check Do
Consider using higher density information design when users need to scan lots of information

![News website on desktop displaying a high information density. ](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flzjcmxrs-4.png?alt=media&token=dc7bd078-f7d4-46e4-9685-d4a248f9b37b)

Consider the amount and priority of information on-screen. Higher density can be useful for data-rich sites (news, financial portals, dashboards) where users expect lots of information quickly.

![News website on desktop displaying a low information density. ](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flzjcnouc-5.png?alt=media&token=f05c1dff-6a12-4bb2-ba50-8ee6494a10b7)

Lower density can be better for sites prioritizing aesthetics, a focused message, less information, or easier navigation

### Component scaling

The component density scale controls the internal spacing of individual components.

The density scale is numbered, starting at 0 for a component’s default density. The scale moves to negative numbers (-1, -2, -3) as space decreases, creating higher density.

Higher density is typically applied by decreasing the top and bottom padding or overall height by 4dp.

![Three buttons, with densities  of +1, 0, and -1.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flzje0jnk-7.png?alt=media&token=3c357518-6c0a-4ca3-a637-e159430ff40f)

Buttons in 3 different densities. Apply button density based on the needs and layout of a design.

Center the grouped element within the component container.

Text size shouldn’t change as the container size scales.

![Stacked element showing 20 dp between label and input](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flzje23wv-8.png?alt=media&token=886dc00f-73a5-485e-8bd7-2b6271c65482)

The measurement between the label and input is 20dp

![Parent container showing label above input.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flzje3e0s-9.png?alt=media&token=13938623-bd72-4399-b745-99f5a4e34c4e)

The label and input are centered within their parent container

![Dropdown menu selectable space  height of 36 dp](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flzje4oe2-10-dont.png?alt=media&token=1e4ca720-f5d4-4657-b46e-95a328a8c983)

close Don’t
Don’t increase density in UIs that involve focused tasks, such as selecting from a menu. It reduces usability by limiting selectable space.

![Single-line snackbar](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flzje5tgh-11-dont.png?alt=media&token=fa510b50-4502-4398-a69a-8bcba6cbeb7a)

close Don’t
Don't increase the density in components that alert the user of changes, such as snackbars or dialogs

#### Avoid applying component scaling by default

- Don't apply component scaling to layouts by default that lower the target size below a default size of 48x48 CSS pixels
- Allow users to opt for a higher density layout or theme, and provide a simple, accessible way to revert to default best practices

People should be able to **opt** **in** to dense layouts and components.

To ensure that density settings can be easily reverted, targets in settings interactions must follow defaults (48x48 CSS pixels).

![A density menu with large, medium, and small options to customize the screen layout of a table on desktop. ](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flzje9ukn-12a.png?alt=media&token=a179a73f-0d78-4809-ac1d-b1cc696d9901)

### Targets

Dense components can be less accessible because interactive elements are smaller, so use caution when increasing information density.

![Selectable target of only 40 dp](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flzjqo90o-13-caution.png?alt=media&token=6f36346e-923d-4b40-9453-764afeaaf502)

exclamation Caution
Use caution when applying component scaling where selectable targets will be reduced to less than the 48x48dp best practice and only apply density where it provides a better user experience.

Use caution when applying density to interaction targets. Following best practices, accessible targets should retain a minimum of 48x48dp, even if their visual element (such as an icon) is smaller.

![Settings button is 24 by 24 dp, but has interaction target of 48 x 48 dp.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flzk8ysbx-15.png?alt=media&token=51c7c9b4-9426-4e91-93b9-3c22e90ab6bf)

The target should remain 48x48, even if the icon is smaller.

![Button with height of 36 dp and interaction target of 48 dp](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flzjqrzlp-15.png?alt=media&token=b7dcf871-268a-403f-825b-09dc0c9e6ae1)

The interaction target of a common button can be larger, as long as it meets the 48x48dp minimum size.

### Pixel density

The number of pixels that fit into an inch is referred to as pixel density. High-density screens have more pixels per inch than low-density ones. As a result, UI elements of the same pixel dimensions appear larger on low-density screens, and smaller on high-density screens.

To calculate pixel density:

Screen density = Screen width (or height) in pixels / Screen width (or height) in inches

![Magnified UI element  showing a high number pixels in the focus area](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flzjquwp8-16.png?alt=media&token=1f84c301-af60-49ea-a158-aa8ff21bf1cc)

A high-density ui element

![Magnified UI element  showing the low number of pixels in the focus area ](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flzjqw7id-17.png?alt=media&token=5b626bbc-0279-4d3a-ad2b-d44931cc552a)

A low-density UI element

#### Density-independent pixels

Density-independent pixels, written as dp, are flexible units that scale to have uniform dimensions on any screen. They provide a flexible way to accommodate a design across devices. Material design system uses density-independent pixels to display elements consistently on screens with different densities.

A dp is equal to one physical pixel on a screen with a density of 160.

To calculate dp: dp = (width in pixels \* 160) / screen density

![Screen with grid representing  low number of pixels](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flzjqylun-18.png?alt=media&token=0d6a5447-b65e-4bfc-bc2e-0d155c09cea1)

Low-density screen displayed with density independence

![Screen with grid representing  high number of pixels](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flzjr0140-19.png?alt=media&token=ef52565c-7aef-4004-8bec-078cb24cbb93)

High-density screen displayed with density independence

| Screen physical width | Screen density | Screen width in pixels | Screen width in dps |
| --- | --- | --- | --- |
| 1.5 in | 120 | 180 px | 240 dp |
| 1.5 in | 160 | 240 px |
| 1.5 in | 240 | 360 px |

### Hardware Considerations

*Source: [https://m3.material.io/foundations/layout/understanding-layout/hardware-considerations](https://m3.material.io/foundations/layout/understanding-layout/hardware-considerations)*

**Window size classes**
**Window size classes are opinionated breakpoints where layouts need to change to optimize for available space, device conventions, and ergonomics.**
**[More on window size classes](https://m3.material.io/m3/pages/applying-layout/window-size-classes)** provide the foundation for top level layout decisions, but display-specific considerations are also needed.

### Display cutout

A display cutout is an area on some devices that extends into the display surface. It allows for an edge-to-edge experience while providing space for important sensors on the screen of the device.

Applications can extend around display cutouts or other features, but some parts of the UI might be obscured.

![Content safe area shown in portrait and in landscape mode.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxx2cfdc-1.png?alt=media&token=8da1aff9-1abf-46f1-bfe3-1a697a379b11)

A mobile device’s content-safe area around a display cutout for the front-facing camera

### Foldable devices

Foldable devices use a folding mechanism to fold and unfold. They have unique characteristics to consider when designing layouts.

#### Fold

The fold of a foldable device divides the screen into two portions, either horizontally or vertically. The fold can be a flexible area of the screen or, on dual-screen devices, a hinge that separates two displays.

A flexible fold is barely visible, although some users may feel a tactile difference on the screen surface. Content can flow over the fold fairly easily.

![Center fold of a foldable device layout.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxx2dejk-2.png?alt=media&token=b1ae33fd-91b4-4985-a1df-b4945de2c03d)

1. Folds are typically found in the center of the device screen and can present a seamless experience

On devices with a physical hinge, designing the screen as two distinct sections (separate window areas or panes) allows a composition to work well across the hinge and screens.

![Center fold on a foldable device with a physical hinge.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxx2eac2-3.png?alt=media&token=7b332b5a-8f26-4b4a-ab1e-f0fabd5efe39)

A physical hinge separates two parts. There is no display hardware in this region.

#### Device state

Foldable devices can have several physical states: folded, open flat, and tabletop.

##### Folded

The folded state can include a front screen, which often fits in the compact window size class, just like a mobile phone in portrait orientation.

![Compact window of a folded device.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxx2fbwo-4.png?alt=media&token=46676791-930a-4b6a-9c40-6adafcd13f73)

The front screen of a foldable device

##### Open flat

An open flat state refers to the fully opened screen, which usually increases the window size class to medium or expanded. An open device can be used in landscape or portrait orientations.

![Open portrait state of a mobile device.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxx2g4q8-5.png?alt=media&token=ec23f27d-3b07-4964-aaa0-2b6c86e5ba02)

In an open portrait state, the longer device edge is vertical while the shorter edge is horizontal

![Open landscape state of a mobile device.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxx2gth1-6.png?alt=media&token=a73f2de3-02d2-4457-86be-914222396201)

In an open landscape state, the longer device edge is horizontal while the vertical edge is shorter

##### Tabletop

Tabletop refers to a half-opened state forming a rough 90 degree angle, with one half of the device resting on a surface. This posture resembles a laptop.

UI controls near the fold can be difficult for users to access, and text overlaying the fold can be hard to read.

![Tabletop state of a mobile device showing camera ;ems  on the vertical plane.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxx2hz6b-7.png?alt=media&token=d9d2412d-a772-42a7-87dd-6a7cf8400b04)

If camera hardware is present, a tabletop device is best positioned on a side without any protruding hardware elements

#### Interaction

##### App continuity

When running on a foldable device, an app can transition from one screen to another automatically. After the transition, the app should resume in the same state and location, and the current task should continue seamlessly.

![A news app in compact mode compared to the open landscape state where the news app expands with a new column next to the compact news feed.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxx2j1zj-8.png?alt=media&token=cc06940d-eaf9-424c-969f-15b6e32d5d06)

A news app shows a feed in a compact and expanded window class when a foldable device switches device state

##### Scrolling and multiple panes

Depending on how your app uses panes, the scroll behavior of a folded design may change in the unfolded design.

If you expand a pane, you can decide whether the whole window will scroll together or if each side (each pane) scrolls independently.

![A foldable device screen in open landscape mode with a single pane showing vertical scroll arrows.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxx2khfi-9.png?alt=media&token=50dc8429-6102-45a6-8195-2920d374207c)

A single pane can scroll its inside content vertically and horizontally

If your design has multiple panes, each pane can operate as an independently scrollable area.

![A foldable device screen in open portrait mode with double panes each with a vertical scroll arrow.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxx2lo3u-10.png?alt=media&token=1ca93a5d-ceae-4193-ad58-e9e5eb0a1dce)

Multiple panes can scroll inside content independently of one another

### Multi-window mode

Multi-window mode is an Android system feature for **displaying multiple apps on the same screen.** This can be especially useful for multi-tasking, or workflows that depend on comparing information.

Note: This concept should not be confused with using multiple panes to display content from a single app. For more on that, see: Panes.

![2 apps appear side-by-side with a task bar below spanning the width of the screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxx2mmo2-1.png?alt=media&token=e5f2fbca-c806-4e4a-8bc7-30be096f275d)

Screen displaying an email app and a contacts app in multi-window mode

#### User needs

The ways that windows are created, arranged, and adjusted should feel straightforward for all users and across any window size class. Methods for seamless window management include:

- Apply smooth transitions as described in motion guidance
- Ensure that users can create multiple windows easily and move between them as needed
- Keep mental models and interaction patterns simple so that users aren’t required to think about which mode is appropriate for each task
- Design and implement window dynamics consistently across variations in foldable hardware, including those with a hinge that separates two displays

#### Window creation and behavior

Android provides several ways for users to create a multi-window view.

#### Taskbar

The taskbar provides a launching point for pinned and suggested apps to easily become a separate window.

To create a new window, a user selects and drags an app from the taskbar and moves the app icon to indicate where the new window should be displayed.

![The taskbar is positioned at the bottom of a screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxx2qc2a-2.png?alt=media&token=163847e4-1a26-4431-a633-7d29f9363d3b)

Android taskbar

#### Context menu

Users can also create multiple windows through the overview by the app context menu.

![2 apps appear side-by-side with a task bar below spanning the width of the screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxx2rmbq-3.png?alt=media&token=cff96393-8fae-4b77-bd8d-a3986c64ccf9)

Multi-window mode can have vertical positioning

![2 apps are stacked in landscape mode with a task bar below spanning the width of the screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxx2uu5h-4.png?alt=media&token=b190166c-fce3-4d5b-b6f9-f5a3741c8ba5)

Multi-window mode can have horizontal positioning

#### Adjusting window sizes

By default multiple windows are created as a 50/50 side-by-side split.

The windows can be adjusted further to 1:3 or 2:3 proportions. These ratios provide a primary and secondary window dynamic, offering greater flexibility and allowing focus on one application as needed.

When in a multi-window mode, the available screen area often changes from medium or expanded window class to compact. Layouts should adapt accordingly.

![2 apps appear side-by-side with the left-side app using two-thirds of the screen, and the right app one-third.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxx2y99m-5.png?alt=media&token=04f48065-b71e-4a2d-9a01-f6de64b23b1c)

The screen handle can be dragged and released to create the desired window ratio. The handle automatically adjusts to the closest snap point.

### Bidirectionality & RTL

*Source: [https://m3.material.io/foundations/layout/understanding-layout/bidirectionality-rtl](https://m3.material.io/foundations/layout/understanding-layout/bidirectionality-rtl)*

### Mirroring

When a layout is changed from LTR to RTL (or vice-versa), and flipped horizontally, it’s often called mirroring. UI elements and text that typically appear on the left in LTR aligns to the right. Reading flow starts from the top right corner, instead of the top left.

Not all elements mirror with RTL languages. For example, graphs and charts maintain a LTR directionality for Persian and Urdu.

![Layout in LTR and mirrored for RTL language.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm6rr3ndk-1.png?alt=media&token=05901f6f-b35f-43a1-907c-fed9b464bfea)

A mirrored layout in an RTL language reverses the alignment and ordering of elements.

### Text rendering

Correct text rendering is foundational for a great user experience and it’s critical for readability and usability. Text rendering has two parts:

1. Alignment: How the edges of the text box are placed alongside other elements.
2. Directionality: How text and other elements flow within a text box, like left-to-right, or right-to-left.

In RTL languages, text is usually right-aligned, and elements flow from right-to-left. Common issues with RTL language rendering are text entry, cursor position, punctuation, phone numbers, and URLs. Improperly rendering text in RTL languages can create cognitive overload and negatively impact user sentiment and trust.

![Text field incorrectly displaying the word order of an email address and cursor placement.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm6rr60jz-2%20-%20A.png?alt=media&token=0187472e-4278-4a06-897a-612c671ce24e)

close Don’t
Don't reverse the order of the email username and domain (@google.com). The domain should always be to the right of the username. Usernames can still be written RTL, with the cursor moving to the left.

Note this example is not translated to illustrate a common issue with text rendering

![Dialog window incorrectly displaying word order decreasing readability.](https://lh3.googleusercontent.com/LF2lHKz-y2dHfC1eRLilwX8m2_AGCUvSt_bgVe-Qai7o129OK1nKLNHd1_1cdpjOO_YBM9wcGPce855LPc2eXl6IbUc2LhVGKvoF5RAZjEZm=w40)

close Don’t
Don’t apply LTR directionality to RTL content because it may scramble word order. To ensure readability across all languages. The content should have both RTL alignment and directionality.

Note this example is not translated to illustrate a common issue with text rendering

### Icons and symbols

In RTL languages, directional UI icons, like back and forward, should be mirrored. However, in Hebrew timelines and media controls on a page should retain left-to-right directionality.

The meaning of icons and symbols can vary significantly across cultures.

![Back and forward icons in LTR and RTL.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm6rre3h2-3%20-%20A.png?alt=media&token=480dc1d4-5c16-4902-af1d-2218f293590e)

Back and foward icons are mirrored in RTL

![Send and question mark in LTR and RTL.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm6rrfly7-3%20-%20B.png?alt=media&token=050695fe-3339-4996-afa5-1b2876660828)

Send buttons are mirrored in RTL. Help icons are mirrored in some RTL languages, like Urdu and Persian.

### Time

Linear representations of time are often mirrored in RTL language experiences.

Linear progress indicators should move from right to left for most RTL languages, except Hebrew where it should remain LTR.

Circular representations of time remain the same.

![RTL linear progress indicators filling from right to left  and circular progress indicators filling clockwise .](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm6rrip79-4.png?alt=media&token=c9e3ba41-c747-4bfb-b76a-70e3ae6258bd)

1. RTL linear progress indicator starts to fill progress from the right
2. Circular progress indicators move clockwise

#### Media players

Media controls for video or audio players are always LTR.

![Media player with control and progress in LTR and all other content is RTL.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm6rt3wci-5_urdu.png?alt=media&token=a69ecb25-1698-4a55-9bd3-5d954c939b56)

In Urdu, controls and progress for media and a podcast title are shown in LTR, while all other content is RTL.

#### Clock

For RTL languages, the directionality of time remains LTR, and clocks still turn clockwise. However, the AM/PM symbols for 12h clocks should be placed to the left. The 24-hour clock is often used in countries where the primary language is not English.

Clock icons, circular refresh icons, and progress indicators with arrows pointing clockwise should not be mirrored.

![24 hour clock in RTL.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm6rt5hlh-6%20-%20A_hebrew.png?alt=media&token=b2ee3bb4-76e2-4337-8109-234dd7847476)

24-hour clocks in RTL move clockwise, but mirror elements such as buttons

![12 hour clock in RTL. ](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm6rt6mj7-3%20-%20B_arabic.png?alt=media&token=bcaabbc8-50d2-4baa-9b8e-799267cb02d9)

12-hour clocks in RTL move clockwise, but mirror UI elements such as AM/PM and buttons

### Canonical layout examples

#### List-detail

The [list-detail](https://m3.material.io/m3/pages/canonical-layouts/list-detail) layout divides the app window into two side-by-side panes, and is mirrored in RTL.

![RTL list layout.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm6rt95z5-7_hebrew.png?alt=media&token=69d513fe-7989-4805-b65a-e3d6c9b39985)

List-detail mirrored for RTL, where text and other elements are aligned to the right and flow from right to left

#### Feed

Use a [feed layout](https://m3.material.io/m3/pages/canonical-layouts/feed) to arrange content elements like cards in a configurable grid for quick, convenient viewing of a large amount of content. The feed layout is mirrored in RTL.

![RTL feed layout.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm6rtc29p-8.png?alt=media&token=c763352b-86e5-4455-a1ab-b84f51ab6841)

Feed layout mirrored for RTL, where the order of text, grid, and other elements align to the right and flow from right to left

#### Supporting pane

Use the [supporting pane](https://m3.material.io/m3/pages/canonical-layouts/supporting-pane) layout to organize app content into primary and secondary display areas. The supporting pane layout is mirrored in RTL.

![RTL supporting pane in a RTL language.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm6rtekg5-9_urdu.png?alt=media&token=6b70a1dc-2d88-4d86-82c3-c03201df33a1)

Supporting pane to the left of the primary content. Text and other elements within the pane are aligned to the right and flow from right to left.

### Component examples

#### Badges

Change the position and alignment of [badges](https://m3.material.io/m3/pages/badges/specs) for RTL languages.

![Small badge on the top left of the icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm6rtgvbk-10%20-%20A_urdu.png?alt=media&token=f90702ee-35c3-4470-b083-6d34d392e437)

Small badge appears on the top left of the icon

![Large badge on the top left of the icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm6rtjdwz-10%20-%20B_urdu.png?alt=media&token=2833dd15-ab4f-4300-adf4-524f48a5fc9d)

Large badge appears on the top left of the icon

#### Toolbar

[Toolbars](https://m3.material.io/m3/pages/toolbars/guidelines) provide actions related to the current page. For RTL languages, mirror the order of the tools.

![RTL floating toolbar](https://lh3.googleusercontent.com/vJXzgBPOhjldo7WY5RopuHczELv2Q6gFFOV9qfzbScgrdaaPlNe-tfWaDy1ExbeYJokecz57a9NcPlKJVJ-_Ax-4kUbCuKUbnPZXzwZYhd__Pw=w40)

Mirrored floating toolbar, where the FAB appears on the left of the screen

#### App bar

[App bars](https://m3.material.io/m3/pages/app-bars/overview) are placed at the top of the screen to help people navigate through a product.

Mirror app bar layout in RTL, and flip appropriate icons, such as arrows.

![3 app bars in RTL.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm6rtqm4b-12_urdu.png?alt=media&token=55e68798-60d9-46b5-ac42-c502f21a81a1)

1. RTL center-aligned/small
2. RTL medium flexible
3. RTL large flexible

#### Navigation drawer

[Navigation drawers](https://m3.material.io/m3/pages/navigation-drawer) that open from the side are always placed on the leading edge of the screen, on the left for LTR languages, and on the right for RTL.

![RTL navigation drawer, including a mirrored icons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm6rttjl0-13_arabic.png?alt=media&token=0316e66f-2626-4521-ba3a-abd21ce031e0)

RTL navigation drawer, including a mirrored icon for outbox

#### Navigation rail

The [navigation rail](https://m3.material.io/m3/pages/navigation-rail/guidelines) is placed on the leading edge of the screen, on the left side for LTR, and on the right for RTL.

![Nav rail in the right side for RTL languages, and left side for LTR languages.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm6rtvteh-14_hebrew.png?alt=media&token=560c411f-1a34-43f6-90c5-6a9c7edbe837)

Based on the language being used, a navigation rail is set on a screen’s leading edge. This is the right side for RTL languages, and left side for LTR languages.

#### Text fields

Icons in [text fields](https://m3.material.io/m3/pages/text-fields/guidelines#5c8a5f07-b1a5-455f-bf76-7ff0d724f6b0) are optional. Leading and trailing icons change their position based on LTR or RTL contexts.

![Text fields in RTL with leading and trailing icons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm6rtykdl-15.png?alt=media&token=ae3edcc2-1c08-44dd-a767-7de671b9a584)

Icons, symbols and label text for RTL:

1. Icon signifier
2. Valid or error icon
3. Clear icon
4. Voice input icon
5. Dropdown icon
6. Image

#### Chips

The leading icon of input chips can be an icon, logo, or circular image.

The trailing icon is always aligned to the end side of the container. It’s placed on the right for LTR and on the left for RTL.

![Filter chips in RTL layout.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm8rhslpk-16.png?alt=media&token=a7178733-70fc-4052-b74a-385de64cd9e4)

Filter chips shown in an RTL layout. Note this example is not translated to help illustrate mirroring.

### Swipe gestures

Gestures are the ways people interact with UI elements using touch or body motion.

People can navigate horizontally between peer views like tabs, and to complete actions.

RTL swiping and gestures should mirror their counterparts in LTR. If an app includes a "delete" icon revealed when swiped from the right for LTR languages, the same should be possible on the left for RTL languages.

![RTL list layout with swipe gesture revealing additional actions.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm6ru2ith-17.png?alt=media&token=fccfef3f-de43-402f-a1c6-7240f9e4e66b)

Swiping reveals additional action in RTL list layout

On Android, [predictive back](https://github.com/material-components/material-components-android/blob/master/docs/foundations/PredictiveBack.md) allows people to swipe left or right on the screen to go back or dismiss modal components.

RTL predictive back features should mirror those found in a LTR context.

Preview of the result of the gesture for RTL languages

---

## Layout – Applying Layout

### Window Size Classes

*Source: [https://m3.material.io/foundations/layout/applying-layout/window-size-classes](https://m3.material.io/foundations/layout/applying-layout/window-size-classes)*

Devices of different sizes and orientations need different layouts. For example, a newspaper app might have a single column of text on a mobile device, but display several columns on a larger desktop device. This change in layout takes advantage of device capabilities and user expectations.

### Window size classes

A window size class is an opinionated breakpoint, the window size at which a layout needs to change to match available space, device conventions, and ergonomics.

All devices fall into one of five Material Design window size classes: compact, medium, expanded, large, or extra-large. Material window size classes are used on Android and Web.

Rather than designing for an ever increasing number of display states, focusing on window size classes sizes ensures layouts work across a range of devices.

![3 window size classes from small to expanded.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly6ugnwf-1.png?alt=media&token=da44385c-ea57-40d1-ac07-6ea0f30c1aec)

1. Compact
2. Medium
3. Expanded

**Design for window size classes instead of specific devices because:**

- The amount of available window space is dynamic and changes based on user behavior, such as multi-window modes or unfolding a foldable device.
- Devices fall into different window size classes based on orientation.

| **Window size class** **(width)** | **Width breakpoint (dp)** | **Common devices** |
| --- | --- | --- |
| Compact | Under 600dp | Phone in portrait |
| Medium | 600–839dp | Tablet in portrait<br>Foldable in portrait (unfolded) |
| Expanded | 840–1199dp | Phone in landscape<br>Tablet in landscape<br>Foldable in landscape (unfolded)<br>Desktop |

Large and extra-large window size classes are used on devices like laptops, desktops, and external monitors. These window size classes are supported on MDC-Android. [More on MDC-Android window size classes](https://developer.android.com/develop/ui/views/layout/use-window-size-classes?hl=en)

Note: Large and extra-large window size classes are coming soon to Jetpack Compose.

![2 large and extra-large window size classes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly6xa74l-2.png?alt=media&token=288695d6-abbe-46b9-8df5-c0957a34498d)

1. Large
2. Extra-large

| **Window size class (width)** | **Width breakpoint (dp)** | **Common devices** |
| --- | --- | --- |
| Large | 1200–1599dp | Desktop |
| Extra-large | 1600+dp | Desktop<br>Ultra-wide monitors |

#### Height window size classes

On Android, compact, medium, and expanded window size classes are also available for [height](https://developer.android.com/guide/topics/large-screens/support-different-screen-sizes#window_size_classes). These can be used to adjust the layout when available vertical space is unusually small or large.

However, since most layouts contain vertically scrolling content, it's rare that layouts need to adjust to available height.

### Designing across window sizes

![The 3 window size classes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly6xj4j0-1.png?alt=media&token=300fabc7-9e70-403e-9790-41136b7ad041)

Email app shown in the three window classes: compact, medium, and expanded

![The 2 larger window size classes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly6xkbsd-2.png?alt=media&token=8da2de01-6e6e-494c-be33-562da2ad1e1e)

Email app shown in large and extra-large window classes

Each product view should have a layout represented for each of the window size classes most appropriate for your platform and users.

Different components are recommended for performing the same function across the five layouts.

| > **Window size** | > **Panes** | > **Navigation** | > **Communication** | > **Action** |
| --- | --- | --- | --- | --- |
| > Compact | > 1 | > Navigation bar, modal expanded navigation rail | > Simple dialog<br>> Fullscreen dialog | > Bottom sheet |
| > Medium | > 1 (recommended) or 2 | > Navigation bar, Modal expanded navigation rail | > Simple dialog | > Menu |
| > Expanded | > 1 or 2 (recommended) | > Modal or standard expanded navigation rail | > Simple dialog | > Menu |
| > Large | > 1 or 2 (recommended) | > Modal or standard expanded navigation rail | > Simple dialog | > Menu |
| > Extra-large | > 1 to 3 (recommended) | > Modal or standard expanded navigation rail | > Simple dialog | > Menu |

Start by designing for one window class size and then adjust your layout for the next class size by asking yourself the five questions below:

#### 1\. What should be revealed?

Parts of the UI that are hidden on smaller screens can be revealed in medium, expanded, large, and extra-large layouts.

For example, on a compact device the navigation drawer is collapsed by default and accessed via a menu button; on an expanded device, such as a large tablet or laptop, the navigation drawer can be open by default to reveal more actions and features.

![Email app layout in a compact window and an expanded window](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly7194ak-3.png?alt=media&token=c1474800-3202-4168-9623-869d10314063)

An email app’s navigation drawer is revealed in the expanded window size class

The same can be true for revealing additional [panes](https://m3.material.io/m3/pages/understanding-layout/parts-of-layout), such as when an expanded device has room to simultaneously display an inbox pane and a pane containing a selected email. Additional real-estate doesn’t just mean making the same thing bigger.

![Messaging app layout in a compact window and an expanded window.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly71aw97-4.png?alt=media&token=77d3b571-bbad-48e5-8b99-3b79a8f11cf0)

An expanded layout for this messaging app reveals a second pane showing message threads

#### 2\. How should the screen be divided?

When dividing the screen into layout [panes](https://m3.material.io/m3/pages/understanding-layout/parts-of-layout), consider the window size class.

Compositions using a single pane work best on compact and medium window size classes while two panes work best for the expanded, large, and extra-large window size classes.

![Compact and medium windows have a single pane. The expanded, large, and x-large window size classes have 2 panes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly71dals-5.png?alt=media&token=48dda4cf-3fc5-49eb-be8b-ba25ca82bd0c)

Rough layout areas across three window class sizes

Also consider content and interaction needs.

For example, two panes are possible in the medium window class but might not result in the most usable experience. Complex list items can make it hard to comfortably view content across two compressed panes.

However, lower density content that benefits from quick navigation between items might work well.

![Medium window with 2 panes of low-density content: an email setting menu and a list of setting switches.](https://lh3.googleusercontent.com/HRaoY-04xrG1embUpgmvJ7j_SBJl4iY0be87JtUMMkGRgUPgKKzDV3kNv2cyH1mqqp42-5p2p_hDbTBisMCooOsDIcg61mAnz8u5PZS8gDO6=w40)

A settings view offering quick navigation and actions is a good use of two panes in a medium layout

![Video app in a medium window has 1 pane for portrait layout and 2 for landscape.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly71gbju-7.png?alt=media&token=65bfa59d-7ca2-4fc3-830d-10ea091ed828)

Rotating a device often changes the window class. A two-pane layout for an expanded window size class may need to adapt to a one-pane layout for medium or compact window size classes.

Single-pane layouts can create focus attention on one action or view, creating a distraction-free environment for a specific goal such as:

- Playing a game
- Watching a movie
- Video calls
- Creative applications

![Video calling app in a single-pane landscape layout in an expanded window size class.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly71orzy-8.png?alt=media&token=caa36f3b-c04b-4f9a-b81a-287dd849c17f)

Immersive single-pane layout for a video call

#### 3\. What should be resized?

Parts of the UI that are small on compact screens can become larger on medium and expanded screens. For example, a horizontally-oriented card on a mobile device can become more square-shaped on a larger tablet. The size of a pane can also be increased on larger screens, and its elements rearranged to make better use of the space. See [What should be repositioned?](https://m3.material.io/m3/pages/applying-layout/window-size-classes#2b82eea6-5d69-4a73-a7ab-8d9296f5a26d) for more information.

Consider resizing:

- Cards
- Feeds
- Lists
- Panes

Resizing elements can give imagery more prominence or make room for larger typography styles that enhance readability. This type of adaptation affects the scale of content and objects on screen, as well as their relationship to each other. For example, a text list on a mobile device can have adjusted margins, vertical spacing, and density to better fit medium window class devices like tablets.

In every window class, the ideal line length for text is 40-60 characters. When resizing elements containing text, use margins and typographic properties like line height, font weight, and typography size to keep lines within 40-60 characters.

![Card in compact and medium layouts. The image and text are rearranged and resized to be more legible in the medium layout.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly71qdlt-1.png?alt=media&token=6bf00ce8-7398-4a34-bda8-c72d4eb648cd)

A smaller card in a compact layout can be resized larger in a medium or expanded layout

#### 4\. What should be repositioned?

A UI and its components can reflow or reposition to make use of additional space on expanded screens and in resized panes. Repositioning is also a way to match the ergonomic and input needs that change across device sizes, such as shifting actions from the bottom of a compact screen to the leading edge of medium and expanded screens. This method is similar to responsive design on the web.

Consider:

- Repositioning cards
- Adding a second column of content
- Creating a more complex layout of photos
- Introducing more negative space
- Ensuring reachability for navigation and interactive elements

Internal elements can be anchored to the left, right, or center as a parent container scales. Internal elements can also maintain fixed positions, as seen in the example of a floating action button (FAB) within a navigation drawer.

![Comparison of compact and medium window sizes with tabs anchored to the middle of the layout.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly71rl3v-2.png?alt=media&token=e6da0bad-d583-4b26-9e44-a962fdcf07d4)

Tabs can remain anchored to the middle of a layout in both compact and medium window class sizes

In the case of a button, the icon and text label within the button container can remain anchored to each other, staying centered as the button container scales horizontally.

![Label text remains the same size and centered as button size increases.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly71sd6m-3.png?alt=media&token=7b136bb8-cb5d-4ab2-809f-2d7baf241717)

1. Button icons and label text can remain anchored to each other no matter the width

#### 5\. What should be swapped?

As a layout changes across window size classes, components with similar functions can also be exchanged. This makes it possible to adjust a layout for large-scale changes to the ergonomic and functional qualities of an interface. For example, a bottom navigation bar in a compact layout can be swapped with a navigation rail in a medium layout, and a navigation drawer in an expanded layout.

Use caution when swapping components by ensuring that the interchangeable components are functionally equivalent. Do not, for example, swap a button for a chip. Use caution when changing between list items and cards.

The component swap should always serve a functional and ergonomic purpose for the user.

![A compact layout’s navigation bar becomes a navigation rail in an expanded layout.](https://lh3.googleusercontent.com/rEWhNlRdKyXiKPA9zAWCoNJaoqjLdSx9dX4uVbdYVz1yX2toutEla7bD33jVb-gKS-3g6alsKBBDpVwhjTK3PKlopZB2kxrrT-IBrY2voG3Kag=w40)

check Do
Swap a navigation bar in a compact layout for a navigation rail in a medium or expanded layout

![A compact layout’s navigation rail becomes a navigation drawer in an extra-large layout.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmalmo6nt-5.png?alt=media&token=32fdff3b-1ae6-4aca-9587-8a1412bbe701)

check Do
A collapsed navigation rail in medium or expanded layouts can become an expanded navigation rail in large or extra-large layouts

![A button is swapped out for a menu in a shopping app.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly71u6me-6.png?alt=media&token=afb0a2ca-82de-400c-8472-dac35786bb3a)

close Don’t
Don’t arbitrarily swap components that aren’t functionally equivalent, such as swapping a button with a menu

##### Common swappable components

| **Component type** | **Compact** | **Medium** | **Expanded** |
| --- | --- | --- | --- |
| Navigation | Navigation bar | Collapsed navigation rail | Collapsed navigation rail |
| Navigation | Modal expanded navigation rail | Modal expanded navigation rail | Standard expanded navigation rail |
| Communication | Simple or full-screen dialog | Simple dialog | Simple dialog |
| Supplemental selection | Bottom sheet | Menu | Menu |

### Pane Layouts

*Source: [https://m3.material.io/foundations/layout/applying-layout/pane-layouts](https://m3.material.io/foundations/layout/applying-layout/pane-layouts)*

### Choosing a pane layout

All layouts are made up of 1–3 panes. The type of layout and amount of panes you choose should depend on the window size class
Window size classes are opinionated breakpoints where layouts need to change to optimize for available space, device conventions, and ergonomics.
[More on window size classes](https://m3.material.io/m3/pages/applying-layout/window-size-classes) and the type of product being built.

| Window size | Recommended pane total | Other pane totals |
| --- | --- | --- |
| Compact | 1 | -- |
| Medium | 1 | 2 |
| Expanded | 2 | 1 |
| Large | 2 | 1 |
| Extra-large | 2 | 1, 3 |

Panes can be:

- Fixed: Width doesn’t change based on available space
- Flexible: Responsive to available space, and can grow and shrink

All layouts need at least one flexible pane.

![Fixed and flexible panes of a screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fma5voed1-fixed%20and%20flexible%2004.png?alt=media&token=4601d701-d9c4-4db3-9792-bbefe3a9ea1c)

1. Fixed pane
2. Flexible pane

Panes can be permanent or temporary. Temporary panes can appear and be dismissed when necessary, affecting the layout and size of other panes.

![Fixed and flexible panes of a screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm9v0ho4o-co-planar%20permanent%2005.png?alt=media&token=eb838af6-24b7-4b3e-8314-14f1e4be0a6b)

Panes can be displayed permanently side by side

Temporary panes can be dismissed

#### Single-pane layouts

Single-pane layouts use one flexible pane that extends to the available space in a layout’s width. They can be used in any window size, but are recommended for compact and medium window sizes.

![A mobile screen with a single pane inside a window.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fma5vnqur-07.png?alt=media&token=bd2edd4e-f4cf-41ee-92da-93f46f99000b)

A single flexible pane adapts to any window size

#### Two-pane layouts

##### Split-pane layout

A split-pane layout keeps the spacer visually centered. It’s best for foldable devices and dynamic layouts.

When a navigation rail or drawer is present, it only reduces the size of one pane. The other pane remains at 50% of the window width.

![Two flexible panes layout.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmaff1r0w-07.png?alt=media&token=f2659177-0580-4bc5-b27e-3b89f46006be)

The navigation and first pane are 50% of the window width to keep the spacer visually centered

With a navigation bar, or no navigation, both panes span 50% of the window width by default.

![Two flexible panes at 50% width, with a navigation bar below them spanning the whole window.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fma5vp0c0-08.png?alt=media&token=c4a48849-e18a-4a36-980b-65e52c9cce86)

With no navigation rail visible, split-pane layouts set each pane to 50% width by default

##### Fixed and flexible layout

This layout is common for expanded, large, and extra-large windows. The fixed and flexible panes can appear in whichever order is best for the content.

The fixed pane is often temporary, and used for side sheets or lists with light information density.

![Fixed and flexible panes arranged 2 different ways.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fma5vphw1-09.png?alt=media&token=12746b20-3bab-46ee-875e-3d32ac313438)

1. Fixed pane
2. Flexible pane

#### Three-pane layouts

While less common, the extra-large window size class supports using a standard side sheet
Standard side sheets display content without blocking access to the screen’s primary content, such as an audio player at the side of a music app. They're often used in medium and expanded window sizes like tablet or desktop.
[More on side sheets](https://m3.material.io/m3/pages/side-sheets/overview) as a third pane. When the side sheet is present, the navigation drawer can remain visible, collapse into a navigation rail, or hide completely. Don't use more than three panes.

Note: Fixed panes in this window size are recommended to be 412dp, but side sheets have a default maximum width of 400dp.

![Extra large window with two panes and a side sheet acting as a third pane.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmaff2riw-10.png?alt=media&token=0d2c02ba-ed6a-4893-a032-30de46c1608e)

Standard side sheet as a third pane

### Pane expansion & resizing

Panes can be resized, expanded, and collapsed using drag handles
A drag handle adjusts the layout when there are 2 or more panes.
[More on drag handles](https://m3.material.io/m3/pages/understanding-layout/parts-of-layout/#0fd40797-ced0-4554-bddf-790de7b94d72).

- In split-pane layouts, both flexible panes can be freely adjusted, or can snap to certain widths.
- In fixed and flexible layouts, the drag handle can fully collapse and expand the fixed pane. This makes it easy to switch between a single-pane and two-pane layout.

The drag handle should also toggle between layout sizes when selected. This can be a tap, double tap, or long press.

Drag handles can adjust pane size in a list-detail layout

In expanded, large, and extra-large window sizes, two-pane layouts can be customized to snap to set widths when resized.

The recommended custom widths are:

- 360dp
- 412dp
- Split-pane with spacer centered visually

Panes can snap to custom widths when releasing the drag handle

#### Persistent pane resizing

The persistent resizing behavior remembers the user's pane width preference. Use this for most resizable layouts.

Pane widths persist even after a user closes the app

The width persists even after a window size class change. This means that if a two-pane layout is collapsed to one pane at any window size, it will remain collapsed even when changing window sizes.

When a two-pane layout is resized to a single full-width pane, that pane should remain at full-width after switching window sizes

#### Temporary pane resizing

The temporary resizing behavior doesn't remember user preferences for pane width. This is primarily used in supporting pane layouts where resizing is uncommon.

Supporting pane layouts can have a pane drag handle to temporarily resize the secondary content

With temporary resizing, panes should always return to the default layout after the pane or app is closed and reopened. This ensures content is a suitable size for most interactions.

The pane width can be adjusted using the drag handle

### Displaying multiple panes

There are three ways that multiple panes can be displayed in a layout: co-planar, floating, or docked. Choose the method best for each window size class.

![A foldable open screen with 2 co-planar panes displayed side by side.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm9v050d5-01.png?alt=media&token=a0af51f6-03d1-444d-becd-f5687f0defaa)

Co-planar: Panes are displayed side by side

![A  foldable open screen with a floating pane displayed above other elements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm9v093cw-02.png?alt=media&token=d20ad2c0-b5c4-4fa2-836d-a73ba350b68f)

Floating: A pane is displayed above other panes or content, like a dialog

![A  foldable open screen with a docked pane to the bottom of the screen displayed above other elements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm9v07ctn-03.png?alt=media&token=3f437e8e-3234-4fa2-8aed-eb4c1f33e3c8)

Docked: A pane is displayed above other panes and one of its edges extends beyond one side of the screen, like a bottom sheet

### How panes adapt

Pane layouts can adapt using three strategies: **show and hide, levitate**, or **reflow**. When the window is resized or changes orientation, these strategies allow panes to reorganize themselves to preserve context and meaning.

#### Show and hide

As the window size changes, panes can enter and exit the screen or appear next to one another.

A pane can be shown or hidden depending on the available window space

#### Levitate

Panes can be elevated above other content as **floating** or **docked** panes. This strategy helps panes appear relative to their triggers.

Floating panes appear in front of the body content, and can be customized to be dragged or resized. When adding controls that resize or move a floating pane, provide [accessible controls](https://m3.material.io/m3/pages/understanding-layout/parts-of-layout#c4619e07-cfc6-4d91-a724-0646126e3911).

A co-planar pane can float when switching window size classes

On large screens, the scrim behind a floating pane is optional.

![Two ways of showing floating panes on large screens.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm9v5rz5q-21.png?alt=media&token=2cabadca-49e5-4e95-ab16-a49a66402bf4)

1. Floating pane with a scrim
2. Floating pane without a scrim

Docked panes are usually at the bottom of the window, like a bottom sheet
Bottom sheets show secondary content anchored to the bottom of the screen.
[More on bottom sheets](https://m3.material.io/m3/pages/bottom-sheets/overview).

In medium and expanded window sizes, docked panes can adapt into floating panes.

A docked pane can adapt into a floating pane

Alternatively, in medium and expanded window sizes, a docked pane can adapt into a co-planar pane.

A docked pane can adapt into a co-planar pane

On large screens, docked panes can remain docked or become co-planar.

![A docked and co-planar pane.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm9v5trib-22.png?alt=media&token=2926876a-ea5a-4c73-acdc-e75fa86f38cc)

1. Docked pane
2. Co-planar pane

#### Reflow

Panes can be reorganized on screen as the window size or orientation changes, also known as reflow. For example, in a vertical orientation, the supporting pane can move underneath the primary pane.

In a vertical orientation, the supporting pane can move below the primary pane

Reflow also applies to window sizes. When there’s not enough horizontal space for panes, they can stack vertically instead.

Panes can change size, location, and orientation when switching screen sizes

### Spatial panels

On XR devices, pane layouts can be presented in disconnected spatial panels
In Android XR, a spatial panel is a container for UI elements, interactive components, and immersive content.
[More on spatial panels](https://developer.android.com/design/ui/xr/guides/spatial-ui#spatial-panels). These panels must have clear containment to make them easy to see on any background.

The content in a spatial pane may use implicit grouping
Implicit grouping uses close proximity and open space to group related items.
when the pane has an explicit container to distinguish it from the environment.

![Two-pane layout in a spatialized environment, with no background.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm4gz72a7-Frame%201321317413.png?alt=media&token=c651c612-b770-4ee0-9d03-ca287949bb96)

When the pane uses explicit containment, content can use implicit grouping

### Accessibility considerations

**Coplanar panes**

- For coplanar panes, the focus order matches the visual arrangement of the panes on the screen.

**Floating**

- A modal floating pane disappears when a user interacts with something behind it. When a modal pane is active the elements behind it can’t be interacted with. When a floating pane is modal, focus moves automatically to the first element in the pane, and when the pane is closed, focus moves back to the element that triggered it, like a dialog. If the modal pane was triggered automatically, focus should still move to it, but when it is closed, focus should go to the next most logical element on the screen.
- When a non-modal floating pane is open, other parts of the application can be interacted with. For non-modal panes, focus should be able to move to and from the pane, and the pane should also be available in a logical reading order of the screen.

**Docked**

- Docked panes have the same focus requirements as modal and non-modal panes. The focus order should match the visual arrangement of panes.

### Compact

*Source: [https://m3.material.io/foundations/layout/applying-layout/compact](https://m3.material.io/foundations/layout/applying-layout/compact)*

Layouts for compact window size classes are for **screen widths smaller than 600dp**.

![Messaging app in a compact window size.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly7219l1-1.png?alt=media&token=67ff316b-7515-4e9f-9971-4e580290b1f2)

Compact window size layouts focus on a single view

### Navigation

Use a navigation bar or modal navigation drawer

Place navigation components close to the edge of the screen where they’re easier to reach.

![Navigation bar and FAB are close to the bottom of a mobile app in a compact window.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly7232az-2.png?alt=media&token=c709f69b-6a72-4386-9e72-d89aae7201e9)

Mobile app with a navigation bar

### Body region

Use a single pane layout.

![The single pane consumes most of the area in a compact window.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly72dewk-4.png?alt=media&token=13801e5b-89c9-4026-9b18-13b2335479a5)

1. Single pane layout

### Spacing

Margins are 16dp from the left and right edge of the window.

![The left and right margins of a compact window pane are 16dp.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly72ec8x-5.png?alt=media&token=58e992b0-b18c-4192-bd18-f2ba1305dcfd)

16dp margins

### Special considerations

A compact layout will need to transition dynamically to a medium or expanded layout when:

- A foldable device is unfolded
- A mobile device is rotated from portrait to landscape
- A tablet exits split-screen mode
- An app is resized to be larger in multi-window mode
- A free-form window is resized

### Medium

*Source: [https://m3.material.io/foundations/layout/applying-layout/medium](https://m3.material.io/foundations/layout/applying-layout/medium)*

Layouts for medium window size classes are for **screen widths** **from 600dp to 839dp**.

![A medium window size with a video call app in full screen mode.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly72i40z-1.png?alt=media&token=4bdfcb24-0554-41d4-9f11-5d7562ba718b)

Video call app in a medium window size class

### Navigation

Place navigation components close to edges of the window where they’re easier to reach.

Use a navigation rail or modal navigation drawer for single-pane layouts. Use a navigation bar for two-pane layouts.

The navigation rail can be hidden in secondary destinations as long as the primary destination can still be accessed using a back button.

![The navigation area of a medium window size is a vertical bar at the left of the screen. To its right is the body area.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly72kx2v-2.png?alt=media&token=806232ea-3654-4567-b74c-d8e7b3447faf)

1. Navigation area
2. Body area

### Body region

A single pane layout is recommended because of limited screen width. However, a two-pane layout is possible for content with lower information density, such as a settings screen.

![A single pane uses most of the space in a medium window.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly72m904-3.png?alt=media&token=10efda2d-5586-4e82-9de5-6a2af0e8fc81)

1\. Single pane layout

Each pane in a two-pane layouts should take up 50% of the window width. Avoid setting custom widths. A drag handle can be used to expand or collapse panes to be 100% of the window width.

![Two-pane layouts in medium windows set both panes to 50% of the window width by default.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly72o7s8-1p-Diagram%20medium%20double%20pane-2x.png?alt=media&token=bf73c686-a43f-4558-a957-b488ee494ea5)

Two-pane layout

When adding navigation to a two-pane layout, use a navigation bar or a modal navigation drawer. This allows the panes to fully use the available window width.

![A navigation  bar extends over 2 panels at the bottom of  a medium window size.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly72pggb-4.png?alt=media&token=8ef3fdf0-c00b-4e04-9411-80ed7482ff23)

Two-pane layout with:

1. Navigation bar

### Spacing

Medium layouts have margins of 24dp.

The spacer between panes is also 24dp.

![Two pane layout with 24dp margins and  24dp space between panes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly72vvqs-5.png?alt=media&token=6303a052-8495-475e-acdd-b02b859e8d9b)

Margins and spacer are 24dp

### Special considerations

A medium layout will need to transition dynamically to a compact or expanded layout when:

- A foldable device is folded
- A tablet is rotated from portrait to landscape
- The app goes from full-screen to split-screen
- Multi-window mode is initiated
- A free-form window is resized

![Two paned layout of an email app in a medium window size.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly72wumu-6.png?alt=media&token=6db9fe67-ad21-4a5b-839c-b4e9acebdc10)

Email app in a medium layout

#### Reachability

For horizontal tablets and unfolded foldables, the top 25% of the screen is likely out of reach, unless the grip is adjusted. To accommodate device and hand sizes, limit the amount of interactions that are placed in the upper 25% of the screen.

Additionally, avoid placing essential interactive elements too close to the bottom edge of the screen. Some users, particularly those with larger hands, might struggle to reach this area.

![The hard-to-reach top quarter of a medium window size in landscape mode.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly72ymi7-7.png?alt=media&token=f40dca6d-698a-454d-9065-7efd48d24a30)

Limit interactions in the upper quarter of the screen (1). The top 25% of the screen can be hard to reach.

Specify interactions in a layout with these ergonomic regions in mind:

1. Users can reach this area by extending their fingers, which makes it inconvenient
2. Users can reach this area comfortably
3. Reaching this area is challenging when holding the device

![The hard-to-reach top quarter of a medium window size in landscape mode.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly72zkyg-8.png?alt=media&token=47bed2de-554b-44f9-82ea-f5e7fb77a413)

Placing critical and frequently used elements close to the screen's bottom edge and corners makes them harder to reach

### Expanded

*Source: [https://m3.material.io/foundations/layout/applying-layout/expanded](https://m3.material.io/foundations/layout/applying-layout/expanded)*

Layouts for expanded window size classes are for **screen widths 840dp to 1199dp.**

![An expanded window size with a video app in 2 pane mode.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly73sadr-1.png?alt=media&token=96e86f92-c696-4404-bced-fa17c2e8f4cc)

Video app on an expanded window size class

### Navigation

Place navigation components close to edges of the window where they’re easier to reach.

Use a navigation rail or persistent navigation drawer.

The navigation rail can be hidden in secondary destinations as long as the primary destination can still be accessed using a back button.

For sorting, filtering, or secondary navigation, use tabs or other components directly in the body.

![The navigation area is a vertical bar at the left of the screen. To its right, the body pane fills the rest of the window.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly73tbp5-2.png?alt=media&token=b9070ba9-fba8-4410-b78e-1aeff83e3a16)

1. Navigation
2. Body

### Body pane

Use a single pane layout or two-pane layout.

A two-pane layout is often best for expanded window classes. However, a single pane layout can work when displaying visually dense or information-dense content, such as videos.

![The single body pane layout covers most of the expanded screen except for the navigation area and margins.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly73ubc7-3.png?alt=media&token=842d6b15-3130-4cad-bb73-4c83e35c5ea3)

An expanded window size class with a single pane layout

When using a fixed and flexible layout, the fixed pane should have a width of 360dp by default.

An expanded window size class with a two-pane layout

A split-pane layout uses two flexible panes  and visually centers the spacer by default.

An expanded window size class with a single pane layout

### Spacing

Expanded layouts have a left and right margin of 24dp.

The spacer between panes is 24dp.

![Two pane layout with 24dp margins and  24dp space between panes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly745kox-6.png?alt=media&token=a16b033a-aa1e-441d-81aa-3c4b48ca200f)

1. Pane
2. Second pane

### Special considerations

An expanded layout will need to transition dynamically to a compact or medium layout when:

- A foldable device is folded
- A tablet is rotated from landscape to portrait
- The app goes from full-screen to split-screen
- Multi-window mode is initiated
- A free-form window is resized

Email app in an expanded window class size

### Large & Extra-Large

*Source: [https://m3.material.io/foundations/layout/applying-layout/large-extra-large](https://m3.material.io/foundations/layout/applying-layout/large-extra-large)*

Layouts for large window size classes are for screen widths **from 1200dp to 1599dp.**

Layouts for extra-large window size classes are for screen widths of **1600dp and larger.**

These window size classes are most useful for creating web experiences tailored to laptop and desktop devices. Your product may not need large and extra-large window size classes. Consider your platform’s conventions and users when making decisions on which window size classes to design for.

![Large window size with a video app in 2 pane mode.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly749cio-1.png?alt=media&token=88f87a65-e036-40ed-8a96-05bf7a12c488)

Video app on an large window size class

### Navigation

Use a navigation rail or persistent navigation drawer, depending on the amount of body content.

For sorting, filtering, or secondary navigation, use tabs or other components directly in the body.

![Web browser with vertical navigation area on the leading edge of the screen with a larger body pane filling the rest of the window.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly74aatt-2.png?alt=media&token=a147a272-6ee9-4994-9b65-5b2a2c1bd1a2)

1. Navigation
2. Body

A navigation drawer is best suited for extra-large windows, where there's still plenty of room for body content. Consider collapsing the navigation drawer into a navigation rail when space is needed, or when on pages deeper in the page hierarchy.

![Web browser with vertical navigation area on the leading edge of the screen with a larger body pane filling the rest of the window.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly74b2re-3.png?alt=media&token=0a220cf7-f2bc-452b-aa06-90b838106174)

1. Navigation
2. Body

### Body pane

A two-pane layout is often best for large and extra-large window sizes.

However, a single pane layout can work when displaying visually dense or information dense content, such as videos.

![The single body pane layout covers most of the expanded screen except for the navigation area and margins.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly74c4tp-4.png?alt=media&token=e14a0337-7ff5-48de-b841-be54a6cd8fb6)

Use a single pane layout for dense content or media

When using a fixed and flexible layout, the fixed pane should have a width of 412dp by default.

![The vertical navigation area is on the left of the screen. To its right are 2 body panes separated by a vertical margin.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly74d4wj-5.png?alt=media&token=831e5ba0-9e7a-4f54-820b-2d81639498e2)

Fixed panes should be 412dp in large and extra large windows

When using a split-pane layout, the spacer should be visually centered by default, even when using a navigation drawer.

![The vertical navigation area is on the left of the screen. To its right are 2 body panes separated by a vertical margin.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly74dvj8-6.png?alt=media&token=652fc4c9-4a5a-4d99-b8ac-ba7679683998)

In split-pane layouts, navigation components should shrink the left pane so the spacer remains centered

### Additional panes

The extra-large window size class supports using a standard side sheet as a third pane. When the side sheet is present, the navigation drawer can remain visible, collapse into a navigation rail, or hide completely. Don't use more than three panes.

Note: Fixed panes in this window size are recommended to be 412dp, but side sheets have a default maximum width of 400dp.

![Extra large window with two panes and a side sheet acting as a third pane.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly74fmxy-7.png?alt=media&token=9813a79a-2135-43ad-8b3b-c0009f15993c)

1. Standard side sheet (third pane)

### Spacing

Large and extra-large layouts have a left and right margin of 24dp.

The spacer between panes is 24dp.

![Two pane layout with 24dp margins and  24dp space between panes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly74h1q7-8.png?alt=media&token=b680f393-3138-4110-8e53-a447f4e2f2bc)

### Special considerations

Large and extra-large layouts will need to transition dynamically to a smaller layout when:

- The app goes from full-screen to split-screen
- Multi-window mode is initiated
- A free-form window is resized

Special attention to typographic elements such as [line length](https://m3.material.io/m3/pages/typography/applying-type) to ensure readability must be considered on large and extra-large layouts.

![Two paned layout of an email app in an expanded window class layout.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fly74holg-9.png?alt=media&token=4225d9ca-e76d-47da-8d6c-6cbc6a0e9ae7)

---

## Layout – Canonical Layouts

### Overview

*Source: [https://m3.material.io/foundations/layout/canonical-layouts/overview](https://m3.material.io/foundations/layout/canonical-layouts/overview)*

**Use the three canonical layouts as starting points for organizing common elements in an app**.

Each layout considers common use cases and components to address expectations and user needs for how apps adapt across window class sizes and breakpoints.

### Resources

| Type | Resource | Status |
| --- | --- | --- |
| Implementation | [MDC-Android – Canonical layouts](https://github.com/android/user-interface-samples/tree/main/CanonicalLayouts) | Available |
|  | [Flutter –](https://pub.dev/packages/flutter_adaptive_scaffold) [Adaptive scaffold](https://pub.dev/packages/flutter_adaptive_scaffold) | Available |
|  | [Jetpack Compose – Canonical layouts](https://developer.android.com/develop/ui/views/layout/canonical-layouts) | Available |

### Takeaways

- There are three canonical layouts: list-detail, supporting pane, feed
- Each canonical layout has configurations for compact, medium, and expanded window size classes

### Layouts

#### [Feed](https://m3.material.io/m3/pages/canonical-layouts/feed)

Use a feed layout to arrange content elements like cards in a configurable grid for quick, convenient viewing of a large amount of content.

![Feed layout of a news app's top stories. One large story fills the first pane, and multiple smaller stories and live events are on the second pane.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxydid0o-1.png?alt=media&token=55ae108a-f05d-4c08-ab1e-1fade8706194)

Example feed layout

#### [List-detail](https://m3.material.io/m3/pages/canonical-layouts/list-detail)

Use the list-detail layout to display explorable lists of items alongside each item’s supplementary information—the item detail. This layout divides the app window into two side-by-side panes.

![List-detail layout of a messaging app. The first pane lists all conversations. The second pane is for messaging in the selected conversation.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxydjght-2.png?alt=media&token=b304c1d5-579c-40dc-8fec-22bde1b72781)

Example list-detail layout

#### [Supporting pane](https://m3.material.io/m3/pages/canonical-layouts/supporting-pane)

Use the supporting pane layout to organize app content into primary and secondary display areas. The primary display area occupies the majority of the app window (typically about two thirds) and contains the main content. The secondary display area is a panel that takes up the remainder of the app window and presents content that supports the main content.

![Supporting pane layout of a video app. The large, primary pane has the video, title, and actions. The small, secondary pane has queued and recommended videos.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxydkkpk-3.png?alt=media&token=5c0b5f37-ee8e-43da-84a3-378abd1d3e04)

Example supporting pane layout

### List-Detail

*Source: [https://m3.material.io/foundations/layout/canonical-layouts/list-detail](https://m3.material.io/foundations/layout/canonical-layouts/list-detail)*

Many layouts can be established based on the relationship of a list and a detail view.

Key use cases for this layout include parent-child pairings of information like:

- Text message + conversation
- File browser + open folder
- Musical artist + album detail
- Settings + category detail
- Email inbox + selected email

![An email app in a list-detail layout in a medium window size.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxye03l6-1.png?alt=media&token=2e8b59dc-2e41-4147-9fe0-640a4e04651f)

1. List
2. Detail

### Usage

Use the list-detail view for displaying browsable content and quickly showing details.

Examples include: showing a series of conversations and a text message; browsing files and seeing their details; or browsing multiple albums and seeing individual track information in an adjacent view.

![Several stacked cards make up the list area on the left pane, while the detail area is a single section on the right pane.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxye1vad-2.png?alt=media&token=aee278d7-9838-4779-b585-9646dbd4f5f9)

Simplified diagram of:

1. List area
2. Detail area

### Dividing space

![Compact windows have 1 pane, while medium and expanded windows can have 2 panes for list-detailed views.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxye2xeh-3.png?alt=media&token=4b687afc-aa4b-4802-825b-5bee568e0801)

The most basic list-detail views for compact, medium, and expanded layouts

A list-detail view uses two panes: one for a list or group of items and the other for a detailed view. Depending on the window class, the two panes may appear together in the same layout or across separate layouts.

List-detail canonical layouts use the same pane guidance as all single and two-pane layouts, including special behavior for foldables.

| **Window size class (dp)** | **Visible panes** |
| --- | --- |
| Compact (0-599) | 1 pane |
| Medium (600-839) | 1 (recommended) or 2 panes |
| Expanded (840+) | 2 panes |
| Large (1200-1599) | 2 panes |
| Extra-large (1600+) | 2 panes |

### Across window size classes

#### Compact

- Use a single-pane layout
- Only one view is visible at a time (either list or detail)

![Single pane layout on 3 devices with compact window sizes.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxye4k9e-4.png?alt=media&token=27b207c4-e0fd-4fec-83f7-cf0742d7451c)

1. Phone in portrait orientation
2. Closed foldable
3. Tablet in split-screen mode

#### Medium

- Use a single-pane layout for information-dense content or longer interactions

![Single-pane layout on a foldable open flat and a tablet in portrait orientation.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxygqujc-5.png?alt=media&token=18a4bae5-6e67-4b37-bfff-85c49507e298)

1. Foldable open flat
2. Tablet in portrait orientation

1. Use a two-pane layout for information-dense content, or quicker interactions
2. To avoid cramped pane widths, use a bottom navigation bar or modal navigation drawer with two-pane layouts in medium only

![Two-pane layout on a foldable open flat and a tablet in portrait orientation.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxygruxu-6.png?alt=media&token=d4c8f911-ecc1-4c60-850d-1c45ab780c65)

1. Foldable open flat
2. Tablet in portrait orientation

#### Expanded, large, and extra-large

- Use a two-pane layout

![Two-pane layout on a phone and tablet, both in landscape orientation.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxygtbb1-7.png?alt=media&token=2dafae6a-5fa5-4ec4-a25c-3cbd582dd62a)

1. Phone in landscape orientation
2. Tablet in landscape orientation

### Behavior

#### Single vs two-pane

- Back button: Appears in detail view only for single-pane layouts
- Selected state: Appears only in list view for two-pane layouts
- Visual focus: Use [explicit and implicit grouping](https://m3.material.io/m3/pages/understanding-layout/spacing#efb4667d-f942-4019-8cd8-1fcb366e392d) to direct focus in two-pane layouts

![A two-pane layout shows the selected list item, while a single pane layout uses a Back button to return to the list.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxygv3fn-8.png?alt=media&token=c7e6d4e6-dfdc-4075-81b1-95517c08f3b6)

Navigating between list and detail views is different in each layout

#### Transitioning between layouts

The amount of available space is dynamic and changes based on user behavior, such as rotating or unfolding a device, or entering a multi-window mode.

A two-pane list-detail layout adapts to a one-pane layout when the device is rotated, changing from expanded to medium window class

##### No selected list item

The single-pane screen shows the list, and the two-pane screen shows placeholder content in the detail pane.

In some use cases, such as multi-select, the pane last interacted with should remain visible when switching back to single-pane view.

If no item in the list view is selected when a foldable is opened, the revealed pane displays an empty detail view

**Selected list item**

When going from a single- to two-pane view, both panes should be shown. The selected item’s details are visible.

When going from a two- to single-pane view, the result depends on the product behavior:

- Generally, the detail pane should be shown on the single-pane view, and an app bar appears.
- However, if the product supports selected list items without navigating deeper, like multi-select, it can show the list view instead with the item selected.
- The most important rule is consistency. If the single pane showed the list view before, it should revert to the list view when going back to a single pane.

If an item in the list is selected when a foldable is opened, the revealed pane displays that item’s detail view

If an item in the list is selected when a foldable is closed, the list view is hidden and the detail view is shown in the single pane

If no list item is selected, list pane remains visible and detail pane hides.

In some use cases, such as multi-select, the pane last interacted with should remain visible.

If no item in the list is selected when a foldable is closed, the detail view is hidden and the list view is shown in the single pane

In most cases, a state should be saved when navigating between detail views. Detail views with read and unread content fall into this use case.

The scroll position of a detail view is retained even after navigating to other list items

### Supporting Pane

*Source: [https://m3.material.io/foundations/layout/canonical-layouts/supporting-pane](https://m3.material.io/foundations/layout/canonical-layouts/supporting-pane)*

The supporting pane layout organizes content into primary and secondary areas.

The primary area occupies the majority of the body area and contains the main content. The secondary area contains supporting content.

Key use cases for supporting pane layouts include:

- Productivity
- Document editing and commenting
- Content and media browsing

![A video app has the main content in the primary area and “up next” content is listed in the secondary area.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxyhnbqz-1.png?alt=media&token=d9360086-e3e5-438c-9339-e41e20ce2c4d)

Video app using a supporting pane layout

### Usage

Use the supporting pane layout when the secondary content is only meaningful in relation to the primary content.

For content with a parent-child relationship, use a list-detail view layout instead.

![The supporting pane has vertically stacked cards.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxyhojow-2.png?alt=media&token=c4c61a9d-aa0f-400c-927a-106fbc7d6844)

Simplified diagram of a supporting pane layout

### Dividing space

The screen is divided between a focus pane and a supporting pane.

Depending on the window size class, the supporting pane may appear below or beside the focus pane.

![The cards of a supporting pane scroll horizontally across the bottom of the screen.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxyhp6m0-3.png?alt=media&token=20e40667-3355-470a-9658-a0bf43a30ab5)

Diagram of a supporting pane positioned below the primary focus area

| Supporting pane placement | Pane width | Window size class |
| --- | --- | --- |
| Below | Flexible | Compact or Medium |
| Left-side or right-side | Fixed (360 dp) | Expanded |

### Across window size classes

#### Compact

The supporting pane should appear below the focus pane.

A bottom sheet can be useful for keeping focus on the primary pane while providing access to supporting information.

![2 layouts showing the bottom sheets in a compact window.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxyhpzw3-4.png?alt=media&token=a91423c2-0408-42ce-82f4-6df4a65e4e77)

Supporting pane below the primary focus pane in compact layouts

#### Medium

The supporting pane should appear below the focus pane

![The cards of a supporting pane are horizontal across the bottom of a medium window.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxyhqw1v-5.png?alt=media&token=1a4f6d1d-93bc-4359-a95a-3905c3ade09c)

Supporting pane below the primary focus pane in medium layout

#### Expanded

The supporting pane should appear on the left or right side of the focus pane

![The supporting pane is to the right of the primary focus pane in expanded windows.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxyhrsua-6.png?alt=media&token=bdacc60f-907c-4694-9cd8-3cad7f249476)

Supporting pane at the trailing end of the primary focus pane in expanded layouts

### Feed

*Source: [https://m3.material.io/foundations/layout/canonical-layouts/feed](https://m3.material.io/foundations/layout/canonical-layouts/feed)*

A feed layout uses a grid composition to enable quick content browsing and discovery.

Key use cases for the supporting pane layouts include:

- News
- Photos
- Social media

![Photo app using a feed layout.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxydmkqj-1.png?alt=media&token=77c3c746-4fc8-4725-a343-17c7f2b0072d)

Photo app using a feed layout

### Usage

Use a feed layout to show different pieces of content through cards and lists.

Feeds support displays of almost any size as grids can adapt from single to multi-column.

![The news feed has 1 column in a compact window class, and 2 columns in the medium window class.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxydny00-2.png?alt=media&token=a70edcf6-4a1e-4b88-9a45-f43c34a6bf75)

Example news apps using a feed layout for compact and medium window size classes

### Dividing space

A feed composition is flexible enough to allow for content with varying proportions and sizing.

![Feed layout in a medium window size with 2 columns and left navigation rail.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxydoo2v-3.png?alt=media&token=e2a74a4f-624f-4506-829c-e04c9bb0fcda)

Example feed layout with two columns

Use size and position to establish relationships among content elements.

Feed items should reflow when the amount of available space changes, such as rotating or unfolding a device, or entering a multi-window mode.

The order of items is determined by their position. Learn more about [cards responsive layout guidance](https://m3.material.io/m3/pages/cards/guidelines#99e8d17d-5bde-4bb9-8784-0ca403325b10).

![The graphic for the lead article is prominent on a news feed with 2 columns. ](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxydpeoi-4.png?alt=media&token=18ea64f6-5ee3-4904-bfe0-2c20fe73db83)

News app with a feed layout using two columns

### Across window size classes

#### Compact

A feed layout will stack vertically like a list of cards, with individual items taking up the width of the pane, but not necessarily the full height.

![In compact windows, the cards in a feed stack vertically, fitting to full width but not full height.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxydqtn2-5.png?alt=media&token=ec5ceb39-4c21-4572-8a4c-16531d9c8742)

Cards in two feed layouts for compact window size class

#### Medium

A feed layout can support components with different widths and be split across multiple columns.

![In a medium window, 2 equal width columns of cards in a feed layout.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxydtfa9-6.png?alt=media&token=29871b84-7a76-40e4-8c81-10e33b37f4bb)

Navigation bar and cards in a feed layout for medium window size class

#### Expanded, large, and extra-large

A feed layout can support components with different widths and be split across multiple columns. The number of columns of content should usually increase for expanded window size classes.

![In an expanded window, 3 equal width columns of cards in a feed layout.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxydueo2-7.png?alt=media&token=43a01e2a-1d56-4d9b-870d-61823e01517a)

The number of columns increased from two to three in the expanded window size class

### Behavior

Feed items should reflow when the amount of available space changes, such as rotating or unfolding a device, or entering a multi-window mode. The order of items is determined by their position. Learn more about [cards responsive layout guidance](https://m3.material.io/m3/pages/cards/guidelines#99e8d17d-5bde-4bb9-8784-0ca403325b10).

---

## Usability

### Overview

*Source: [https://m3.material.io/foundations/usability/overview](https://m3.material.io/foundations/usability/overview)*

### Key takeaways

- Emphasize key actions to create effective visual hierarchy
- Leverage [expressive design tactics](https://m3.material.io/blog/building-with-m3-expressive#what-rsquo-s-in-the-update) to improve usability
- Don't overwhelm the user with too much visual information
- Test and iterate to validate designs

Usability helps create digital products that are easy to use and engaging. By leveraging M3 Expressive [design tactics](https://m3.material.io/blog/building-with-m3-expressive#what-rsquo-s-in-the-update) like containment, size, shape, color, and typography, designers can guide users through experiences and emphasize key actions to create intuitive, usable products.

![](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmejie2v2-Hero%20image.png?alt=media&token=9d9dc1ff-3bcb-45e4-bbaf-78b24bd19945)

### What is usability?

The [Nielsen Norman Group](https://www.nngroup.com/articles/usability-101-introduction-to-usability/) defines usability by how effectively users interact with a product through five aspects:

| Aspect | Definition |
| --- | --- |
| Efficiency | Users can efficiently complete tasks and goals |
| Errors | Proper design reduces the likelihood of mistakes, and users can easily correct any errors that do occur |
| Learnability | New users learn to use the product and complete tasks easily, even if it’s the first time they’re using it |
| Memorability | When users come back to a product, they remember how to use it |
| Satisfaction | Users are satisfied with the designed experience |

#### How is usability different from accessibility?

**Accessibility** focuses on making products accessible for people with disabilities. Accessible experiences are perceivable, operable, understandable and robust, and support people who use assistive technology. [More on accessibility](https://m3.material.io/foundations/overview/principles)

**Usability** focuses on making products intuitive and easy to understand for everyone.

### Usability design tactics

There are many ways to design for usability; not all design tactics need to be combined at the same time. An effective combination of design tactics can:

- Make a product easily understood, learnable, and memorable
- Help people quickly identify what do to next
- Minimize distractions to focus on the task

Start by creating a strong visual hierarchy to emphasize important information by using color, size, spacing, placement, containment, and other [tactics](https://m3.material.io/blog/building-with-m3-expressive#what-rsquo-s-in-the-update). Then add unique emphasis to celebrate success or progress, by adding illustrations, scale, shapes, and shape morph.

#### Color & color contrast

Use eye-catching primary and secondary colors to create hierarchy and emphasize key actions. Instead of similar colors, try using contrasting colors, like purple and green. Colors should always follow [basic accessibility guidelines](https://m3.material.io/foundations/designing/color-contrast).

Tip: Material Design’s dynamic [color roles](https://m3.material.io/styles/color/roles) automatically create color palettes with proper emphasis and accessible contrast ratios.

More on [Color](https://m3.material.io/styles/color/system/overview?utm_source=homepage&utm_medium=referral&utm_campaign=IO25) & [color contrast](https://m3.material.io/foundations/designing/color-contrast)

![Light purple, dark purple, yellow and dark green colors on a light purple background](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmejighrd-Contrast.png?alt=media&token=d99c8cef-57cd-43b0-b165-ae5a1ab018f1)

#### Containment & grouping content

Group related elements in subtle containers to make them easier to understand. Break content into manageable sections using containment, [spacing](https://m3.material.io/foundations/layout/understanding-layout/spacing), and headings.

![Four different rectangular shapes with round or rounded corners](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmejiivyt-Visual%20Hierarchy.png?alt=media&token=8e1f750f-ee5a-4775-87cc-b96b9b26b95b)

#### [Motion](https://m3.material.io/styles/motion/overview/how-it-works)

Motion emphasizes key moments or unique experiences. However, use it sparingly since motion can be distracting.

#### Shape & shape morph

The [Material shape library](https://m3.material.io/styles/shape/overview-principles#579dd4ba-39f3-4e60-bd9b-1d97ed6ef1bf) has 35 shapes to apply to designs. Shapes are often used to mask imagery or fill empty space.

Shape:

- Adds emphasis and delight
- Guides focus
- Differentiates containers, buttons and animations
- Signals interaction
- Sets emotional tone

Every shape can morph into another in the set. Shape morph is also applied when interacting with components like [buttons](https://m3.material.io/m3/pages/common-buttons/specs#e9ec15a7-7a8d-41f9-81d1-541c2dc33643). Shape morph:

- Communicates interaction states, like selected, tap, swipe, scroll, release, long press
- Emphasize actions in progress

More on [shape](https://m3.material.io/styles/shape/overview-principles#579dd4ba-39f3-4e60-bd9b-1d97ed6ef1bf) & [shape morph](https://m3.material.io/styles/shape/shape-morph)

![Five shapes from the Material Shape set](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmejiksvb-Shape.png?alt=media&token=e496fdad-065e-49c1-8197-b13aa00e9fef)

#### Size

The size and scale of elements shows their level of importance. The most important action or the main call to action (CTA) should be the largest element.

Using larger sizes for key actions dramatically increases usability and makes products more efficient. Users are satisfied, they make fewer errors, and find the products to be more learnable.

![Small, medium, and large soft burst](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmejimbjk-Size.png?alt=media&token=052597d9-80f5-4bb9-affe-41ee1af815b5)

#### Typography

Type can separate different hierarchies of information. More important information might use one font and less important or supplemental content might use another.

- The largest, most legible text on the screen could signal a primary action
- Smaller text signals secondary or tertiary action
- Group similar content by using the same font style

[More on typography](https://m3.material.io/styles/typography/overview)

![Different weights and width of letters](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmejin9xv-Typography.png?alt=media&token=e057bb09-e023-4c19-85f1-e0d98e847b99)

### Design based on primary goals

Primary goals are the main tasks to use a product successfully, like starting a process or making decisions, so they need the strongest emphasis. Secondary and tertiary goals add to the experience of the product but aren’t required, like viewing statuses or settings. Identify primary, secondary, and tertiary goals by considering product needs and user satisfaction.

To guide people to the primary goal while ensuring that other goals are still discoverable, try:

- Creating a strong visual hierarchy with size, color, and other design tactics
- Simplifying to one primary task on each page, leveraging empty space to focus attention
- Making core actions recognizable and easily reachable, like using large buttons for the most frequent actions
- Designing a harmonious experience that is aesthetically pleasing and easy to understand
- Not using too many expressive tactics at the same time as they can be distracting

### Iterate

Test, iterate, and gather feedback early and often from a range of users and contexts to validate design choices and minimize errors. User testing offers valuable insights into how users perceive and interact with the usability of the product experience.

### Applying M3 Expressive

*Source: [https://m3.material.io/foundations/usability/applying-m-3-expressive](https://m3.material.io/foundations/usability/applying-m-3-expressive)*

### Aura: An example app showcasing usability with M3 Expressive

![Four key screens of the breathing app.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmhjgyvci-Core%20Flow.png?alt=media&token=9ddfd7a6-8f5c-4a4a-a00e-1c37dbb7af84)

The four goals in the Aura breathing app:

1. Start a breathing session
2. Experience and complete a breathing session
3. View the breathing session results
4. Check progress towards personal goals

Aura is a conceptual breathing app that illustrates how [Material 3 (M3) Expressive design tactics](https://m3.material.io/blog/building-with-m3-expressive#what-rsquo-s-in-the-update) can make an app more usable and draw the user’s attention to the most important actions. It’s used with a smart watch to measure heart rate. It was created based on the [eye tracking and focus group research](https://design.google/library/expressive-material-design-google-research) that played a key role in the creation of M3 Expressive. Research showed that participants were able to spot key UI elements up to **four times faster** in the M3 Expressive designs compared to other designs.

Examples include:

- Using scale, color, and containment to guide people to start a breathing session
- Using shape, color, and empty space to guide people to breathe slowly and with intention
- Minimizing cognitive load by using empty space and fewer actions, so people can stay focused on their breath
- Balancing primary tasks with supportive data to show progress and impact of a session

### Example 1: Start a breathing session

Starting the session is the primary goal when opening the app. Size, placement, color, and contrast guide the user to the **Start breathing** button. The button’s large size and low placement makes it easy to reach when holding a phone.

The **settings** use a secondary color to draw attention, but they’re not as emphasized as the button.

The **daily message** is the least emphasized, but uses large containment and type to draw attention.

Expressive components used:

- [Extra large button](https://m3.material.io/m3/pages/common-buttons/overview)
- [Button groups](https://m3.material.io/m3/pages/button-groups/overview)
- [Switch](https://m3.material.io/m3/pages/switch/overview)
- [Navigation bar](https://m3.material.io/m3/pages/navigation-bar/overview)

![3 elements of the landing page of a breathing app.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmejir1iw-Visual%20Hierarchy%20(1).png?alt=media&token=491a7dfb-2018-4564-a226-807a2586fdd5)

App elements in order of emphasis:

1. The **Start breathing** button is the primary goal of the app
2. Breathing session settings
3. Daily welcome message

#### Usability design tactics

|     |     |
| --- | --- |
| Color & contrast | The prominent dark purple **Start breathing** button (1) on a soft light purple background uses [Material primary color roles](https://m3.material.io/m3/pages/color-roles) to create high contrast, making the button easy to find and remember. |
| Hierarchy | The main goal is to tap the large **Start breathing** button (1). The daily message (3) and settings (2) are in lighter colors and in subtle containers because they are supportive actions, but not required. |
| Placement | The button (1) is close to the bottom so it’s easy to reach. It’s the final, most prominent element in the vertical flow, naturally guiding the eye down the screen without competing with other content. |
| Shape | The rounded button form reinforces it as a distinct, touchable control. |
| Size | The button (1) is extra large to make it the most emphasized element on the screen. |
| Spacing | Generous spacing separates the button (1) from the message (3) and settings (2). |
| Typography | The button (1) has larger text to emphasize the primary action. |
| Visual harmony & hierarchy | The daily message is placed at the top in a soft blue container with medium sized text, setting a reflective tone without drawing too much focus. <br>The hierarchy guides the user from the daily message (3) to settings (2) and finally to the **Start breathing** button (1). |

### Example 2: Breathing session (inhale & exhale)

The guided breathing exercise is the [hero moment](https://m3.material.io/blog/building-with-m3-expressive). A large central flower expands and contracts, serving as the visual guide for each breath, while a countdown shows remaining seconds for inhaling, exhaling, and holding the breath.

The **pause** and **stop** buttons are less prominent than the flower to encourage people to focus on the session. The buttons are placed at the bottom so they’re easy to reach.

Expressive components and styles used:

- [Large buttons](https://m3.material.io/m3/pages/common-buttons/overview) in a [button group](https://m3.material.io/m3/pages/button-groups/overview)
- [Material shape library](https://m3.material.io/m3/pages/shape/overview-principles#579dd4ba-39f3-4e60-bd9b-1d97ed6ef1bf) (“flower” and “sunny”)
- [Emphasized typography](https://m3.material.io/m3/pages/typography/type-scale-tokens#c898d7e2-4833-440c-9dba-9a95c8f50ac9)

The flower’s shape, size, and movement guide the user to inhale, exhale, and hold the breath.

#### Usability design tactics

|     |     |
| --- | --- |
| Color & contrast | The vibrant yellow appears when inhaling to contrast the soft purple background and be obvious. |
| Motion | The flower expands and contracts to guide the pace of the breath. The motion uses [Material Spring Motion Tokens](http://figma.com/community/plugin/1397759704974764283/material-motion). |
| Placement | The **pause** and **stop** buttons are at the bottom, spaced away from the flower, but easy to reach. The navigation bar hides during the breathing journey. |
| Shape | The flower uses the “flower” and “sunny” [Material shapes](https://m3.material.io/google-material-3/pages/shape/overview-principles#76fb0225-57af-4497-83d0-2b8827505fba) to draw attention and clearly stand apart from the simple **pause** and **stop** buttons. |
| Size | The size of the animating, breathing flower dominates the screen to draw attention. |
| Typography | The countdown numbers are very large in comparison to the **inhale**, **hold**, and **exhale** text to focus attention on the exercise. This provides strong visual contrast, while still keeping the instructions associated with the countdown. |

### Example 3: Breathing report

The breathing report comes after the breathing exercise. It’s the secondary goal in the app, not the primary hero moment, so it uses fewer design tactics to reduce cognitive load.

It draws attention to each data point on the page using shapes and decreasing size. The button is less emphasized than the **Start breathing** button on the landing page.

Expressive components and elements used:

- [Medium button](https://m3.material.io/m3/pages/common-buttons/overview)
- [Material shape library](https://m3.material.io/m3/pages/shape/overview-principles#579dd4ba-39f3-4e60-bd9b-1d97ed6ef1bf)
- [Emphasized typography](https://m3.material.io/m3/pages/typography/type-scale-tokens#c898d7e2-4833-440c-9dba-9a95c8f50ac9)

![The breathing report provides data (total breaths taken, exercise duration, heart rate/beats per minute (BPM), and breaths per minute) from the user’s breathing session. ](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmejiz13p-Breathing%20Report%20Do.png?alt=media&token=76515d71-3997-4020-8d6d-2ed04f8d3a7d)

Shapes and smaller sizes emphasize key information and draw attention down the screen to the **Finish** button

#### Usability design tactics

|     |     |
| --- | --- |
| Color & contrast | Dark text on the light flower shapes creates a strong contrast, making each metric easy to read at a glance. <br>The solid, dark purple **Finish** button stands out clearly against the light purple background, guiding users to the next step. |
| Placement | The metrics are spread out across the screen in a loose cluster, guiding the user from one to the next. <br>The **Finish** button is centered at the bottom so it’s easy to reach. |
| Shape | The metrics are inside Material flower shapes, making achievements stand out. The use of flower shapes make the design look consistent. |
| Size & typography | Key numbers like **18** and **3min** are larger and use emphasized styles, making it easy to scan the most important data. |
| Spacing & grouping | Ample spacing around each metric avoids clutter, while making the layout tide any scannable. <br>Playful Material shapes serve as clear containers, making the grouping feel lively. |

### Example 4: Check progress

The progress report is a tertiary goal in the app to track statistics and see progress over a monthly view. Since it’s not a primary goal or hero moment, it uses more subtle design tactics to make the app usable and draw more attention.

The key data is dark on a light background to draw attention, while the yellow shapes on the calendar highlight completed sessions.

Expressive components and elements used:

- [App bar](https://m3.material.io/m3/pages/app-bars)
- [Progress indicator](https://m3.material.io/m3/pages/progress-indicators/overview)
- [Medium button](https://m3.material.io/m3/pages/common-buttons/overview)
- [Navigation bar](https://m3.material.io/m3/pages/navigation-bar/overview)
- [Material shape library](https://m3.material.io/m3/pages/shape/overview-principles#579dd4ba-39f3-4e60-bd9b-1d97ed6ef1bf)
- [Emphasized typography](https://m3.material.io/m3/pages/typography/type-scale-tokens#c898d7e2-4833-440c-9dba-9a95c8f50ac9)

![A progress screen shows data in dark primary colors, then statuses in secondary yellow colors in a progress bar and calendar view.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmejj1yj5-Progress%20-%20WIP.png?alt=media&token=5fc4dfb1-176f-49d0-8f7b-765f892be572)

Large text and colorful completed sessions draw attention to the key progress information

#### Usability design tactics

|     |     |
| --- | --- |
| Color & contrast | The data uses the **primary** role to be darker than all other elements and draw attention.<br>The yellow accents on the daily goal bar and calendar use the **secondary** roles to highlight progress. |
| Grouping & spacing | The metrics (days, breaths, and minutes) are grouped together. The equal vertical spacing between elements makes it easy to scan data. |
| Shape | The rounded Material flower shape on the highlighted days in the calendar makes data more expressive. <br>The flower shapes remind the user of the breathing exercise visualization. |
| Size | Custom-scaled numbers for key statistics such as days, breaths, and minutes are large enough to scan, but they don’t dominate the screen. |

### Testing & iteration improves the experience

By testing the experience with users, it’s easy to identify usability issues and address them. From version 1 to 2, the design shifts from cluttered to calm and simplified.

![A button to start breathing followed by loosely-grouped settings for duration, sound, and haptics, all with their own styles. ](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmejj3nr8-Home%20Caution%20Uglyfied.png?alt=media&token=e2a6e7f0-9258-4058-9ccd-12b0153b9683)

Version 1: No containment, similar sizes, and inconsistent colors

![A list of settings consistently styled followed by an extra large button to start breathing.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmejj4ua6-Home%20Right.png?alt=media&token=bb67336a-ca85-47c7-b256-8cfdd3c57717)

Version 2: Neatly grouped settings, an extra large button, and consistent secondary color usage

Version 1 loaded the screen with settings for duration, sound, and haptics all fighting for attention, creating unnecessary complexity. In Version 2, these options are neatly grouped as list items above the main action. The focus stays on starting the breathing session.

By carefully using hierarchy, containment, shape, and color, the final design is easier to follow and more intuitive. Exploring different design refinements can result in an experience that feels intuitive and easy for the user to follow.

### Best practices for applying usability design tactics

#### Use clear scale and placement

Avoid crowding the screen with too many large or equally prominent elements. Scale and placement create a clear focal point.

![The aura app home page with similar-sized elements competing for attention.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmejj6t5h-Home%20Caution%20Uglyfied%20Deux.png?alt=media&token=a214af02-3324-4217-8569-0127b5c35574)

exclamation Caution

- All the elements were large and competed for attention
- The visual hierarchy was unclear
- The settings weren’t grouped together

![The aura app home page with a clear visual hierarchy and appropriate emphasis per element.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmejj8ce1-Frame%202147228808.png?alt=media&token=301c51d8-85ae-48e3-ab93-65118c37d8e9)

check Do

- The large **Start breathing** button is a strong visual focal point
- The supporting controls are clear, but less prominent than the **Start breathing** button

#### Reinforce with consistent color roles

Use different color roles for actions and data to create a visual hierarchy that makes it simple for users to identify what they can do.

![3 color roles incorrectly used in the aura app.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmejjaaz6-BEFORE%20Primary%20Secondary%20roles.png?alt=media&token=28275bf0-9d9a-4459-a8b1-04d56af20d17)

exclamation Caution

- The same color roles, primary (1, 2) and primary container (3), are used for all actions and data

![3 color roles used in the aura app.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmejjb7xf-AFTER%20Primary%20Secondary%20roles.png?alt=media&token=1090a0c2-bb81-424a-b7fb-723f1ac53548)

check Do

- The primary color role (1) makes the button clear and prominent
- The secondary color on selected settings (2) and secondary container color on the dates (3) contrast with the background and primary colors

#### Create calm, balanced layouts

Use uniform shapes and sizes. Add space between shapes and data to make it simple to compare data. Create gentle visual rhythm by aligning elements in a consistent flow to support a serene, focused experience.

![Breathing report statistics in containers that overlap each other.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmejjcz6i-Breathing%20Report%20Caution.png?alt=media&token=aa6a75cb-0658-464a-a8b2-ab3d742a17b4)

exclamation Caution

- The shapes have different forms and sizes
- The shapes overlap

![Breathing reports statistics in containers neatly organized on the page.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmejjk8lk-Breathing%20Report%20Do%20(1).png?alt=media&token=7bda3385-364d-4afb-8d04-abc30149a700)

check Do

- There’s more even spacing between shapes
- The shapes are uniform

exclamation Caution

- The text shifts from very condensed (inhale) and expanded (exhale) while the large arrows animate at the same time as the moving flower

check Do

- The text spacing is consistent so the user can focus on the flower’s pulsating and morphing shape guiding the pace of breathing

---

## Color Accessibility – Google Codelabs

### Designing with Accessible Colors

*Source: [https://codelabs.developers.google.com/color-contrast-accessibility](https://codelabs.developers.google.com/color-contrast-accessibility)*

---

### 1. Introduction

**Last Updated:** 05/11/22

<img src="https://codelabs.developers.google.com/static/color-contrast-accessibility/img/22b0bbc6dbfe75d9.png" srcset="https://codelabs.developers.google.com/static/color-contrast-accessibility/img/22b0bbc6dbfe75d9_36.png 36w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/22b0bbc6dbfe75d9_48.png 48w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/22b0bbc6dbfe75d9_72.png 72w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/22b0bbc6dbfe75d9_96.png 96w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/22b0bbc6dbfe75d9_480.png 480w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/22b0bbc6dbfe75d9_720.png 720w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/22b0bbc6dbfe75d9_856.png 856w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/22b0bbc6dbfe75d9_960.png 960w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/22b0bbc6dbfe75d9_1440.png 1440w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/22b0bbc6dbfe75d9_1920.png 1920w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/22b0bbc6dbfe75d9_2880.png 2880w" alt="22b0bbc6dbfe75d9.png" />

The Material 3 color system creates accessible color schemes with the dynamic color algorithm, but what does accessibility mean for color? How does Material Design's new color system create an accessible color scheme and what tools help?

### What you'll learn

- How color relates to accessibility and contrast guidelines.
- How tooling can help create an accessible color scheme, make edits, and check contrast.

### Prerequisites

For this lab we'll build on some foundational design concepts.

- Knowledge of current Android color schemes and roles.
- Knowledge of Figma.

### What you'll need

- [Figma Account](http://figma.com/)
- [Figma Designlab file](https://www.figma.com/community/file/1106247435364518745)
- Figma plugin [Material Theme Builder](https://goo.gle/material-theme-builder-figma)

### 2. Get started

### Setup

To get started you need to access the Designlab Figma file. Everything you need for the lab is in the Figma file. You can either download and import the file, or duplicate it from the Figma community.

First, [sign into Figma or create an account](https://figma.com/).

#### Duplicate from the Figma Community

Navigate to the [Designing with accessible colors](https://www.figma.com/community/file/1106247435364518745) file, or search for Designing with accessible colors within the [Figma Community](https://www.figma.com/community). Click **Duplicate** in the top right corner to copy the file into your files.

<img src="https://codelabs.developers.google.com/static/color-contrast-accessibility/img/2cb1a5f77aab6012.png" srcset="https://codelabs.developers.google.com/static/color-contrast-accessibility/img/2cb1a5f77aab6012_36.png 36w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/2cb1a5f77aab6012_48.png 48w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/2cb1a5f77aab6012_72.png 72w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/2cb1a5f77aab6012_96.png 96w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/2cb1a5f77aab6012_480.png 480w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/2cb1a5f77aab6012_720.png 720w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/2cb1a5f77aab6012_856.png 856w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/2cb1a5f77aab6012_960.png 960w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/2cb1a5f77aab6012_1440.png 1440w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/2cb1a5f77aab6012_1920.png 1920w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/2cb1a5f77aab6012_2880.png 2880w" alt="2cb1a5f77aab6012.png" />

#### File layout

As you look through the file, notice that the file is self contained, starting with an introduction. Each section is divided into a row of artboards that are linked together, with some core concepts for the section, followed by exercises. The sections and exercises build on each other and should be completed sequentially.

This codelab guides you through those concepts and exercises in greater detail. Read along with the codelab to learn more about the new Material You features!

##### Starting with the Intro artboard, there are buttons that link the artboards together in order. To access the link, click the button.

Install the Figma plugin

This codelab relies heavily on a new Figma plugin to generate dynamic color schemes and tokens. Install the Figma plugin directly from the Figma community page or search for "Material Theme Builder" in the Figma Community.

### 3. Color and accessibility

Accessibility is the only way to design for everyone, ensuring that the products you make are inclusive to the widest possible audience.

"Can I see the color on the screen?" is only the first consideration to take into account when designing with color. People view color in various ways depending on their visual acuity.

Color blindness can mean checking color combinations so UI elements don't blend together.

While opacity and weight might not be the literal hue of a color, they have a powerful visual effect on how the color is perceived.

Using a low opacity creates a lighter color, which can make text illegible. For example, for someone who is nearsighted, will have trouble reading text that is set to 30% opacity at a reasonable distance.

<img src="https://codelabs.developers.google.com/static/color-contrast-accessibility/img/3a3e1289633300cd.png" srcset="https://codelabs.developers.google.com/static/color-contrast-accessibility/img/3a3e1289633300cd_36.png 36w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/3a3e1289633300cd_48.png 48w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/3a3e1289633300cd_72.png 72w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/3a3e1289633300cd_96.png 96w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/3a3e1289633300cd_480.png 480w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/3a3e1289633300cd_720.png 720w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/3a3e1289633300cd_856.png 856w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/3a3e1289633300cd_960.png 960w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/3a3e1289633300cd_1440.png 1440w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/3a3e1289633300cd_1920.png 1920w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/3a3e1289633300cd_2880.png 2880w" alt="3a3e1289633300cd.png" />

Use opacity with care and never under suggested guidelines.

Font weight can have a similar effect, accounting for thinner font weights on darker backgrounds. In print, using a very thin font allows for ink to "spill" into it, creating claustrophobic text. Our eyes create this effect on screens as well, trying to fill in the space.

<img src="https://codelabs.developers.google.com/static/color-contrast-accessibility/img/89442bedfcad3b97.png" srcset="https://codelabs.developers.google.com/static/color-contrast-accessibility/img/89442bedfcad3b97_36.png 36w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/89442bedfcad3b97_48.png 48w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/89442bedfcad3b97_72.png 72w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/89442bedfcad3b97_96.png 96w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/89442bedfcad3b97_480.png 480w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/89442bedfcad3b97_720.png 720w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/89442bedfcad3b97_856.png 856w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/89442bedfcad3b97_960.png 960w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/89442bedfcad3b97_1440.png 1440w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/89442bedfcad3b97_1920.png 1920w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/89442bedfcad3b97_2880.png 2880w" alt="89442bedfcad3b97.png" />

Thin type on a dark background creates a claustrophobic effect.

Legibility vs Readability. Throughout this lab, we'll refer to the text's legibility. Legibility measures how easy it is to see, while readability measures how easy it is to understand.

### 4. Color contrast

Accessibility guidelines exist to give designers and developers a consistent expert-driven checklist to ensure we are following best practices on creating inclusive products. WCAG is the usual standard and what this lab references.

Color contrast is the difference between the luminance of the foreground and background elements, presented in a ratio format. This ratio criteria is given grades. Measuring the contrast between say, text on a button and it's container, can help determine if the text will be legible.

<img src="https://codelabs.developers.google.com/static/color-contrast-accessibility/img/44e6eeb4bc15664a.png" srcset="https://codelabs.developers.google.com/static/color-contrast-accessibility/img/44e6eeb4bc15664a_36.png 36w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/44e6eeb4bc15664a_48.png 48w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/44e6eeb4bc15664a_72.png 72w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/44e6eeb4bc15664a_96.png 96w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/44e6eeb4bc15664a_480.png 480w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/44e6eeb4bc15664a_720.png 720w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/44e6eeb4bc15664a_856.png 856w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/44e6eeb4bc15664a_960.png 960w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/44e6eeb4bc15664a_1440.png 1440w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/44e6eeb4bc15664a_1920.png 1920w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/44e6eeb4bc15664a_2880.png 2880w" alt="44e6eeb4bc15664a.png" />

Example with failing color contrast.

Color contrast guidelines are divided into text and non-text, each with their own set of grades.

#### Text

|                    |        |         |
| ------------------ | ------ | ------- |
|                    | **AA** | **AAA** |
| Large Text         | 3:1    | 4.5:1   |
| Normal Text (body) | 4.5:1  | 7:1     |

#### Non-text

|                             |        |
| --------------------------- | ------ |
|                             | **AA** |
| Non-text (graphic elements) | 3:1    |

Let's try checking some contrast and see how to manually fix it.

1.  In Figma, find the colors in the UI elements. Starting with Large text (#C0BEC5), it sits on a background color of (#F5F5FF). Using an [online contrast checker](https://webaim.org/resources/contrastchecker/), entering these colors into foreground and background shows it fails all ratings.
2.  The text is too bright for the background color. Still on the online contrast checker, adjust the foreground color with the color picker to a darker color until it passes **AAA**.
3.  Back in Figma, apply the new passing color to the **large text**.
4.  Follow the same process for body copy and buttons, making sure you check both the text color and background color for each.
5.  ,Use the result under **Graphical Objects and User Interface Components** to apply the same process to the icons\*\*.\*\*
6.  Bring the new color into Figma for each element. All elements should now be passing contrast ratings!

<img src="https://codelabs.developers.google.com/static/color-contrast-accessibility/img/2e536484b6d5cc92.png" srcset="https://codelabs.developers.google.com/static/color-contrast-accessibility/img/2e536484b6d5cc92_36.png 36w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/2e536484b6d5cc92_48.png 48w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/2e536484b6d5cc92_72.png 72w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/2e536484b6d5cc92_96.png 96w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/2e536484b6d5cc92_480.png 480w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/2e536484b6d5cc92_720.png 720w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/2e536484b6d5cc92_856.png 856w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/2e536484b6d5cc92_960.png 960w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/2e536484b6d5cc92_1440.png 1440w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/2e536484b6d5cc92_1920.png 1920w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/2e536484b6d5cc92_2880.png 2880w" alt="2e536484b6d5cc92.png" />

Example with passing color contrast.

That probably felt like a long process, and results may have created a less harmonious color palette. That's where the tooling can help!

### 5. Built with luminance

The new dynamic color system for Material Design is built using luminance rather than hue. Meaning that if the hue and chroma were removed, we'd be able to see the contrast through shades.

When a color is extracted, it results in 5 shifted key colors from which tonal palettes are generated. A tonal palette consists of thirteen tones, including white and black. A tone value of 100 is equivalent to the idea of light at its maximum, and results in white. Every tone value between 0 and 100 expresses the amount of light present in the color.

The system of tonal palettes is central to making any color scheme accessible by default.

Combining color based on tonality, rather than hex value or hue, is one of the key systems that make any color output accessible. Products using dynamic color will meet requirements because the algorithmic combinations that a user can experience are designed to meet accessibility standards.

Elements with similar luminance don't have appropriate contrast for legibility, while elements with different luminance values are more distinguishable.

<img src="https://codelabs.developers.google.com/static/color-contrast-accessibility/img/f9d9cd4d363af012.png" srcset="https://codelabs.developers.google.com/static/color-contrast-accessibility/img/f9d9cd4d363af012_36.png 36w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/f9d9cd4d363af012_48.png 48w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/f9d9cd4d363af012_72.png 72w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/f9d9cd4d363af012_96.png 96w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/f9d9cd4d363af012_480.png 480w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/f9d9cd4d363af012_720.png 720w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/f9d9cd4d363af012_856.png 856w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/f9d9cd4d363af012_960.png 960w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/f9d9cd4d363af012_1440.png 1440w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/f9d9cd4d363af012_1920.png 1920w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/f9d9cd4d363af012_2880.png 2880w" alt="f9d9cd4d363af012.png" />

The dynamic color of Material You is built to work across unpredictable contexts. To manage contrast ratios in various viewing contexts, luminance levels are the key attribute that let colors combine successfully even without the product team testing each specific color combination.

### 6. Build an accessible theme

The theme builder generates Material Design tokens as Figma styles, letting you visualize dynamic color and build a custom theme. This is done while following the Material 3 color system to ensure accessible colors are generated into the color scheme.

1.  In the **plugin modal**, click **Custom**. This switches the theme to a custom theme. The material-theme is already generated, but you can also create a new theme if you wish. To learn more see [visualizing dynamic color](https://codelabs.developers.google.com/visualize-dynamic-color).
2.  Next, set a Primary key color. The primary can be your main brand color, or most used primary accent color. Click the color labeled **Primary** to open the color picker and choose a color. The primary color is used for the source color, much like the source color in the dynamic setting.

<img src="https://codelabs.developers.google.com/static/color-contrast-accessibility/img/47b09d4389a6893a.png" srcset="https://codelabs.developers.google.com/static/color-contrast-accessibility/img/47b09d4389a6893a_36.png 36w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/47b09d4389a6893a_48.png 48w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/47b09d4389a6893a_72.png 72w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/47b09d4389a6893a_96.png 96w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/47b09d4389a6893a_480.png 480w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/47b09d4389a6893a_720.png 720w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/47b09d4389a6893a_856.png 856w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/47b09d4389a6893a_960.png 960w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/47b09d4389a6893a_1440.png 1440w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/47b09d4389a6893a_1920.png 1920w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/47b09d4389a6893a_2880.png 2880w" alt="47b09d4389a6893a.png" />

Add colors to MTB.

1.  The rest of the key colors populate based on the primary color. This means, there is no need to add additional colors if you don't need them. Optionally, add a secondary and tertiary color.
2.  The color schematic shows the key colors interpreted from the input colors, generated tonal palettes, and resulting color schemes with color roles. Both light and dark schemes are available!
3.  The lab has provided an example UI to see the color scheme applied. With the App UI component selected, click **swap** within the plugin.

<img src="https://codelabs.developers.google.com/static/color-contrast-accessibility/img/4f60c007fe0437.png" srcset="https://codelabs.developers.google.com/static/color-contrast-accessibility/img/4f60c007fe0437_36.png 36w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/4f60c007fe0437_48.png 48w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/4f60c007fe0437_72.png 72w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/4f60c007fe0437_96.png 96w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/4f60c007fe0437_480.png 480w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/4f60c007fe0437_720.png 720w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/4f60c007fe0437_856.png 856w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/4f60c007fe0437_960.png 960w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/4f60c007fe0437_1440.png 1440w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/4f60c007fe0437_1920.png 1920w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/4f60c007fe0437_2880.png 2880w" alt="4f60c007fe0437.png" />

Color scheme with connected mockup.

For these exercises the Material Theme Builder has already generated the required tokens in the Figma file.

### 7. Check contrast with Material Theme Builder

Amazing, but we understand that you'll want to update some of these styles with different colors manually. The Material Theme Builder includes built-in contrast checking for core scheme colors to help make these decisions.

1.  Since tokens are created as styles, we can also set the value of the generated color. Within the Figma styles, toggle down to the current theme's Primary color and select the Edit style icon on the right.
2.  Update the Primary color in properties. This is reflected in the color output and App UI. The color algorithm did not generate this color, so we can't guarantee the accessibility.
3.  In the plugin menu, click **Check Contrast, and** then reopen the Edit style modal for primary. This checks the contrast and shows the contrast rating.

<img src="https://codelabs.developers.google.com/static/color-contrast-accessibility/img/a1800c98b22cbb50.png" srcset="https://codelabs.developers.google.com/static/color-contrast-accessibility/img/a1800c98b22cbb50_36.png 36w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/a1800c98b22cbb50_48.png 48w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/a1800c98b22cbb50_72.png 72w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/a1800c98b22cbb50_96.png 96w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/a1800c98b22cbb50_480.png 480w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/a1800c98b22cbb50_720.png 720w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/a1800c98b22cbb50_856.png 856w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/a1800c98b22cbb50_960.png 960w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/a1800c98b22cbb50_1440.png 1440w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/a1800c98b22cbb50_1920.png 1920w, https://codelabs.developers.google.com/static/color-contrast-accessibility/img/a1800c98b22cbb50_2880.png 2880w" alt="a1800c98b22cbb50.png" />

Contrast in Figma style dialog.
