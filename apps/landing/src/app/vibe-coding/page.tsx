import type { Metadata } from 'next';
import LandingNavBar from '@/components/LandingNavBar';
import LandingHero from '@/components/LandingHero';
import ValueProps from '@/components/ValueProps';
import SocialProof from '@/components/SocialProof';
import HowItWorks from '@/components/HowItWorks';
import LandingCTA from '@/components/LandingCTA';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Design QA for Vibe Coders | AIDQA',
  description:
    "When you're shipping AI-generated UI at cursor speed, design quality slips constantly. AIDQA runs automated design QA so you catch layout drift, inconsistency, and accessibility risk before your users do.",
};

const CTA_HREF = 'https://app.aidesignqa.com/signup?utm_source=lp&utm_campaign=vibe-coding';

const VALUE_PROPS = [
  "Catches the subtle layout breaks and hierarchy failures AI builders don't flag",
  'Submit a URL or screenshot — no setup, no integration, results in under 60 seconds',
  'Prioritized findings with evidence regions and concrete repair guidance for each issue',
];

export default function VibeCodingPage() {
  return (
    <>
      <LandingNavBar />
      <main>
        <LandingHero
          badge="For vibe coders"
          headline="AI wrote your frontend. AI should check it too."
          subheadline="When you're shipping at cursor speed, design quality drifts constantly — spacing breaks, components go inconsistent, hierarchy weakens. AIDQA runs automated design QA on each generated screen and tells you what to fix before you ship it."
          ctaText="Add it to my vibe stack"
          ctaHref={CTA_HREF}
        />
        <ValueProps items={VALUE_PROPS} />
        <SocialProof />
        <HowItWorks />
        <LandingCTA
          headline="Ship at cursor speed. Ship with design QA."
          ctaText="Add it to my vibe stack"
          ctaHref={CTA_HREF}
        />
      </main>
      <Footer />
    </>
  );
}
