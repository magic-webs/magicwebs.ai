import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import {
  Band,
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
  SoftBreak,
  StatRow,
} from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { clients, industries, partners, stats } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Work",
  description:
    "Websites, e-commerce portals, WhatsApp automation and digital marketing across education, retail, hospitality and finance.",
  path: "/work",
});

const testimonials = [
  {
    quote:
      "Responsive from the first call, and the site landed on the date they said it would.",
    who: "Education client",
  },
  {
    quote:
      "They managed the website and the marketing together, so we were not chasing two agencies.",
    who: "Retail client",
  },
  {
    quote:
      "Quality of workmanship was the thing that stood out. Nothing had to be redone.",
    who: "Services client",
  },
];

export default function WorkPage() {
  return (
    <Container className="flex flex-col pt-[clamp(2rem,6vh,4.5rem)]">
      <section className="flex flex-col gap-8 pt-[clamp(1rem,5vh,3rem)]">
        <Reveal className="flex flex-col gap-6">
          <Eyebrow>Work</Eyebrow>
          <Display className="text-[clamp(2.25rem,7.5vw,6rem)]">
            Businesses we{" "}
            <SoftBreak />
            put online.
          </Display>
          <Lede>
            Schools, studios, retailers and investment firms — usually on a date
            somebody else already announced.
          </Lede>
        </Reveal>
      </section>

      <Reveal delay={1} className="pt-[clamp(2.5rem,6vw,4rem)]">
        <StatRow items={stats} />
      </Reveal>

      <Section>
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>Selected clients</Eyebrow>
          <SectionTitle>A few of the names.</SectionTitle>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {clients.map((c, i) => (
            <Reveal key={c} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="flex h-full min-h-35 flex-col justify-between gap-4 rounded-2xl border border-line bg-paper p-6">
                <span className="font-mono text-xs tracking-wider text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-lg leading-snug font-semibold tracking-tight">
                  {c}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Band tone="sunken">
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>What they said</Eyebrow>
          <SectionTitle>Feedback, lightly trimmed.</SectionTitle>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.who} delay={(i % 3) as 0 | 1 | 2}>
              <figure className="m-0 flex h-full flex-col justify-between gap-6 rounded-2xl border border-line bg-paper p-8">
                <blockquote className="m-0 font-display text-lg leading-snug font-medium tracking-tight">
                  “{t.quote}”
                </blockquote>
                <figcaption className="font-mono text-xs tracking-wide text-muted uppercase">
                  {t.who}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Band>

      <Section>
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>Sectors</Eyebrow>
          <SectionTitle>The four we know best.</SectionTitle>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind, i) => (
            <Reveal key={ind.title} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <Card className="h-full">
                <CardTitle className="text-lg">{ind.title}</CardTitle>
                <CardText>{ind.text}</CardText>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>Stack</Eyebrow>
          <SectionTitle>What we integrate with.</SectionTitle>
          <div className="flex flex-wrap gap-2 pt-2">
            {partners.map((p) => (
              <Chip key={p} outline>
                {p}
              </Chip>
            ))}
          </div>
        </Reveal>
      </Section>

      <Band tone="terracotta">
        <Reveal className="flex flex-col items-start gap-6">
          <h2 className="text-balance-tight m-0 font-display text-[clamp(2.5rem,6.5vw,4.5rem)] leading-display font-semibold tracking-display">
            Your project, on a date you can announce.
          </h2>
          <ButtonRow>
            <Button href="/contact" size="lg">
              Start a project
            </Button>
            <Button
              href="/platforms"
              variant="outline"
              size="lg"
              className="border-ink/40"
            >
              See the platforms
            </Button>
          </ButtonRow>
        </Reveal>
      </Band>
    </Container>
  );
}
