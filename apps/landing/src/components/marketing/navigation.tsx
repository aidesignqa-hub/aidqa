"use client";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-orange)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]";

export function Navigation() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex items-center justify-between">
      {/* Logo mark */}
      <a href="/" aria-label="AIDQA home" className={`shrink-0 rounded ${focusRing}`}>
        <img
          src="/design/logo.svg"
          alt="AIDQA"
          className="h-10 w-auto"
        />
      </a>

      {/* CTA */}
      <a
        href="https://app.aidesignqa.com"
        className={`flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors rounded ${focusRing}`}
      >
        <span className="text-[var(--accent-orange)]">→</span>
        <span>test it</span>
      </a>
    </nav>
  );
}
