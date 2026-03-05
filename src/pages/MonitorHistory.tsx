import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { getApiBaseUrl } from '@/lib/apiBase';
import { getAuthHeaders } from '@/lib/auth';
import { getSeverity } from '@/lib/utils';
import NavBar from '@/components/NavBar';

type RunItem = {
  id: string;
  monitorId: string;
  baselineId: string;
  status: string;
  mismatchPercentage: number;
  diffPixels: number;
  createdAt: string;
  currentUrl: string | null;
  diffUrl: string | null;
  aiStatus: string;
  aiJson: any;
  cssDiffJson: { selector: string; changes: unknown[] }[] | null;
};

export default function MonitorHistory() {
  const { monitorId } = useParams();
  const navigate = useNavigate();
  const [runs, setRuns] = useState<RunItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiBase = getApiBaseUrl();

  useEffect(() => {
    if (!monitorId) return;
    setLoading(true);
    setError(null);

    getAuthHeaders()
      .then((headers) => fetch(`${apiBase}/monitors/${monitorId}/runs`, { headers }))
      .then(async (r) => {
        if (!r.ok) throw new Error((await r.text()) || `HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => setRuns(data))
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load runs'))
      .finally(() => setLoading(false));
  }, [monitorId, apiBase]);

  const getSeverityBadge = (mismatch: number) => {
    const sev = getSeverity(mismatch);
    if (sev === 'low') return <Badge variant="secondary">Low</Badge>;
    if (sev === 'medium')
      return <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">Medium</Badge>;
    return <Badge variant="destructive">High</Badge>;
  };

  // Chart data: oldest first
  const chartData = [...runs].reverse().map((run) => ({
    date: new Date(run.createdAt).toLocaleDateString(),
    drift: run.mismatchPercentage,
  }));

  return (
    <>
      <NavBar />
      <div className="w-full px-6 xl:px-12 py-8 space-y-6 overflow-x-hidden">
        <header className="space-y-1">
          <Button variant="ghost" onClick={() => navigate('/')} className="-ml-3">
            &larr; Dashboard
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Monitor History</h1>
          <p className="text-muted-foreground">
            Monitor: <span className="font-mono text-sm">{monitorId}</span>
            {' · '}
            {runs.length} run{runs.length !== 1 ? 's' : ''}
          </p>
        </header>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Loading run history...</p>
          </Card>
        )}

        {!loading && runs.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No runs found for this monitor.</p>
          </Card>
        )}

        {!loading && chartData.length > 1 && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Drift Trend</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v) => `${v}%`}
                  domain={[0, 'auto']}
                />
                <Tooltip formatter={(value: number) => [`${value.toFixed(2)}%`, 'Drift']} />
                <Line
                  type="monotone"
                  dataKey="drift"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        )}

        {!loading && runs.length > 0 && (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Run</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Drift %</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>AI</TableHead>
                  <TableHead>CSS</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {runs.map((run, idx) => (
                  <TableRow
                    key={run.id}
                    className="hover:bg-muted/50 cursor-pointer"
                    onClick={() => navigate(`/runs/${run.id}`)}
                  >
                    <TableCell className="font-mono text-sm">#{runs.length - idx}</TableCell>
                    <TableCell>
                      <Badge variant={run.status === 'completed' ? 'default' : 'destructive'}>
                        {run.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {run.mismatchPercentage.toFixed(2)}%
                    </TableCell>
                    <TableCell>
                      {getSeverityBadge(run.mismatchPercentage)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {run.aiStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {run.cssDiffJson && run.cssDiffJson.length > 0 ? (
                        <Badge variant="outline" className="text-xs">
                          {run.cssDiffJson.length}
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(run.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/runs/${run.id}`)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </div>
    </>
  );
}
