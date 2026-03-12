import { CheckCircle } from "lucide-react";

export function SolutionSection() {
  const features = [
    {
      title: "a Clarity Score",
      description: "(how ship-ready it is)",
    },
    {
      title: "plain-English insights",
      description: "(what's wrong + why it matters)",
    },
    {
      title: "actionable fixes",
      description: "(what to change before you publish)",
    },
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-[900px] mx-auto px-6 md:px-8 text-center">
        <h2 className="mb-8">A simple UI validation layer.</h2>
        <p className="text-xl md:text-2xl mb-16 leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Think: <span style={{ fontWeight: 600, color: "var(--foreground)" }}>spell-check for AI-built interfaces.</span>
        </p>

        <div className="bg-[var(--card)] rounded-2xl p-8 md:p-12 text-left">
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>
            AIDQA scans your UI and returns:
          </p>

          <div className="space-y-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 mt-1" style={{ color: "var(--accent-orange)" }} />
                </div>
                <div>
                  <p className="text-lg">
                    <span style={{ fontWeight: 600 }}>{feature.title}</span>{" "}
                    <span style={{ color: "var(--text-muted)" }}>{feature.description}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
