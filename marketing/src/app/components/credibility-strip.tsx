export function CredibilityStrip() {
  const integrations = ["Figma", "Webflow", "Framer", "Slack", "Linear"];

  return (
    <section className="py-8 border-y border-[var(--border-subtle)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm md:text-base" style={{ color: "var(--text-muted)" }}>
            Time-to-first-value under <span style={{ fontWeight: 600 }}>10 minutes</span>. Looking for fast builders.
          </p>
          
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {integrations.map((item, index) => (
              <span 
                key={item}
                className="flex items-center gap-2 text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                {item}
                {index < integrations.length - 1 && (
                  <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
