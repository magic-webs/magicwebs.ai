import type { ReactNode } from "react";
import Image from "next/image";
import {
  BadgeCheck,
  Check,
  Gift,
  ShieldCheck,
  Terminal,
  Webhook,
} from "lucide-react";
import { cx } from "@/components/ui";

/**
 * The artwork on each platform card: a small product scene, not a mock-up of
 * a real screen. Each one is a main surface and one satellite that tell the
 * same story as the platform's demo further down the page, with only a few
 * real words. Everything is sized in em off a font size that follows the
 * space the card leaves (its width and its height), so each scene fits from
 * a 300px phone card to 360px without running into the card's text.
 */

/** One stroke and size for every icon, so the set reads as one family. */
const icon = "size-[1.15em] shrink-0";
const stroke = 1.75;

/** A raised surface on a light card. */
const paper =
  "rounded-[0.9em] bg-paper text-ink shadow-[0_1px_2px_rgba(14,17,19,0.08),0_10px_24px_-12px_rgba(14,17,19,0.35)]";

/** The satellite: smaller, a step higher, overlapping the main surface. */
const satellite =
  "absolute z-2 inline-flex items-center gap-[0.5em] whitespace-nowrap rounded-full px-[0.85em] py-[0.5em] text-[0.92em] font-medium leading-none shadow-[0_2px_4px_rgba(14,17,19,0.12),0_14px_28px_-12px_rgba(14,17,19,0.5)]";

function Scene({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0 grid place-items-center px-[1.9em] font-display text-[min(4.3cqw,7.4cqh)] leading-snug tracking-[-0.01em]">
      <div className="relative w-full">{children}</div>
    </div>
  );
}

/* Magic Agent: the customer asks, the agent answers from your documents,
   and the enquiry comes out ready to price. */
function AgentScene() {
  return (
    <Scene>
      <div className="flex flex-col gap-[0.55em]">
        <div className="max-w-[86%] self-start rounded-[0.9em] rounded-bl-[0.3em] bg-cream/12 px-[0.85em] py-[0.6em] text-cream">
          500 tote bags, 2 colours?
        </div>
        {/* The reply is signed with the Magic Agent mark: the product answers */}
        <div className="flex max-w-[92%] items-end gap-[0.45em] self-end">
          <div className="rounded-[0.9em] rounded-br-[0.3em] bg-teal px-[0.85em] py-[0.6em] text-ink">
            Done. Ships in 7 days.
          </div>
          <span className="grid size-[1.9em] shrink-0 place-items-center overflow-hidden rounded-full bg-cream">
            {/* The source art has wide margins: scale the M to fill the disc */}
            <Image
              src="/logo.png"
              alt=""
              width={64}
              height={64}
              className="size-full scale-[1.45] object-contain"
            />
          </span>
        </div>
        {/* The result follows the answer it came from */}
        <span className={cx(satellite, "relative mt-[0.35em] mr-[2.35em] self-end bg-cream text-ink")}>
          <span className="grid size-[1.35em] place-items-center rounded-full bg-success text-cream">
            <Check className="size-[0.85em]" strokeWidth={3} aria-hidden />
          </span>
          Ready to price
        </span>
      </div>
    </Scene>
  );
}

/* RichyReach: a verified creator with real stats, and the escrow released
   on approval. */
function ReachScene() {
  const stats = [
    ["128K", "Followers"],
    ["6.2%", "Engagement"],
    ["₹40K", "Per reel"],
  ];
  return (
    <Scene>
      <div className={cx(paper, "mb-[1.3em] flex flex-col gap-[0.85em] p-[0.95em]")}>
        <div className="flex items-center gap-[0.75em]">
          <span className="grid size-[2.5em] shrink-0 place-items-center rounded-full bg-[#b9532f] text-[1.05em] font-semibold text-cream">
            A
          </span>
          <span className="flex min-w-0 flex-col gap-[0.2em]">
            <span className="inline-flex items-center gap-[0.35em] font-semibold">
              Ananya Rao
              <BadgeCheck className={cx(icon, "text-[#b9532f]")} strokeWidth={stroke} aria-hidden />
            </span>
            <span className="text-[0.88em] text-ink/60">Beauty · Pune</span>
          </span>
        </div>
        <div className="grid grid-cols-3 gap-[0.4em]">
          {stats.map(([value, label]) => (
            <span key={label} className="flex flex-col gap-[0.15em] rounded-[0.55em] bg-ink/5 px-[0.6em] py-[0.5em]">
              <span className="font-semibold tracking-[-0.02em]">{value}</span>
              <span className="text-[0.76em] text-ink/55">{label}</span>
            </span>
          ))}
        </div>
      </div>
      <span className={cx(satellite, "right-[0.6em] bottom-0 bg-ink text-cream")}>
        <ShieldCheck className={icon} strokeWidth={stroke} aria-hidden />
        ₹40,000 released
      </span>
    </Scene>
  );
}

/* Magic Reward: a branded prize wheel, and what it landed on. */
function RewardScene() {
  const R = 46;
  // Cream and sage wedges; the winning wedge under the pointer takes the accent
  const fills = ["#db704c", "#fbfaf4", "#7f8a6c", "#fbfaf4", "#c9cfb8", "#fbfaf4", "#7f8a6c", "#fbfaf4"];
  return (
    <Scene>
      <div className="flex items-center justify-start">
        <svg viewBox="-60 -64 120 124" className="w-[56%] drop-shadow-[0_10px_14px_rgba(14,17,19,0.25)]" aria-hidden="true">
          <circle r="54" fill="#2a302b" />
          {fills.map((fill, i) => {
            const a0 = ((i * 45 - 112.5) * Math.PI) / 180;
            const a1 = ((i * 45 - 67.5) * Math.PI) / 180;
            return (
              <path
                key={i}
                d={`M0 0 L${(R * Math.cos(a0)).toFixed(2)} ${(R * Math.sin(a0)).toFixed(2)} A${R} ${R} 0 0 1 ${(R * Math.cos(a1)).toFixed(2)} ${(R * Math.sin(a1)).toFixed(2)} Z`}
                fill={fill}
                stroke="#2a302b"
                strokeWidth="0.8"
              />
            );
          })}
          {/* Studs around the rim, as a real prize wheel has */}
          {Array.from({ length: 16 }).map((_, i) => {
            const a = ((i * 22.5 - 90) * Math.PI) / 180;
            return <circle key={i} cx={(50 * Math.cos(a)).toFixed(2)} cy={(50 * Math.sin(a)).toFixed(2)} r="1.6" fill="#f3e3b5" />;
          })}
          <circle r="9" fill="#fbfaf4" stroke="#2a302b" strokeWidth="2.5" />
          <circle r="3" fill="#2a302b" />
          <path d="M0 -44 -7 -60 H7 Z" fill="#2a302b" stroke="#fbfaf4" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </div>
      <div className={cx(paper, "absolute right-0 bottom-[8%] z-2 flex items-center gap-[0.65em] py-[0.75em] pr-[1em] pl-[0.8em]")}>
        <span className="grid size-[2.1em] place-items-center rounded-[0.6em] bg-sage/45 text-ink">
          <Gift className={icon} strokeWidth={stroke} aria-hidden />
        </span>
        <span className="flex flex-col gap-[0.15em]">
          <span className="text-[0.82em] text-ink/60">You won</span>
          <span className="text-[1.15em] font-semibold tracking-[-0.02em]">20% off</span>
        </span>
      </div>
    </Scene>
  );
}

/* Magic Forms: one field being answered, and the webhook it fires. */
function FormsScene() {
  const options = ["1–10", "11–50", "51–200", "200+"];
  return (
    <Scene>
      <div className={cx(paper, "mb-[1.5em] flex flex-col gap-[0.7em] p-[1em]")}>
        <span className="flex gap-[0.3em]" aria-hidden>
          {[0, 1, 2].map((s) => (
            <span key={s} className={cx("h-[0.25em] flex-1 rounded-full", s < 2 ? "bg-ink" : "bg-ink/12")} />
          ))}
        </span>
        <span className="font-medium">Company size</span>
        <span className="grid grid-cols-2 gap-[0.4em]">
          {options.map((o) => (
            <span
              key={o}
              className={cx(
                "rounded-[0.55em] px-[0.7em] py-[0.42em] text-[0.9em]",
                o === "51–200" ? "bg-ink text-cream" : "border border-ink/15 text-ink/75",
              )}
            >
              {o}
            </span>
          ))}
        </span>
      </div>
      <span className={cx(satellite, "right-[0.6em] bottom-0 bg-ink text-cream")}>
        <Webhook className={icon} strokeWidth={stroke} aria-hidden />
        <span className="font-mono text-[0.92em] font-normal">submission.created</span>
        <span className="rounded-full bg-success px-[0.45em] py-[0.2em] font-mono text-[0.85em] text-cream">200</span>
      </span>
    </Scene>
  );
}

/* Magic Native UI: one component set, the same screen on iOS and Android. */
function Device({ island }: { island: "pill" | "dot" }) {
  return (
    <div className="flex h-[10.2em] w-[6.6em] flex-col rounded-[1.4em] border-[0.28em] border-ink bg-paper px-[0.6em] pt-[0.5em] pb-[0.65em] shadow-[0_10px_24px_-12px_rgba(14,17,19,0.45)]">
      <span
        className={cx(
          "mx-auto bg-ink",
          island === "pill" ? "h-[0.5em] w-[2.2em] rounded-full" : "size-[0.5em] rounded-full",
        )}
        aria-hidden
      />
      <span className="mt-[1em] text-[0.82em] leading-tight font-semibold">Enter code</span>
      <span className="mt-[0.2em] h-[0.32em] w-[70%] rounded-full bg-ink/12" aria-hidden />
      <span className="mt-[0.8em] grid grid-cols-4 gap-[0.25em]" aria-hidden>
        {["4", "8", "1", ""].map((d, i) => (
          <span
            key={i}
            className={cx(
              "grid h-[1.55em] place-items-center rounded-[0.35em] text-[0.78em] font-semibold",
              d ? "border border-ink/20" : "border-[1.5px] border-ink",
            )}
          >
            {d}
          </span>
        ))}
      </span>
      <span className="mt-auto rounded-[0.55em] bg-ink py-[0.45em] text-center text-[0.74em] font-medium text-cream">
        Continue
      </span>
    </div>
  );
}

function NativeScene() {
  return (
    <Scene>
      <div className="flex items-end justify-center gap-[1.6em] pb-[2.2em]">
        <Device island="pill" />
        <Device island="dot" />
      </div>
      <span className={cx(satellite, "bottom-0 left-1/2 -translate-x-1/2 bg-ink text-cream")}>
        <Terminal className={icon} strokeWidth={stroke} aria-hidden />
        <span className="font-mono text-[0.9em] font-normal">add otp-input</span>
      </span>
    </Scene>
  );
}

const scenes: Record<string, () => ReactNode> = {
  "magic-agent": AgentScene,
  richyreach: ReachScene,
  "magic-reward": RewardScene,
  "magic-forms": FormsScene,
  "magic-native-ui": NativeScene,
};

export function PlatformArt({ slug }: { slug: string }) {
  const Scene = scenes[slug];
  return (
    // In the card's flow: it takes the room between the copy and the Explore
    // row, so it never sits on either. The container sets the scene's scale.
    <div
      aria-hidden="true"
      className="relative min-h-0 flex-1 overflow-hidden @container-size"
    >
      {Scene ? <Scene /> : null}
    </div>
  );
}
