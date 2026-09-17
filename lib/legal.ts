/**
 * Single source of truth for the legal pages.
 *
 * Kept out of `lib/site.ts` because this is the one body of copy on the site
 * that gets revised by counsel rather than by marketing, and it carries a
 * revision date the rest of the site does not.
 *
 * The terms follow how the business actually sells: platforms quoted per
 * workspace and per volume, billed in advance in INR, with WhatsApp and other
 * third-party charges passed through at cost.
 */

/** Shown on every legal page. Bump when the copy below changes materially. */
export const LAST_UPDATED = "17 September 2026";

export type LegalSection = {
  title: string;
  body: string;
  /** Rendered as a list beneath the body. */
  points?: string[];
};

/**
 * The legal routes. `label` is used for the cross-link row at the foot of each
 * legal page; `short` for the cramped bottom bar of the site footer.
 */
export const legalPages = [
  { href: "/terms", label: "Terms and Conditions", short: "Terms" },
  { href: "/privacy", label: "Privacy Policy", short: "Privacy" },
  { href: "/refund", label: "Refund and Cancellation", short: "Refunds" },
] as const;

/* ------------------------------------------------------------------ */
/* Terms and Conditions                                                */
/* ------------------------------------------------------------------ */

export const terms: LegalSection[] = [
  {
    title: "Who this agreement is between",
    body: "These terms are an agreement between Magic Webs Technologies Pvt Ltd, a company incorporated in India with offices in Noida and Delhi, and the person or organisation that subscribes to one of our platforms or engages us for services. Where you accept these terms on behalf of an organisation, you confirm you are authorised to bind it. Using this site, requesting a quote, or using any platform means you accept these terms.",
  },
  {
    title: "What we provide",
    body: "We provide hosted software on a subscription basis — Magic Agent, Magic Forms, Magic Reward, RichyReach and Native UI — together with the configuration, integration and support work described in your quote or order. A quote, proposal or order form confirmed in writing forms part of this agreement, and where it conflicts with these terms on a commercial point, the quote governs.",
  },
  {
    title: "Your account and workspace",
    body: "You are responsible for everything done through your workspace. Keep credentials confidential, give access only to people who need it, and tell us promptly if you believe an account has been compromised. We may act on instructions given by anyone who appears to be authorised on your account.",
  },
  {
    title: "Acceptable use",
    body: "Our platforms send messages to real people on regulated channels, so the following is not permitted on any plan:",
    points: [
      "Messaging people who have not opted in, or continuing to message anyone who has opted out.",
      "Sending content that is unlawful, misleading, obscene, or that infringes someone else's rights.",
      "Uploading knowledge or product data you do not have the right to use.",
      "Reselling, sublicensing or white-labelling the platforms without our written agreement.",
      "Reverse engineering the platforms, or probing, scanning or load-testing them without consent.",
      "Using the platforms to build a competing product, or to feed data to one.",
    ],
  },
  {
    title: "Your data and content",
    body: "Your data stays yours. That covers the documents you upload as knowledge, your product catalogue, your form submissions, your contacts, and the conversations your customers have with your agent. You grant us the licence needed to host, process and transmit that data in order to run the service for you, and nothing more. We do not use your data to train models for other customers. How we handle personal data is set out in our Privacy Policy.",
  },
  {
    title: "Third-party platforms",
    body: "Magic Agent runs on the official WhatsApp Business API, and parts of our service depend on Meta, cloud hosting and payment providers. Those platforms set their own policies, approval processes and charges, and can change them without notice to us. We are not responsible for a third party suspending, rate-limiting or repricing a channel, though we will tell you promptly and help you work around it where we can.",
  },
  {
    title: "Fees, invoices and taxes",
    body: "Subscription fees are quoted in Indian rupees per workspace and per volume tier, and are billed in advance for the term you choose. Setup, onboarding, integration and custom development are quoted separately.",
    points: [
      "Fees are exclusive of GST and any other applicable tax, which is added at the prevailing rate.",
      "Conversation charges levied by WhatsApp or Meta, and any other third-party charge, are passed through at cost and billed in arrears.",
      "Invoices are payable within the period stated on the invoice. Overdue amounts may attract interest at 1.5% per month, and we may suspend service after written notice.",
      "Usage beyond your plan's volume tier is billed at the overage rate in your quote.",
      "Discounts for start-ups, MSMEs and NGOs apply only where eligibility is confirmed at the time of quoting.",
    ],
  },
  {
    title: "Term, renewal and cancellation",
    body: "Your subscription runs for the term set out in your quote and renews for successive terms of the same length unless either of us gives notice before the current term ends. Cancellation takes effect at the end of the paid term. What is and is not refundable is set out in our Refund and Cancellation Policy.",
  },
  {
    title: "Support and availability",
    body: "Support is provided by email on every plan during our published hours, with priority response on Growth and an agreed SLA on Enterprise. We aim for continuous availability but do not guarantee uninterrupted service: planned maintenance is notified in advance where practical, and emergency maintenance may happen without notice.",
  },
  {
    title: "Intellectual property",
    body: "The platforms, their source code, design, documentation and the Native UI kit remain our property and that of our licensors. You get a non-exclusive, non-transferable right to use them for your own business during your subscription. Where we build a custom integration for you, we retain the underlying tooling and you get a perpetual licence to use the deliverable in your business. Feedback you give us, we may use freely.",
  },
  {
    title: "Confidentiality",
    body: "Each of us will keep the other's non-public information confidential, use it only to perform this agreement, and protect it with at least reasonable care. This does not cover information that is already public, independently developed, or required to be disclosed by law or a regulator — in which case we will tell you first, unless we are barred from doing so.",
  },
  {
    title: "Warranties and disclaimers",
    body: "We warrant that we will provide the service with reasonable skill and care, by suitably qualified people. Beyond that, the platforms are provided as they are. Our AI features generate responses from the documents and data you supply, and while they are designed to refuse what they do not know, we do not warrant that every output is accurate or fit for a given purpose. You are responsible for reviewing outputs before relying on them for pricing, legal, medical or financial decisions.",
  },
  {
    title: "Limitation of liability",
    body: "Neither of us is liable for indirect or consequential loss, or for loss of profit, revenue, goodwill or anticipated savings. Our total liability arising out of or in connection with this agreement is limited to the fees you paid us in the twelve months before the event giving rise to the claim. Nothing in these terms limits liability for fraud, wilful misconduct, or anything else that cannot be limited under Indian law.",
  },
  {
    title: "Indemnity",
    body: "You will indemnify us against claims brought by a third party arising from your data, from your use of the platforms in breach of these terms, or from messages sent through your workspace to people who did not consent to receive them.",
  },
  {
    title: "Suspension and termination",
    body: "We may suspend or terminate access where fees are materially overdue, where use breaches the acceptable use section above, or where a third-party platform requires it. Either of us may terminate for material breach that is not remedied within thirty days of written notice. On termination we keep your data available for export for thirty days, after which it is deleted in the ordinary course.",
  },
  {
    title: "Changes",
    body: "We improve the platforms continuously, and features may be added, changed or retired. We will not materially reduce the core functionality of a plan during a paid term. We may revise these terms, and where a revision materially affects you we will give notice before it applies to your next renewal.",
  },
  {
    title: "Governing law and jurisdiction",
    body: "This agreement is governed by the laws of India. The courts at Gautam Buddh Nagar, Uttar Pradesh have exclusive jurisdiction, save that either of us may seek injunctive relief in any competent court. We will both attempt to resolve a dispute in good faith before starting proceedings.",
  },
];

/* ------------------------------------------------------------------ */
/* Refund and Cancellation                                             */
/* ------------------------------------------------------------------ */

export const refund: LegalSection[] = [
  {
    title: "The short version",
    body: "We sell subscription software and configuration work, not goods. Subscription fees are charged in advance and are not refunded part-way through a term. You can cancel at any time, and it takes effect at the end of the term you have paid for. Where we have taken money in error, or failed to deliver what you paid for, we refund it.",
  },
  {
    title: "Subscription fees",
    body: "Fees for a monthly, quarterly or annual term are earned when the term begins and are not refundable in part if you stop using the platform before the term ends. Cancelling stops the next renewal; it does not end the current term early or create a credit for unused days. Where you downgrade a plan mid-term, the new rate applies from the next renewal.",
  },
  {
    title: "Setup, onboarding and custom work",
    body: "Setup, onboarding, WhatsApp Business API provisioning, data migration and custom integration are charged for the work itself. Once that work has begun it is not refundable, because the cost is our team's time rather than access to software. If you cancel a project before work begins, we refund what you have paid for it in full.",
  },
  {
    title: "Pass-through charges",
    body: "Conversation charges levied by WhatsApp or Meta, domain and hosting charges, SMS and email charges, and creator payouts already released through RichyReach escrow are not refundable by us once incurred. We bill these at cost and have no ability to reverse them. Escrow funds not yet released to a creator are returned under the terms of that campaign.",
  },
  {
    title: "When we do refund",
    body: "We refund without argument in these situations:",
    points: [
      "You were charged twice for the same period, or charged after a cancellation we had confirmed.",
      "An invoice was raised in error, or for the wrong amount or the wrong plan.",
      "We took payment and were then unable to provision the platform you bought.",
      "We terminate your subscription for our own convenience mid-term — in which case we refund the unused portion pro rata.",
      "A statutory right to a refund applies under Indian consumer law.",
    ],
  },
  {
    title: "How to cancel",
    body: "Write to us from the email address on the account, or tell your account manager, at least seven days before your renewal date. We will confirm the cancellation and the date it takes effect in writing. Your data stays available for export for thirty days after the subscription ends. A cancellation request made through any other channel is not effective until we confirm it.",
  },
  {
    title: "How to request a refund",
    body: "Send the request to us with your invoice number, the amount, and what went wrong.",
    points: [
      "We acknowledge every request within 3 working days.",
      "We decide, and tell you the outcome with reasons, within 7 working days of receiving the information we need.",
      "Approved refunds are credited to the original payment method within 7 to 10 working days, subject to your bank.",
      "Refunds are made net of any third-party charge already incurred, and of tax already remitted where it cannot be reclaimed.",
    ],
  },
  {
    title: "Trials and pilots",
    body: "Where we agree a free trial or a paid pilot, its terms are set out in writing at the time, and a paid pilot is refundable only on the basis stated there. A trial converts to a paid subscription only where you have confirmed that in writing.",
  },
  {
    title: "Chargebacks",
    body: "Please raise a billing dispute with us before raising it with your bank. A chargeback filed without contacting us first may result in the workspace being suspended until the matter is resolved, and we will give the payment provider the account and usage records relevant to the claim.",
  },
];

/* ------------------------------------------------------------------ */
/* Privacy                                                             */
/* ------------------------------------------------------------------ */

export const privacy: LegalSection[] = [
  {
    title: "What we collect",
    body: "When you submit an enquiry we collect the name, company, email address, phone number and message you give us. Our platforms collect whatever the operating business configures them to collect — for example, a Magic Reward campaign may capture a name and phone number, and a Magic Forms form captures the fields its author defined. We also log basic technical information about visits to this site, such as the page requested, the referring page and the approximate region.",
  },
  {
    title: "Why we collect it",
    body: "To answer your enquiry, to provide and support the platform you signed up for, to keep the service secure, and to meet our legal and accounting obligations. We do not sell personal data, and we do not use your data to train models for other customers.",
  },
  {
    title: "Who acts as controller",
    body: "For enquiries made through this site, Magic Webs is the data controller. For data collected through a customer's own campaign, form or WhatsApp agent, that customer is the controller and Magic Webs acts as the processor on their instructions. Requests about data held in a customer's workspace are passed to that customer.",
  },
  {
    title: "Sharing and processors",
    body: "We use third-party services to deliver our platforms — including WhatsApp and Meta for messaging, and the hosting, payment and analytics providers named in our contracts. Each receives only the data needed to perform its function, under terms that restrict what they may do with it. We disclose data to a public authority only where the law requires it.",
  },
  {
    title: "Security",
    body: "Access to production data is restricted to the people who need it, credentials live in a secrets manager rather than in code, data is encrypted in transit, and webhook payloads are signed. No system is perfectly secure, so we also plan for failure: we keep backups, and we will notify you and the relevant authority of a breach affecting your data without undue delay.",
  },
  {
    title: "Where data is held",
    body: "Our infrastructure and that of our processors may hold data outside India. Where that happens, transfers are made under contractual terms carrying the same protections described here, and only to countries not restricted for such transfers under Indian law.",
  },
  {
    title: "Retention",
    body: "Enquiry correspondence is kept for as long as we have an active relationship, and afterwards only as long as our accounting obligations require. Platform data is retained per the operating customer's configuration, remains available for export for thirty days after a subscription ends, and is deleted on request.",
  },
  {
    title: "Your rights",
    body: "You can ask us for a copy of the personal data we hold about you, ask us to correct it, ask us to delete it, or withdraw a consent you previously gave. You can also nominate someone to exercise these rights on your behalf if you are unable to. Write to us and we will respond within a reasonable period, and in any case within the period the law allows.",
  },
  {
    title: "Cookies",
    body: "This site uses only what is needed to serve pages and remember your preferences, plus first-party analytics that counts visits without profiling you across other sites. Our platform dashboards use a session cookie to keep you signed in.",
  },
  {
    title: "Children",
    body: "Our platforms are sold to businesses and are not directed at children. We do not knowingly collect personal data from anyone under 18. If you believe a child's data has reached us through one of our platforms, tell us and we will delete it.",
  },
  {
    title: "Changes to this policy",
    body: "When this policy changes we update the revision date on this page, and where the change materially affects how we handle your data we tell active customers directly.",
  },
];
