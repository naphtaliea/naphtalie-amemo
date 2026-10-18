import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

interface Project {
  name: string;
  period: string;
  summary: string;
  stack: string[];
  highlights: string[];
  more: string[];
  link: { href: string; label: string };
}

const PROJECTS: Project[] = [
  {
    name: "Bedarts POS and online store",
    period: "2026 – Present",
    summary: "Point-of-sale and ordering system for a cold store, in daily use for a month.",
    stack: ["Next.js", "TypeScript", "Supabase", "Cloudflare"],
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
    link: { href: "https://storefront.bedarts.workers.dev", label: "Online store" },
  },
  {
    name: "Carrington Express",
    period: "2026",
    summary: "Intercity bus booking app, launched in September.",
    stack: ["React 19", "TanStack Start", "Cloudflare Workers", "Supabase"],
    highlights: [
      "Built Paystack checkout with a signature-verified webhook, and Postgres seat locking to prevent double booking.",
      "Added ticket emails, QR ticket scanning, automatic cancellation of stale bookings and Turnstile on forms.",
    ],
    more: [
      "Admin dashboard for trips, bookings, routes and pickup points.",
      "Sentry error tracking and KV caching of trip data.",
      "Payments are currently paused.",
    ],
    link: { href: "https://carringtonexpress.com", label: "Visit site" },
  },
  {
    name: "RapidBoost",
    period: "2026 – Present",
    summary: "Social media marketing platform for Ghana.",
    stack: ["TanStack Start", "Supabase", "Firebase"],
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
    link: { href: "https://rapidboostgh.com", label: "Visit site" },
  },
  {
    name: "Hair Relief",
    period: "2026 – Present",
    summary: "E-commerce store for a hair and wig brand.",
    stack: ["React", "TanStack Start", "Supabase", "Cloudflare Workers"],
    highlights: [
      "Built a mobile-first shop with guest checkout, pay on delivery and an admin area. Fixed a database join that crashed checkout site-wide and admin pages that would not render.",
    ],
    more: [
      "Shop filters for category, texture, length and price, plus a floating WhatsApp support button.",
      "Owner-editable settings, delivery zones and product variants in the admin.",
      "Checked on 360px and 390px phone screens, with 44px tap targets.",
    ],
    link: { href: "https://shop.jaynelle.workers.dev", label: "Visit site" },
  },
];

const Projects = () => {
  return (
    <section id="work" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading title="Projects" subtitle="Products I've built, run and debugged end to end." />

        <div>
          {PROJECTS.map((project) => (
            <div key={project.name} className="block-link group">
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <p className="font-mono text-xs text-muted-foreground mb-1">{project.period}</p>
                  <h3 className="font-display text-2xl md:text-4xl font-extrabold text-foreground mb-2">
                    <a
                      href={project.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group-hover:text-primary transition-colors"
                    >
                      {project.name}
                    </a>
                  </h3>
                  <p className="text-foreground/60 text-base md:text-lg max-w-xl mb-3">{project.summary}</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4">
                    {project.stack.map((tech) => (
                      <span key={tech} className="font-mono text-xs text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <ul className="list-disc pl-5 space-y-2 text-foreground/70 max-w-2xl mb-3">
                    {project.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground max-w-2xl">
                    {project.more.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <a
                  href={project.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name}: ${project.link.label}`}
                  className="shrink-0"
                >
                  <ArrowUpRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
