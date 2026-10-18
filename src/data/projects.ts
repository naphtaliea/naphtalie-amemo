export type ProjectStatus = "In daily use" | "Launched" | "Live";
export type Severity = "Critical" | "High" | "Medium" | "Low";

export interface Project {
  slug: string;
  title: string;
  period: string;
  status: ProjectStatus;
  summary: string;
  proof: string;
  tags: string[];
  highlights: string[];
  more: string[];
  live: { href: string; label: string };
  image: { src: string; alt: string; width: number; height: number };
}

export interface SecurityItem {
  title: string;
  period: string;
  description: string;
  tags: string[];
  severity?: Severity;
}

export const PROJECTS: Project[] = [
  {
    slug: "bedarts-pos",
    title: "Bedarts POS and online store",
    period: "2026 – Present",
    status: "In daily use",
    summary: "Point-of-sale and ordering system for a cold store, in daily use for a month.",
    proof: "Offline-first till, 22 Playwright tests",
    tags: ["Next.js", "TypeScript", "Supabase", "Cloudflare"],
    highlights: [
      "Built the till to work offline: a queued sale leaves the device only after the server confirms it, and an idempotency key stops retries from recording a sale twice.",
      "Closed security holes found in review: signup that let anyone make themselves admin, public access to sale and stock functions and to cost prices, and customer-set order prices.",
      "Debugged end-of-day cash reconciliation and refunds in live use, including refunds charged to the wrong payment method and row-level-security reads that silently returned nothing. 22 Playwright tests cover the till on desktop and mobile.",
    ],
    more: [
      "Admin, manager and cashier roles, with split payments across cash, mobile money and card.",
      "Stock tracked in batches with expiry dates, PDF receipts and partial-item refunds.",
      "The online store lets customers order and pay online.",
    ],
    live: { href: "https://storefront.bedarts.workers.dev", label: "Open the online store" },
    image: { src: "/projects/bedarts-store.jpg", alt: "Home page of the Bedarts Cold Supplies online store", width: 1200, height: 750 },
  },
  {
    slug: "carrington-express",
    title: "Carrington Express",
    period: "2026",
    status: "Launched",
    summary: "Intercity bus booking app, launched in September.",
    proof: "Signature-verified payments, seat locking",
    tags: ["React 19", "TanStack Start", "Cloudflare Workers", "Supabase"],
    highlights: [
      "Built Paystack checkout with a signature-verified webhook, and Postgres seat locking to prevent double booking.",
      "Added ticket emails, QR ticket scanning, automatic cancellation of stale bookings and Turnstile on forms.",
    ],
    more: [
      "Admin dashboard for trips, bookings, routes and pickup points.",
      "Sentry error tracking and KV caching of trip data.",
      "Payments are currently paused.",
    ],
    live: { href: "https://carringtonexpress.com", label: "Visit Carrington Express" },
    image: { src: "/projects/carrington-express.jpg", alt: "Home page of the Carrington Express bus booking site", width: 1200, height: 750 },
  },
  {
    slug: "rapidboost",
    title: "RapidBoost",
    period: "2026 – Present",
    status: "Live",
    summary: "Social media marketing platform for Ghana.",
    proof: "Pentested my own platform, 59 unit tests",
    tags: ["TanStack Start", "Supabase", "Firebase"],
    highlights: [
      "Pentested my own platform and fixed the findings: a storage bucket anyone could read and write (now private, with signed URLs), anonymous access to pricing functions, and supplier details leaking in API responses.",
      "Replaced a racy rate limiter with an atomic advisory-lock check and confirmed it holds under 25 simultaneous requests. Added a domain allowlist to stop an open redirect.",
      "Fixed money bugs: wallet refunds when an order insert fails, and an admin profit chart that counted unpaid and refunded orders as revenue. Covered by 59 unit tests and Playwright tests, plus k6 load tests that refuse to run against production.",
    ],
    more: [
      "Korapay payments with an HMAC-verified webhook.",
      "Reseller storefronts, an affiliate programme and a public API.",
      "Sentry monitoring with session replay.",
    ],
    live: { href: "https://rapidboostgh.com", label: "Visit RapidBoost" },
    image: { src: "/projects/rapidboost.jpg", alt: "Home page of the RapidBoost social media marketing platform", width: 1200, height: 750 },
  },
  {
    slug: "hair-relief",
    title: "Hair Relief",
    period: "2026 – Present",
    status: "Live",
    summary: "E-commerce store for a hair and wig brand.",
    proof: "Mobile-first, guest checkout, pay on delivery",
    tags: ["React", "TanStack Start", "Supabase", "Cloudflare Workers"],
    highlights: [
      "Built a mobile-first shop with guest checkout, pay on delivery and an admin area. Fixed a database join that crashed checkout site-wide and admin pages that would not render.",
    ],
    more: [
      "Shop filters for category, texture, length and price, plus a floating WhatsApp support button.",
      "Owner-editable settings, delivery zones and product variants in the admin.",
      "Checked on 360px and 390px phone screens, with 44px tap targets.",
    ],
    live: { href: "https://shop.jaynelle.workers.dev", label: "Visit Hair Relief" },
    image: { src: "/projects/hair-relief.jpg", alt: "Home page of the Hair Relief wig and hair store", width: 1200, height: 750 },
  },
];

export const SECURITY: SecurityItem[] = [
  {
    title: "RapidBoost penetration test",
    period: "2026",
    description:
      "Pentested my own platform and fixed the findings: a storage bucket anyone could read and write (now private, with signed URLs), anonymous access to pricing functions, and supplier details leaking in API responses. Also replaced a racy rate limiter with an atomic advisory-lock check and added a domain allowlist to stop an open redirect.",
    tags: ["Penetration Testing", "Access Control", "Web Security"],
    severity: "Critical",
  },
  {
    title: "Bedarts POS security review",
    period: "2026",
    description:
      "Closed security holes found in review: signup that let anyone make themselves admin, public access to sale and stock functions and to cost prices, and customer-set order prices.",
    tags: ["Row-Level Security", "Authorization", "Pricing Integrity"],
  },
  {
    title: "Mobile app security assessment (academic project)",
    period: "2026",
    description:
      "Assessed a food-delivery app and documented multiple CVEs/CWEs, including a denial-of-service flaw and insecure token storage.",
    tags: ["Mobile Security", "CVE/CWE", "Vulnerability Assessment"],
  },
  {
    title: "Home security lab",
    period: "2024 – Present",
    description: "Wazuh SIEM, Kali Linux and Metasploitable 2 for practising penetration testing.",
    tags: ["Wazuh", "Kali Linux", "Metasploitable 2"],
  },
];
