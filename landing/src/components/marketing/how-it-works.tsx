export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Submit a screenshot or URL",
      description: "Upload a PNG, JPG, or paste a public URL. AIDQA renders a normalized frame and extracts structural metadata.",
    },
    {
      number: "02",
      title: "Automated inspection runs",
      description: "The rule engine checks layout, hierarchy, consistency, accessibility, and design-system patterns. No baseline required.",
    },
    {
      number: "03",
      title: "Get prioritized findings",
      description: "You receive 3–7 findings ranked by severity, each with an evidence region, explanation of impact, and concrete repair guidance.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-[var(--card)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <h2 className="mb-4 text-center">How it works</h2>
        <p className="text-center text-xl mb-20" style={{ color: "var(--text-muted)" }}>
          Submit → Inspect → Fix. No setup required.
        </p>

        <div className="grid md:grid-cols-3 gap-8 md:gap-0">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`relative ${
                index < steps.length - 1 ? "md:border-r border-[var(--border-subtle)] md:pr-8" : ""
              } ${index > 0 ? "md:pl-8" : ""}`}
            >
              <div className="text-6xl mb-6 opacity-30" style={{ fontWeight: 800 }}>
                {step.number}
              </div>

              <h3 className="mb-4 text-2xl">{step.title}</h3>

              <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
