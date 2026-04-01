export function UseCases() {
  const cases = [
    {
      title: "Layout & spacing",
      body: "Flags rhythm breaks, edge misalignment, and whitespace imbalance. Every spacing gap that doesn't fit the dominant scale gets surfaced.",
    },
    {
      title: "Hierarchy & consistency",
      body: "Detects weak primary actions, heading scale failures, button style drift, and card component variance. Finds where repeated elements stopped being consistent.",
    },
    {
      title: "Accessibility risk",
      body: "Catches text contrast failures below WCAG AA (4.5:1), touch targets smaller than 44×44px, and missing state coverage before they reach users.",
    },
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <h2 className="mb-8 text-center">What it catches</h2>
        <p className="text-center text-xl mb-16" style={{ color: "var(--text-muted)" }}>
          AIDQA runs automated design QA for AI-generated interfaces across three dimensions:
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cases.map((useCase) => (
            <div
              key={useCase.title}
              className="p-6 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--accent-orange)] hover:shadow-md transition-all"
            >
              <p className="font-semibold mb-2">{useCase.title}</p>
              <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>{useCase.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
