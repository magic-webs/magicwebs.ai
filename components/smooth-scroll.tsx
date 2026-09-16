"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger, gsap } from "@/lib/gsap";

/**
 * Lenis smooth scrolling, driven off GSAP's ticker so ScrollTrigger and the
 * scroll position never disagree by a frame. Disabled outright for anyone who
 * has asked for reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
