import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "Is this a design tool?",
      answer: "No — it's a validation layer that checks UI quality.",
    },
    {
      question: "Do I need a design system?",
      answer: "No. We flag practical UI issues and explain them in plain English.",
    },
    {
      question: "How is this different from visual regression tools?",
      answer: "We prioritize what matters (severity + clarity), not endless diffs.",
    },
    {
      question: "What can I scan?",
      answer: "Figma frames, screenshots, or builder URLs (depending on your plan / current beta).",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-[var(--card)]">
      <div className="max-w-[800px] mx-auto px-6 md:px-8">
        <h2 className="mb-12 text-center">Frequently asked questions</h2>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-[var(--border-subtle)] rounded-xl px-6 bg-[var(--background)]"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span>{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-base pb-6 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
