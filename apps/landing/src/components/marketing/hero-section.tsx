"use client";

import Image from "next/image";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-orange)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]";

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120,30,60,0.55) 0%, rgba(9,9,15,1) 70%)",
      }}
    >
      {/* Background image — priority for LCP */}
      <Image
        src="/design/hero-bg.png"
        alt=""
        fill
        priority
        className="object-cover object-top pointer-events-none"
        style={{ opacity: 0.35, mixBlendMode: "screen" }}
      />

      {/* Decorative grid overlay */}
      <img
        src="/design/hero-grid.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-10"
      />

      {/* Corner crosshairs */}
      {[
        "top-[88px] left-6 md:left-10",
        "top-[88px] right-6 md:right-10",
        "bottom-12 left-6 md:left-10",
        "bottom-12 right-6 md:right-10",
      ].map((pos, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`absolute ${pos} text-white/30 text-xl font-light select-none`}
        >
          +
        </span>
      ))}

      {/* Decorative dashed border lines */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 pointer-events-none"
        style={{ top: "96px", borderTop: "1px dashed rgba(255,255,255,0.12)" }}
      />
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 pointer-events-none"
        style={{ bottom: "80px", borderTop: "1px dashed rgba(255,255,255,0.12)" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[760px] mx-auto px-6 text-center pt-32 pb-24">
        <h1 className="text-white text-[3rem] md:text-[4.25rem] leading-[1.08] font-extrabold tracking-tight mb-6">
          Design intelligence layer<br />for your interface
        </h1>

        <p
          className="text-base md:text-lg leading-relaxed mb-10 max-w-[500px] mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          AI builders can generate a screen in seconds.<br />
          But the output usually lands in a dangerous middle zone:{" "}
          looks almost right, but something measurably isn't.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://app.aidesignqa.com"
            className={`px-7 py-3 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90 ${focusRing}`}
            style={{ background: "var(--accent-orange)" }}
          >
            start free trial
          </a>
          <a
            href="#product-demo"
            className={`flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors rounded ${focusRing}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("product-demo")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            watch demo <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
