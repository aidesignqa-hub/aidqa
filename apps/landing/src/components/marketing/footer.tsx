const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-orange)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]";

const navLinks = [
  { href: "#product-demo", label: "Product" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#product-demo", label: "Demo" },
  { href: "/privacy", label: "Privacy" },
];

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ backgroundColor: "#07070f" }}
    >
      {/* SVG background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(/design/footer-bg.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          opacity: 0.18,
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Left: logo + tagline */}
          <div className="flex flex-col gap-3">
            <img
              src="/design/footer-logo.svg"
              alt="AIDQA"
              className="h-8 w-auto"
            />
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Design intelligence layer<br />for your interfaces
            </p>
          </div>

          {/* Center: email */}
          <div className="flex items-start justify-start md:justify-center">
            <a
              href="mailto:aidesignqa@gmail.com"
              className={`text-sm text-white/70 hover:text-white transition-colors rounded ${focusRing}`}
            >
              aidesignqa@gmail.com
            </a>
          </div>

          {/* Right: nav + social icons */}
          <div className="flex flex-col gap-6 md:items-end">
            <nav className="flex flex-col gap-2 md:items-end">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-sm text-white/60 hover:text-white transition-colors rounded ${focusRing}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className={`opacity-50 hover:opacity-100 transition-opacity rounded ${focusRing}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/design/social-fb.svg" alt="Facebook" className="w-5 h-5" />
              </a>
              <a
                href="https://x.com"
                aria-label="X (Twitter)"
                className={`opacity-50 hover:opacity-100 transition-opacity rounded ${focusRing}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/design/social-x.svg" alt="X" className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className={`opacity-50 hover:opacity-100 transition-opacity rounded ${focusRing}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/design/social-linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-6 text-xs text-center"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            color: "var(--text-muted)",
          }}
        >
          © 2026 AIDQA. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

