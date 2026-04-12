"use client";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-orange)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]";

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-[var(--background)]/80 border-b border-[var(--border-subtle)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            className={`rounded ${focusRing}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
          >
            <img src="/aidqa_logo_full.svg" alt="AIDQA" className="h-11 w-auto" />
          </button>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <button
              className={`hidden sm:block px-6 py-3 min-h-[44px] rounded-full text-white/70 hover:text-white hover:bg-[var(--card)] transition-colors text-sm ${focusRing}`}
              onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
            >
              Watch demo
            </button>
            <button
              className={`px-6 py-3 min-h-[44px] rounded-full bg-[var(--accent-orange)] text-white font-semibold hover:opacity-90 transition-opacity text-sm ${focusRing}`}
              onClick={() => document.getElementById("early-access")?.scrollIntoView({ behavior: "smooth" })}
            >
              Join early access
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
