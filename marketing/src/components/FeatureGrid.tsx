import { Camera, GitCompare, Code2, Bell } from 'lucide-react';

const features = [
  {
    icon: Camera,
    title: 'Pixel-perfect screenshots',
    description:
      'Headless browser captures your pages at any viewport — desktop, tablet, or mobile. Every pixel accounted for.',
  },
  {
    icon: GitCompare,
    title: 'AI-powered diff analysis',
    description:
      'GPT-4o Vision explains what changed and why it matters. Not just a red blob — plain English with severity ratings.',
  },
  {
    icon: Code2,
    title: 'CSS-level change tracking',
    description:
      'Detects computed style mutations down to the property level. Know whether it\'s a font shift or a full layout break.',
  },
  {
    icon: Bell,
    title: 'Automated monitoring',
    description:
      'Set a cadence and forget it. AIDQA runs on schedule and alerts when drift exceeds your configured threshold.',
  },
];

export default function FeatureGrid() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Everything you need to catch regressions
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            No test suite. No CI setup. Just a URL and an approved baseline.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-xl border border-gray-100 p-6 hover:border-gray-200 hover:shadow-sm transition-all">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(243,75%,59%)]/10">
                <Icon className="h-5 w-5 text-[hsl(243,75%,59%)]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
