'use client';

import { Navigation } from '@/components/lp/navigation';
import { HeroSection } from '@/components/lp/hero-section';
import { CredibilityStrip } from '@/components/marketing/credibility-strip';
import { ProblemSection } from '@/components/lp/problem-section';
import { SolutionSection } from '@/components/marketing/solution-section';
import { HowItWorks } from '@/components/marketing/how-it-works';
import { UseCases } from '@/components/marketing/use-cases';
import { WhyPeoplePay } from '@/components/lp/why-people-pay';
import { WhoItsFor } from '@/components/lp/who-its-for';
import { DemoSection } from '@/components/marketing/demo-section';
import { PromiseSection } from '@/components/marketing/promise-section';
import { PricingSection } from '@/components/lp/pricing-section';
import { EarlyAccessForm } from '@/components/lp/early-access-form';
import { FAQ } from '@/components/lp/faq';
import { GameSection } from '@/components/lp/game-section';
import { Footer } from '@/components/marketing/footer';

export default function LPPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <CredibilityStrip />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <UseCases />
      <WhyPeoplePay />
      <WhoItsFor />
      <DemoSection />
      <GameSection />
      <PromiseSection />
      <PricingSection />
      <EarlyAccessForm />
      <FAQ />
      <Footer />
    </div>
  );
}
