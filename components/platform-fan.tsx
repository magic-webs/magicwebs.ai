"use client";

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
      gsap.from(cards, {
        y: 90,
        scale: 0.92,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
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
        "-my-14 gap-6 px-6 py-24 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
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
            className="shrink-0 snap-center"
          >
            <Link
              href={`/platforms/${p.slug}`}
              className={cx(
                "group relative flex aspect-[377/550] w-[78vw] max-w-[360px] flex-col overflow-hidden rounded-3xl border border-black/10 no-underline shadow-card",
                "transition-[transform,box-shadow] duration-300 ease-out",
                "sm:w-[340px] lg:w-[360px]",
                // Tilt only where the cards overlap; stacked cards stay upright.
                "lg:[transform:rotate(var(--tilt))] lg:hover:z-3 lg:hover:[transform:rotate(calc(var(--tilt)*0.7))_translateY(-8px)_scale(1.02)]",
                "hover:shadow-card-lift",
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
                    "font-mono text-xs tracking-wider uppercase",
                    t.sub,
                  )}
                >
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

              <span className="relative z-3 mt-auto inline-flex items-center gap-1.5 px-7 pb-7 font-mono text-xs tracking-wide uppercase sm:px-8 sm:pb-8">
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
