import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getApiBaseUrl, getApiHeaders, getSupabaseAnonKey, getSupabaseProjectUrl } from '@/lib/apiBase';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type MonitorItem = {
  monitorId: string;
  baselineName: string;
  enabled: boolean;
  targetUrl: string;
};

type VisualRunRow = {
  id: string;
  monitor_id: string | null;
  baseline_id: string;
  status: string;
  mismatch_percentage: number | string;
  created_at: string;
  current_path: string | null;
  diff_path: string | null;
};

type BaselinePathRow = {
  id: string;
  snapshot_path: string;
};

type DashboardMonitorRow = {
  monitor: MonitorItem;
  latestRun: VisualRunRow | null;
  baselinePath: string | null;
};

type SignedImages = {
  baselineUrl: string | null;
  currentUrl: string | null;
  diffUrl: string | null;
};

export default function Dashboard() {
  const [rows, setRows] = useState<DashboardMonitorRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [selectedRow, setSelectedRow] = useState<DashboardMonitorRow | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [signedImages, setSignedImages] = useState<SignedImages>({
    baselineUrl: null,
    currentUrl: null,
    diffUrl: null,
  });
  const navigate = useNavigate();
  const apiBase = getApiBaseUrl();
  const supabaseUrl = getSupabaseProjectUrl();
  const anonKey = getSupabaseAnonKey();

  const buildRestUrl = (path: string, query: string) => {
    return `${supabaseUrl}/rest/v1/${path}?${query}`;
  };

  const parseSignedUrl = (signedPath: string) => {
    if (!signedPath) return null;
    if (signedPath.startsWith('http://') || signedPath.startsWith('https://')) return signedPath;
    if (signedPath.startsWith('/object/')) return `${supabaseUrl}/storage/v1${signedPath}`;
    if (signedPath.startsWith('/storage/')) return `${supabaseUrl}${signedPath}`;
    return `${supabaseUrl}/storage/v1/${signedPath.replace(/^\/+/, '')}`;
  };

  const createSignedUrl = async (path: string | null) => {
    if (!path || !supabaseUrl || !anonKey) return null;
    const encodedPath = path
      .split('/')
      .map((segment) => encodeURIComponent(segment))
      .join('/');

    const response = await fetch(`${supabaseUrl}/storage/v1/object/sign/visual/${encodedPath}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${anonKey}`,
        apikey: anonKey,
      },
      body: JSON.stringify({ expiresIn: 3600 }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || `Failed to sign storage URL (${response.status})`);
    }

    const json = await response.json();
    return parseSignedUrl(json.signedURL || json.signedUrl || '');
  };

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
        const monitorsResponse = await fetch(`${apiBase}/monitors?projectId=demo`, {
          headers: getApiHeaders(),
        });

        if (!monitorsResponse.ok) {
          const text = await monitorsResponse.text();
          throw new Error(text || `HTTP ${monitorsResponse.status}`);
        }

        const monitorsJson = (await monitorsResponse.json()) as MonitorItem[];
        const monitors = monitorsJson || [];

        if (!supabaseUrl || !anonKey) {
          const fallbackRows = monitors.map((monitor) => ({
            monitor,
            latestRun: null,
            baselinePath: null,
          }));
          setRows(fallbackRows);
          return;
        }

        const runsQuery = new URLSearchParams({
          select: 'id,monitor_id,baseline_id,status,mismatch_percentage,created_at,current_path,diff_path',
          project_id: 'eq.demo',
          order: 'created_at.desc',
          limit: '200',
        }).toString();

        const runsResponse = await fetch(buildRestUrl('visual_runs', runsQuery), {
          headers: {
            Authorization: `Bearer ${anonKey}`,
            apikey: anonKey,
          },
        });

        if (!runsResponse.ok) {
          const text = await runsResponse.text();
          throw new Error(text || `HTTP ${runsResponse.status}`);
        }

        const runs = (await runsResponse.json()) as VisualRunRow[];
        const latestByMonitor = getLatestRunByMonitor(runs || []);

        const baselineIds = Array.from(
          new Set(Array.from(latestByMonitor.values()).map((run) => run.baseline_id).filter(Boolean))
        );

        const baselinePathById = new Map<string, string>();
        if (baselineIds.length > 0) {
          const baselineQuery = new URLSearchParams({
            select: 'id,snapshot_path',
            id: `in.(${baselineIds.join(',')})`,
          }).toString();

          const baselinesResponse = await fetch(buildRestUrl('design_baselines', baselineQuery), {
            headers: {
              Authorization: `Bearer ${anonKey}`,
              apikey: anonKey,
            },
          });

          if (!baselinesResponse.ok) {
            const text = await baselinesResponse.text();
            throw new Error(text || `HTTP ${baselinesResponse.status}`);
          }

          const baselines = (await baselinesResponse.json()) as BaselinePathRow[];
          for (const baseline of baselines || []) {
            baselinePathById.set(baseline.id, baseline.snapshot_path);
          }
        }

        const combinedRows: DashboardMonitorRow[] = monitors.map((monitor) => {
          const latestRun = latestByMonitor.get(monitor.monitorId) || null;
          const baselinePath = latestRun ? baselinePathById.get(latestRun.baseline_id) || null : null;
          return { monitor, latestRun, baselinePath };
        });

        setRows(combinedRows);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [apiBase, anonKey, supabaseUrl]);

  const getStatusBadge = (status: string | null) => {
    if (!status) return <Badge variant="secondary">No runs yet</Badge>;
    if (status === 'completed') return <Badge variant="default">Completed</Badge>;
    if (status === 'failed') return <Badge variant="destructive">Failed</Badge>;
    return <Badge variant="secondary">{status}</Badge>;
  };

  const openResultDialog = async (row: DashboardMonitorRow) => {
    setSelectedRow(row);
    setDialogOpen(true);
    setImageError(null);
    setImageLoading(true);
    setSignedImages({ baselineUrl: null, currentUrl: null, diffUrl: null });

    try {
      const [baselineUrl, currentUrl, diffUrl] = await Promise.all([
        createSignedUrl(row.baselinePath),
        createSignedUrl(row.latestRun?.current_path || null),
        createSignedUrl(row.latestRun?.diff_path || null),
      ]);

      setSignedImages({ baselineUrl, currentUrl, diffUrl });
    } catch (e) {
      setImageError(e instanceof Error ? e.message : 'Failed to load result images');
    } finally {
      setImageLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">AIDQA Dashboard</h1>
            <p className="text-muted-foreground mt-1">Monitor your visual regression tests</p>
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
            <p className="text-muted-foreground">Loading monitors and latest runs...</p>
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
                  const canView =
                    !!latestRun &&
                    latestRun.status === 'completed' &&
                    !!row.baselinePath &&
                    !!latestRun.current_path;

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
                      {hasRun ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openResultDialog(row)}
                          disabled={!canView || imageLoading}
                        >
                          View Result
                        </Button>
                      ) : (
                        <span className="text-sm text-muted-foreground">No runs yet</span>
                      )}
                    </TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>
          </Card>
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-6xl">
            <DialogHeader>
              <DialogTitle>Latest Run Result</DialogTitle>
              <DialogDescription>
                {selectedRow?.monitor.baselineName || 'Monitor result'}
              </DialogDescription>
            </DialogHeader>

            {imageError && (
              <Alert variant="destructive">
                <AlertDescription>{imageError}</AlertDescription>
              </Alert>
            )}

            {imageLoading ? (
              <div className="py-8 text-center text-muted-foreground">Loading images...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded overflow-hidden">
                  <p className="p-2 text-sm font-medium">Baseline</p>
                  {signedImages.baselineUrl ? (
                    <img src={signedImages.baselineUrl} alt="Baseline" className="w-full h-auto" />
                  ) : (
                    <div className="p-6 text-sm text-muted-foreground">No baseline image</div>
                  )}
                </div>

                <div className="border rounded overflow-hidden">
                  <p className="p-2 text-sm font-medium">Current</p>
                  {signedImages.currentUrl ? (
                    <img src={signedImages.currentUrl} alt="Current" className="w-full h-auto" />
                  ) : (
                    <div className="p-6 text-sm text-muted-foreground">No current image</div>
                  )}
                </div>

                <div className="border rounded overflow-hidden">
                  <p className="p-2 text-sm font-medium">Diff</p>
                  {signedImages.diffUrl ? (
                    <img src={signedImages.diffUrl} alt="Diff" className="w-full h-auto" />
                  ) : (
                    <div className="p-6 text-sm text-muted-foreground">No diff image</div>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
