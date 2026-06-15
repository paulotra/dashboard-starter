/**
 * Shared numeric parsing utilities.
 *
 * Extracted from `lib/orders.ts` so both orders and products can parse
 * currency strings without coupling the two data modules to each other.
 */

/**
 * Strip all non-numeric characters (except the decimal point) from a
 * currency string and return the numeric value.
 *
 * @example parseAmount('€49.50') // 49.5
 * @example parseAmount('$1,234.56') // 1234.56
 */
export function parseAmount(value: string): number {
  return parseFloat(value.replace(/[^0-9.]/g, '')) || 0
}
