import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { getApiBaseUrl, validateApiConfig, getApiHeaders } from '@/lib/apiBase';

type DevicePreset = 'desktop' | 'tablet' | 'mobile' | 'custom';

export default function Index() {
  // Visual regression (MVP) UI state
  const [visualName, setVisualName] = useState('');
  const [visualUrl, setVisualUrl] = useState('');
  const [visualFigmaFileKey, setVisualFigmaFileKey] = useState('');
  const [visualFigmaNodeIds, setVisualFigmaNodeIds] = useState('');
  const [visualUseFigma, setVisualUseFigma] = useState(false);
  const [devicePreset, setDevicePreset] = useState<DevicePreset>('desktop');
  const [visualViewportWidth, setVisualViewportWidth] = useState('1440');
  const [visualViewportHeight, setVisualViewportHeight] = useState('900');
  const [visualDiffThreshold, setVisualDiffThreshold] = useState('0.2');
  const [visualIgnoreRegions, setVisualIgnoreRegions] = useState('[]');
  const [visualBaselineId, setVisualBaselineId] = useState<string>('');
  const [visualStatus, setVisualStatus] = useState<'PASS' | 'FAIL' | 'ERROR' | ''>('');
  const [visualMismatch, setVisualMismatch] = useState<number | null>(null);
  const [visualError, setVisualError] = useState<string | null>(null);
  const [visualLoading, setVisualLoading] = useState(false);
  const apiBase = getApiBaseUrl();

  const handleDeviceChange = (value: DevicePreset) => {
    setDevicePreset(value);
    switch (value) {
      case 'desktop':
        setVisualViewportWidth('1440');
        setVisualViewportHeight('900');
        break;
      case 'tablet':
        setVisualViewportWidth('768');
        setVisualViewportHeight('1024');
        break;
      case 'mobile':
        setVisualViewportWidth('390');
        setVisualViewportHeight('844');
        break;
      case 'custom':
        // Keep current values
        break;
    }
  };

  const parseViewport = () => {
    const width = Number(visualViewportWidth);
    const height = Number(visualViewportHeight);
    if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
      throw new Error('Viewport must be positive numbers');
    }
    return { width: Math.floor(width), height: Math.floor(height) };
  };

  const handleCreateBaseline = async () => {
    setVisualError(null);
    setVisualStatus('');
    setVisualMismatch(null);
    setVisualLoading(true);
    try {
      const configCheck = validateApiConfig();
      if (!configCheck.valid) {
        throw new Error(configCheck.error);
      }
      const viewport = parseViewport();

      const body: any = {
        projectId: 'demo', // Hardcoded for monitoring-first product
        name: visualName.trim(),
        viewport,
      };

      // Parse and add diff threshold
      const threshold = parseFloat(visualDiffThreshold);
      if (Number.isFinite(threshold) && threshold >= 0) {
        body.diffThresholdPct = threshold;
      }

      // Parse and add ignore regions
      try {
        const regions = JSON.parse(visualIgnoreRegions);
        if (Array.isArray(regions)) {
          body.ignoreRegions = regions;
        }
      } catch (e) {
        // Invalid JSON, skip ignore regions
        console.warn('Invalid ignore regions JSON, skipping:', e);
      }

      if (visualUseFigma) {
        if (!visualFigmaFileKey || !visualFigmaNodeIds) {
          throw new Error('Figma file key and node IDs are required when using Figma');
        }
        body.figmaSource = {
          figmaFileKey: visualFigmaFileKey.trim(),
          figmaNodeIds: visualFigmaNodeIds.split(',').map((id: string) => id.trim()),
        };
      } else {
        if (!visualUrl) {
          throw new Error('URL is required when not using Figma');
        }
        body.url = visualUrl.trim();
      }

      console.log('CREATE_BASELINE body =>', body);

      const res = await fetch(`${apiBase}/baselines`, {
        method: 'POST',
        headers: getApiHeaders(),
        body: JSON.stringify(body),
      });
      const text = await res.text();
      if (!res.ok) throw new Error(text || `HTTP ${res.status}`);
      const json = JSON.parse(text);
      
      const baselineId = json.baselineId ?? json.id;
      if (!baselineId) throw new Error(`Unexpected response: ${text}`);
      setVisualBaselineId(baselineId);
      setVisualStatus('PASS');
    } catch (e) {
      setVisualError(e instanceof Error ? e.message : 'Failed to create baseline');
      setVisualStatus('ERROR');
    } finally {
      setVisualLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-8">
        <header className="text-center space-y-3">
          <h1 className="text-5xl font-bold tracking-tight">AIDQA</h1>
          <p className="text-lg text-muted-foreground">
            Continuous visual monitoring for your web applications
          </p>
        </header>

        <Card className="p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Start Monitoring</h2>
            <p className="text-sm text-muted-foreground">
              Capture a baseline screenshot and we'll automatically monitor it for visual changes. 
              You'll be notified immediately when differences are detected.
            </p>
          </div>

          {visualError && (
            <Alert variant="destructive">
              <AlertDescription>{visualError}</AlertDescription>
            </Alert>
          )}

          <div className="flex items-center gap-4 pb-2">
            <Label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                checked={!visualUseFigma} 
                onChange={() => setVisualUseFigma(false)}
                className="cursor-pointer"
              />
              <span className="font-medium">URL</span>
            </Label>
            <Label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                checked={visualUseFigma} 
                onChange={() => setVisualUseFigma(true)}
                className="cursor-pointer"
              />
              <span className="font-medium">Figma</span>
            </Label>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="visualName" className="text-base font-medium">Monitor Name</Label>
              <Input 
                id="visualName" 
                value={visualName} 
                onChange={(e) => setVisualName(e.target.value)}
                placeholder="e.g., Homepage, Checkout Flow, Dashboard"
                className="h-11"
              />
            </div>

            {!visualUseFigma ? (
              <div className="space-y-2">
                <Label htmlFor="visualUrl" className="text-base font-medium">URL to Monitor</Label>
                <Input 
                  id="visualUrl" 
                  value={visualUrl} 
                  onChange={(e) => setVisualUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="h-11"
                />
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="visualFigmaFileKey" className="text-base font-medium">Figma File Key</Label>
                  <Input 
                    id="visualFigmaFileKey" 
                    value={visualFigmaFileKey} 
                    onChange={(e) => setVisualFigmaFileKey(e.target.value)}
                    placeholder="abc123def456"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="visualFigmaNodeIds" className="text-base font-medium">Node IDs (comma-separated)</Label>
                  <Input 
                    id="visualFigmaNodeIds" 
                    value={visualFigmaNodeIds} 
                    onChange={(e) => setVisualFigmaNodeIds(e.target.value)}
                    placeholder="1:23, 2:45"
                    className="h-11"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="devicePreset" className="text-base font-medium">Device Type</Label>
              <Select value={devicePreset} onValueChange={handleDeviceChange}>
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
                  <Label htmlFor="visualViewportWidth">Width (px)</Label>
                  <Input 
                    id="visualViewportWidth" 
                    value={visualViewportWidth} 
                    onChange={(e) => setVisualViewportWidth(e.target.value)}
                    placeholder="1440"
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="visualViewportHeight">Height (px)</Label>
                  <Input 
                    id="visualViewportHeight" 
                    value={visualViewportHeight} 
                    onChange={(e) => setVisualViewportHeight(e.target.value)}
                    placeholder="900"
                    type="number"
                  />
                </div>
              </div>
            )}
          </div>

          <details className="space-y-4">
            <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
              Advanced Options
            </summary>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="visualDiffThreshold">Difference Threshold (%)</Label>
                <Input 
                  id="visualDiffThreshold" 
                  value={visualDiffThreshold} 
                  onChange={(e) => setVisualDiffThreshold(e.target.value)}
                  placeholder="0.2"
                  type="number"
                  step="0.1"
                />
                <p className="text-xs text-muted-foreground">
                  Maximum allowed difference before flagging as changed (0.2% recommended)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="visualIgnoreRegions">Ignore Regions (JSON)</Label>
                <Input 
                  id="visualIgnoreRegions" 
                  value={visualIgnoreRegions} 
                  onChange={(e) => setVisualIgnoreRegions(e.target.value)}
                  placeholder='[{"x": 0, "y": 0, "width": 100, "height": 50}]'
                  className="font-mono text-xs"
                />
                <p className="text-xs text-muted-foreground">
                  Optional: Regions to mask before comparison (e.g., timestamps, ads)
                </p>
              </div>
            </div>
          </details>

          <div className="pt-2">
            <Button 
              onClick={handleCreateBaseline} 
              disabled={visualLoading}
              className="w-full h-12 text-base font-semibold"
              size="lg"
            >
              {visualLoading ? 'Setting up monitoring...' : 'Start Monitoring'}
            </Button>
          </div>

          {visualStatus && visualBaselineId && (
            <div className="space-y-3 pt-2 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={visualStatus === 'PASS' ? 'default' : 'destructive'} className="text-sm">
                    {visualStatus === 'PASS' ? '✓ Baseline Created' : 'Failed'}
                  </Badge>
                  {visualMismatch !== null && (
                    <span className="text-xs text-muted-foreground">
                      {visualMismatch} pixels difference
                    </span>
                  )}
                </div>
              </div>
              <Link 
                className="inline-flex items-center gap-1 text-sm font-medium underline hover:no-underline" 
                to={`/visual/baselines/${visualBaselineId}/runs/latest`}
              >
                View monitoring dashboard →
              </Link>
            </div>
          )}
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Powered by AI-assisted visual regression testing
        </p>
      </div>
    </div>
  );
}
