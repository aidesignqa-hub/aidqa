const steps = [
  {
    number: '01',
    title: 'Capture your baseline',
    description:
      'Point AIDQA at any URL, pick a viewport, and approve the screenshot as your baseline truth.',
  },
  {
    number: '02',
    title: 'Set up a monitor',
    description:
      'AIDQA checks your page on a schedule, comparing each new screenshot pixel-by-pixel against the baseline.',
  },
  {
    number: '03',
    title: 'Review AI insights',
    description:
      'When drift is detected, GPT-4o Vision explains the changes in plain English, with CSS diffs for technical detail.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[hsl(215,28%,97%)] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">How it works</h2>
          <p className="mt-4 text-lg text-gray-500">Up and running in under two minutes.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <p className="font-mono text-4xl font-bold text-[hsl(243,75%,59%)]/20">{step.number}</p>
              <h3 className="mt-2 text-lg font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
