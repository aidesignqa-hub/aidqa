'use client';

import { Navigation } from '@/components/marketing/navigation';
import { HeroSection } from '@/components/marketing/hero-section';
import { ProductDemoSection } from '@/components/marketing/product-demo-section';
import { QualitySection } from '@/components/marketing/quality-section';
import { HowItWorks } from '@/components/marketing/how-it-works';
import { PricingSection } from '@/components/marketing/pricing-section';
import { Footer } from '@/components/marketing/footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#09090f]">
      <Navigation />
      <HeroSection />
      <ProductDemoSection />
      <QualitySection />
      <HowItWorks />
      <PricingSection />
      <Footer />
    </div>
  );
}

