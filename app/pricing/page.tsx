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
import { Reveal } from "@/components/reveal";
import { cx } from "@/components/ui";
import { company, faqs, platforms, pricing } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Pricing",
  description:
    "Starter, Growth and Enterprise plans across all Magic Webs platforms. Discounts for start-ups, MSMEs and NGOs.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <Container className="flex flex-col pt-[clamp(2rem,6vh,4.5rem)]">
      <section className="flex flex-col gap-8 pt-[clamp(1rem,5vh,3rem)]">
        <Reveal className="flex flex-col gap-6">
          <Eyebrow>Pricing</Eyebrow>
          <Display className="text-[clamp(2.25rem,7.5vw,6rem)]">
            Priced on what{" "}
            <SoftBreak />
            you actually run.
          </Display>
          <Lede>
            We quote per platform and per volume. Tell us the workflow, get a
            figure the same week.
          </Lede>
        </Reveal>
      </section>

      <Section>
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
          {pricing.map((tier, i) => (
            <Reveal key={tier.name} delay={(i % 3) as 0 | 1 | 2}>
              <div
                className={cx(
                  "flex h-full flex-col gap-5 rounded-2xl border p-8",
                  tier.featured
                    ? "border-forest bg-forest text-cream shadow-card"
                    : "border-line bg-paper",
                )}
              >
                <div className="flex flex-col gap-1">
                  <h2 className="m-0 font-display text-xl leading-snug font-semibold tracking-tighter">
                    {tier.name}
                  </h2>
                  <span
                    className={cx(
                      "font-mono text-xs",
                      tier.featured ? "text-cream/60" : "text-muted",
                    )}
                  >
                    {tier.note}
                  </span>
                </div>

                <span className="font-display text-3xl leading-none font-semibold tracking-tighter">
                  {tier.price}
                </span>

                <CardText
                  className={tier.featured ? "text-cream/60" : undefined}
                >
                  {tier.text}
                </CardText>

                <ul className="m-0 flex flex-1 list-none flex-col gap-3 p-0 font-mono text-sm leading-normal">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span aria-hidden="true" className="shrink-0 opacity-55">
                        →
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  href="/contact"
                  variant={tier.featured ? "invert" : "outline"}
                  className="w-full"
                >
                  {tier.cta}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="m-0 font-mono text-sm text-muted">{company.note}</p>
        </Reveal>
      </Section>

      <Section>
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>Included in every plan</Eyebrow>
          <SectionTitle>Mix them however you like.</SectionTitle>
        </Reveal>

        <ul className="m-0 flex list-none flex-col p-0">
          {platforms.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) as 0 | 1 | 2}>
              <li className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line py-5">
                <span className="font-display text-lg font-semibold tracking-tight">
                  {p.name}
                </span>
                <span className="max-w-[620px] font-mono text-sm leading-relaxed text-muted">
                  {p.claim}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Band tone="sunken">
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>Before you ask</Eyebrow>
          <SectionTitle>Pricing questions we get a lot.</SectionTitle>
        </Reveal>

        <ul className="m-0 flex list-none flex-col p-0">
          {faqs.slice(0, 4).map((f, i) => (
            <Reveal key={f.q} delay={(i % 3) as 0 | 1 | 2}>
              <li className="flex flex-col gap-3 border-b border-line py-6 lg:flex-row lg:gap-12">
                <h3 className="m-0 font-display text-lg leading-snug font-semibold tracking-tight lg:w-[340px] lg:shrink-0">
                  {f.q}
                </h3>
                <p className="m-0 max-w-measure font-mono text-sm leading-relaxed text-muted">
                  {f.a}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </Band>

      <Band tone="forest">
        <Reveal className="flex flex-col items-start gap-6">
          <h2 className="text-balance-tight m-0 font-display text-[clamp(2.5rem,6.5vw,4.5rem)] leading-display font-semibold tracking-display">
            Get a number by Friday.
          </h2>
          <ButtonRow>
            <Button href="/contact" variant="invert" size="lg">
              Request a quote
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
