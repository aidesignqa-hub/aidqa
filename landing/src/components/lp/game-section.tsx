"use client";

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-orange)] focus-visible:ring-offset-2";

export function GameSection() {
  return (
    <section className="py-24 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto text-center">
        <p className="text-sm font-semibold tracking-widest uppercase text-[var(--accent-orange)] mb-4">Mini Game</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Can you spot the drift?
        </h2>
        <p className="text-[var(--text-secondary)] max-w-xl mx-auto mb-10">
          Train your eye before the AI does it for you. Identify design inconsistencies across real UI screens — spacing, hierarchy, contrast, and more.
        </p>
        <a
          href="/aidqa-drift-game.html"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-8 py-4 min-h-[52px] rounded-full bg-[var(--accent-orange)] text-white font-semibold text-lg hover:opacity-90 transition-opacity ${focusRing}`}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
          Play the game
        </a>
      </div>
    </section>
  );
}
