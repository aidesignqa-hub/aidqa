import { CheckCircle } from "lucide-react";

export function SolutionSection() {
  const features = [
    {
      title: "No baseline required",
      description: "inspects internal consistency, design rules, and accessibility thresholds — works on screen one of a project",
    },
    {
      title: "Prioritized findings with evidence",
      description: "each issue includes an evidence region, explanation of impact, and concrete repair guidance",
    },
    {
      title: "The step most teams skip",
      description: "Idea → AI generation → Design QA → Refinement → Production. AIDQA is the QA layer that fits fast workflows",
    },
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-[900px] mx-auto px-6 md:px-8 text-center">
        <h2 className="mb-8">The missing QA layer between AI generation and production</h2>
        <p className="text-xl md:text-2xl mb-16 leading-relaxed" style={{ color: "var(--text-muted)" }}>
          AIDQA is not a screenshot diff tool. It doesn't require a baseline. It inspects your interface against internal consistency, design rules, and accessibility thresholds — then returns prioritized findings with evidence and repair guidance.
        </p>

        <div className="bg-[var(--card)] rounded-2xl p-8 md:p-12 text-left">
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>
            Design QA for AI-generated interfaces means:
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
