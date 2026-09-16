import type { Metadata, Viewport } from "next";
import { Inclusive_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { JsonLd, SITE_URL, organizationJsonLd } from "@/lib/seo";
import { company } from "@/lib/site";

const inclusiveSans = Inclusive_Sans({
  variable: "--font-inclusive-sans",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${company.name} — ${company.tagline}`,
    template: `%s — ${company.name}`,
  },
  description: company.sub,
  applicationName: company.name,
  generator: "Next.js",
  keywords: [
    "WhatsApp Business API",
    "WhatsApp automation",
    "AI sales assistant",
    "business automation",
    "chatbot for business",
    "online form builder",
    "spin to win campaigns",
    "influencer marketing platform",
    "React Native components",
    "website design Noida",
    "digital marketing Delhi",
    company.legalName,
  ],
  authors: [{ name: company.legalName, url: SITE_URL }],
  creator: company.legalName,
  publisher: company.legalName,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: company.name,
    title: `${company.name} — ${company.tagline}`,
    description: company.sub,
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} — ${company.tagline}`,
    description: company.sub,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf4" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1113" },
  ],
  colorScheme: "light",
};

/**
 * Document shell only. Header, footer and the visitor tracker live in
 * `app/(site)/layout.tsx` so that `/owner` can render without them.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${inclusiveSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        {/* Marks JS as live before first paint so the `js:` variant can hide
            scroll-reveal content. Without JS nothing is ever hidden. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <JsonLd data={organizationJsonLd()} />
      </head>
      <body className="flex min-h-full flex-col bg-canvas text-ink">
        {children}
      </body>
    </html>
  );
}
