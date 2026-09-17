import Image from "next/image";
import { cx } from "@/components/ui";
import type { Platform } from "@/lib/site";

/**
 * The square brand tile used for a platform in nav rows, cards and hero
 * headers.
 *
 * Platforms with a `logo` get a neutral tile: the marks are full-colour and
 * transparent-backed, so sitting them on their own swatch would fight the
 * artwork. Platforms without one keep the original swatch-and-initials tile,
 * which is why both paths live here rather than at seven call sites.
 */

const tile = {
  sm: "size-9.5 rounded-md",
  md: "size-10 rounded-md",
  lg: "size-12 rounded-lg",
};

/** Inset so a mark that bleeds to its own edges still reads as a tile. */
const inset = { sm: "p-1", md: "p-1", lg: "p-1.5" };

/** Initials shrink with the tile. */
const label = { sm: "text-xs", md: "text-xs", lg: "text-sm" };

export function PlatformMark({
  platform,
  size = "md",
  className,
}: {
  platform: Pick<Platform, "name" | "initials" | "swatch" | "logo">;
  size?: keyof typeof tile;
  className?: string;
}) {
  if (!platform.logo) {
    return (
      <span
        aria-hidden="true"
        className={cx(
          "grid shrink-0 place-items-center font-mono font-medium text-ink",
          tile[size],
          label[size],
          className,
        )}
        style={{ background: platform.swatch }}
      >
        {platform.initials}
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cx(
        "grid shrink-0 place-items-center border border-line bg-sunken",
        tile[size],
        inset[size],
        className,
      )}
    >
      <Image
        src={platform.logo}
        alt=""
        width={96}
        height={96}
        className="size-full object-contain"
      />
    </span>
  );
}
