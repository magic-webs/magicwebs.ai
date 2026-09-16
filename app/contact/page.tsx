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
} from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { company, platforms } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description:
    "Talk to Magic Webs — contact@magicwebs.in, 9999-064-055. Offices in Noida and Delhi, open Mon–Sun 9am–6pm.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="flex flex-col pt-[clamp(2rem,6vh,4.5rem)]">
      <section className="flex flex-col gap-8 pt-[clamp(1rem,5vh,3rem)]">
        <Reveal className="flex flex-col gap-6">
          <Eyebrow>Contact</Eyebrow>
          <Display className="text-[clamp(2.75rem,7.5vw,6rem)]">
            Book a demo.
          </Display>
          <Lede>
            Tell us the workflow your team keeps repeating. We will demo it with
            your own examples.
          </Lede>
        </Reveal>
      </section>

      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <Reveal className="flex flex-col gap-8">
            <SectionTitle>Send us the details.</SectionTitle>
            <ContactForm />
          </Reveal>

          <Reveal delay={1} className="flex flex-col gap-6">
            <Card className="border-transparent bg-sunken">
              <CardTitle className="text-lg">Straight to a human</CardTitle>
              <ul className="m-0 flex list-none flex-col gap-3 p-0">
                <li>
                  <a
                    className="font-mono text-sm text-secondary no-underline hover:text-ink hover:underline hover:underline-offset-[3px]"
                    href={`mailto:${company.email}`}
                  >
                    {company.email}
                  </a>
                </li>
                <li>
                  <a
                    className="font-mono text-sm text-secondary no-underline hover:text-ink hover:underline hover:underline-offset-[3px]"
                    href={`tel:${company.phoneHref}`}
                  >
                    {company.phone}
                  </a>
                </li>
                <li className="font-mono text-sm text-muted">
                  {company.hours}
                </li>
              </ul>
            </Card>

            {company.offices.map((o) => (
              <Card key={o.label}>
                <CardTitle className="text-lg">{o.label}</CardTitle>
                <address className="m-0 font-mono text-sm leading-relaxed text-muted not-italic">
                  {o.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
              </Card>
            ))}

            <Card className="border-transparent bg-sunken">
              <CardTitle className="text-lg">Follow along</CardTitle>
              <ul className="m-0 flex list-none flex-wrap gap-4 p-0">
                {company.social.map((s) => (
                  <li key={s.label}>
                    <a
                      className="font-mono text-sm text-secondary no-underline hover:text-ink hover:underline hover:underline-offset-[3px]"
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Card>

            <CardText className="font-mono text-sm text-muted">
              {company.note}
            </CardText>
          </Reveal>
        </div>
      </Section>

      <Band tone="sunken">
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>Or go straight in</Eyebrow>
          <SectionTitle>Try a platform before you call.</SectionTitle>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) as 0 | 1 | 2}>
              <Card href={p.url} className="h-full">
                <span
                  aria-hidden="true"
                  className="grid size-10 shrink-0 place-items-center rounded-md font-mono text-xs font-medium text-ink"
                  style={{ background: p.swatch }}
                >
                  {p.initials}
                </span>
                <CardTitle className="text-lg">{p.name} ↗</CardTitle>
                <CardText className="text-sm">{p.claim}</CardText>
              </Card>
            </Reveal>
          ))}
        </div>
      </Band>

      <Band tone="forest">
        <Reveal className="flex flex-col items-start gap-6">
          <h2 className="text-balance-tight m-0 font-display text-[clamp(2.5rem,6.5vw,4.5rem)] leading-display font-semibold tracking-display">
            We reply the same day.
          </h2>
          <ButtonRow>
            <Button
              href={`mailto:${company.email}`}
              variant="invert"
              size="lg"
            >
              {company.email}
            </Button>
            <Button
              href={`tel:${company.phoneHref}`}
              variant="outlineInvert"
              size="lg"
            >
              {company.phone}
            </Button>
          </ButtonRow>
        </Reveal>
      </Band>
    </Container>
  );
}
