import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getApiBaseUrl } from '@/lib/apiBase';
import { getAuthHeaders } from '@/lib/auth';
import { supabase } from '@/lib/supabaseClient';
import { getSeverity } from '@/lib/utils';
import NavBar from '@/components/NavBar';

type AIIssue = {
  title: string;
  location?: string;
  type: string;
  severity: string;
  evidence: string;
  recommendation: string;
};

type AIInsights = {
  summary: string;
  severity: string;
  issues: AIIssue[];
  quickWins: string[];
  verdict?: string;
};

type CssPropertyChange = {
  property: string;
  baseline: string;
  current: string;
  category: string;
};

type CssDiffItem = {
  selector: string;
  tag: string;
  text: string;
  changes: CssPropertyChange[];
};

type RunReportData = {
  runId: string;
  mismatchPercentage: number;
  diffPixels: number | null;
  baselineImageUrl: string | null;
  currentImageUrl: string | null;
  diffImageUrl: string | null;
  createdAt: string;
  aiJson: AIInsights | null;
  aiStatus: string | null;
  cssDiffJson: CssDiffItem[] | null;
};

const categoryColors: Record<string, string> = {
  typography: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  color: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
  spacing: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300',
  layout: 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
  border: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  other: 'bg-muted text-muted-foreground',
};

function SeverityBadge({ severity }: { severity: string | null }) {
  if (!severity) return null;
  if (severity === 'critical' || severity === 'high')
    return <Badge variant="destructive">{severity.toUpperCase()}</Badge>;
  if (severity === 'warning' || severity === 'major' || severity === 'medium')
    return <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">{severity.toUpperCase()}</Badge>;
  return <Badge variant="secondary">{severity.toUpperCase()}</Badge>;
}

export default function RunReport() {
  const { runId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<RunReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiBase = getApiBaseUrl();

  useEffect(() => {
    if (!runId) return;
    setLoading(true);
    setError(null);
    setData(null);

    const load = async () => {
      try {
        // Fetch image URLs + basic stats from API
        const headers = await getAuthHeaders();
        const apiRes = await fetch(`${apiBase}/runs/${runId}`, { headers });
        if (!apiRes.ok) {
          const text = await apiRes.text();
          throw new Error(text || `HTTP ${apiRes.status}`);
        }
        const apiData = await apiRes.json();

        // Fetch full run data (AI, CSS diff) directly from Supabase
        const { data: runRow, error: runError } = await supabase
          .from('visual_runs')
          .select('diff_pixels, ai_json, ai_status, css_diff_json')
          .eq('id', runId)
          .single();

        if (runError) throw new Error(runError.message || 'Failed to load run details');

        setData({
          runId: apiData.runId,
          mismatchPercentage: apiData.mismatchPercentage,
          baselineImageUrl: apiData.baselineImageUrl ?? null,
          currentImageUrl: apiData.currentImageUrl ?? null,
          diffImageUrl: apiData.diffImageUrl ?? null,
          createdAt: apiData.createdAt,
          diffPixels: runRow?.diff_pixels ?? null,
          aiJson: runRow?.ai_json ?? null,
          aiStatus: runRow?.ai_status ?? null,
          cssDiffJson: runRow?.css_diff_json ?? null,
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load run');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [runId, apiBase]);

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-muted-foreground">Loading run report...</p>
        </div>
      </>
    );
  }

  if (error || !data) {
    return (
      <>
        <NavBar />
        <div className="w-full px-6 xl:px-12 py-8 space-y-4">
          <Button variant="ghost" onClick={() => navigate('/')} className="-ml-2">
            &larr; Dashboard
          </Button>
          <Alert variant="destructive">
            <AlertDescription>{error ?? 'Run not found'}</AlertDescription>
          </Alert>
        </div>
      </>
    );
  }

  const cssChangeCount = data.cssDiffJson?.length ?? 0;
  const aiVerdict = data.aiJson?.verdict ?? (data.aiJson?.summary ? data.aiJson.summary.slice(0, 80) : null);
  const severity = getSeverity(data.mismatchPercentage);

  return (
    <>
      <NavBar />

      {/* Sticky Summary Bar — sits below NavBar (top-14 = 56px) */}
      <div className="sticky top-14 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full px-6 xl:px-12 py-2.5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 min-w-0">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="-ml-2 shrink-0">
              &larr; Dashboard
            </Button>
            <Separator orientation="vertical" className="h-5 shrink-0" />
            <span className="text-xs font-mono text-muted-foreground truncate">{runId}</span>
          </div>
          <div className="flex items-center gap-5 flex-wrap">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Drift</p>
              <p className="text-base font-bold leading-tight">{data.mismatchPercentage.toFixed(2)}%</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Severity</p>
              <SeverityBadge severity={severity} />
            </div>
            {data.aiJson && (
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">AI Severity</p>
                <SeverityBadge severity={data.aiJson.severity} />
              </div>
            )}
            {cssChangeCount > 0 && (
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">CSS Changes</p>
                <p className="text-base font-bold leading-tight">{cssChangeCount}</p>
              </div>
            )}
            {aiVerdict && (
              <div className="max-w-[200px] hidden md:block">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">AI Verdict</p>
                <p className="text-xs line-clamp-2 leading-tight">{aiVerdict}</p>
              </div>
            )}
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Checked</p>
              <p className="text-xs">{new Date(data.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-6 xl:px-12 py-8 overflow-x-hidden">
        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ai">
              AI Analysis{data.aiJson?.issues?.length ? ` (${data.aiJson.issues.length})` : ''}
            </TabsTrigger>
            <TabsTrigger value="css">
              CSS Changes{cssChangeCount > 0 ? ` (${cssChangeCount})` : ''}
            </TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
          </TabsList>

          {/* ── Overview Tab ── */}
          <TabsContent value="overview">
            <div className="space-y-8">

              {/* Images: Baseline | Current | Diff side-by-side */}
              <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3 gap-8">
                {(
                  [
                    { label: 'Baseline', url: data.baselineImageUrl },
                    { label: 'Current', url: data.currentImageUrl },
                    { label: 'Diff', url: data.diffImageUrl },
                  ] as { label: string; url: string | null }[]
                ).map(({ label, url }) => (
                  <Card key={label} className="overflow-hidden">
                    <div className="px-4 py-2 border-b flex items-center justify-between">
                      <p className="text-sm font-semibold">{label}</p>
                      {url && (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline"
                        >
                          Open
                        </a>
                      )}
                    </div>
                    {url ? (
                      <img src={url} alt={label} className="w-full h-auto object-contain" />
                    ) : (
                      <div className="p-6 text-sm text-muted-foreground text-center">
                        No {label.toLowerCase()} image
                      </div>
                    )}
                  </Card>
                ))}
              </div>

              {/* Stats + AI analysis */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 content-start">
                  <Card className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">Drift</p>
                    <p className="text-2xl font-bold">{data.mismatchPercentage.toFixed(2)}%</p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">Severity</p>
                    <div className="mt-1"><SeverityBadge severity={severity} /></div>
                  </Card>
                  {data.diffPixels !== null && (
                    <Card className="p-4">
                      <p className="text-xs text-muted-foreground mb-1">Diff Pixels</p>
                      <p className="text-2xl font-bold">{data.diffPixels.toLocaleString()}</p>
                    </Card>
                  )}
                </div>

                {/* AI analysis */}
                <div className="space-y-4">
                  {data.aiJson ? (
                    <>
                      <Card className="p-4 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold">AI Summary</p>
                          <SeverityBadge severity={data.aiJson.severity} />
                        </div>
                        <p className="text-sm text-muted-foreground">{data.aiJson.summary}</p>
                      </Card>

                      {data.aiJson.issues.length > 0 && (
                        <Card className="p-4 space-y-3">
                          <p className="text-sm font-semibold">Top Issues ({data.aiJson.issues.length})</p>
                          <ul className="space-y-2">
                            {data.aiJson.issues.slice(0, 3).map((issue, i) => (
                              <li key={i} className="border-l-2 border-orange-400 pl-3 space-y-0.5">
                                <p className="text-sm font-medium">{issue.title}</p>
                                <p className="text-xs text-muted-foreground">{issue.evidence}</p>
                              </li>
                            ))}
                          </ul>
                          {data.aiJson.issues.length > 3 && (
                            <p className="text-xs text-muted-foreground">
                              +{data.aiJson.issues.length - 3} more — see AI Analysis tab
                            </p>
                          )}
                        </Card>
                      )}

                      {data.aiJson.quickWins.length > 0 && (
                        <Card className="p-4 space-y-2">
                          <p className="text-sm font-semibold">Quick Wins</p>
                          <ul className="space-y-1">
                            {data.aiJson.quickWins.map((win, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <span className="text-green-600 mt-0.5 shrink-0">✓</span>
                                <span className="text-muted-foreground">{win}</span>
                              </li>
                            ))}
                          </ul>
                        </Card>
                      )}
                    </>
                  ) : (
                    <Card className="p-4">
                      <p className="text-sm text-muted-foreground">
                        {data.aiStatus === 'failed'
                          ? 'AI analysis failed for this run.'
                          : 'No AI analysis available for this run.'}
                      </p>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ── AI Analysis Tab ── */}
          <TabsContent value="ai">
            {data.aiJson ? (
              <div className="space-y-6">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-xl font-semibold">AI Quality Analysis</h2>
                  <SeverityBadge severity={data.aiJson.severity} />
                </div>

                <p className="text-muted-foreground">{data.aiJson.summary}</p>

                {data.aiJson.verdict && (
                  <Alert>
                    <AlertDescription>
                      <span className="font-semibold">Verdict: </span>
                      {data.aiJson.verdict}
                    </AlertDescription>
                  </Alert>
                )}

                {data.aiJson.issues.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold">Issues Detected ({data.aiJson.issues.length})</h3>
                    <div className="space-y-3">
                      {data.aiJson.issues.map((issue, i) => (
                        <Card
                          key={i}
                          className="p-4 border-l-4"
                          style={{
                            borderLeftColor:
                              issue.severity === 'critical'
                                ? '#ef4444'
                                : issue.severity === 'major'
                                ? '#f97316'
                                : '#eab308',
                          }}
                        >
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <Badge variant="outline" className="text-xs">
                              {issue.type}
                            </Badge>
                            <Badge
                              variant={
                                issue.severity === 'critical' || issue.severity === 'major'
                                  ? 'destructive'
                                  : 'secondary'
                              }
                              className="text-xs"
                            >
                              {issue.severity}
                            </Badge>
                            <p className="font-medium text-sm">{issue.title}</p>
                          </div>
                          {issue.location && (
                            <p className="text-xs text-muted-foreground mb-2">
                              Location: {issue.location}
                            </p>
                          )}
                          {issue.evidence && (
                            <p className="text-xs text-muted-foreground italic mb-2">
                              &quot;{issue.evidence}&quot;
                            </p>
                          )}
                          {issue.recommendation && (
                            <p className="text-xs bg-blue-50 dark:bg-blue-950 p-2 rounded">
                              Fix: {issue.recommendation}
                            </p>
                          )}
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {data.aiJson.quickWins.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-semibold">Quick Wins</h3>
                    <ul className="space-y-1.5">
                      {data.aiJson.quickWins.map((win, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-green-600 mt-0.5 shrink-0">✓</span>
                          <span>{win}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">
                  {data.aiStatus === 'failed'
                    ? 'AI analysis failed for this run.'
                    : 'No AI analysis available for this run.'}
                </p>
              </Card>
            )}
          </TabsContent>

          {/* ── CSS Changes Tab ── */}
          <TabsContent value="css">
            {data.cssDiffJson && data.cssDiffJson.length > 0 ? (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">
                  CSS Changes{' '}
                  <span className="text-base font-normal text-muted-foreground">
                    ({data.cssDiffJson.length} element{data.cssDiffJson.length !== 1 ? 's' : ''} changed)
                  </span>
                </h2>
                <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
                  {data.cssDiffJson.map((diff, i) => (
                    <Card key={i} className="p-4 space-y-2">
                      <div className="flex items-start gap-3">
                        <code className="text-sm font-mono font-medium break-all">{diff.selector}</code>
                        {diff.text && (
                          <span className="text-xs text-muted-foreground shrink-0 mt-0.5">
                            &quot;{diff.text.slice(0, 50)}{diff.text.length > 50 ? '…' : ''}&quot;
                          </span>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        {diff.changes.map((change, j) => (
                          <div key={j} className="flex items-center gap-2 text-sm flex-wrap">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[11px] font-medium shrink-0 ${
                                categoryColors[change.category] || categoryColors.other
                              }`}
                            >
                              {change.category}
                            </span>
                            <span className="font-mono text-muted-foreground shrink-0">
                              {change.property}:
                            </span>
                            <span className="line-through text-red-500 shrink-0">{change.baseline}</span>
                            <span className="text-muted-foreground shrink-0">→</span>
                            <span className="text-green-600 dark:text-green-400 font-medium shrink-0">
                              {change.current}
                            </span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No CSS changes detected for this run.</p>
              </Card>
            )}
          </TabsContent>

          {/* ── Images Tab ── */}
          <TabsContent value="images">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(
                [
                  { label: 'Baseline', url: data.baselineImageUrl },
                  { label: 'Current', url: data.currentImageUrl },
                  { label: 'Diff', url: data.diffImageUrl },
                ] as { label: string; url: string | null }[]
              ).map(({ label, url }) => (
                <Card key={label} className="overflow-hidden">
                  <div className="px-4 py-2 border-b flex items-center justify-between">
                    <p className="text-sm font-semibold">{label}</p>
                    {url && (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Open full size
                      </a>
                    )}
                  </div>
                  {url ? (
                    <img src={url} alt={label} className="w-full h-auto object-contain" />
                  ) : (
                    <div className="p-8 text-sm text-muted-foreground text-center">
                      No {label.toLowerCase()} image
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
