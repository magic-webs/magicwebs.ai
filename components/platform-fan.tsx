"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { PlatformArt } from "@/components/platform-art";
import { Arrow, cx } from "@/components/ui";
import { gsap } from "@/lib/gsap";
import type { Platform } from "@/lib/site";

const themes: Record<string, { card: string; tag: string; sub: string }> = {
  teal: { card: "bg-teal text-ink", tag: "bg-ink/8", sub: "text-ink/65" },
  sage: { card: "bg-sage text-ink", tag: "bg-ink/8", sub: "text-ink/70" },
  forest: { card: "bg-forest text-cream", tag: "bg-cream/10", sub: "text-cream/60" },
  terracotta: {
    card: "bg-terracotta text-ink",
    tag: "bg-ink/10",
    sub: "text-ink/75",
  },
  sand: { card: "bg-sand text-ink", tag: "bg-ink/8", sub: "text-ink/65" },
  "warm-grey": {
    card: "bg-warm-grey text-ink",
    tag: "bg-ink/8",
    sub: "text-ink/70",
  },
};

// Each card sits at its own angle so the row reads as a hand of cards.
const TILT = ["-2deg", "3deg", "-1.5deg", "2.5deg", "-2.5deg"];

export function PlatformFan({ platforms }: { platforms: Platform[] }) {
  const strip = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = strip.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-fan-card]"));

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 90, scale: 0.92, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.06,
          clearProps: "transform",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <ul
      ref={strip}
      className={cx(
        // Full-bleed strip that scrolls sideways on narrow screens. The tall
        // padding plus negative block margin lets the tilt and shadow spill
        // without being clipped by the scroll container.
        "full-bleed m-0 flex list-none snap-x snap-mandatory scroll-px-6 items-center overflow-x-auto overflow-y-hidden",
        "-my-10 gap-5 px-6 py-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        "lg:gap-0 lg:[justify-content:safe_center] lg:px-[max(2rem,calc((100vw-1240px)/2))]",
      )}
    >
      {platforms.map((p, i) => {
        const t = themes[p.theme] ?? themes.teal;
        return (
          <li
            key={p.slug}
            data-fan-card
            style={{ "--tilt": TILT[i % TILT.length] } as React.CSSProperties}
            className="group/fan shrink-0 snap-center js:motion-safe:opacity-0"
          >
            <Link
              href={`/platforms/${p.slug}`}
              className={cx(
                "group relative flex aspect-[377/550] w-[78vw] max-w-[360px] flex-col overflow-hidden rounded-3xl border border-black/10 no-underline shadow-card",
                // One strong ease-out for lift, press and shadow alike.
                "transition-[transform,scale,box-shadow] duration-250 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)]",
                "sm:w-[340px] lg:w-[360px]",
                // Tilt only where the cards overlap; stacked cards stay upright.
                // Keyboard focus lifts the card exactly as hover does.
                "lg:[transform:rotate(var(--tilt))] lg:group-hover/fan:z-3 lg:focus-visible:z-3",
                "lg:motion-safe:group-hover/fan:[transform:rotate(calc(var(--tilt)*0.7))_translateY(-8px)_scale(1.02)]",
                "lg:motion-safe:focus-visible:[transform:rotate(calc(var(--tilt)*0.7))_translateY(-8px)_scale(1.02)]",
                "group-hover/fan:shadow-card-lift focus-visible:shadow-card-lift",
                // Press: the separate scale property composes with the tilt.
                "motion-safe:active:scale-[0.98]",
                "outline-none focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink",
                t.card,
              )}
            >
              <span
                className={cx(
                  "absolute top-6 right-6 z-3 rounded-pill px-3 py-1.5 font-mono text-xs leading-tight tracking-wider whitespace-nowrap uppercase",
                  t.tag,
                )}
              >
                {p.tag}
              </span>

              <div className="relative z-2 flex flex-col gap-2.5 px-7 pt-12 pb-6 sm:px-8">
                <span
                  className={cx(
                    "flex items-center gap-2.5 font-mono text-xs tracking-wider uppercase",
                    t.sub,
                  )}
                >
                  {/* The real mark on a neutral tile: full-colour logos would
                      fight five different card colours on their own. */}
                  <span
                    aria-hidden="true"
                    className="grid size-7 shrink-0 place-items-center overflow-hidden rounded-md bg-cream p-1 shadow-xs"
                  >
                    {p.logo ? (
                      <Image
                        src={p.logo}
                        alt=""
                        width={48}
                        height={48}
                        // The site mark has wide margins; scale it into the tile
                        className={cx(
                          "size-full object-contain",
                          p.logo === "/logo.png" && "scale-[1.45]",
                        )}
                      />
                    ) : (
                      <span className="font-mono text-[0.625rem] leading-none font-medium tracking-normal text-ink">
                        {p.initials}
                      </span>
                    )}
                  </span>
                  {p.kind}
                </span>
                <h3 className="m-0 font-display text-[2.125rem] leading-[1.05] font-semibold tracking-tighter">
                  {p.name}
                </h3>
                <p className="m-0 font-display text-lg leading-normal font-medium tracking-[-0.01em]">
                  {p.claim}
                </p>
              </div>

              <PlatformArt slug={p.slug} />

              <span className="relative z-3 mt-auto inline-flex items-center gap-1.5 px-7 pt-4 pb-7 font-mono text-xs tracking-wide uppercase sm:px-8 sm:pb-8">
                Explore
                <Arrow className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
