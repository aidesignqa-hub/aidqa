import { createClient } from '@supabase/supabase-js';
import { LogoutButton } from './logout-button';

async function getWaitlist() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { data, error } = await supabase
    .from('join_waitlist')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export default async function AdminPage() {
  const entries = await getWaitlist();

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <span className="font-bold text-lg">AID<span style={{ color: '#d54d27' }}>QA</span></span>
          <span className="ml-3 text-white/40 text-sm">Waitlist Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-white/40">{entries.length} total</span>
          <LogoutButton />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-5">
            <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Total signups</p>
            <p className="text-3xl font-bold">{entries.length}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-5">
            <p className="text-xs uppercase tracking-widest text-white/40 mb-1">With notes</p>
            <p className="text-3xl font-bold">{entries.filter(e => e.notes).length}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-5">
            <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Latest signup</p>
            <p className="text-sm font-medium mt-1 truncate">
              {entries[0]
                ? new Date(entries[0].created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                : '—'}
            </p>
          </div>
        </div>

        {/* Table */}
        {entries.length === 0 ? (
          <div className="text-center py-20 text-white/30">No signups yet.</div>
        ) : (
          <div className="rounded-xl border border-white/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-white/40 font-medium">#</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-white/40 font-medium">Email</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-white/40 font-medium">Role</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-white/40 font-medium">Company size</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-white/40 font-medium">Notes</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-white/40 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, i) => (
                  <tr key={entry.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-white/30">{entries.length - i}</td>
                    <td className="px-4 py-3 font-medium">{entry.email}</td>
                    <td className="px-4 py-3 text-white/60">{entry.role || <span className="text-white/20">—</span>}</td>
                    <td className="px-4 py-3 text-white/60">{entry.company_size || <span className="text-white/20">—</span>}</td>
                    <td className="px-4 py-3 text-white/60 max-w-xs">
                      {entry.notes
                        ? <span title={entry.notes}>{entry.notes.length > 60 ? entry.notes.slice(0, 60) + '…' : entry.notes}</span>
                        : <span className="text-white/20">—</span>}
                    </td>
                    <td className="px-4 py-3 text-white/40 whitespace-nowrap">
                      {new Date(entry.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
