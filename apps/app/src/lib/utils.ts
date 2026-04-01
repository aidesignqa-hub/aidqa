import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Derive a severity level from a pixel-mismatch percentage.
 * This is a pure frontend calculation — severity is not stored in the DB.
 *
 * Rules:
 *   null  → 'low'
 *   < 2   → 'low'
 *   2–5   → 'medium'
 *   > 5   → 'high'
 */
export function getSeverity(mismatch: number | null): 'low' | 'medium' | 'high' {
  if (mismatch === null || mismatch < 2) return 'low';
  if (mismatch <= 5) return 'medium';
  return 'high';
}
