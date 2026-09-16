import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import {
  Band,
  Button,
  ButtonRow,
  CardText,
  Container,
  Display,
  Eyebrow,
  Lede,
  Section,
  SectionTitle,
  SoftBreak,
} from "@/components/ui";
import { PlatformFan } from "@/components/platform-fan";
import { Reveal } from "@/components/reveal";
import { platforms } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Platforms",
  description:
    "Magic Agent, RichyReach, Magic Reward, Magic Forms and Magic Native UI — built and run by Magic Webs.",
  path: "/platforms",
});

export default function PlatformsPage() {
  return (
    <Container className="flex flex-col pt-[clamp(2rem,6vh,4.5rem)]">
      <section className="flex flex-col gap-8 pt-[clamp(1rem,5vh,3rem)]">
        <Reveal className="flex flex-col gap-6">
          <Eyebrow>Platforms</Eyebrow>
          <Display className="text-[clamp(2.25rem,7.5vw,6rem)]">
            Five products.{" "}
            <SoftBreak />
            One team.
          </Display>
          <Lede>
            Each started as a problem a client actually had. None requires the
            others.
          </Lede>
        </Reveal>
      </section>

      <div className="pt-[clamp(3rem,7vw,5rem)]">
        <PlatformFan platforms={platforms} />
      </div>

      <Section>
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>At a glance</Eyebrow>
          <SectionTitle>What each one is for.</SectionTitle>
        </Reveal>

        <ul className="m-0 flex list-none flex-col p-0">
          {platforms.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) as 0 | 1 | 2}>
              <li className="flex flex-col gap-4 border-b border-line py-8 lg:flex-row lg:items-start lg:gap-12">
                <div className="flex items-center gap-4 lg:w-[260px] lg:shrink-0">
                  <span
                    aria-hidden="true"
                    className="grid size-12 shrink-0 place-items-center rounded-lg font-mono text-sm font-medium text-ink"
                    style={{ background: p.swatch }}
                  >
                    {p.initials}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-display text-xl leading-snug font-semibold tracking-tighter">
                      {p.name}
                    </span>
                    <span className="font-mono text-xs tracking-wide text-muted">
                      {p.kind}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-3">
                  <p className="m-0 font-display text-lg leading-snug font-medium tracking-tight">
                    {p.claim}
                  </p>
                  <CardText className="max-w-measure">{p.intro}</CardText>
                </div>

                <ButtonRow className="lg:shrink-0">
                  <Button
                    href={`/platforms/${p.slug}`}
                    variant="outline"
                    size="sm"
                  >
                    Details
                  </Button>
                </ButtonRow>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Band tone="sunken">
        <Reveal className="flex flex-col items-start gap-6">
          <SectionTitle>Not sure which one you need?</SectionTitle>
          <Lede className="text-muted">
            Describe the workflow. We will point at the one that covers it.
          </Lede>
          <ButtonRow>
            <Button href="/contact" size="lg">
              Book a demo
            </Button>
            <Button href="/pricing" variant="outline" size="lg">
              See pricing
            </Button>
          </ButtonRow>
        </Reveal>
      </Band>
    </Container>
  );
}
