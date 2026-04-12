import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '@/components/NavBar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getApiBaseUrl, getAuthHeaders } from '@/lib/apiBase'

type Scan = {
  id: string
  status: string
  input_type: string
  input_url?: string
  input_filename?: string
  finding_count?: number
  created_at: string
}

export default function ScanHistory() {
  const navigate = useNavigate()
  const [scans, setScans] = useState<Scan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const LIMIT = 20

  useEffect(() => {
    const fetchScans = async () => {
      setLoading(true)
      setError(null)
      try {
        const headers = await getAuthHeaders()
        const res = await fetch(`${getApiBaseUrl()}/v1/scans?page=${page}&limit=${LIMIT}`, { headers })
        if (!res.ok) {
          setError('Failed to load scan history. Please try again.')
          return
        }
        const data = await res.json()
        setScans(data.scans ?? [])
        setTotal(data.total ?? 0)
      } catch {
        setError('Could not connect. Check your internet connection and try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchScans()
  }, [page])

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-white">Scan history</h1>
          <Button
            className="bg-[#f97316] hover:bg-[#ea6c0a] text-black font-semibold rounded-full"
            onClick={() => navigate('/')}
          >
            New scan
          </Button>
        </div>

        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-6 h-6 border-2 border-[#f97316] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-16 text-[#a1a1aa]">
            <p className="mb-3 text-red-400">{error}</p>
            <Button variant="outline" className="border-[rgba(255,255,255,0.08)] text-[#a1a1aa] hover:text-white hover:bg-[#18181b]" onClick={() => setPage(p => p)}>Retry</Button>
          </div>
        )}

        {!loading && scans.length === 0 && !error && (
          <div className="text-center py-16 text-[#a1a1aa]">
            <p className="mb-3">No scans yet.</p>
            <Button variant="outline" className="border-[rgba(255,255,255,0.08)] text-[#a1a1aa] hover:text-white hover:bg-[#18181b]" onClick={() => navigate('/')}>Start your first scan</Button>
          </div>
        )}

        {!loading && scans.length > 0 && (
          <>
            <div className="border border-[rgba(255,255,255,0.06)] rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#18181b]">
                  <tr>
                    <th className="text-left px-4 py-2.5 font-medium text-[#a1a1aa]">URL / File</th>
                    <th className="text-left px-4 py-2.5 font-medium text-[#a1a1aa]">Findings</th>
                    <th className="text-left px-4 py-2.5 font-medium text-[#a1a1aa]">Status</th>
                    <th className="text-left px-4 py-2.5 font-medium text-[#a1a1aa]">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(255,255,255,0.06)]">
                  {scans.map(scan => (
                    <tr
                      key={scan.id}
                      className="bg-[#111113] hover:bg-[#18181b] cursor-pointer transition-colors"
                      onClick={() => navigate(`/scans/${scan.id}`)}
                    >
                      <td className="px-4 py-3 max-w-xs">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs shrink-0 border-[rgba(255,255,255,0.08)] text-[#a1a1aa]">
                            {scan.input_type === 'url' ? 'URL' : 'File'}
                          </Badge>
                          <span className="truncate text-sm text-[#f4f4f5]">
                            {scan.input_url ?? scan.input_filename ?? scan.id}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#a1a1aa]">
                        {scan.finding_count ?? '—'}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={scan.status === 'completed' ? 'secondary' : scan.status === 'failed' ? 'destructive' : 'outline'}
                          className="text-xs"
                        >
                          {scan.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-[#a1a1aa] text-xs">
                        {new Date(scan.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {total > LIMIT && (
              <div className="flex items-center justify-between mt-4">
                <p className="text-xs text-[#a1a1aa]">
                  Showing {(page - 1) * LIMIT + 1}–{Math.min(page * LIMIT, total)} of {total}
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-[rgba(255,255,255,0.08)] text-[#a1a1aa] hover:text-white hover:bg-[#18181b]" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="border-[rgba(255,255,255,0.08)] text-[#a1a1aa] hover:text-white hover:bg-[#18181b]" disabled={page * LIMIT >= total} onClick={() => setPage(p => p + 1)}>
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
