import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import {
  Band,
  Button,
  ButtonRow,
  Card,
  CardText,
  CardTitle,
  Container,
  Display,
  Eyebrow,
  Lede,
  Section,
  SectionTitle,
  SoftBreak,
} from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { industries, partners, services, steps } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Services",
  description:
    "WhatsApp Business API, conversational automation, website design, e-commerce portals, digital marketing and API integration.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <Container className="flex flex-col pt-[clamp(0.5rem,2vw,1.5rem)]">
      <section className="flex flex-col gap-8 pt-[clamp(0.5rem,2vw,1.5rem)]">
        <Reveal className="flex flex-col gap-6">
          <Eyebrow>Services</Eyebrow>
          <Display className="text-[clamp(2.25rem,7.5vw,6rem)]">
            Build it, launch it,{" "}
            <SoftBreak />
            then automate it.
          </Display>
          <Lede>
            Official WhatsApp Business API provider. Google certified partner.
          </Lede>
          <ButtonRow>
            <Button href="/contact" size="lg">
              Start a project
            </Button>
            <Button href="/pricing" variant="outline" size="lg">
              See pricing
            </Button>
          </ButtonRow>
        </Reveal>
      </section>

      <Section>
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>What we offer</Eyebrow>
          <SectionTitle>Six things, done properly.</SectionTitle>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) as 0 | 1 | 2}>
              <Card className="h-full">
                <span className="font-mono text-xs tracking-wider text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <CardTitle className="text-lg">{s.title}</CardTitle>
                <CardText>{s.text}</CardText>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Band tone="forest">
        <Reveal className="flex flex-col gap-4">
          <Eyebrow className="text-cream/60">How we work</Eyebrow>
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

      <Section>
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>Industries</Eyebrow>
          <SectionTitle>Where we have done this before.</SectionTitle>
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

      <Section>
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>Integrations</Eyebrow>
          <SectionTitle>The tools we plug into.</SectionTitle>
          <div className="flex flex-wrap gap-3 pt-2">
            {partners.map((p) => (
              <span
                key={p}
                className="rounded-pill border border-line-strong px-4 py-2 font-mono text-sm tracking-wide text-secondary"
              >
                {p}
              </span>
            ))}
          </div>
        </Reveal>
      </Section>

      <Band tone="terracotta">
        <Reveal className="flex flex-col items-start gap-6">
          <h2 className="text-balance-tight m-0 font-display text-[clamp(2.5rem,6.5vw,4.5rem)] leading-display font-semibold tracking-display">
            Let us look at your enquiry flow.
          </h2>
          <p className="m-0 max-w-[62ch] font-mono text-lg leading-normal text-ink/80">
            Usually it is a form, an inbox and a follow-up nobody owns.
          </p>
          <ButtonRow>
            <Button href="/contact" size="lg">
              Book a demo
            </Button>
          </ButtonRow>
        </Reveal>
      </Band>
    </Container>
  );
}
