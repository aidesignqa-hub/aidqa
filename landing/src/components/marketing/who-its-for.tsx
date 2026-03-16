export function WhoItsFor() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-[900px] mx-auto px-6 md:px-8 text-center">
        <h2 className="mb-8">Built for teams shipping UI fast</h2>

        <div className="space-y-4 text-left max-w-[720px] mx-auto mb-12">
          <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
            <span style={{ fontWeight: 600, color: "var(--foreground)" }}>Indie hackers and solo builders</span> using v0, Lovable, or Cursor — who can tell the output is weak but can't diagnose why.
          </p>
          <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
            <span style={{ fontWeight: 600, color: "var(--foreground)" }}>Startup product teams</span> generating UI quickly without strong design review — who need guidance before handoff, not governance after the fact.
          </p>
          <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
            <span style={{ fontWeight: 600, color: "var(--foreground)" }}>Frontend and design engineers</span> who want objective signals before a pull request ships a visual regression.
          </p>
          <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
            <span style={{ fontWeight: 600, color: "var(--foreground)" }}>Design systems teams</span> who need consistency enforcement without manual audits on every generated screen.
          </p>
        </div>
      </div>
    </section>
  );
}
