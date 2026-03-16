import type { Metadata } from 'next';
import LandingNavBar from '@/components/LandingNavBar';
import LandingHero from '@/components/LandingHero';
import ValueProps from '@/components/ValueProps';
import SocialProof from '@/components/SocialProof';
import HowItWorks from '@/components/HowItWorks';
import LandingCTA from '@/components/LandingCTA';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'AI UI Quality Checker for AI-Generated Interfaces | AIDQA',
  description:
    'AIDQA is an AI UI quality checker that audits AI-generated interfaces for layout drift, hierarchy issues, spacing inconsistency, and accessibility risk. No baseline required.',
};

const CTA_HREF = 'https://app.aidesignqa.com/signup?utm_source=lp&utm_campaign=ai-ui-checker';

const VALUE_PROPS = [
  'Audits AI-generated UI for layout drift, hierarchy failures, and spacing inconsistency',
  'Structured findings with evidence regions — not vague "something looks off" reports',
  'Works on screenshots and live URLs — no codebase access, no CI setup required',
];

export default function AiUiCheckerPage() {
  return (
    <>
      <LandingNavBar />
      <main>
        <LandingHero
          badge="AI UI Quality Checker"
          headline="An AI UI quality checker built for AI-generated interfaces"
          subheadline="When you build with v0, Lovable, or Cursor, the output moves fast. AIDQA audits each generated screen for measurable quality issues — layout drift, hierarchy weakness, inconsistency, and accessibility risk — and tells you exactly what to fix before you ship."
          ctaText="Check my UI for free"
          ctaHref={CTA_HREF}
        />
        <ValueProps items={VALUE_PROPS} />
        <SocialProof />
        <HowItWorks />
        <LandingCTA
          headline="Stop guessing. Get objective design QA for your AI-generated UI."
          ctaText="Check my UI for free"
          ctaHref={CTA_HREF}
        />
      </main>
      <Footer />
    </>
  );
}
