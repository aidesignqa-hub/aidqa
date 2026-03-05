import type { Metadata } from 'next';
import NavBar from '@/components/NavBar';
import PricingSection from '@/components/PricingSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Pricing — AIDQA',
  description: 'Simple, transparent pricing. Start free, scale when you need to.',
};

export default function PricingPage() {
  return (
    <>
      <NavBar />
      <main>
        <div className="bg-[hsl(215,28%,97%)] py-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Pricing</h1>
          <p className="mt-4 text-lg text-gray-500">Start free. Scale when you need to.</p>
        </div>
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
