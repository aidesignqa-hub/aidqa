import type { DomElement, EnhancedCapture } from '../_lib/types.ts'

const BROWSERLESS_URL = Deno.env.get('BROWSERLESS_REST_ENDPOINT') ?? Deno.env.get('BROWSERLESS_URL') ?? 'https://chrome.browserless.io'
const BROWSERLESS_API_KEY = Deno.env.get('BROWSERLESS_API_KEY') ?? ''

// Kept for screenshot-upload path (no URL, no Browserless needed — caller provides raw bytes)
// For URL scans, use captureEnhanced which takes the screenshot inside the same session.
export async function captureScreenshot(url: string): Promise<Uint8Array> {
  const endpoint = `${BROWSERLESS_URL}/screenshot?token=${BROWSERLESS_API_KEY}`

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 25000)

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url,
        options: { type: 'png', fullPage: false },
        viewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
        gotoOptions: { waitUntil: 'networkidle2', timeout: 20000 },
      }),
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (!response.ok) throw new Error(`Browserless screenshot failed: ${response.status}`)

    const buffer = new Uint8Array(await response.arrayBuffer())
    if (buffer.length < 1000) throw new Error('Screenshot appears blank')

    return buffer
  } catch (err) {
    clearTimeout(timeout)
    throw err
  }
}

// Kept for backward compat — delegates to captureEnhanced and returns dom1440 only
export async function captureDomSnapshot(url: string): Promise<DomElement[]> {
  const result = await captureEnhanced(url)
  return result.dom1440
}

// Single Browserless session: screenshot at 1440px + DOM at 1440px + axe-core violations + DOM at 375px
// This replaces the separate captureScreenshot + captureEnhanced calls, halving Browserless usage
// and keeping total time well under Supabase's 150s waitUntil wall-clock limit.
export async function captureEnhanced(url: string): Promise<EnhancedCapture> {
  const endpoint = `${BROWSERLESS_URL}/function?token=${BROWSERLESS_API_KEY}`

  const DOM_EXTRACTOR = `
    const STYLE_PROPS = [
      'color', 'backgroundColor', 'fontSize', 'fontWeight', 'lineHeight',
      'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
      'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
      'borderRadius', 'borderColor', 'borderWidth',
      'cursor', 'display', 'gap', 'opacity', 'visibility',
      'alignItems', 'justifyContent', 'flexDirection',
    ];
    const isVisible = (el) => {
      const s = window.getComputedStyle(el);
      return s.display !== 'none' && s.visibility !== 'hidden'
        && s.opacity !== '0' && el.offsetWidth > 0;
    };
    const isInteractive = (el) => {
      const tag = el.tagName.toLowerCase();
      const role = el.getAttribute('role');
      const cursor = window.getComputedStyle(el).cursor;
      return ['a', 'button', 'input', 'select', 'textarea'].includes(tag)
        || ['button', 'link', 'checkbox', 'radio', 'menuitem'].includes(role)
        || cursor === 'pointer';
    };
    return [...document.querySelectorAll('*')]
      .filter(el => isVisible(el))
      .map(el => {
        const rect = el.getBoundingClientRect();
        const computed = window.getComputedStyle(el);
        const styles = {};
        for (const prop of STYLE_PROPS) styles[prop] = computed[prop];
        return {
          tag: el.tagName.toLowerCase(),
          id: el.id || null,
          classes: [...el.classList].slice(0, 5),
          role: el.getAttribute('role') || null,
          ariaLabel: el.getAttribute('aria-label') || null,
          boundingBox: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
          computedStyles: styles,
          textContent: (el.textContent || '').trim().slice(0, 100),
          isInteractive: isInteractive(el),
        };
      })
      .filter(el => el.boundingBox.width > 0 && el.boundingBox.height > 0)
      .slice(0, 1500);
  `

  // Max 2 attempts — each attempt has a 40s abort. Total worst case: ~83s, safely under 150s limit.
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 40000)

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          context: { url },
          code: `
            export default async ({ page, context }) => {
              // Allow axe-core CDN injection regardless of page CSP
              await page.setBypassCSP(true);
              await page.setViewport({ width: 1440, height: 900 });
              await page.goto(context.url, { waitUntil: 'networkidle2', timeout: 25000 });

              // 1. Capture DOM at 1440px desktop
              const dom1440 = await page.evaluate(() => { ${DOM_EXTRACTOR} });

              // 2. Inject axe-core and run full accessibility audit
              let axeViolations = [];
              try {
                await page.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js' });
                axeViolations = await page.evaluate(async () => {
                  const results = await window.axe.run(document, {
                    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'] },
                  });
                  return results.violations.map(v => ({
                    id: v.id,
                    impact: v.impact,
                    description: v.description,
                    help: v.help,
                    helpUrl: v.helpUrl,
                    tags: v.tags,
                    nodes: v.nodes.map(n => {
                      let boundingBox = null;
                      const selector = n.target && n.target[0];
                      if (selector) {
                        try {
                          const el = document.querySelector(selector);
                          if (el) {
                            const r = el.getBoundingClientRect();
                            if (r.width > 0 && r.height > 0) {
                              boundingBox = { x: r.x, y: r.y, width: r.width, height: r.height };
                            }
                          }
                        } catch (_) {}
                      }
                      return {
                        html: n.html ? n.html.slice(0, 200) : '',
                        target: n.target || [],
                        failureSummary: n.failureSummary ? n.failureSummary.slice(0, 500) : '',
                        boundingBox,
                      };
                    }),
                  }));
                });
              } catch (axeErr) {
                console.error('axe-core failed:', axeErr.message);
                axeViolations = [];
              }

              // 4. Resize to mobile viewport and wait for layout reflow
              await page.setViewport({ width: 375, height: 812 });
              await new Promise(r => setTimeout(r, 1200));

              // 5. Capture DOM at 375px mobile
              const dom375 = await page.evaluate(() => { ${DOM_EXTRACTOR} });

              return { dom1440, axeViolations, dom375 };
            };
          `,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeout)

      if (!response.ok) {
        const body = await response.text().catch(() => '')
        throw new Error(`Browserless enhanced capture failed: ${response.status} — ${body}`)
      }

      const raw = await response.json()
      const result = raw?.data ?? raw?.result ?? raw

      return {
        dom1440: Array.isArray(result?.dom1440) ? result.dom1440 : [],
        axeViolations: Array.isArray(result?.axeViolations) ? result.axeViolations : [],
        dom375: Array.isArray(result?.dom375) ? result.dom375 : [],
      }
    } catch (err) {
      clearTimeout(timeout)
      if (attempt === 2) throw err
      await new Promise(r => setTimeout(r, 2000))
    }
  }

  throw new Error('Enhanced capture failed after 2 attempts')
}

// Separate full-page screenshot capture — returns raw PNG bytes (no base64 overhead).
// Runs in parallel with captureEnhanced to avoid adding to total wall-clock time.
export async function captureFullPageScreenshot(url: string): Promise<Uint8Array> {
  const endpoint = `${BROWSERLESS_URL}/function?token=${BROWSERLESS_API_KEY}`

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 40000)

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        context: { url },
        code: `
          export default async ({ page, context }) => {
            await page.setBypassCSP(true);
            await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
            await page.goto(context.url, { waitUntil: 'networkidle2', timeout: 25000 });
            await page.addStyleTag({ content: '::-webkit-scrollbar { display: none; } * { scrollbar-width: none; }' });
            const dims = await page.evaluate(() => ({
              width: document.documentElement.clientWidth,
              height: Math.min(document.documentElement.scrollHeight, 10000),
            }));
            return page.screenshot({
              type: 'png',
              clip: { x: 0, y: 0, width: dims.width, height: dims.height },
            });
          };
        `,
      }),
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (!response.ok) {
      const body = await response.text().catch(() => '')
      throw new Error(`Browserless screenshot capture failed: ${response.status} — ${body}`)
    }

    const buffer = new Uint8Array(await response.arrayBuffer())
    if (buffer.length < 1000) throw new Error('Screenshot appears blank')
    return buffer
  } catch (err) {
    clearTimeout(timeout)
    throw err
  }
}
