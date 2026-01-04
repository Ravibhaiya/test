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

/**
 * A cryptographically secure replacement for Math.random().
 * Returns a floating-point number between 0 (inclusive) and 1 (exclusive).
 *
 * Security: Uses crypto.getRandomValues() to ensure better randomness
 * and prevent predictability in question generation, although primarily
 * a defense-in-depth measure for this specific application.
 */
export function secureMathRandom(): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  // Divide by 2^32 to get a value between 0 and 1
  return array[0] / (0xffffffff + 1);
}
