"use client";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-orange)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]";

export function QualitySection() {
  return (
    <section
      className="relative py-24 md:py-36 overflow-hidden"
      style={{
        backgroundImage: "url(/design/quality-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#0a0a14",
      }}
    >
      <div className="absolute inset-0 bg-[#09090f]/50 pointer-events-none" />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: empty / decorative space */}
          <div className="hidden md:block" />

          {/* Right: main statement */}
          <div>
            <h2
              className="text-white font-extrabold leading-[1.05] tracking-tight mb-8"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              <span className="italic font-normal text-white/90">quality</span>
              <br />
              isn&apos;t expensive, i&apos;ts
              <br />
              <span className="text-white">priceless.</span>
            </h2>

            <div className="space-y-4 text-sm md:text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              <p>
                AI builders move fast. The output often drifts — spacing breaks, hierarchy weakens,
                components go inconsistent. AIDQA measures objective design signals and tells you
                exactly what to fix.
              </p>
              <p>
                Not taste. Not opinion. Measurable issues: contrast ratios, spacing rhythm,
                alignment offsets, accessibility thresholds.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating CTA — bottom left */}
      <a
        href="https://app.aidesignqa.com"
        className={`absolute bottom-10 left-8 md:left-14 z-20 flex items-center justify-center w-[80px] h-[80px] rounded-full text-white text-xs font-semibold text-center leading-tight transition-transform hover:scale-105 ${focusRing}`}
        style={{ background: "var(--accent-orange)" }}
      >
        Run a<br />free scan
      </a>
    </section>
  );
}
