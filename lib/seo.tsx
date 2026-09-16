import type { Metadata } from "next";
import { company, platforms } from "@/lib/site";

export const SITE_URL = "https://magicwebs.ai";

/** Every indexable route, used by the sitemap and the JSON-LD site graph. */
export const routes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/platforms", priority: 0.9, changeFrequency: "weekly" as const },
  ...platforms.map((p) => ({
    path: `/platforms/${p.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  })),
  { path: "/services", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/pricing", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/work", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" as const },
];

/**
 * Builds page metadata with a canonical URL and matching Open Graph block.
 * Without an explicit canonical, query-string and trailing-slash variants get
 * indexed as separate pages.
 */
export function pageMeta({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: company.name,
      title: `${title} — ${company.name}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${company.name}`,
      description,
    },
  };
}

/** Organisation + website graph, emitted once from the root layout. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: company.legalName,
        alternateName: company.name,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
        email: company.email,
        telephone: company.phoneHref,
        sameAs: company.social.map((s) => s.href),
        address: company.offices.map((o) => ({
          "@type": "PostalAddress",
          streetAddress: o.lines.join(", "),
          addressLocality: o.label,
          addressCountry: "IN",
        })),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: company.email,
          telephone: company.phoneHref,
          areaServed: "IN",
          availableLanguage: ["en", "hi"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: company.name,
        description: company.sub,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en",
      },
    ],
  };
}

/** A platform detail page described as a software product. */
export function platformJsonLd(slug: string) {
  const p = platforms.find((x) => x.slug === slug);
  if (!p) return null;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: p.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: p.url,
    description: p.intro,
    featureList: p.features.map((f) => f.title),
    publisher: { "@id": `${SITE_URL}/#organization` },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: "0",
      description: "Pricing on request",
    },
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}${t.path}`,
    })),
  };
}

export function faqJsonLd(faqs: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Renders a JSON-LD block. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
