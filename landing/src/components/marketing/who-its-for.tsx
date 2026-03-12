export function WhoItsFor() {
  const audience = [
    "indie hackers",
    "no-code founders",
    "startup teams",
    "students",
    "prompt engineers",
    "AI product builders",
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-[900px] mx-auto px-6 md:px-8 text-center">
        <h2 className="mb-8">Who it's for</h2>
        <p className="text-xl md:text-2xl mb-12 leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Built for people shipping UI with AI — without deep design expertise:
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {audience.map((person) => (
            <div
              key={person}
              className="px-6 py-3 rounded-full bg-[var(--card)] border border-[var(--border-subtle)]"
            >
              <span className="text-base">{person}</span>
            </div>
          ))}
        </div>

        <p className="text-lg" style={{ color: "var(--text-muted)" }}>
          If you build fast and want it to look professional, <span style={{ fontWeight: 600, color: "var(--foreground)" }}>this is for you.</span>
        </p>
      </div>
    </section>
  );
}
