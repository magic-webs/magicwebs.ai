/**
 * Abstract artwork for each platform card.
 *
 * These are drawn, not photographed — we have no product photography for the
 * platforms, and inventing stock imagery would misrepresent them. Each one
 * depicts the thing the product actually does.
 */
export function PlatformArt({ slug }: { slug: string }) {
  const art: Record<string, React.ReactNode> = {
    /* Conversation: stacked WhatsApp-style bubbles resolving into a record. */
    "magic-agent": (
      <svg viewBox="0 0 340 300" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="ag-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c3d3ce" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#1c525d" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <rect width="340" height="300" fill="url(#ag-g)" opacity="0.18" />
        {[
          { x: 28, y: 40, w: 168, r: "18 18 18 4" },
          { x: 120, y: 104, w: 190, r: "18 18 4 18" },
          { x: 28, y: 168, w: 140, r: "18 18 18 4" },
        ].map((b, i) => (
          <g key={i}>
            <rect
              x={b.x}
              y={b.y}
              width={b.w}
              height="48"
              rx="16"
              fill={i === 1 ? "#c3d3ce" : "rgba(251,250,244,0.14)"}
              stroke="rgba(251,250,244,0.22)"
            />
            <rect
              x={b.x + 16}
              y={b.y + 17}
              width={b.w * 0.5}
              height="6"
              rx="3"
              fill={i === 1 ? "rgba(14,17,19,0.45)" : "rgba(251,250,244,0.5)"}
            />
            <rect
              x={b.x + 16}
              y={b.y + 29}
              width={b.w * 0.32}
              height="6"
              rx="3"
              fill={i === 1 ? "rgba(14,17,19,0.25)" : "rgba(251,250,244,0.28)"}
            />
          </g>
        ))}
        <rect
          x="28"
          y="232"
          width="282"
          height="44"
          rx="12"
          fill="rgba(251,250,244,0.08)"
          stroke="rgba(251,250,244,0.3)"
          strokeDasharray="5 5"
        />
      </svg>
    ),

    /* Reach: a creator node broadcasting into widening rings. */
    richyreach: (
      <svg viewBox="0 0 340 300" className="h-full w-full" aria-hidden="true">
        {[132, 104, 76, 48].map((r, i) => (
          <circle
            key={r}
            cx="170"
            cy="150"
            r={r}
            fill="none"
            stroke="rgba(14,17,19,0.28)"
            strokeWidth={1.5}
            strokeDasharray={i % 2 ? "6 8" : undefined}
          />
        ))}
        <circle cx="170" cy="150" r="26" fill="#0e1113" />
        <circle cx="170" cy="150" r="9" fill="#db704c" />
        {[
          [170, 18],
          [292, 104],
          [246, 254],
          [94, 254],
          [48, 104],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="15" fill="rgba(14,17,19,0.85)" />
            <circle cx={cx} cy={cy} r="5" fill="#f8dbca" />
          </g>
        ))}
      </svg>
    ),

    /* Odds: a weighted prize wheel. */
    "magic-reward": (
      <svg viewBox="0 0 340 300" className="h-full w-full" aria-hidden="true">
        <g transform="translate(170 154)">
          {Array.from({ length: 8 }).map((_, i) => {
            const a0 = (i * Math.PI) / 4;
            const a1 = ((i + 1) * Math.PI) / 4;
            const R = 118;
            return (
              <path
                key={i}
                d={`M0 0 L${R * Math.cos(a0)} ${R * Math.sin(a0)} A${R} ${R} 0 0 1 ${
                  R * Math.cos(a1)
                } ${R * Math.sin(a1)} Z`}
                fill={
                  i % 3 === 0
                    ? "rgba(14,17,19,0.82)"
                    : i % 3 === 1
                      ? "rgba(251,250,244,0.5)"
                      : "rgba(14,17,19,0.22)"
                }
                stroke="rgba(14,17,19,0.3)"
              />
            );
          })}
          <circle r="26" fill="#fbfaf4" stroke="rgba(14,17,19,0.3)" />
          <circle r="7" fill="#0e1113" />
        </g>
        <path d="M170 18 l14 26 h-28 Z" fill="#0e1113" />
      </svg>
    ),

    /* Steps: a multi-step form with a progress rail. */
    "magic-forms": (
      <svg viewBox="0 0 340 300" className="h-full w-full" aria-hidden="true">
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(0 ${i * 40})`}>
              <circle
                cx="42"
                cy="56"
                r="11"
                fill={i === 0 ? "#0e1113" : "none"}
                stroke="rgba(14,17,19,0.45)"
                strokeWidth="1.5"
              />
              {i < 2 && (
                <line
                  x1="42"
                  y1="67"
                  x2="42"
                  y2="85"
                  stroke="rgba(14,17,19,0.28)"
                  strokeWidth="1.5"
                />
              )}
            </g>
          ))}
        </g>
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x="76"
            y={38 + i * 40}
            width={i === 3 ? 140 : 226}
            height="34"
            rx="9"
            fill="rgba(251,250,244,0.72)"
            stroke="rgba(14,17,19,0.22)"
          />
        ))}
        <rect
          x="76"
          y="200"
          width="120"
          height="36"
          rx="18"
          fill="#0e1113"
        />
        <rect x="96" y="214" width="80" height="8" rx="4" fill="#fbfaf4" />
        <rect
          x="76"
          y="256"
          width="226"
          height="6"
          rx="3"
          fill="rgba(14,17,19,0.14)"
        />
        <rect x="76" y="256" width="142" height="6" rx="3" fill="#0e1113" />
      </svg>
    ),

    /* One source, three platforms. */
    "magic-native-ui": (
      <svg viewBox="0 0 340 300" className="h-full w-full" aria-hidden="true">
        <rect
          x="26"
          y="52"
          width="86"
          height="182"
          rx="16"
          fill="rgba(251,250,244,0.7)"
          stroke="rgba(14,17,19,0.3)"
        />
        <rect
          x="126"
          y="36"
          width="86"
          height="214"
          rx="16"
          fill="rgba(14,17,19,0.85)"
        />
        <rect
          x="226"
          y="52"
          width="88"
          height="182"
          rx="12"
          fill="rgba(251,250,244,0.7)"
          stroke="rgba(14,17,19,0.3)"
        />
        {[0, 1, 2].map((c) =>
          [0, 1, 2, 3].map((r) => (
            <rect
              key={`${c}-${r}`}
              x={[42, 142, 242][c]}
              y={[80, 68, 80][c] + r * 30}
              width={[54, 54, 56][c]}
              height="18"
              rx="6"
              fill={c === 1 ? "rgba(251,250,244,0.28)" : "rgba(14,17,19,0.16)"}
            />
          )),
        )}
        <rect x="142" y="196" width="54" height="20" rx="10" fill="#c3d3ce" />
      </svg>
    ),
  };

  return (
    <div className="absolute inset-x-0 bottom-0 h-[52%] overflow-hidden">
      {art[slug] ?? null}
    </div>
  );
}
