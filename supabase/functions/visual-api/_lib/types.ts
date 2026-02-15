// Shared TypeScript types for Visual Regression API

export interface Viewport {
  width: number;
  height: number;
}

export interface IgnoreRegion {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface BaselineSource {
  id: string;
  projectId: string;
  type: 'url' | 'storybook' | 'figma_frame';
  name: string;
  config: Record<string, any>; // For URL: {url: string}, Figma: {fileKey, nodeId}, etc.
  viewport: Viewport;
  createdAt: string;
}

export interface Baseline {
  id: string;
  projectId: string;
  name: string;
  url: string; // Deprecated: use source.config.url instead, kept for backward compat
  viewport: Viewport;
  createdAt: string;
  baselinePath: string;
  baselineUrl?: string; // signed URL for frontend
  diffThresholdPct?: number;
  ignoreRegions?: IgnoreRegion[];
  captureSettings?: Record<string, any>;
  sourceId?: string; // Reference to baseline_sources
  source?: BaselineSource; // Populated when joined
}

export interface Run {
  id: string;
  baselineId: string;
  projectId: string;
  createdAt: string;
  status: 'completed' | 'failed';
  mismatchPercentage: number;
  diffPixels: number;
  currentPath: string;
  diffPath: string | null;
  resultPath: string;
  aiJson?: AIInsights | null;
  aiStatus?: 'skipped' | 'pending' | 'completed' | 'failed';
  aiError?: string | null;
  // Signed URLs for frontend
  currentUrl?: string;
  diffUrl?: string | null;
  baselineUrl?: string;
}

export interface AIInsights {
  summary: string;
  severity: 'pass' | 'minor' | 'major' | 'critical';
  issues: AIIssue[];
  quickWins: string[];
  verdict?: string;
}

export interface AIIssue {
  title: string;
  location?: string;
  type: 'layout' | 'spacing' | 'typography' | 'color' | 'content' | 'other';
  severity: 'minor' | 'major' | 'critical';
  evidence: string;
  recommendation: string;
}

export interface DiffResult {
  diffPixels: number;
  mismatchPercentage: number;
  diffPngBytes: Uint8Array | null;
  isPassed?: boolean;
}

export interface CreateBaselineRequest {
  projectId: string;
  name: string;
  // Legacy URL mode (backward compat)
  url?: string;
  // New source mode
  source?: {
    type: 'url' | 'storybook' | 'figma_frame';
    config: Record<string, any>; // For URL: {url: string}
  };
  viewport?: Viewport;
  diffThresholdPct?: number;
  ignoreRegions?: IgnoreRegion[];
  captureSettings?: Record<string, any>;
}

export interface CreateRunRequest {
  url?: string; // Optional URL override
}

export interface Job {
  id: string;
  projectId: string;
  baselineId: string;
  cadence: string;
  nextRunAt: string;
  enabled: boolean;
  createdAt: string;
}

export interface CreateJobRequest {
  projectId: string;
  baselineId: string;
  cadence: string;
}

export interface APIError {
  error: string;
  code?: string;
}
