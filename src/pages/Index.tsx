import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getApiBaseUrl, validateApiConfig } from '@/lib/apiBase';
import { getAuthHeaders } from '@/lib/auth';
import { supabase } from '@/lib/supabaseClient';
import NavBar from '@/components/NavBar';

type DevicePreset = 'desktop' | 'tablet' | 'mobile' | 'custom';

export default function Index() {
  // Step 1: Create Baseline
  const [baselineName, setBaselineName] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [devicePreset, setDevicePreset] = useState<DevicePreset>('desktop');
  const [viewportWidth, setViewportWidth] = useState('1440');
  const [viewportHeight, setViewportHeight] = useState('900');

  // Step 1 result state
  const [baselineId, setBaselineId] = useState<string>('');
  const [baselinePreviewUrl, setBaselinePreviewUrl] = useState<string>('');
  const [baselineApproved, setBaselineApproved] = useState(false);

  // Step 2: Create Monitor
  const [targetUrl, setTargetUrl] = useState(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('aidqa_target_url') || '';
  });
  const [cadence, setCadence] = useState<'hourly' | 'daily'>('daily');
  const [monitorId, setMonitorId] = useState<string>('');
  const [polling, setPolling] = useState(false);
  const [pollError, setPollError] = useState<string | null>(null);

  // UI state
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const [monitorLoading, setMonitorLoading] = useState(false);

  const apiBase = getApiBaseUrl();
  const navigate = useNavigate();
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const monitorCreatingRef = useRef(false);

  useEffect(() => {
    localStorage.setItem('aidqa_target_url', targetUrl);
  }, [targetUrl]);

  useEffect(() => {
    return () => {
      if (pollIntervalRef.current !== null) clearInterval(pollIntervalRef.current);
    };
  }, []);

  const handleDeviceChange = (value: DevicePreset) => {
    setDevicePreset(value);
    switch (value) {
      case 'desktop':
        setViewportWidth('1440');
        setViewportHeight('900');
        break;
      case 'tablet':
        setViewportWidth('768');
        setViewportHeight('1024');
        break;
      case 'mobile':
        setViewportWidth('390');
        setViewportHeight('844');
        break;
      case 'custom':
        break;
    }
  };

  const parseViewport = () => {
    const width = Number(viewportWidth);
    const height = Number(viewportHeight);
    if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
      throw new Error('Viewport must be positive numbers');
    }
    return { width: Math.floor(width), height: Math.floor(height) };
  };

  const stopPolling = () => {
    if (pollIntervalRef.current !== null) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  };

  /**
   * Poll visual_runs for the given monitor until the first run is complete,
   * then navigate to the canonical run report page.
   */
  const waitForRunAndNavigate = (createdMonitorId: string) => {
    stopPolling();
    setPolling(true);
    setPollError(null);

    const startTime = Date.now();

    const tick = async () => {
      try {
        const { data: latestRun, error: runError } = await supabase
          .from('visual_runs')
          .select('id, status, mismatch_percentage, ai_status')
          .eq('monitor_id', createdMonitorId)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (runError) {
          stopPolling();
          setPollError(runError.message || 'Failed to check run status');
          setPolling(false);
          return;
        }

        const timedOut = Date.now() - startTime > 30_000;
        const aiSettled =
          latestRun?.ai_status === 'completed' || latestRun?.ai_status === 'failed';

        if (
          !latestRun ||
          latestRun.status !== 'completed' ||
          latestRun.mismatch_percentage === null ||
          !aiSettled
        ) {
          if (timedOut) {
            stopPolling();
            // Navigate anyway — the run may be visible even if AI didn't finish
            if (latestRun?.id) {
              navigate(`/runs/${latestRun.id}`);
            } else {
              setPollError('Run timed out. Check the Dashboard for results.');
              setPolling(false);
            }
          }
          return; // keep polling
        }

        stopPolling();
        navigate(`/runs/${latestRun.id}`);
      } catch (e) {
        stopPolling();
        setPollError(e instanceof Error ? e.message : 'Failed to check run status');
        setPolling(false);
      }
    };

    tick();
    pollIntervalRef.current = setInterval(tick, 1500);
  };

  const handleCaptureBaseline = async () => {
    setError(null);
    setLoading(true);
    try {
      const configCheck = validateApiConfig();
      if (!configCheck.valid) throw new Error(configCheck.error);
      if (!baselineName.trim()) throw new Error('Baseline name is required');
      if (!sourceUrl.trim()) throw new Error('Source URL is required');

      const viewport = parseViewport();
      const body = {
        name: baselineName.trim(),
        sourceType: 'url',
        sourceUrl: sourceUrl.trim(),
        viewport,
      };

      const res = await fetch(`${apiBase}/baselines`, {
        method: 'POST',
        headers: await getAuthHeaders(),
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }

      const json = await res.json();
      const id = json.baselineId ?? json.baseline?.id;
      const previewUrl = json.previewUrl ?? null;
      if (!id) throw new Error('Invalid response: missing baselineId');

      setBaselineId(id);
      if (previewUrl) setBaselinePreviewUrl(previewUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to capture baseline');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveBaseline = async () => {
    setError(null);
    setApproveLoading(true);
    try {
      const res = await fetch(`${apiBase}/baselines/${baselineId}/approve`, {
        method: 'POST',
        headers: await getAuthHeaders(),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }

      setBaselineApproved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to approve baseline');
    } finally {
      setApproveLoading(false);
    }
  };

  const handleStartMonitoring = async () => {
    if (monitorCreatingRef.current) return;
    monitorCreatingRef.current = true;
    setError(null);
    setPollError(null);
    setMonitorLoading(true);
    try {
      if (!targetUrl.trim()) throw new Error('Target URL is required');

      const body = { baselineId, targetUrl: targetUrl.trim(), cadence };

      const res = await fetch(`${apiBase}/monitors`, {
        method: 'POST',
        headers: await getAuthHeaders(),
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }

      const json = await res.json();
      const id = json.monitorId;
      if (!id) throw new Error('Invalid response: missing monitorId');

      setMonitorId(id);
      waitForRunAndNavigate(id);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to create monitor');
      monitorCreatingRef.current = false;
    } finally {
      setMonitorLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-[calc(100vh-56px)] bg-background flex items-center justify-center p-6">
        <div className="w-full max-w-3xl space-y-8">
          <header className="text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Create Monitor</h1>
            <p className="text-muted-foreground">
              Set up continuous visual regression monitoring for your web application.
            </p>
          </header>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Step 1: Create Baseline */}
          <Card className="p-8 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                  1
                </div>
                <h2 className="text-2xl font-semibold">Create Baseline</h2>
              </div>
              <p className="text-sm text-muted-foreground pl-10">
                Capture a screenshot from your staging environment to use as the reference baseline.
              </p>
            </div>

            <div className="space-y-5 pl-10">
              <div className="space-y-2">
                <Label htmlFor="baselineName" className="text-base font-medium">
                  Baseline Name
                </Label>
                <Input
                  id="baselineName"
                  value={baselineName}
                  onChange={(e) => setBaselineName(e.target.value)}
                  placeholder="e.g., Homepage Desktop, Checkout Flow"
                  className="h-11"
                  disabled={!!baselineId}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sourceUrl" className="text-base font-medium">
                  Source URL
                </Label>
                <Input
                  id="sourceUrl"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  placeholder="https://staging.example.com"
                  className="h-11"
                  disabled={!!baselineId}
                />
                <p className="text-xs text-muted-foreground">
                  URL of your staging/design environment
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="devicePreset" className="text-base font-medium">
                  Device Type
                </Label>
                <Select value={devicePreset} onValueChange={handleDeviceChange} disabled={!!baselineId}>
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desktop">Desktop (1440×900)</SelectItem>
                    <SelectItem value="tablet">Tablet (768×1024)</SelectItem>
                    <SelectItem value="mobile">Mobile (390×844)</SelectItem>
                    <SelectItem value="custom">Custom Size</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {devicePreset === 'custom' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="viewportWidth">Width (px)</Label>
                    <Input
                      id="viewportWidth"
                      value={viewportWidth}
                      onChange={(e) => setViewportWidth(e.target.value)}
                      placeholder="1440"
                      type="number"
                      disabled={!!baselineId}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="viewportHeight">Height (px)</Label>
                    <Input
                      id="viewportHeight"
                      value={viewportHeight}
                      onChange={(e) => setViewportHeight(e.target.value)}
                      placeholder="900"
                      type="number"
                      disabled={!!baselineId}
                    />
                  </div>
                </div>
              )}

              {!baselineId && (
                <Button
                  onClick={handleCaptureBaseline}
                  disabled={loading}
                  className="w-full h-12 text-base font-semibold"
                  size="lg"
                >
                  {loading ? 'Capturing baseline...' : 'Capture Baseline'}
                </Button>
              )}

              {baselineId && baselinePreviewUrl && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="space-y-2">
                    <Label className="text-base font-medium">Preview</Label>
                    <div className="border rounded-lg overflow-hidden">
                      <img src={baselinePreviewUrl} alt="Baseline preview" className="w-full h-auto" />
                    </div>
                  </div>

                  {!baselineApproved && (
                    <Button
                      onClick={handleApproveBaseline}
                      disabled={approveLoading}
                      className="w-full h-12 text-base font-semibold"
                      size="lg"
                    >
                      {approveLoading ? 'Approving...' : 'Approve Baseline'}
                    </Button>
                  )}

                  {baselineApproved && (
                    <div className="flex items-center gap-2">
                      <Badge variant="default" className="text-sm">
                        ✓ Baseline Approved
                      </Badge>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>

          {/* Step 2: Create Monitor (only shown after approval) */}
          {baselineApproved && (
            <Card className="p-8 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                    2
                  </div>
                  <h2 className="text-2xl font-semibold">Create Monitor</h2>
                </div>
                <p className="text-sm text-muted-foreground pl-10">
                  Set up continuous monitoring for your production URL against the approved baseline.
                </p>
              </div>

              <div className="space-y-5 pl-10">
                <div className="space-y-2">
                  <Label htmlFor="targetUrl" className="text-base font-medium">
                    Target URL (Production)
                  </Label>
                  <Input
                    id="targetUrl"
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="h-11"
                    disabled={!!monitorId}
                  />
                  <p className="text-xs text-muted-foreground">
                    Production URL to monitor for visual changes
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cadence" className="text-base font-medium">
                    Check Frequency
                  </Label>
                  <Select
                    value={cadence}
                    onValueChange={(v) => setCadence(v as 'hourly' | 'daily')}
                    disabled={!!monitorId}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {!monitorId && (
                  <Button
                    onClick={handleStartMonitoring}
                    disabled={monitorLoading}
                    className="w-full h-12 text-base font-semibold"
                    size="lg"
                  >
                    {monitorLoading ? 'Starting monitoring...' : 'Start Monitoring'}
                  </Button>
                )}

                {polling && (
                  <Card className="p-4 border text-center">
                    <p className="text-sm text-muted-foreground animate-pulse">
                      Running first comparison — please wait...
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      You'll be redirected to the results automatically.
                    </p>
                  </Card>
                )}

                {pollError && (
                  <Alert variant="destructive">
                    <AlertDescription>{pollError}</AlertDescription>
                  </Alert>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
