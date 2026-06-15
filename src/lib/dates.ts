/**
 * Shared date parsing utilities for table sort helpers.
 *
 * Both `lib/orders.ts` and `lib/machines.ts` import from here so the
 * "DD Mon HH:mm" parser lives in exactly one place.
 */

export const MONTH_MAP: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
}

/**
 * Parse a date string of the form "04 Jun 13:46" (case-insensitive month)
 * into a Unix timestamp (milliseconds). Returns 0 for unrecognised formats.
 */
export function parseDate(value: string): number {
  // Format: "04 jun 13:46"
  const parts = value.trim().split(' ')
  if (parts.length !== 3) return 0
  const [dayStr, monthStr, timeStr] = parts
  const day = parseInt(dayStr, 10)
  const month = MONTH_MAP[monthStr.toLowerCase()] ?? 0
  const [hours, minutes] = timeStr.split(':').map(Number)
  const now = new Date()
  return new Date(now.getFullYear(), month, day, hours, minutes).getTime()
}
