import type { ComponentType } from "react";
import { MagicAgentFigure } from "@/components/magic-agent-demo/figure";
import { MagicFormsFigure } from "@/components/magic-forms-demo/figure";
import { MagicRewardFigure } from "@/components/magic-reward-demo/figure";
import { MagicNativeUiFigure } from "@/components/magic-native-ui-demo/figure";
import { RichyReachFigure } from "@/components/richyreach-demo/figure";

/** The animated product demo for each platform, keyed by slug. */
const demos: Record<string, ComponentType<{ className?: string }>> = {
  "magic-agent": MagicAgentFigure,
  richyreach: RichyReachFigure,
  "magic-reward": MagicRewardFigure,
  "magic-forms": MagicFormsFigure,
  "magic-native-ui": MagicNativeUiFigure,
};

export function hasPlatformDemo(slug: string) {
  return slug in demos;
}

export function PlatformDemo({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const Demo = demos[slug];
  return Demo ? <Demo className={className} /> : null;
}
