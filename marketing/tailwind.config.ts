import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: 'hsl(222, 47%, 11%)',
          mid: 'hsl(221, 39%, 22%)',
          light: 'hsl(220, 35%, 32%)',
        },
        indigo: {
          brand: 'hsl(243, 75%, 59%)',
          dark: 'hsl(243, 68%, 48%)',
        },
        brand: {
          slate: 'hsl(215, 28%, 97%)',
          muted: 'hsl(215, 16%, 47%)',
          surface: 'hsl(222, 47%, 8%)',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
