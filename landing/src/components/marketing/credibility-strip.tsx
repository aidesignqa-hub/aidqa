export function CredibilityStrip() {
  const items = [
    "Works with screenshots and live URLs",
    "No design system required to start",
    "Checks layout, hierarchy, consistency, and accessibility risk",
    "Returns findings in under 60 seconds",
  ];

  return (
    <section className="py-8 border-y border-[var(--border-subtle)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {items.map((item, index) => (
            <span
              key={item}
              className="flex items-center gap-4 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              {item}
              {index < items.length - 1 && (
                <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" aria-hidden="true" />
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
