export type BboxEvidence = {
  type: 'bbox'
  x: number
  y: number
  width: number
  height: number
  label?: string
}

export type MultiBboxEvidence = {
  type: 'multi_bbox'
  boxes: Array<{ x: number; y: number; width: number; height: number; label?: string }>
  description?: string
}

export type RegionEvidence = {
  type: 'region'
  description: string
}

export type MetricEvidence = {
  type: 'metric'
  measured: string
  threshold: string
  element?: string
}

export type ExplanationEvidence = {
  type: 'explanation'
}

export type Evidence = BboxEvidence | MultiBboxEvidence | RegionEvidence | MetricEvidence | ExplanationEvidence

export type Category = 'layout' | 'hierarchy' | 'consistency' | 'accessibility' | 'design_system' | 'ux_readiness'
export type Severity = 'critical' | 'high' | 'medium' | 'low'
export type EvidenceType = 'bbox' | 'multi_bbox' | 'region' | 'metric' | 'explanation'
export type Source = 'deterministic' | 'ai'

export interface Finding {
  category: Category
  severity: Severity
  title: string
  evidence_type: EvidenceType
  evidence: Evidence
  why_it_matters: string
  repair_guidance: string
  ai_fix_instruction: string
  metric_value?: string
  score_impact?: number
  source: Source
}

export interface CategoryScores {
  layout: number
  hierarchy: number
  consistency: number
  accessibility: number
  design_system: number
  ux_readiness: number
}

export interface DomElement {
  tag: string
  id: string | null
  classes: string[]
  role: string | null
  ariaLabel: string | null
  boundingBox: { x: number; y: number; width: number; height: number }
  computedStyles: Record<string, string>
  textContent: string
  isInteractive: boolean
  tagDepth: number
}

export interface ScanInput {
  type: 'url' | 'screenshot'
  url?: string
  fileBuffer?: Uint8Array
  filename?: string
}

export interface AxeViolationNode {
  html: string
  target: string[]
  failureSummary: string
  boundingBox: { x: number; y: number; width: number; height: number } | null
}

export interface AxeViolation {
  id: string
  impact: 'critical' | 'serious' | 'moderate' | 'minor'
  description: string
  help: string
  helpUrl: string
  tags: string[]
  nodes: AxeViolationNode[]
}

export interface EnhancedCapture {
  dom1440: DomElement[]
  axeViolations: AxeViolation[]
  dom375: DomElement[]
  screenshotBase64?: string  // base64-encoded PNG from the 1440px viewport
}

export interface DesignSystemConfig {
  colors: string[]   // hex values e.g. ['#172B4D', '#2563EB']
  spacing: number[]  // px values e.g. [4, 8, 16, 24, 32]
}
