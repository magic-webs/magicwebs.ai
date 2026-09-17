import Link from "next/link";
import {
  BodyText,
  Container,
  Display,
  Eyebrow,
  Lede,
  Section,
  SectionTitle,
} from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { LAST_UPDATED, legalPages, type LegalSection } from "@/lib/legal";
import { company } from "@/lib/site";

/**
 * Shared shell for /terms, /privacy and /refund. The three pages differ only
 * in their heading and their sections, so the chrome — revision date, contact
 * block, cross-links, disclaimer — lives here and cannot drift between them.
 */
export function LegalPage({
  title,
  lede,
  sections,
  path,
}: {
  title: string;
  lede: React.ReactNode;
  sections: LegalSection[];
  path: string;
}) {
  const others = legalPages.filter((p) => p.href !== path);

  return (
    <Container className="flex flex-col pt-[clamp(0.5rem,2vw,1.5rem)]">
      <section className="flex flex-col gap-8 pt-[clamp(0.5rem,2vw,1.5rem)]">
        <Reveal className="flex flex-col gap-6">
          <Eyebrow>Legal</Eyebrow>
          <Display className="text-[clamp(2.5rem,6.5vw,4.5rem)]">
            {title}
          </Display>
          <Lede>{lede}</Lede>
          <p className="m-0 font-mono text-xs text-faint">
            Last updated {LAST_UPDATED}
          </p>
        </Reveal>
      </section>

      <Section>
        <ol className="m-0 flex max-w-measure list-none flex-col p-0">
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) as 0 | 1 | 2}>
              <li className="flex flex-col gap-3 border-b border-line py-8">
                <SectionTitle className="text-xl" as="h2">
                  <span
                    aria-hidden="true"
                    className="mr-3 font-mono text-sm font-normal text-faint tabular-nums"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </SectionTitle>
                <BodyText>{s.body}</BodyText>
                {s.points && (
                  <ul className="m-0 flex list-none flex-col gap-2.5 p-0 font-mono text-sm leading-normal text-secondary">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5">
                        <span aria-hidden="true" className="shrink-0 opacity-55">
                          →
                        </span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal className="flex flex-col gap-3">
          <SectionTitle className="text-xl" as="h2">
            Contact
          </SectionTitle>
          <BodyText>
            Questions about this page go to{" "}
            <a
              className="underline underline-offset-[3px]"
              href={`mailto:${company.email}`}
            >
              {company.email}
            </a>
            , or {company.phone} during {company.hours}. Post reaches us at{" "}
            {company.offices[0].lines.join(", ")}.
          </BodyText>
          <p className="m-0 font-mono text-xs text-faint">
            {company.legalName}. This page is a plain-language summary and is
            not legal advice. Have your counsel review it before launch.
          </p>
        </Reveal>

        <Reveal className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-6 font-mono text-sm">
          <span className="text-faint">Also see</span>
          {others.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="text-secondary no-underline transition-colors duration-150 ease-standard hover:text-ink hover:underline hover:underline-offset-[3px]"
            >
              {p.label}
            </Link>
          ))}
        </Reveal>
      </Section>
    </Container>
  );
}
