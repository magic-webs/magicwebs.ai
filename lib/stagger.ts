const STEP = {
  sm: ["sm:delay-0", "sm:delay-[80ms]", "sm:delay-[160ms]", "sm:delay-[240ms]"],
  md: ["md:delay-0", "md:delay-[80ms]", "md:delay-[160ms]", "md:delay-[240ms]"],
  lg: ["lg:delay-0", "lg:delay-[80ms]", "lg:delay-[160ms]", "lg:delay-[240ms]"],
} as const;

type Cols = Partial<Record<keyof typeof STEP, 1 | 2 | 3 | 4>>;

/**
 * Reveal delay for item `i` in a responsive grid: 80ms per column, applied only
 * at breakpoints where items share a row. Items that scroll in alone (single
 * column) get no delay, since stagger there is pure waiting.
 */
export function columnDelay(i: number, cols: Cols): string {
  return (Object.keys(cols) as (keyof typeof STEP)[])
    .map((bp) => STEP[bp][i % cols[bp]!])
    .join(" ");
}
