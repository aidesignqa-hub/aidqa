const SIGNUP_URL = process.env.NEXT_PUBLIC_SIGNUP_URL ?? 'https://app.aidesignqa.com/signup';

export default function CTASection() {
  return (
    <section className="bg-[hsl(222,47%,11%)] py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          Ready to stop chasing visual bugs manually?
        </h2>
        <p className="mt-4 text-lg text-white/60">
          Start your free monitor in under 2 minutes.
        </p>
        <a
          href={SIGNUP_URL}
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-[hsl(243,75%,59%)] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[hsl(243,68%,48%)] transition-colors"
        >
          Get started free
        </a>
        <p className="mt-4 text-xs text-white/30">No credit card required</p>
      </div>
    </section>
  );
}
