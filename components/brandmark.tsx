import Image from "next/image";
import Link from "next/link";
import { cx } from "@/components/ui";
import logo from "@/public/logo.png";

export function Brandmark({
  large = false,
  href = "/",
}: {
  large?: boolean;
  href?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="Magic Webs — home"
      className={cx(
        "inline-flex shrink-0 items-center text-ink no-underline",
        large ? "gap-3" : "gap-2",
      )}
    >
      <Image
        src={logo}
        alt=""
        aria-hidden="true"
        priority
        sizes="60px"
        // The source art carries a lot of surrounding whitespace, so the box is
        // wider than the visible mark and cropped in with a negative inset.
        className={cx(
          "-my-1 w-auto object-contain",
          large ? "h-11" : "h-7",
        )}
      />
      <span
        className={cx(
          "font-display leading-snug font-semibold tracking-tighter whitespace-nowrap",
          large ? "text-2xl" : "text-[1.15rem]",
        )}
      >
        Magic Webs
      </span>
    </Link>
  );
}
