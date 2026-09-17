import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { LegalPage } from "@/components/legal-page";
import { privacy } from "@/lib/legal";
import { company } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "How Magic Webs Technologies Pvt Ltd handles data collected through magicwebs.ai and the platforms we operate.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy."
      path="/privacy"
      sections={privacy}
      lede={`How ${company.legalName} handles the data collected through magicwebs.ai and the platforms we operate.`}
    />
  );
}
