import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
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
import { company } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Privacy",
  description:
    "How Magic Webs Technologies Pvt Ltd handles data collected through magicwebs.ai and the platforms we operate.",
  path: "/privacy",
});

const sections = [
  {
    title: "What we collect",
    body: "When you submit an enquiry we collect the name, company, email address, phone number and message you give us. Our platforms collect whatever the operating business configures them to collect — for example, a Magic Reward campaign may capture a name and phone number, and a Magic Forms form captures the fields its author defined.",
  },
  {
    title: "Why we collect it",
    body: "To answer your enquiry, to provide and support the platform you signed up for, and to meet our legal and accounting obligations. We do not sell personal data.",
  },
  {
    title: "Who acts as controller",
    body: "For enquiries made through this site, Magic Webs is the data controller. For data collected through a customer's own campaign, form or WhatsApp agent, that customer is the controller and Magic Webs acts as the processor on their instructions.",
  },
  {
    title: "Sharing and processors",
    body: "We use third-party services to deliver our platforms — including WhatsApp and Meta for messaging, and the hosting and analytics providers named in our contracts. Each receives only the data needed to perform its function.",
  },
  {
    title: "Retention",
    body: "Enquiry correspondence is kept for as long as we have an active relationship, and afterwards only as long as our accounting obligations require. Platform data is retained per the operating customer's configuration and deleted on request.",
  },
  {
    title: "Your rights",
    body: "You can ask us for a copy of the personal data we hold about you, ask us to correct it, or ask us to delete it. Write to us and we will respond within a reasonable period.",
  },
  {
    title: "Cookies",
    body: "This site uses only what is needed to serve pages and remember your preferences. Our platform dashboards use a session cookie to keep you signed in.",
  },
];

export default function PrivacyPage() {
  return (
    <Container className="flex flex-col pt-[clamp(0.5rem,2vw,1.5rem)]">
      <section className="flex flex-col gap-8 pt-[clamp(0.5rem,2vw,1.5rem)]">
        <Reveal className="flex flex-col gap-6">
          <Eyebrow>Legal</Eyebrow>
          <Display className="text-[clamp(2.5rem,6.5vw,4.5rem)]">
            Privacy.
          </Display>
          <Lede>
            How {company.legalName} handles the data collected through
            magicwebs.ai and the platforms we operate.
          </Lede>
        </Reveal>
      </section>

      <Section>
        <ul className="m-0 flex max-w-measure list-none flex-col p-0">
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) as 0 | 1 | 2}>
              <li className="flex flex-col gap-3 border-b border-line py-8">
                <SectionTitle className="text-xl" as="h2">
                  {s.title}
                </SectionTitle>
                <BodyText>{s.body}</BodyText>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal className="flex flex-col gap-3">
          <SectionTitle className="text-xl" as="h2">
            Contact
          </SectionTitle>
          <BodyText>
            Questions about this policy go to{" "}
            <a
              className="underline underline-offset-[3px]"
              href={`mailto:${company.email}`}
            >
              {company.email}
            </a>
            , or {company.phone} during {company.hours}.
          </BodyText>
          <p className="m-0 font-mono text-xs text-faint">
            This page is a plain-language summary and is not legal advice. Have
            your counsel review it before launch.
          </p>
        </Reveal>
      </Section>
    </Container>
  );
}
