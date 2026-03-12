export function UseCases() {
  const cases = [
    "inconsistent spacing and off-grid alignment",
    "layout imbalance, overflow, and broken sections",
    "accessibility risks (contrast, focus visibility)",
    "weak hierarchy (what should stand out doesn't)",
    "structural inconsistencies (components/styles drifting)",
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <h2 className="mb-8 text-center">What it catches</h2>
        <p className="text-center text-xl mb-16" style={{ color: "var(--text-muted)" }}>
          AIDQA automatically detects:
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cases.map((useCase) => (
            <div
              key={useCase}
              className="p-6 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--accent-orange)] hover:shadow-md transition-all"
            >
              <p className="leading-relaxed">{useCase}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
