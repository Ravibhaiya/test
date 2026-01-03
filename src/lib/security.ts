/**
 * Security utility functions for input validation and sanitization.
 */

/**
 * Validates and sanitizes timer input to prevent negative or excessive values.
 * Returns undefined for 0 or empty input (meaning no timer).
 *
 * Security: Prevents negative values (DoS risk in TimerBar) and excessive values.
 * Clamps value between 0 and 3600 (1 hour).
 */
export function validateTimerInput(value: string): number | undefined {
  if (!value) return undefined;

  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) return undefined;

  // Security: Clamp value to prevent negative numbers and excessive values
  const clamped = Math.max(0, Math.min(parsed, 3600));

  return clamped === 0 ? undefined : clamped;
}
