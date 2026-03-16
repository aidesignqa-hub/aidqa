import type { Metadata } from 'next';
import LandingNavBar from '@/components/LandingNavBar';
import LandingHero from '@/components/LandingHero';
import ValueProps from '@/components/ValueProps';
import SocialProof from '@/components/SocialProof';
import HowItWorks from '@/components/HowItWorks';
import LandingCTA from '@/components/LandingCTA';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Automated Design QA for AI-Generated Interfaces | AIDQA',
  description:
    'AIDQA automates design QA for teams shipping UI fast. Detect layout drift, hierarchy issues, consistency failures, and accessibility risk before handoff — without a designer in the loop for every screen.',
};

const CTA_HREF = 'https://app.aidesignqa.com/signup?utm_source=lp&utm_campaign=design-qa';

const VALUE_PROPS = [
  'Submit a screenshot or URL after generation — no plugin or Figma file required',
  'Receive prioritized findings with evidence overlays and concrete repair guidance',
  'Apply the top fixes before the next iteration, repeat on each significant change',
];

export default function DesignQaPage() {
  return (
    <>
      <LandingNavBar />
      <main>
        <LandingHero
          badge="Design QA"
          headline="Automated design QA for teams that ship fast"
          subheadline="Design QA is the step between generating a UI and shipping it. In AI-assisted workflows, that step usually gets skipped — the output looks close enough, and the team moves on. AIDQA automates the design QA step so it fits into fast-moving workflows."
          ctaText="Start your first design QA scan"
          ctaHref={CTA_HREF}
        />
        <ValueProps items={VALUE_PROPS} />
        <SocialProof />
        <HowItWorks />
        <LandingCTA
          headline="Automated design QA that fits into how you already work."
          ctaText="Start your first design QA scan"
          ctaHref={CTA_HREF}
        />
      </main>
      <Footer />
    </>
  );
}
