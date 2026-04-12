"use client";

import Image from "next/image";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-orange)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]";

export function ProductDemoSection() {
  return (
    <section
      id="product-demo"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: "#0c0c18" }}
    >
      {/* Background image — lazy, below fold */}
      <Image
        src="/design/demo-bg.png"
        alt=""
        fill
        loading="lazy"
        className="object-cover object-center pointer-events-none"
      />
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-[#09090f]/60 pointer-events-none" />

      <div className="relative z-10 max-w-[960px] mx-auto px-6">
        {/* Browser-frame mockup */}
        <div className="relative">
          {/* Floating CTA badge */}
          <a
            href="https://app.aidesignqa.com"
            className={`absolute -top-5 -right-2 md:right-0 z-20 flex items-center justify-center w-[88px] h-[88px] rounded-full text-white text-xs font-semibold text-center leading-tight transition-transform hover:scale-105 ${focusRing}`}
            style={{ background: "var(--accent-orange)" }}
          >
            Run a<br />free scan
          </a>

          {/* Browser chrome */}
          <div
            className="rounded-2xl overflow-hidden shadow-2xl border"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            {/* Title bar */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ background: "#1a1a2a", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div
                className="flex-1 mx-3 h-6 rounded-md flex items-center px-3"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                <span className="text-xs text-white/30">app.aidesignqa.com</span>
              </div>
            </div>

            {/* App screenshot / video */}
            <div className="relative aspect-[16/9] bg-[#0f0f1a]">
              <video
                src="https://eboaqtbktyaxzrbcntzy.supabase.co/storage/v1/object/public/aidqa-assets/demo.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
