"use client";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-orange)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]";

const tiers = [
  {
    id: "starter",
    name: "Starter",
    label: "starter",
    price: "$0",
    period: "/mo",
    description: "try the tool, no card required",
    cta: "try it out",
    ctaVariant: "outline" as const,
    features: [
      "3 scans included",
      "URL and screenshot input",
      "Prioritized findings with evidence",
      "Repair guidance per finding",
    ],
  },
  {
    id: "builder",
    name: "Builder",
    label: "builder",
    price: "$19",
    period: "/month",
    description: "for those who ship UI regularly",
    cta: "builders package",
    ctaVariant: "primary" as const,
    highlight: true,
    features: [
      "50 scans / month",
      "Full deterministic + AI analysis",
      "Accessibility checks (WCAG AA)",
      "Overlay evidence viewer",
      "Scan history",
    ],
  },
  {
    id: "entrepreneur",
    name: "Entrepreneur",
    label: "entrepreneur",
    price: "$49",
    period: "/month",
    description: "for teams with frequent UI output",
    cta: "entrepreneur",
    ctaVariant: "outline" as const,
    features: [
      "Unlimited scans",
      "Everything in Builder",
      "Priority processing",
      "Team scan history",
      "Early access to new checks",
    ],
  },
];

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: "#09090f" }}
    >
      {/* SVG background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(/design/pricing-bg.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.25,
        }}
      />

      {/* Dot decoration — right edge */}
      <img
        src="/design/pricing-dot.svg"
        alt=""
        aria-hidden="true"
        className="absolute right-0 top-1/2 -translate-y-1/2 h-32 pointer-events-none opacity-60"
      />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-10">
        {/* Heading with orange semicircle icon */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <img
            src="/design/pricing-icon.svg"
            alt=""
            aria-hidden="true"
            className="w-10 h-10"
          />
          <h2 className="text-white font-bold">Simple pricing</h2>
        </div>
        <p className="text-center mb-14" style={{ color: "var(--text-muted)" }}>
          Start free. Pay when it saves you more than it costs.
        </p>

        <div className="grid md:grid-cols-3 gap-5">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className="relative rounded-2xl p-7 flex flex-col gap-6 transition-colors duration-200"
              style={{
                background: tier.highlight
                  ? "rgba(213,77,39,0.08)"
                  : "rgba(255,255,255,0.03)",
                border: tier.highlight
                  ? "1px solid rgba(213,77,39,0.35)"
                  : "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className="px-4 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ background: "var(--accent-orange)" }}
                  >
                    most popular
                  </span>
                </div>
              )}

              {/* Tier header */}
              <div>
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
                  {tier.label}
                </p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>{tier.period}</span>
                </div>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{tier.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/80">
                    <span className="mt-0.5 shrink-0" style={{ color: "var(--accent-orange)" }}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="https://app.aidesignqa.com"
                className={`w-full px-6 py-3 rounded-full text-sm font-semibold text-center transition-opacity hover:opacity-90 ${focusRing} ${
                  tier.ctaVariant === "primary"
                    ? "text-white"
                    : "text-white/80 hover:text-white"
                }`}
                style={
                  tier.ctaVariant === "primary"
                    ? { background: "var(--accent-orange)" }
                    : { border: "1px solid rgba(255,255,255,0.2)" }
                }
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

