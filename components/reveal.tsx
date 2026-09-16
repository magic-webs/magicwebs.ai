"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cx } from "@/components/ui";

const DELAY = ["", "delay-[80ms]", "delay-[160ms]", "delay-[240ms]", "delay-[320ms]", "delay-[400ms]"];

/**
 * Scroll-triggered rise. Renders visible when JS never runs, so content is
 * never trapped behind an observer that did not fire.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: 0 | 1 | 2 | 3 | 4 | 5;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Ancient browsers with no observer: reveal on the next frame rather than
    // synchronously, so this never cascades a render from the effect body.
    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(frame);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cx(
        "transition-[opacity,transform] duration-[520ms] ease-out",
        DELAY[delay],
        // Without JS the `js:` variant never matches, so content stays visible.
        shown ? "translate-y-0 opacity-100" : "js:translate-y-3.5 js:opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
