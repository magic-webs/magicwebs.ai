import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
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
  StatRow,
} from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { PlatformMark } from "@/components/platform-mark";
import { getPlatform, platforms } from "@/lib/site";
import {
  JsonLd,
  breadcrumbJsonLd,
  pageMeta,
  platformJsonLd,
} from "@/lib/seo";

export function generateStaticParams() {
  return platforms.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/platforms/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const platform = getPlatform(slug);
  if (!platform) return { title: "Platform not found" };

  return pageMeta({
    title: platform.name,
    description: `${platform.claim} ${platform.intro}`.slice(0, 200),
    path: `/platforms/${platform.slug}`,
  });
}

export default async function PlatformPage({
  params,
}: PageProps<"/platforms/[slug]">) {
  const { slug } = await params;
  const platform = getPlatform(slug);
  if (!platform) notFound();

  const others = platforms.filter((p) => p.slug !== platform.slug);

  const productLd = platformJsonLd(platform.slug);

  return (
    <Container className="flex flex-col pt-[clamp(0.5rem,2vw,1.5rem)]">
      {productLd && <JsonLd data={productLd} />}
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Platforms", path: "/platforms" },
          { name: platform.name, path: `/platforms/${platform.slug}` },
        ])}
      />

      {/* ---------- Hero ---------- */}
      <section className="flex flex-col gap-8 pt-[clamp(0.5rem,2vw,1.5rem)]">
        <Reveal className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <PlatformMark platform={platform} size="lg" />
            <Eyebrow>{platform.kind}</Eyebrow>
          </div>

          <Display className="text-[clamp(2.75rem,7.5vw,6rem)]">
            {platform.name}
          </Display>

          <p className="m-0 max-w-[900px] font-display text-[clamp(1.375rem,3vw,2rem)] leading-snug font-medium tracking-tight">
            {platform.claim}
          </p>

          <Lede className="text-muted">{platform.intro}</Lede>

          <ButtonRow>
            <Button href={platform.url} size="lg">
              Open {platform.name} ↗
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Book a demo
            </Button>
          </ButtonRow>

          {platform.builtWith && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs tracking-wide text-faint uppercase">
                Built with
              </span>
              {platform.builtWith.map((b) => (
                <Chip key={b} outline>
                  {b}
                </Chip>
              ))}
            </div>
          )}
        </Reveal>
      </section>

      {/* ---------- Stats ---------- */}
      {platform.stats && platform.stats.length > 1 && (
        <Reveal delay={1} className="pt-[clamp(1.25rem,3vw,2.5rem)]">
          <StatRow items={platform.stats} />
        </Reveal>
      )}

      {/* ---------- Features ---------- */}
      <Section id="features">
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>Features</Eyebrow>
          <SectionTitle>What it does.</SectionTitle>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {platform.features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) as 0 | 1 | 2}>
              <Card className="h-full">
                <span className="font-mono text-xs tracking-wider text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <CardTitle className="text-lg">{f.title}</CardTitle>
                <CardText>{f.text}</CardText>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- Use cases ---------- */}
      <Band tone="forest">
        <Reveal className="flex flex-col gap-4">
          <Eyebrow className="text-cream/60">Use cases</Eyebrow>
          <SectionTitle>Where teams put it to work.</SectionTitle>
        </Reveal>

        <ul className="m-0 grid list-none grid-cols-1 gap-x-12 gap-y-0 p-0 sm:grid-cols-2">
          {platform.useCases.map((u, i) => (
            <Reveal key={u} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <li className="flex items-baseline gap-4 border-b border-cream/20 py-5">
                <span className="font-mono text-xs text-cream/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-lg leading-snug font-medium tracking-tight">
                  {u}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <ButtonRow>
            <Button href={platform.url} variant="invert" size="lg">
              Try {platform.name} ↗
            </Button>
            <Button href="/contact" variant="outlineInvert" size="lg">
              Talk to us
            </Button>
          </ButtonRow>
        </Reveal>
      </Band>

      {/* ---------- Other platforms ---------- */}
      <Section>
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>More from Magic Webs</Eyebrow>
          <SectionTitle>The other four.</SectionTitle>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <Link
                href={`/platforms/${p.slug}`}
                className="group flex h-full flex-col gap-3 rounded-2xl border border-line bg-paper p-6 no-underline transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-[3px] hover:border-line-strong hover:shadow-md"
              >
                <PlatformMark platform={p} size="md" />
                <CardTitle className="text-lg">{p.name}</CardTitle>
                <p className="m-0 font-mono text-xs leading-relaxed text-muted">
                  {p.kind}
                </p>
                <CardText className="text-sm">{p.claim}</CardText>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </Container>
  );
}
