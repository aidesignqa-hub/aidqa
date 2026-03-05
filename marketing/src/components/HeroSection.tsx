const SIGNUP_URL = process.env.NEXT_PUBLIC_SIGNUP_URL ?? 'https://app.aidesignqa.com/signup';

export default function HeroSection() {
  return (
    <section className="bg-[hsl(222,47%,11%)] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center">
          {/* Copy */}
          <div className="flex-1">
            <div className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
              Powered by GPT-4o Vision
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              Catch visual regressions before your users do.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/60">
              AIDQA monitors your web app&apos;s UI with pixel-perfect screenshots and GPT-4o Vision.
              Get alerted when something breaks &mdash; without writing a single test.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={SIGNUP_URL}
                className="inline-flex items-center justify-center rounded-lg bg-[hsl(243,75%,59%)] px-6 py-3 text-sm font-semibold text-white hover:bg-[hsl(243,68%,48%)] transition-colors"
              >
                Start monitoring free
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white/80 hover:border-white/40 hover:text-white transition-colors"
              >
                See how it works
              </a>
            </div>
            <p className="mt-4 text-xs text-white/40">No credit card required &middot; Free tier available</p>
          </div>

          {/* Visual placeholder */}
          <div className="flex-1 lg:max-w-xl">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <div className="border-b border-white/10 px-4 py-3 flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
                <span className="ml-3 text-xs text-white/30">app.aidesignqa.com</span>
              </div>
              <div className="grid grid-cols-2 gap-3 p-4">
                <div className="aspect-video rounded-lg bg-white/5 flex items-center justify-center">
                  <span className="text-xs text-white/30">Baseline</span>
                </div>
                <div className="aspect-video rounded-lg bg-white/5 relative flex items-center justify-center overflow-hidden">
                  <span className="text-xs text-white/30">Current</span>
                  <div className="absolute right-2 bottom-2 rounded bg-red-500/80 px-1.5 py-0.5 text-[10px] text-white font-mono">
                    3.2% drift
                  </div>
                </div>
              </div>
              <div className="border-t border-white/10 px-4 py-3">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-[hsl(243,75%,59%)]/20 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-[hsl(243,75%,59%)]" />
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed">
                    AI detected a font-weight change in the hero heading and a spacing shift in the navigation bar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
