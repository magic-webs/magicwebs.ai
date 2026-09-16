/**
 * Pure helpers shared by the ingest mutations. Kept free of `ctx` so they can
 * be reasoned about on their own.
 *
 * Request classification (device, browser, traffic source, path normalising)
 * deliberately does NOT live here — it happens in `lib/visitor.ts` on the
 * Next.js server, which is the only place with the real request headers.
 */

/** Minutes offset for IST. The owner reads these numbers in Indian time. */
const TZ_OFFSET_MINUTES = 5 * 60 + 30;

/** `YYYY-MM-DD` in the site's reporting timezone. */
export function dayKey(atMs: number): string {
  return new Date(atMs + TZ_OFFSET_MINUTES * 60_000).toISOString().slice(0, 10);
}

/** The `n` most recent day keys ending at `atMs`, oldest first. */
export function recentDays(atMs: number, n: number): string[] {
  const days: string[] = [];
  for (let i = n - 1; i >= 0; i--) days.push(dayKey(atMs - i * 86_400_000));
  return days;
}

/** Guards against a caller stuffing a megabyte into a text field. */
export function clamp(
  value: string | undefined,
  max: number,
): string | undefined {
  if (value === undefined) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.length > max ? trimmed.slice(0, max) : trimmed;
}
