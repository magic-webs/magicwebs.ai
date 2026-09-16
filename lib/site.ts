/**
 * Single source of truth for site copy.
 *
 * Company facts are taken from magicwebs.in; platform copy is taken from each
 * product's own site (agent./reward./forms./native-ui.magicwebs.ai and
 * richyreach.com). Magic 360 is deliberately excluded.
 */

export const company = {
  name: "Magic Webs",
  legalName: "Magic Webs Technologies Pvt Ltd",
  domain: "magicwebs.ai",
  tagline: "Automate Your Business With Magic Webs",
  // Short line for the hero.
  heroSub: "We automate the work your team keeps repeating.",
  // Longer form, used for the meta/OG description where the length earns its keep.
  sub: "AI agents that sell on WhatsApp, forms your team can ship, campaigns that turn footfall into customers, creator marketing with escrow, and a native UI kit — built and run by Magic Webs.",
  blurb:
    "A decade of putting businesses online — websites, storefronts, search, WhatsApp. Magic Webs is where that work became product.",
  email: "contact@magicwebs.in",
  phone: "9999-064-055",
  phoneHref: "+919999064055",
  hours: "Mon–Sun, 9am–6pm",
  offices: [
    {
      label: "Noida",
      lines: ["Office No. 705, ABC Tower-1", "Sector 135, Noida, UP 201305"],
    },
    {
      label: "Delhi",
      lines: ["B-3/46A, Main Service Road", "Yamuna Vihar, Delhi"],
    },
  ],
  social: [
    { label: "LinkedIn", href: "https://linkedin.com/company/magicwebs.in" },
    { label: "Instagram", href: "https://instagram.com/magicwebs.in" },
    { label: "Facebook", href: "https://facebook.com/magicwebs.in" },
    { label: "Twitter", href: "https://twitter.com/magicwebs.in" },
  ],
  note: "Discount available for Start-up, MSME & NGO.",
} as const;

export type Platform = {
  slug: string;
  name: string;
  kind: string;
  tag: string;
  claim: string;
  url: string;
  theme: string;
  initials: string;
  swatch: string;
  intro: string;
  features: { title: string; text: string }[];
  useCases: string[];
  stats?: { value: string; label: string }[];
  builtWith?: string[];
};

export const platforms: Platform[] = [
  {
    slug: "magic-agent",
    name: "Magic Agent",
    kind: "AI sales assistant",
    tag: "WhatsApp AI",
    claim: "Your AI sales assistant on WhatsApp.",
    url: "https://agent.magicwebs.ai/",
    theme: "forest",
    initials: "AG",
    swatch: "var(--color-teal)",
    intro:
      "Answers enquiries on WhatsApp from your pricing and policies — not the open internet — then hands your team a structured enquiry, ready to price.",
    features: [
      {
        title: "Answers from your documents",
        text: "Delivery policies, minimum orders, artwork specs.",
      },
      {
        title: "Intelligent question flow",
        text: "Asks the right questions, one at a time, until nothing is missing.",
      },
      {
        title: "Native WhatsApp",
        text: "Runs on the number your customers already message.",
      },
      {
        title: "Structured enquiries",
        text: "Every spec structured and ready to price.",
      },
      {
        title: "Your brand voice",
        text: "Your business name, role, tone and boundaries.",
      },
      {
        title: "System integration",
        text: "Real-time lookups against your existing systems.",
      },
      {
        title: "Smart routing",
        text: "Sales, support, payments or accounts — invisibly.",
      },
      {
        title: "Safety guardrails",
        text: "Never invents prices or dates. Complaints escalate.",
      },
    ],
    useCases: [
      "E-commerce order enquiries",
      "Quote and estimate requests",
      "Customer support triage",
      "Order status updates",
    ],
  },
  {
    slug: "richyreach",
    name: "RichyReach",
    kind: "Influencer marketing",
    tag: "Creators",
    claim: "Where creators get rich, and brands get reach.",
    url: "https://richyreach.com/",
    theme: "terracotta",
    initials: "RR",
    swatch: "var(--color-terracotta)",
    intro:
      "Matches creators with brands, then runs the collaboration — matching, campaigns, verified metrics, escrow payments.",
    features: [
      {
        title: "Tailored matchmaking",
        text: "Discover creators by content, location and audience.",
      },
      {
        title: "Escrow-secured payments",
        text: "Funds locked before content, released on approval.",
      },
      {
        title: "Advanced performance tracking",
        text: "Follower growth, engagement, clicks and ROI.",
      },
      {
        title: "Creator profiles",
        text: "Automated stats, verified followers, clear pricing.",
      },
      {
        title: "Campaigns marketplace",
        text: "Brands post briefs with locked budgets. Creators apply.",
      },
      {
        title: "Home dashboard",
        text: "Campaigns, notifications and payouts in one place.",
      },
    ],
    useCases: [
      "Premium creators seeking fair, on-time compensation",
      "Brands pursuing measurable campaign ROI",
      "Verified audience metrics before you spend",
      "Rate negotiation backed by performance data",
    ],
    stats: [
      { value: "2,400+", label: "Verified creators and brands" },
      { value: "₹1.8Cr+", label: "Settled in escrow payouts" },
      { value: "350+", label: "Campaigns completed" },
      { value: "4.8x", label: "Average campaign ROI" },
    ],
  },
  {
    slug: "magic-reward",
    name: "Magic Reward",
    kind: "Campaign engine",
    tag: "Spin to win",
    claim: "Spin-to-win campaigns that turn footfall into customers.",
    url: "https://reward.magicwebs.ai/",
    theme: "sage",
    initials: "RW",
    swatch: "var(--color-sage)",
    intro:
      "A branded prize wheel on any device. Set the odds, collect the details, watch results land live. No code.",
    features: [
      {
        title: "Custom artwork",
        text: "Your own wheel, background and pointer art.",
      },
      {
        title: "Controlled odds",
        text: "Weight each prize. The draw honours your odds.",
      },
      {
        title: "Data collection",
        text: "Names, numbers and custom fields, automatically.",
      },
      {
        title: "Deduplication",
        text: "One spin per person, enforced by phone number.",
      },
      {
        title: "Magic links",
        text: "Personalised result links per registration.",
      },
      {
        title: "Live dashboard",
        text: "Live registrations and prizes, filterable by date.",
      },
      {
        title: "Signed webhooks",
        text: "Results straight into your CRM, HMAC verified.",
      },
      {
        title: "Mobile app",
        text: "Manage wheels and odds from the shop floor.",
      },
    ],
    useCases: [
      "Turn foot traffic into an owned customer list",
      "Run it from a QR code, social story or SMS",
      "Manage campaigns from the shop floor",
      "Stream results directly into your CRM",
    ],
  },
  {
    slug: "magic-forms",
    name: "Magic Forms",
    kind: "Forms platform",
    tag: "Forms",
    claim: "Forms your whole company can ship.",
    url: "https://forms.magicwebs.ai/",
    theme: "sand",
    initials: "FM",
    swatch: "var(--color-sand)",
    intro:
      "Build it, share one link, collect the answers. Webhooks and a REST API behind it.",
    features: [
      {
        title: "Multi-step forms",
        text: "Up to 20 steps, with progress indicators.",
      },
      {
        title: "23 field types",
        text: "Email, date, choice, slider, rating, file upload.",
      },
      {
        title: "Workspaces",
        text: "Company workspaces with member roles.",
      },
      {
        title: "Shareable links",
        text: "One link per form, one per workspace.",
      },
      {
        title: "Submission management",
        text: "Filtering and CSV export.",
      },
      {
        title: "Webhooks",
        text: "10 signed events, auto-retried and logged.",
      },
      {
        title: "REST API",
        text: "Schemas, submissions and responses.",
      },
      {
        title: "Secure by default",
        text: "HMAC-SHA256 signing, delivery logs, CORS.",
      },
    ],
    useCases: [
      "Onboarding intake",
      "Support triage",
      "Lead capture and qualification",
      "Internal requests and approvals",
    ],
    builtWith: ["Next.js", "shadcn/ui", "Convex"],
  },
  {
    slug: "magic-native-ui",
    name: "Magic Native UI",
    kind: "Component library",
    tag: "For developers",
    claim: "Components for React Native, built the way shadcn/ui builds for the web.",
    url: "https://native-ui.magicwebs.ai/",
    theme: "warm-grey",
    initials: "UI",
    swatch: "var(--color-warm-grey)",
    intro:
      "17 accessible Expo components. Install via CLI, own the code, style with Tailwind.",
    features: [
      {
        title: "One source, three platforms",
        text: "iOS, Android and web from the same source.",
      },
      {
        title: "You own the code",
        text: "Installed via CLI and owned by you.",
      },
      {
        title: "Accessibility built in",
        text: "Overlays and form controls carry the right roles and states.",
      },
      {
        title: "17 components",
        text: "Text, Button, Tab Bar, Badge, Card, Input, OTP, Dialog and more.",
      },
    ],
    useCases: [
      "Ship an Expo app without building a design system first",
      "Keep iOS, Android and web visually identical",
      "Avoid vendor lock-in on your UI layer",
      "Style native apps with the Tailwind syntax your team knows",
    ],
    stats: [{ value: "17", label: "Accessible components" }],
  },
];

export function getPlatform(slug: string) {
  return platforms.find((p) => p.slug === slug);
}

export const services = [
  {
    title: "WhatsApp Business API",
    text: "Official API provisioning, AI chatbots, broadcasts, shared inbox, templates.",
  },
  {
    title: "Conversational automation",
    text: "Chatflows, drip sequences, catalogue and payments — enquiries become orders.",
  },
  {
    title: "Website design",
    text: "Built to be found and to convert.",
  },
  {
    title: "E-commerce portals",
    text: "Wired into the marketplaces and payment rails you already use.",
  },
  {
    title: "Digital marketing",
    text: "SEO, social and paid, run as one programme.",
  },
  {
    title: "API integration",
    text: "Your site, CRM and operations in a single flow.",
  },
];

export const stats = [
  { value: "80%", label: "Of queries resolved automatically" },
  { value: "6x", label: "Increase in search traffic" },
  { value: "Zero", label: "Commission on WhatsApp product sales" },
  { value: "5", label: "Platforms live and shipping" },
];

export const industries = [
  {
    title: "E-commerce",
    text: "Catalogue, checkout and support on WhatsApp.",
  },
  {
    title: "Travel & hospitality",
    text: "Where a structured question flow beats a contact form.",
  },
  {
    title: "Healthcare",
    text: "Intake and triage with guardrails and an audit trail.",
  },
  {
    title: "Education",
    text: "Admissions intake, routing and parent comms at season volume.",
  },
];

export const clients = [
  "London Academy",
  "Sukh Gill PhotoGram",
  "CK Home Solutions",
  "Sant RLD Public School",
  "Sure Invest",
  "BIE Institute",
  "EdMaster",
  "SDPMS",
];

export const partners = [
  "Google",
  "Meta",
  "WhatsApp",
  "ChatGPT",
  "YouTube",
  "Shopify",
  "WooCommerce",
  "HubSpot",
  "PayPal",
  "Amazon",
  "Flipkart",
  "Meesho",
];

export const team = [
  { name: "Sanjeev Patel", role: "Chief Executive Officer" },
  { name: "William Mathew", role: "Executive" },
  { name: "Grace Harper", role: "Executive" },
];

export const steps = [
  {
    num: "01",
    title: "Map the repetition",
    text: "We find the questions and follow-ups answered the same way every time.",
  },
  {
    num: "02",
    title: "Pick the platform",
    text: "Usually one, sometimes two. We will say when the answer is none.",
  },
  {
    num: "03",
    title: "Wire it to your systems",
    text: "Signed webhooks and REST APIs into your CRM, catalogue and inbox.",
  },
  {
    num: "04",
    title: "Measure and tune",
    text: "Dashboards show what resolves automatically. We tune against that.",
  },
];

export const pricing = [
  {
    name: "Starter",
    price: "On request",
    note: "One platform, one workspace",
    text: "One platform live, configured, with your team trained.",
    features: [
      "One platform of your choice",
      "Standard onboarding and setup",
      "Email support, Mon–Sun",
      "Shared inbox for one number",
      "CSV export and basic reporting",
    ],
    cta: "Talk to us",
    featured: false,
  },
  {
    name: "Growth",
    price: "On request",
    note: "The usual starting point",
    text: "Several platforms, wired into your CRM and actually configured.",
    features: [
      "Up to three platforms",
      "WhatsApp Business API provisioning",
      "Signed webhooks and REST API access",
      "Chatflow and drip campaign setup",
      "Live dashboards and priority support",
    ],
    cta: "Talk to us",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    note: "Multi-location and high volume",
    text: "Growth, plus custom integration and rollout across locations.",
    features: [
      "Every platform",
      "Custom third-party API integration",
      "Dedicated account and solution engineer",
      "Role management across workspaces",
      "SLA-backed support",
    ],
    cta: "Talk to us",
    featured: false,
  },
];

export const faqs = [
  {
    q: "Do I need a new phone number for Magic Agent?",
    a: "No — it runs on your existing business number, through the official API.",
  },
  {
    q: "Will the AI make up prices?",
    a: "No. It answers from your documents, and escalates complaints to a person.",
  },
  {
    q: "Can these platforms talk to our CRM?",
    a: "Yes — signed webhooks with HMAC verification, plus a REST API on Forms.",
  },
  {
    q: "Do we have to use every platform?",
    a: "No. Most start with one. They are useful on their own.",
  },
  {
    q: "Is there a discount for smaller organisations?",
    a: "Yes, for start-ups, MSMEs and NGOs. Mention it when you write.",
  },
  {
    q: "Who actually builds this?",
    a: "Magic Webs Technologies Pvt Ltd — Noida and Delhi. Official WhatsApp API provider, Google certified.",
  },
];

export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];
