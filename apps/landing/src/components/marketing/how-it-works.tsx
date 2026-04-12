"use client";

import { useState } from "react";
import Image from "next/image";

const steps = [
  {
    number: "01",
    icon: "/design/hiw-icon-1.svg",
    hoverIcons: ["/design/hiw-hover-1a.svg", "/design/hiw-hover-1b.svg"],
    title: "Submit a URL or screenshot",
    description:
      "URL, AIDQA renders a normalized frame and extracts structural metadata.",
  },
  {
    number: "02",
    icon: "/design/hiw-icon-2.svg",
    hoverIcons: ["/design/hiw-hover-2a.svg", "/design/hiw-hover-2b.svg"],
    title: "Automated inspection runs",
    description:
      "Checks layout, hierarchy, consistency, accessibility, and design-system patterns. No baseline required.",
  },
  {
    number: "03",
    icon: "/design/hiw-icon-3.svg",
    hoverIcons: ["/design/hiw-hover-3a.svg", "/design/hiw-hover-3b.svg"],
    title: "Get prioritized findings",
    description:
      "3–7 findings ranked by severity, each with an evidence region, explanation of impact, and concrete repair guidance.",
  },
];

export function HowItWorks() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="how-it-works"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: "#0d0d1a" }}
    >
      {/* Background image — lazy, below fold */}
      <Image
        src="/design/hiw-bg.png"
        alt=""
        fill
        loading="lazy"
        className="object-cover object-center pointer-events-none"
      />
      <div className="absolute inset-0 bg-[#09090f]/70 pointer-events-none" />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <h2 className="text-white font-bold mb-3">How it works</h2>
          <p style={{ color: "var(--text-muted)" }}>
            Submit → Inspect → Fix. No setup required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative rounded-2xl p-8 flex flex-col gap-5 cursor-default transition-colors duration-200"
              style={{
                background: hovered === i
                  ? "rgba(213,77,39,0.07)"
                  : "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Icon area */}
              <div className="relative w-14 h-14">
                <img
                  src={step.icon}
                  alt=""
                  aria-hidden="true"
                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-200 ${
                    hovered === i ? "opacity-0" : "opacity-100"
                  }`}
                />
                {step.hoverIcons.map((src, hi) => (
                  <img
                    key={hi}
                    src={src}
                    alt=""
                    aria-hidden="true"
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-200 ${
                      hovered === i ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>

              <div>
                <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

