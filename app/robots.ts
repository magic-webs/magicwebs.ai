import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /owner is password-gated regardless; this just keeps it out of
        // results. /_next is deliberately NOT blocked — Googlebot needs the
        // CSS and JS chunks under it to render the page.
        disallow: ["/api/", "/owner"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
