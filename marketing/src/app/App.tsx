import { Navigation } from "./components/navigation";
import { HeroSection } from "./components/hero-section";
import { CredibilityStrip } from "./components/credibility-strip";
import { ProblemSection } from "./components/problem-section";
import { SolutionSection } from "./components/solution-section";
import { HowItWorks } from "./components/how-it-works";
import { UseCases } from "./components/use-cases";
import { WhyPeoplePay } from "./components/why-people-pay";
import { WhoItsFor } from "./components/who-its-for";
import { DemoSection } from "./components/demo-section";
import { PromiseSection } from "./components/promise-section";
import { EarlyAccessForm } from "./components/early-access-form";
import { FAQ } from "./components/faq";
import { Footer } from "./components/footer";

export default function App() {
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
      <PromiseSection />
      <EarlyAccessForm />
      <FAQ />
      <Footer />
    </div>
  );
}
