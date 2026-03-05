import Link from 'next/link';

const SIGNUP_URL = process.env.NEXT_PUBLIC_SIGNUP_URL ?? 'https://app.aidesignqa.com/signup';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.aidesignqa.com';

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-lg font-bold text-navy">
            AIDQA
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link href="/how-it-works" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              How it works
            </Link>
            <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={APP_URL}
            className="hidden text-sm text-gray-600 hover:text-gray-900 transition-colors sm:block"
          >
            Sign in
          </a>
          <a
            href={SIGNUP_URL}
            className="rounded-lg bg-[hsl(243,75%,59%)] px-4 py-2 text-sm font-medium text-white hover:bg-[hsl(243,68%,48%)] transition-colors"
          >
            Start free
          </a>
        </div>
      </div>
    </header>
  );
}
