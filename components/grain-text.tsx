import { cx } from "@/components/ui";

/**
 * Sprayed-stencil display text.
 *
 * The glyphs themselves are transparent; two pseudo-layers redraw the same
 * string through turbulence filters that erode the edges into stipple, and a
 * third canvas-coloured layer punches speckles back out of the middle. The
 * real text stays in the DOM for selection, search and screen readers.
 */
export function GrainText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <span
      data-text={children}
      className={cx(
        "grain relative block text-transparent not-italic",
        className,
      )}
    >
      {children}
      <span className="grain-paper" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}

/** Filter definitions. Render once, near the top of the tree. */
export function GrainDefs() {
  const common = {
    x: "-45%",
    y: "-110%",
    width: "190%",
    height: "320%",
    colorInterpolationFilters: "sRGB" as const,
  };

  const layers = [
    { id: "mw-grain-back", blur: 17.6, seed: 11, k2: 0.62, slope: 7 },
    { id: "mw-grain-front", blur: 5.4, seed: 23, k2: 1.05, slope: 15 },
    { id: "mw-grain-paper", blur: 4.0, seed: 37, k2: 0.5, slope: 13 },
  ];

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute h-0 w-0 overflow-hidden"
    >
      <defs>
        {layers.map((l) => (
          <filter key={l.id} id={l.id} {...common}>
            <feGaussianBlur
              in="SourceAlpha"
              stdDeviation={l.blur}
              result="blur"
            />
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="6"
              seed={l.seed}
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.2 0 0 0 -0.25"
              result="noiseA"
            />
            <feComposite
              in="blur"
              in2="noiseA"
              operator="arithmetic"
              k2={l.k2}
              k3="-1"
              result="diff"
            />
            <feComponentTransfer in="diff" result="stipple">
              <feFuncA type="linear" slope={l.slope} intercept="0" />
            </feComponentTransfer>
            <feFlood floodColor="currentColor" result="ink" />
            <feComposite in="ink" in2="stipple" operator="in" />
          </filter>
        ))}
      </defs>
    </svg>
  );
}
