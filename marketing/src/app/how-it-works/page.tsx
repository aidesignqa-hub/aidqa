import type { Metadata } from 'next';
import NavBar from '@/components/NavBar';
import HowItWorks from '@/components/HowItWorks';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'How It Works — AIDQA',
  description: 'Three simple steps to automated visual regression testing. No test suite required.',
};

export default function HowItWorksPage() {
  return (
    <>
      <NavBar />
      <main>
        <div className="bg-[hsl(222,47%,11%)] py-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white">How AIDQA works</h1>
          <p className="mt-4 text-lg text-white/60">Up and running in under two minutes.</p>
        </div>
        <HowItWorks />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
