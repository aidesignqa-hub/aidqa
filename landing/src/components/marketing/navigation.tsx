"use client";

import { ThemeToggle } from "./theme-toggle";

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-[var(--background)]/80 border-b border-[var(--border-subtle)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo + Links */}
          <div className="flex items-center gap-12">
            <div className="text-2xl tracking-tight" style={{ fontWeight: 800 }}>
              AIDQA
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#product" className="hover:opacity-70 transition-opacity">Product</a>
              <a href="#how-it-works" className="hover:opacity-70 transition-opacity">How it works</a>
              <a href="#demo" className="hover:opacity-70 transition-opacity">Demo</a>
              <a href="#early-access" className="hover:opacity-70 transition-opacity">Early Access</a>
            </div>
          </div>

          {/* Right: CTAs + Theme Toggle */}
          <div className="flex items-center gap-4">
            <button className="hidden sm:block px-6 py-2 rounded-full hover:bg-[var(--card)] transition-colors">
              Watch demo
            </button>
            <button className="px-6 py-2 rounded-full bg-[var(--accent-orange)] text-white hover:opacity-90 transition-opacity">
              Join early access
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
