"use client";

export function GameButton() {
  return (
    <a
      href="/aidqa-drift-game.html"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-4 sm:bottom-auto sm:top-[160px] sm:right-[6%] z-40 flex items-center justify-center w-28 h-28 group"
      aria-label="Play the game"
    >
      <img
        src="/aidqa_elements.svg"
        alt=""
        className="absolute inset-0 w-full h-full transition-transform duration-200 group-hover:scale-105"
      />
      <span className="relative z-10 text-white font-bold text-sm text-center leading-snug">
        Play<br />the game
      </span>
    </a>
  );
}
