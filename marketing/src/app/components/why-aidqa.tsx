import { Target, Lightbulb, Activity, CheckCircle } from "lucide-react";

export function WhyAIDQA() {
  const features = [
    {
      icon: Target,
      title: "Clarity Score",
      description: "Shows how ship-ready the UI is. Know instantly if you're good to go.",
    },
    {
      icon: Lightbulb,
      title: "Critical / Important / Minor",
      description: "Severity levels so teams don't drown in alerts. Focus on what matters.",
    },
    {
      icon: Activity,
      title: "Plain-English explanations",
      description: "Non-experts understand. Every issue comes with a clear fix path.",
    },
    {
      icon: CheckCircle,
      title: "Low noise by default",
      description: "Protects revenue flows, usability, accessibility, and brand trust—not perfection.",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-[var(--card)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <h2 className="mb-16 text-center">Risk-based validation that actually helps.</h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.title}
                className="p-6 rounded-xl bg-[var(--background)] hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-[var(--accent-orange)] bg-opacity-10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" style={{ color: "var(--accent-orange)" }} />
                </div>
                
                <h4 className="mb-2">{feature.title}</h4>
                
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
