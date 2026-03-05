export function ProblemSection() {
  const problems = [
    "inconsistent spacing & alignment",
    "broken layout structure (especially on mobile)",
    "weak visual hierarchy",
    "accessibility risks (contrast, focus clarity)",
    'messy component usage and "unpolished" feel',
  ];

  return (
    <section className="py-20 md:py-32 bg-[var(--card)]">
      <div className="max-w-[900px] mx-auto px-6 md:px-8 text-center">
        <h2 className="mb-8">AI can generate UI in seconds.</h2>
        <p className="text-xl md:text-2xl mb-12 leading-relaxed" style={{ color: "var(--text-muted)" }}>
          But it doesn't guarantee the basics that users notice instantly:
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
          Non-designers often can't see what's wrong. <span style={{ fontWeight: 600, color: "var(--foreground)" }}>Users can.</span>
        </p>
      </div>
    </section>
  );
}
