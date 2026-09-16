import type { Metadata } from "next";
import {
  Band,
  BodyText,
  Button,
  ButtonRow,
  Card,
  CardText,
  CardTitle,
  Chip,
  Container,
  Display,
  Eyebrow,
  Lede,
  Section,
  SectionTitle,
  StatRow,
} from "@/components/ui";
import { PlatformFan } from "@/components/platform-fan";
import { GrainText } from "@/components/grain-text";
import { Reveal } from "@/components/reveal";
import {
  clients,
  company,
  industries,
  partners,
  platforms,
  services,
  stats,
  steps,
} from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <Container className="flex flex-col pt-[clamp(0.5rem,2vw,1.5rem)]">
      {/* ---------- Hero ---------- */}
      <section className="flex flex-col gap-[clamp(1.25rem,2.5vw,2rem)] pt-[clamp(1rem,3vw,2.5rem)]">
        <Reveal>
          <Display>
            <GrainText>Automate your business</GrainText>
            <span className="block">
              with <span className="text-terracotta">Magic&nbsp;Webs.</span>
            </span>
          </Display>
        </Reveal>

        <Reveal delay={1}>
          <p className="m-0 max-w-[62ch] font-mono text-lg leading-normal">
            {company.heroSub}
          </p>
        </Reveal>

        <Reveal delay={2} className="flex flex-col gap-6">
          <ButtonRow>
            <Button href="/contact" size="lg">
              Book a demo
            </Button>
            <Button href="/platforms" variant="outline" size="lg">
              See the platforms
            </Button>
          </ButtonRow>
          <div className="flex flex-wrap gap-2">
            <Chip outline>Official WhatsApp Business API provider</Chip>
            <Chip outline>Google certified</Chip>
            <Chip outline>Noida &amp; Delhi</Chip>
          </div>
        </Reveal>
      </section>

      {/* ---------- Platform fan ---------- */}
      <div className="pt-[clamp(1.25rem,3vw,2.5rem)]">
        <PlatformFan platforms={platforms} />
      </div>

      {/* ---------- Positioning ---------- */}
      <Section id="what-we-do">
        <Reveal className="flex max-w-measure flex-col gap-6">
          <Eyebrow>What we do</Eyebrow>
          <SectionTitle className="text-[clamp(2.25rem,5.5vw,3.5rem)] leading-[1.02]">
            The parts nobody wants to do twice.
          </SectionTitle>
          <BodyText>{company.blurb}</BodyText>
        </Reveal>

        <Reveal delay={1}>
          <StatRow items={stats} />
        </Reveal>
      </Section>

      {/* ---------- Platforms in detail ---------- */}
      <Section id="platforms">
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>Platforms</Eyebrow>
          <SectionTitle>One team behind all of them.</SectionTitle>
          <Lede>Each solves a problem we kept hitting for clients.</Lede>
        </Reveal>

        <div className="flex flex-col">
          {platforms.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={(i % 3) as 0 | 1 | 2}
              className="flex flex-col gap-6 border-b border-line py-10 lg:flex-row lg:items-start lg:gap-16"
            >
              <div className="flex items-center gap-4 lg:w-[280px] lg:shrink-0">
                <span
                  aria-hidden="true"
                  className="grid size-12 shrink-0 place-items-center rounded-lg font-mono text-sm font-medium text-ink"
                  style={{ background: p.swatch }}
                >
                  {p.initials}
                </span>
                <div className="flex flex-col">
                  <h3 className="m-0 font-display text-xl leading-snug font-semibold tracking-tighter">
                    {p.name}
                  </h3>
                  <span className="font-mono text-xs tracking-wide text-muted">
                    {p.kind}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-4">
                <p className="m-0 font-display text-xl leading-snug font-medium tracking-tight">
                  {p.claim}
                </p>
                <CardText className="max-w-measure">{p.intro}</CardText>
                <ButtonRow>
                  <Button
                    href={`/platforms/${p.slug}`}
                    variant="outline"
                    size="sm"
                  >
                    Details
                  </Button>
                  <Button href={p.url} variant="ghost" size="sm">
                    Visit {p.name} ↗
                  </Button>
                </ButtonRow>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- Services ---------- */}
      <Section id="services">
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>Services</Eyebrow>
          <SectionTitle>The work that made the products necessary.</SectionTitle>
          <Lede>
            Automation without a working front door just loses enquiries faster.
          </Lede>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) as 0 | 1 | 2}>
              <Card className="h-full">
                <CardTitle className="text-lg">{s.title}</CardTitle>
                <CardText>{s.text}</CardText>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <ButtonRow>
            <Button href="/services" variant="outline">
              All services
            </Button>
          </ButtonRow>
        </Reveal>
      </Section>

      {/* ---------- Process band ---------- */}
      <Band tone="forest">
        <Reveal className="flex flex-col gap-4">
          <Eyebrow className="text-cream/60">How it goes</Eyebrow>
          <SectionTitle>Four steps. None of them a workshop.</SectionTitle>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.num} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="flex flex-col gap-3 border-t-2 border-cream pt-6">
                <span className="font-mono text-xs tracking-wider text-cream/60 uppercase">
                  {s.num}
                </span>
                <h3 className="m-0 font-display text-lg leading-snug font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="m-0 font-mono text-sm leading-relaxed text-cream/60">
                  {s.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* ---------- Industries ---------- */}
      <Section id="industries">
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>Industries</Eyebrow>
          <SectionTitle>Where it pays for itself fastest.</SectionTitle>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind, i) => (
            <Reveal key={ind.title} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <Card className="h-full border-transparent bg-sunken">
                <CardTitle className="text-lg">{ind.title}</CardTitle>
                <CardText>{ind.text}</CardText>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- Clients marquee ---------- */}
      <Section id="clients">
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>Selected clients</Eyebrow>
          <SectionTitle>Businesses we have put online.</SectionTitle>
        </Reveal>

        <div
          className="marquee-mask full-bleed group overflow-hidden py-6"
          aria-hidden="true"
        >
          <div className="flex w-max animate-marquee gap-12 group-hover:[animation-play-state:paused]">
            {[...clients, ...clients].map((c, i) => (
              <span
                key={`${c}-${i}`}
                className="font-display text-xl font-medium tracking-tight whitespace-nowrap text-faint transition-colors duration-200 ease-standard hover:text-ink"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <p className="sr-only">
          Selected clients: {clients.join(", ")}.
        </p>

        <Reveal className="flex flex-col gap-4">
          <Eyebrow>We work with</Eyebrow>
          <div className="flex flex-wrap gap-2">
            {partners.map((p) => (
              <Chip key={p} outline>
                {p}
              </Chip>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ---------- CTA ---------- */}
      <Band tone="terracotta">
        <Reveal className="flex flex-col items-start gap-8">
          <h2 className="text-balance-tight m-0 font-display text-[clamp(2.5rem,6.5vw,4.5rem)] leading-display font-semibold tracking-display">
            Tell us what your team keeps repeating.
          </h2>
          <p className="m-0 max-w-[62ch] font-mono text-lg leading-normal text-ink/80">
            We will tell you which platform handles it — or that none do.
          </p>
          <ButtonRow>
            <Button href="/contact" size="lg">
              Book a demo
            </Button>
            <Button
              href={`mailto:${company.email}`}
              variant="outline"
              size="lg"
              className="border-ink/40"
            >
              {company.email}
            </Button>
          </ButtonRow>
        </Reveal>
      </Band>
    </Container>
  );
}
