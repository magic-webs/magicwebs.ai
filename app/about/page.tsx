import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import {
  Band,
  BodyText,
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
  StatRow,
} from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { company, faqs, stats, team } from "@/lib/site";
import { JsonLd, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About",
  description:
    "Magic Webs Technologies Pvt Ltd — a digital services company in Noida and Delhi, now building five automation platforms.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container className="flex flex-col pt-[clamp(2rem,6vh,4.5rem)]">
      <JsonLd data={faqJsonLd(faqs)} />
      <section className="flex flex-col gap-8 pt-[clamp(1rem,5vh,3rem)]">
        <Reveal className="flex flex-col gap-6">
          <Eyebrow>About</Eyebrow>
          <Display className="text-[clamp(2.25rem,7.5vw,6rem)]">
            Mark your presence{" "}
            <SoftBreak />
            online.
          </Display>
          <Lede>
            The promise we started with. What changed is how much we can
            automate.
          </Lede>
        </Reveal>
      </section>

      <Section>
        <Reveal className="flex max-w-measure flex-col gap-6">
          <Eyebrow>The short version</Eyebrow>
          <SectionTitle>
            {company.legalName}, from Noida and Delhi.
          </SectionTitle>
          <BodyText>{company.blurb}</BodyText>
          <BodyText>
            Official WhatsApp Business API provider, Google certified. We learned
            where enquiries come from, then built the software that answers them.
          </BodyText>
        </Reveal>

        <Reveal delay={1}>
          <StatRow items={stats} />
        </Reveal>
      </Section>

      <Section>
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>Team</Eyebrow>
          <SectionTitle>Who you will be dealing with.</SectionTitle>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={(i % 3) as 0 | 1 | 2}>
              <Card className="h-full border-transparent bg-sunken">
                <CardTitle className="text-lg">{m.name}</CardTitle>
                <p className="m-0 font-mono text-sm tracking-wide text-muted">
                  {m.role}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Band tone="sunken">
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>Offices</Eyebrow>
          <SectionTitle>Where to find us.</SectionTitle>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {company.offices.map((o, i) => (
            <Reveal key={o.label} delay={(i % 2) as 0 | 1}>
              <Card className="h-full">
                <CardTitle className="text-lg">{o.label}</CardTitle>
                <address className="m-0 font-mono text-sm leading-relaxed text-muted not-italic">
                  {o.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="m-0 font-mono text-sm text-muted">
            {company.hours} · {company.phone} · {company.email}
          </p>
        </Reveal>
      </Band>

      <Section>
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>Questions</Eyebrow>
          <SectionTitle>The things people ask first.</SectionTitle>
        </Reveal>

        <ul className="m-0 flex list-none flex-col p-0">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={(i % 3) as 0 | 1 | 2}>
              <li className="flex flex-col gap-3 border-b border-line py-6 lg:flex-row lg:gap-12">
                <h3 className="m-0 font-display text-lg leading-snug font-semibold tracking-tight lg:w-[340px] lg:shrink-0">
                  {f.q}
                </h3>
                <CardText className="max-w-measure font-mono text-sm">
                  {f.a}
                </CardText>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Band tone="forest">
        <Reveal className="flex flex-col items-start gap-6">
          <h2 className="text-balance-tight m-0 font-display text-[clamp(2.5rem,6.5vw,4.5rem)] leading-display font-semibold tracking-display">
            Come and tell us what is slowing you down.
          </h2>
          <p className="m-0 max-w-[680px] font-mono text-lg leading-normal text-cream/60">
            {company.note}
          </p>
          <ButtonRow>
            <Button href="/contact" variant="invert" size="lg">
              Book a demo
            </Button>
            <Button href="/work" variant="outlineInvert" size="lg">
              See our work
            </Button>
          </ButtonRow>
        </Reveal>
      </Band>
    </Container>
  );
}
