import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getApiBaseUrl, getApiHeaders } from '@/lib/apiBase';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type MonitorItem = {
  monitorId: string;
  baselineName: string;
  latestMismatchPercentage: number | null;
  latestSeverity: 'minor' | 'warning' | 'critical' | null;
  lastRunAt: string | null;
  enabled: boolean;
  targetUrl: string;
};

export default function Dashboard() {
  const [monitors, setMonitors] = useState<MonitorItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const apiBase = getApiBaseUrl();

  useEffect(() => {
    setError(null);
    setLoading(true);

    fetch(`${apiBase}/monitors?projectId=demo`, {
      headers: getApiHeaders(),
    })
      .then(async (r) => {
        if (!r.ok) {
          const text = await r.text();
          throw new Error(text || `HTTP ${r.status}`);
        }
        return r.json();
      })
      .then((json) => setMonitors(json || []))
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load monitors'))
      .finally(() => setLoading(false));
  }, [apiBase]);

  const getSeverityBadge = (severity: string | null) => {
    if (!severity) return <Badge variant="secondary">No Data</Badge>;
    if (severity === 'critical') return <Badge variant="destructive">Critical</Badge>;
    if (severity === 'warning') return <Badge style={{ background: '#facc15', color: '#000' }}>Warning</Badge>;
    return <Badge style={{ background: '#10b981', color: '#fff' }}>Minor</Badge>;
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
            <p className="text-muted-foreground">Loading monitors...</p>
          </Card>
        )}

        {!loading && monitors.length === 0 && (
          <Card className="p-8 text-center space-y-4">
            <p className="text-muted-foreground">No monitors yet. Create your first monitor to get started.</p>
            <Button onClick={() => navigate('/create-monitor')}>+ Add Monitor</Button>
          </Card>
        )}

        {!loading && monitors.length > 0 && (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Monitor Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Drift %</TableHead>
                  <TableHead>Last Check</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monitors.map((monitor) => (
                  <TableRow key={monitor.monitorId} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{monitor.baselineName}</TableCell>
                    <TableCell>{getSeverityBadge(monitor.latestSeverity)}</TableCell>
                    <TableCell>
                      {monitor.latestMismatchPercentage !== null
                        ? `${monitor.latestMismatchPercentage.toFixed(2)}%`
                        : '—'}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {monitor.lastRunAt
                        ? new Date(monitor.lastRunAt).toLocaleString()
                        : 'Never'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </div>
    </div>
  );
}
