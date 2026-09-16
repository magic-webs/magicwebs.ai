import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("mx-auto w-full max-w-site", className)}>{children}</div>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cx(
        "flex scroll-mt-24 flex-col gap-8 pt-[clamp(4rem,10vh,7.5rem)]",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cx(
        "m-0 font-mono text-xs font-medium tracking-wider text-muted uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionTitle({
  children,
  className,
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cx(
        "text-balance-tight m-0 font-display text-[clamp(2rem,4.6vw,2.5rem)] leading-tight font-semibold tracking-tighter",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Display({
  children,
  className,
  as: Tag = "h1",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "p";
}) {
  return (
    <Tag
      className={cx(
        "text-balance-tight m-0 font-display text-[clamp(2.75rem,8.6vw,7.5rem)] leading-display font-semibold tracking-display",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/**
 * Line break that only applies from `sm` up. Below that the heading wraps
 * naturally, so long forced lines cannot overflow a narrow screen.
 */
export function SoftBreak() {
  return <br className="hidden sm:inline" />;
}

export function Lede({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cx(
        "m-0 max-w-[900px] font-mono text-base leading-relaxed",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function BodyText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cx(
        "m-0 font-display text-lg leading-relaxed text-secondary",
        className,
      )}
    >
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Button                                                              */
/* ------------------------------------------------------------------ */

const btnBase =
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-pill border font-mono font-medium tracking-wide transition-[background-color,border-color,color,transform] duration-200 ease-standard active:translate-y-px";

const btnVariant = {
  solid:
    "border-ink bg-ink text-cream hover:border-accent-hover hover:bg-accent-hover",
  outline:
    "border-ink/35 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-cream",
  ghost:
    "border-transparent bg-transparent text-ink hover:bg-ink/5",
  invert:
    "border-cream bg-cream text-ink hover:border-teal hover:bg-teal",
  outlineInvert:
    "border-cream/40 bg-transparent text-cream hover:border-cream hover:bg-cream hover:text-ink",
};

const btnSize = {
  sm: "px-3.5 py-2 text-xs",
  md: "px-5.5 py-3.5 text-sm",
  lg: "px-7 py-4 text-base",
};

type ButtonProps = {
  variant?: keyof typeof btnVariant;
  size?: keyof typeof btnSize;
  className?: string;
  children: ReactNode;
};

export function Button({
  href,
  variant = "solid",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps & { href: string } & Omit<
    ComponentProps<typeof Link>,
    "href" | "className" | "children"
  >) {
  const classes = cx(btnBase, btnVariant[variant], btnSize[size], className);
  const external = href.startsWith("http");

  if (external) {
    return (
      <a
        className={classes}
        href={href}
        target="_blank"
        rel="noreferrer noopener"
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} href={href} {...rest}>
      {children}
    </Link>
  );
}

export function ButtonRow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("flex flex-wrap items-center gap-3", className)}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Chips, cards, stats                                                 */
/* ------------------------------------------------------------------ */

export function Chip({
  children,
  outline = false,
}: {
  children: ReactNode;
  outline?: boolean;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 font-mono text-xs leading-tight tracking-wide whitespace-nowrap",
        outline
          ? "border border-line-strong text-secondary"
          : "bg-ink/5 text-secondary",
      )}
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  className,
  href,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
}) {
  const classes = cx(
    "flex flex-col gap-3 rounded-2xl border border-line bg-paper p-8 transition-[border-color,box-shadow,transform] duration-200 ease-out",
    href && "hover:-translate-y-[3px] hover:border-line-strong hover:shadow-md",
    className,
  );

  if (!href) return <div className={classes}>{children}</div>;

  const external = href.startsWith("http");
  return external ? (
    <a className={classes} href={href} target="_blank" rel="noreferrer noopener">
      {children}
    </a>
  ) : (
    <Link className={classes} href={href}>
      {children}
    </Link>
  );
}

export function CardTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cx(
        "m-0 font-display text-xl leading-snug font-semibold tracking-tighter",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function CardText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cx(
        "m-0 font-display text-base leading-relaxed text-secondary",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function StatRow({
  items,
  className,
  invert = false,
}: {
  items: readonly { value: string; label: string }[];
  className?: string;
  invert?: boolean;
}) {
  return (
    <dl
      className={cx(
        "m-0 grid grid-cols-2 gap-6 border-y py-10 md:grid-cols-4",
        invert ? "border-cream/20" : "border-line",
        className,
      )}
    >
      {items.map((s) => (
        <div key={s.label} className="flex flex-col gap-2">
          <dt className="sr-only">{s.label}</dt>
          <dd className="m-0 flex flex-col gap-2">
            <span className="font-display text-[clamp(2rem,4vw,2.5rem)] leading-none font-semibold tracking-tighter">
              {s.value}
            </span>
            <span
              className={cx(
                "font-mono text-xs leading-normal tracking-wide",
                invert ? "text-cream/60" : "text-muted",
              )}
            >
              {s.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------------ */
/* Banded (full-bleed) section                                         */
/* ------------------------------------------------------------------ */

export function Band({
  children,
  tone = "forest",
  className,
}: {
  children: ReactNode;
  tone?: "forest" | "sunken" | "terracotta";
  className?: string;
}) {
  const tones = {
    forest: "bg-forest text-cream",
    sunken: "bg-sunken text-ink",
    terracotta: "bg-terracotta text-ink",
  };

  return (
    <div
      className={cx(
        "full-bleed mt-[clamp(4rem,10vh,7.5rem)] px-(--gutter) py-[clamp(4rem,9vw,7rem)]",
        tones[tone],
        className,
      )}
    >
      <Container className="flex flex-col gap-8">{children}</Container>
    </div>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 14 14"
      aria-hidden="true"
      focusable="false"
      className={cx("size-3.5", className)}
    >
      <path
        d="M3 11L11 3M11 3H5M11 3v6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
