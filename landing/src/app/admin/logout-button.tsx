'use client';

import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-white/40 hover:text-white transition-colors px-3 py-1 rounded border border-white/10 hover:border-white/30"
    >
      Sign out
    </button>
  );
}
