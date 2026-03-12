import { DollarSign, Clock, Shield, AlertCircle, Smile } from "lucide-react";

export function WhyPeoplePay() {
  const reasons = [
    {
      icon: DollarSign,
      title: "Protect revenue flows",
      description: "catch broken CTAs, forms, signup, checkout issues before customers bounce",
    },
    {
      icon: Clock,
      title: "Save hours every release",
      description: 'replace manual "quick checks" with a fast scan and clear fix list',
    },
    {
      icon: Shield,
      title: "Avoid trust-killing polish bugs",
      description: "your product can work—but still feel unreliable",
    },
    {
      icon: AlertCircle,
      title: "Reduce accessibility risk",
      description: "catch basic contrast and focus issues before users complain",
    },
    {
      icon: Smile,
      title: "Ship with confidence",
      description: 'less guessing, less stress, fewer "how did we miss this?" moments',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-[var(--card)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-8">Why founders and builders pay for this</h2>
          <p className="text-xl md:text-2xl max-w-[800px] mx-auto" style={{ color: "var(--text-muted)" }}>
            Because one "looks broken" moment can cost more than the tool.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="p-6 rounded-xl bg-[var(--background)] border border-[var(--border-subtle)]"
              >
                <div className="w-12 h-12 rounded-lg bg-[var(--accent-orange)] bg-opacity-10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" style={{ color: "var(--accent-orange)" }} />
                </div>

                <h4 className="mb-2">{reason.title}</h4>

                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-lg" style={{ color: "var(--text-muted)" }}>
            <span style={{ fontWeight: 600, color: "var(--foreground)" }}>One prevented broken release pays for AIDQA.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
