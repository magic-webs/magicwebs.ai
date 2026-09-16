import type { MetadataRoute } from "next";
import { company } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${company.name} — ${company.tagline}`,
    short_name: company.name,
    description: company.heroSub,
    start_url: "/",
    display: "standalone",
    background_color: "#fbfaf4",
    theme_color: "#0e1113",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
