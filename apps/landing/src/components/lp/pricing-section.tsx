"use client";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-orange)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]";

const tiers = [
  {
    name: "Starter",
    label: "starter",
    price: "$0",
    period: "free",
    description: "Try the scanner. No card required.",
    cta: "Start free",
    ctaVariant: "outline" as const,
    features: [
      "3 scans included",
      "URL and screenshot input",
      "Prioritized findings with evidence",
      "Repair guidance per finding",
    ],
  },
  {
    name: "Builder",
    label: "builder",
    price: "$19",
    period: "/ month",
    description: "For indie hackers shipping UI regularly.",
    cta: "Join waitlist",
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
    name: "Team",
    label: "team",
    price: "$49",
    period: "/ month",
    description: "For startup teams with frequent AI UI output.",
    cta: "Join waitlist",
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
    <section id="pricing" className="py-20 md:py-32 bg-[var(--background)]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-white font-bold">Simple pricing</h2>
          <p className="text-lg" style={{ color: "var(--text-muted)" }}>
            Start free. Pay when it saves you more than it costs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="relative rounded-2xl p-8 flex flex-col gap-6 transition-colors duration-200"
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
                    Most popular
                  </span>
                </div>
              )}

              {/* Tier header */}
              <div>
                <p
                  className="text-xs uppercase tracking-widest mb-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  {tier.label}
                </p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {tier.period}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {tier.description}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/80">
                    <span className="mt-0.5 shrink-0" style={{ color: "var(--accent-orange)" }}>
                      ✓
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full px-6 py-3 min-h-[44px] rounded-full text-sm font-semibold transition-opacity hover:opacity-90 ${focusRing} ${
                  tier.ctaVariant === "primary" ? "text-white" : "text-white/80 hover:text-white"
                }`}
                style={
                  tier.ctaVariant === "primary"
                    ? { background: "var(--accent-orange)" }
                    : { border: "1px solid rgba(255,255,255,0.2)" }
                }
                onClick={() =>
                  document.getElementById("early-access")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center mt-8 text-sm" style={{ color: "var(--text-muted)" }}>
          Pricing is in early access — locked-in rates for waitlist members.
        </p>
      </div>
    </section>
  );
}
