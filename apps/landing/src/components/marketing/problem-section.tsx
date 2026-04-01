export function ProblemSection() {
  const problems = [
    "Spacing drifts between sections",
    "Hierarchy collapses under secondary content",
    "Components that should look the same don't",
    "Accessibility risks appear quietly",
    "Design debt compounds with every iteration",
  ];

  return (
    <section className="py-20 md:py-32 bg-[var(--card)]">
      <div className="max-w-[900px] mx-auto px-6 md:px-8 text-center">
        <h2 className="mb-8">AI UI is fast. The quality gap is real.</h2>
        <p className="text-xl md:text-2xl mb-12 leading-relaxed" style={{ color: "var(--text-muted)" }}>
          AI builders can generate a screen in seconds. But the output usually lands in a dangerous middle zone: looks almost right, but something feels off.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {problems.map((problem) => (
            <div
              key={problem}
              className="p-6 rounded-xl bg-[var(--background)] border border-[var(--border-subtle)] text-left"
            >
              <p className="leading-relaxed">{problem}</p>
            </div>
          ))}
        </div>

        <p className="text-lg" style={{ color: "var(--text-muted)" }}>
          Experienced designers catch this quickly. Most builders don't — and the cost is <span style={{ fontWeight: 600, color: "var(--foreground)" }}>design debt that compounds with every iteration.</span>
        </p>
      </div>
    </section>
  );
}
