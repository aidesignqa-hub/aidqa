---
source: "Gestalt Principles for Visual UI Design"
url: "https://www.uxtigers.com/post/gestalt-principles"
author: "Jakob Nielsen"
date_published: "2024-09-12"
date_processed: "2026-04-03"
folder_type: "md-only"
topics: ["Gestalt principles", "visual design", "UI layout", "perception", "information hierarchy", "grouping"]
missing_images: 6
---

# Gestalt Principles for Visual UI Design

The Gestalt principles are a set of psychological laws — rooted in 100+ years of research — that describe how humans perceive and organize visual information. They are widely used in visual design to create cohesive, intuitive layouts and interfaces. "Gestalt" is a German word meaning whole or unified configuration.

The 9 principles most relevant to UI design are listed below.

## 1. Proximity

Objects **close to each other** are perceived as a group, even if they differ in shape, color, or size. This principle is crucial for organizing information and creating logical groupings without explicit borders or connectors.

Particularly useful for: information hierarchies, menu structures, page layouts.

**Example:** In a restaurant menu, dish names are placed closer to their descriptions and prices than to other dishes. On corporate websites, social media icons are grouped together so users understand they all represent social media, even if they don't recognize every icon.

## 2. Similarity

Elements **sharing visual characteristics** (shape, color, size, or orientation) are perceived as related or part of a group. Fundamental for creating visual hierarchies and organizing information.

Particularly useful for: recognizable icon sets, categorizing interface elements.

**Example:** Clickable buttons share the same color and shape. Users quickly learn to associate those visual characteristics with interactive elements, improving usability.

## 3. Enclosure

Design elements **enclosed within a boundary** are perceived as a group, separate from elements outside that boundary. Focuses specifically on the use of borders or containing shapes to separate content.

Particularly useful for: dropdown menus, modal windows, distinct content areas, dashboard cards.

**Example:** In a digital dashboard, related metrics are enclosed in individual cards or boxes, helping users quickly distinguish between different sets of information.

## 4. Closure

When presented with incomplete information, our brains **fill in the missing parts** to perceive a complete image. Enables more minimalist designs by encouraging active interpretation from the viewer.

**Example:** Handwritten text is readable even when letters are not fully formed. The "hamburger" icon — three horizontal lines that are not connected — is still perceived as a single cohesive button.

## 5. Continuity

The human eye naturally **follows lines, curves, or a sequence of shapes**, even when they intersect with other elements. Perception tends to continue patterns and smooth paths rather than abrupt directional changes.

Particularly useful for: organizing information, guiding users through multi-step processes, creating harmonious layouts.

**Example:** In a data visualization dashboard, a viewer's eye naturally follows the ups and downs of a line graph, even when the line crosses grid lines or other data points.

## 6. Connectedness

Elements visually **linked by a connector** (such as a line or arrow) are perceived as more related than unconnected elements. Used to explicitly group related items or illustrate relationships.

**Distinction from Continuity:** Continuity guides the eye through a design; connectedness explicitly groups related items.

**Example:** In a company org chart, lines connecting executive positions to subordinate roles visually represent hierarchy and reporting structure at a glance.

## 7. Common Fate

Elements **moving or changing together** are perceived as related. Particularly relevant in interactive and animated designs.

Particularly useful for: grouping related actions, providing feedback on user interactions, highlighting trends in data visualization.

**Example:** In a weather app, icons representing different weather conditions might all move in the same direction to indicate wind direction.

**Note:** This principle is difficult to convey in static mockups — it applies primarily to animated or interactive states.

## 8. Prägnanz (Good Figure / Law of Simplicity)

People tend to **interpret ambiguous or complex images as the simplest form possible**. Brains naturally organize information into the most basic, recognizable patterns.

Particularly useful for: icon design, logo creation, road signage, quick-recognition UI elements.

**Example:** Road sign icons use simple, easily recognizable shapes for quick comprehension. Even an imperfect representation of a concept will be interpreted correctly if the simplest reading matches a known pattern. Adding unnecessary detail slows recognition.

**Design implication:** Prefer the simplest visual form that still communicates the concept. Extraneous detail works against this principle.

## 9. Figure-Ground

The visual system **separates elements into foreground (figure) and background (ground)**. The figure is the object of focus; the ground is everything else. Ambiguous figure-ground relationships can harm usability while creating visual interest.

**Techniques for designating an element as figure:**

- **Focus:** Sharp, clear elements read as figure; blurred or faded elements recede as ground.
- **Contrast:** Contrasting colors, values, or textures make the figure stand out (dark on light, or vice versa).
- **Color:** Warm colors (yellows, oranges, reds) advance as figure; cool colors (blues, greens, purples) recede as ground.
- **Size:** Larger elements are more likely to be perceived as figure.
- **Detail:** More complexity makes an element more likely to read as figure.
- **Enclosure:** Elements within a boundary tend to read as figure.
- **Overlapping:** The element that appears on top reads as figure.
- **Shape:** Closed forms or recognizable shapes read as figure.
- **Texture:** Distinct textures stand out as figure against a smoother ground.
- **Motion / implied motion:** Moving elements, or elements implying movement, read as figure.

**Example:** A lightbox popup becomes figure while the dimmed page becomes ground. Use sparingly — only when directing user attention to the popup genuinely benefits the user.

## Using Gestalt Principles in UI Design

The Gestalt principles have two primary applications in UX:

1. **Elements with the same UI function should appear related.** Use the same visual design, place them close together, and enclose them if appropriate. Multiple principles working together are more robust than relying on a single one — for example, using only color coding (similarity) will fail for color-blind users.

2. **Elements with different UI functions should not appear similar.** Apply the principles in reverse: use different colors, or place items far apart on screen.

3. **Elements that are different but used together should still be near each other.** For example, the price and the "Buy" button on an e-commerce product page should be in close proximity.
