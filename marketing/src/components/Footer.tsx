import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <p className="text-lg font-bold text-navy">AIDQA</p>
            <p className="mt-1 text-sm text-gray-500">Automated visual regression testing.</p>
          </div>
          <div className="flex gap-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Product</p>
              <ul className="mt-3 space-y-2">
                <li><Link href="/how-it-works" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">How it works</Link></li>
                <li><Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Pricing</Link></li>
                <li><a href="https://app.aidesignqa.com" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Sign in</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Company</p>
              <ul className="mt-3 space-y-2">
                <li><a href="mailto:hello@aidesignqa.com" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-100 pt-6">
          <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} AIDQA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
