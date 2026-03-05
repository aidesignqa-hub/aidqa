import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getApiBaseUrl } from '@/lib/apiBase';
import { supabase } from '@/lib/supabaseClient';
import { getAuthHeaders } from '@/lib/auth';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import NavBar from '@/components/NavBar';

type MonitorItem = {
  monitorId: string;
  baselineName: string;
  enabled: boolean;
  targetUrl: string;
};

type VisualRunRow = {
  id: string;
  monitor_id: string | null;
  status: string;
  mismatch_percentage: number | string;
  created_at: string;
};

type DashboardMonitorRow = {
  monitor: MonitorItem;
  latestRun: VisualRunRow | null;
};

export default function Dashboard() {
  const [rows, setRows] = useState<DashboardMonitorRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingMonitorId, setDeletingMonitorId] = useState<string | null>(null);
  const navigate = useNavigate();
  const apiBase = getApiBaseUrl();

  const getLatestRunByMonitor = (runs: VisualRunRow[]) => {
    const latest = new Map<string, VisualRunRow>();
    for (const run of runs) {
      if (!run.monitor_id) continue;
      if (!latest.has(run.monitor_id)) {
        latest.set(run.monitor_id, run);
      }
    }
    return latest;
  };

  useEffect(() => {
    setError(null);
    setLoading(true);
    const load = async () => {
      try {
        const headers = await getAuthHeaders();
        const monitorsResponse = await fetch(`${apiBase}/monitors`, { headers });

        if (!monitorsResponse.ok) {
          const text = await monitorsResponse.text();
          throw new Error(text || `HTTP ${monitorsResponse.status}`);
        }

        const monitors = ((await monitorsResponse.json()) as MonitorItem[]) || [];

        const { data: runs, error: runsError } = await supabase
          .from('visual_runs')
          .select('id,monitor_id,status,mismatch_percentage,created_at')
          .order('created_at', { ascending: false })
          .limit(200);

        if (runsError) throw new Error(runsError.message || 'Failed to load runs');

        const latestByMonitor = getLatestRunByMonitor(runs || []);

        const combinedRows: DashboardMonitorRow[] = monitors.map((monitor) => ({
          monitor,
          latestRun: latestByMonitor.get(monitor.monitorId) || null,
        }));

        setRows(combinedRows);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [apiBase]);

  const getStatusBadge = (status: string | null) => {
    if (!status) return <Badge variant="secondary">No runs yet</Badge>;
    if (status === 'completed') return <Badge variant="default">Completed</Badge>;
    if (status === 'failed') return <Badge variant="destructive">Failed</Badge>;
    return <Badge variant="secondary">{status}</Badge>;
  };

  const handleDeleteMonitor = async (monitorId: string) => {
    if (!window.confirm('Delete this monitor and all its runs? This cannot be undone.')) return;
    setDeletingMonitorId(monitorId);
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`${apiBase}/monitors/${monitorId}`, { method: 'DELETE', headers });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }
      setRows((prev) => prev.filter((r) => r.monitor.monitorId !== monitorId));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to delete monitor');
    } finally {
      setDeletingMonitorId(null);
    }
  };

  return (
    <>
      <NavBar />
      <div className="w-full px-6 xl:px-12 py-8 space-y-6 overflow-x-hidden">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Visual regression monitors</p>
          </div>
          <Button onClick={() => navigate('/create-monitor')} size="lg">
            + Add Monitor
          </Button>
        </header>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Loading monitors...</p>
          </Card>
        )}

        {!loading && rows.length === 0 && (
          <Card className="p-8 text-center space-y-4">
            <p className="text-muted-foreground">No monitors yet. Create your first monitor to get started.</p>
            <Button onClick={() => navigate('/create-monitor')}>+ Add Monitor</Button>
          </Card>
        )}

        {!loading && rows.length > 0 && (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Monitor Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Drift %</TableHead>
                  <TableHead>Last Check</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => {
                  const latestRun = row.latestRun;
                  const hasRun = !!latestRun;
                  const canView = !!latestRun && latestRun.status === 'completed';

                  return (
                    <TableRow key={row.monitor.monitorId} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{row.monitor.baselineName}</TableCell>
                      <TableCell>{getStatusBadge(latestRun?.status || null)}</TableCell>
                      <TableCell>
                        {hasRun
                          ? `${Number(latestRun?.mismatch_percentage || 0).toFixed(2)}%`
                          : '—'}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {hasRun && latestRun?.created_at
                          ? new Date(latestRun.created_at).toLocaleString()
                          : 'Never'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {hasRun ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/runs/${latestRun.id}`)}
                              disabled={!canView}
                            >
                              View Result
                            </Button>
                          ) : (
                            <span className="text-sm text-muted-foreground">No runs yet</span>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/monitors/${row.monitor.monitorId}/history`)}
                          >
                            History
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteMonitor(row.monitor.monitorId)}
                            disabled={deletingMonitorId === row.monitor.monitorId}
                          >
                            {deletingMonitorId === row.monitor.monitorId ? 'Deleting…' : 'Delete'}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        )}
      </div>
    </>
  );
}
