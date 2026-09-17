import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { LegalPage } from "@/components/legal-page";
import { refund } from "@/lib/legal";

export const metadata: Metadata = pageMeta({
  title: "Refund and Cancellation",
  description:
    "What Magic Webs refunds and what it does not — subscription terms, setup work, pass-through charges, and how to cancel or claim.",
  path: "/refund",
});

export default function RefundPage() {
  return (
    <LegalPage
      title="Refunds."
      path="/refund"
      sections={refund}
      lede="What we refund, what we do not, and how to cancel a subscription or raise a claim."
    />
  );
}
