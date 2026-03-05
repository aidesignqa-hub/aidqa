'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

const SIGNUP_URL = process.env.NEXT_PUBLIC_SIGNUP_URL ?? 'https://app.aidesignqa.com/signup';

const tiers = [
  {
    name: 'Free',
    monthly: 0,
    description: 'Perfect for trying AIDQA on a single project.',
    features: [
      '1 monitor',
      '10 runs per month',
      'Daily cadence',
      'AI diff analysis',
      'CSS-level change tracking',
    ],
    cta: 'Get started free',
    highlight: false,
  },
  {
    name: 'Pro',
    monthly: 19,
    description: 'For developers who ship continuously.',
    features: [
      '25 monitors',
      'Unlimited runs',
      'Hourly or daily cadence',
      'AI diff analysis',
      'CSS-level change tracking',
      'Webhook alerts',
      'Priority support',
    ],
    cta: 'Start Pro',
    highlight: true,
  },
  {
    name: 'Team',
    monthly: 79,
    description: 'For QA teams that need scale.',
    features: [
      '100 monitors',
      'Unlimited runs',
      'Hourly or daily cadence',
      'AI diff analysis',
      'CSS-level change tracking',
      'Webhook alerts',
      '5 team seats',
      'Advanced reporting',
    ],
    cta: 'Start Team',
    highlight: false,
  },
];

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Simple, transparent pricing</h2>
          <p className="mt-4 text-lg text-gray-500">Start free. Scale when you need to.</p>
          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                !annual ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                annual ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
              }`}
            >
              Annual
              <span className="ml-1.5 rounded-full bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700">
                -20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {tiers.map((tier) => {
            const price = annual && tier.monthly > 0
              ? Math.round(tier.monthly * 0.8)
              : tier.monthly;

            return (
              <div
                key={tier.name}
                className={`relative rounded-2xl border p-8 ${
                  tier.highlight
                    ? 'border-[hsl(243,75%,59%)] shadow-lg shadow-[hsl(243,75%,59%)]/10'
                    : 'border-gray-200'
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-[hsl(243,75%,59%)] px-3 py-1 text-xs font-semibold text-white">
                      Most popular
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-gray-500">{tier.name}</p>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900">
                      {tier.monthly === 0 ? 'Free' : `$${price}`}
                    </span>
                    {tier.monthly > 0 && (
                      <span className="text-sm text-gray-400">
                        /mo{annual ? ', billed annually' : ''}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{tier.description}</p>
                </div>

                <a
                  href={SIGNUP_URL}
                  className={`mt-6 block w-full rounded-lg py-2.5 text-center text-sm font-semibold transition-colors ${
                    tier.highlight
                      ? 'bg-[hsl(243,75%,59%)] text-white hover:bg-[hsl(243,68%,48%)]'
                      : 'border border-gray-200 text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {tier.cta}
                </a>

                <ul className="mt-8 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 shrink-0 text-[hsl(243,75%,59%)]" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
