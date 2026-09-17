import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { LegalPage } from "@/components/legal-page";
import { terms } from "@/lib/legal";
import { company } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Terms and Conditions",
  description:
    "The terms on which Magic Webs Technologies Pvt Ltd provides its platforms and services — use, fees, data, liability and jurisdiction.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms."
      path="/terms"
      sections={terms}
      lede={`The terms on which ${company.legalName} provides its platforms and the work around them.`}
    />
  );
}
