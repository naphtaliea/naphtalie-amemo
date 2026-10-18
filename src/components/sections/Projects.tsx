import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

type Severity = "Critical" | "High" | "Medium" | "Low";

interface Project {
  title: string;
  period: string;
  description: string;
  tags: string[];
  highlights: string[];
  more?: string[];
  live?: { href: string; label: string };
  severity?: Severity;
}

const SEVERITY_STYLES: Record<Severity, string> = {
  Critical: "bg-[hsl(var(--severity-critical)/0.1)] text-[hsl(var(--severity-critical))] border-[hsl(var(--severity-critical)/0.3)]",
  High: "bg-[hsl(var(--severity-high)/0.1)] text-[hsl(var(--severity-high))] border-[hsl(var(--severity-high)/0.3)]",
  Medium: "bg-[hsl(var(--severity-medium)/0.1)] text-[hsl(var(--severity-medium))] border-[hsl(var(--severity-medium)/0.3)]",
  Low: "bg-[hsl(var(--severity-low)/0.1)] text-[hsl(var(--severity-low))] border-[hsl(var(--severity-low)/0.3)]",
};

const DEV_PROJECTS: Project[] = [
  {
    title: "Bedarts POS and online store",
    period: "2026 – Present",
    description: "Point-of-sale and ordering system for a cold store, in daily use for a month.",
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
    live: { href: "https://storefront.bedarts.workers.dev", label: "Online store" },
  },
  {
    title: "Carrington Express",
    period: "2026",
    description: "Intercity bus booking app, launched in September.",
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
    live: { href: "https://carringtonexpress.com", label: "Visit site" },
  },
  {
    title: "RapidBoost",
    period: "2026 – Present",
    description: "Social media marketing platform for Ghana.",
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
    live: { href: "https://rapidboostgh.com", label: "Visit site" },
  },
  {
    title: "Hair Relief",
    period: "2026 – Present",
    description: "E-commerce store for a hair and wig brand.",
    tags: ["React", "TanStack Start", "Supabase", "Cloudflare Workers"],
    highlights: [
      "Built a mobile-first shop with guest checkout, pay on delivery and an admin area. Fixed a database join that crashed checkout site-wide and admin pages that would not render.",
    ],
    more: [
      "Shop filters for category, texture, length and price, plus a floating WhatsApp support button.",
      "Owner-editable settings, delivery zones and product variants in the admin.",
      "Checked on 360px and 390px phone screens, with 44px tap targets.",
    ],
    live: { href: "https://shop.jaynelle.workers.dev", label: "Visit site" },
  },
];

const SECURITY_PROJECTS: Project[] = [
  {
    title: "RapidBoost penetration test",
    period: "2026",
    description:
      "Pentested my own platform and fixed the findings: a storage bucket anyone could read and write (now private, with signed URLs), anonymous access to pricing functions, and supplier details leaking in API responses. Also replaced a racy rate limiter with an atomic advisory-lock check and added a domain allowlist to stop an open redirect.",
    tags: ["Penetration Testing", "Access Control", "Web Security"],
    highlights: [],
    severity: "Critical",
  },
  {
    title: "Bedarts POS security review",
    period: "2026",
    description:
      "Closed security holes found in review: signup that let anyone make themselves admin, public access to sale and stock functions and to cost prices, and customer-set order prices.",
    tags: ["Row-Level Security", "Authorization", "Pricing Integrity"],
    highlights: [],
  },
  {
    title: "Mobile app security assessment (academic project)",
    period: "2026",
    description:
      "Assessed a food-delivery app and documented multiple CVEs/CWEs, including a denial-of-service flaw and insecure token storage.",
    tags: ["Mobile Security", "CVE/CWE", "Vulnerability Assessment"],
    highlights: [],
  },
  {
    title: "Home security lab",
    period: "2024 – Present",
    description: "Wazuh SIEM, Kali Linux and Metasploitable 2 for practising penetration testing.",
    tags: ["Wazuh", "Kali Linux", "Metasploitable 2"],
    highlights: [],
  },
];

const TABS = [
  { id: "dev", label: "Projects", projects: DEV_PROJECTS },
  { id: "security", label: "Security Experience", projects: SECURITY_PROJECTS },
];

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="w-full border border-border rounded-lg p-6 bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      <div className="flex-1 min-w-0">
        <p className="font-mono text-xs text-muted-foreground mb-1">{project.period}</p>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
          {project.severity && (
            <span
              className={`font-mono text-[10px] uppercase tracking-wide px-2 py-0.5 rounded border ${SEVERITY_STYLES[project.severity]}`}
            >
              {project.severity}
            </span>
          )}
        </div>
        <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
        {project.highlights.length > 0 && (
          <ul className="list-disc pl-5 space-y-2 text-sm text-foreground/80 mb-4">
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        {project.more && (
          <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground mb-4">
            {project.more.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-primary/10 text-primary border-0 text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      {project.live && (
        <a
          href={project.live.href}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          aria-label={`${project.title}: ${project.live.label}`}
        >
          <span className="font-mono">{project.live.label}</span>
          <ExternalLink className="w-5 h-5" />
        </a>
      )}
    </div>
  </div>
);

const Projects = () => {
  const [activeTab, setActiveTab] = useState("dev");
  const activeProjects = TABS.find((t) => t.id === activeTab)!.projects;

  return (
    <section id="projects" className="py-20 md:py-32 bg-secondary/30 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle mx-auto">
            Products I've built, run and debugged end to end, and the security work around them.
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-lg bg-secondary/50 p-1 border border-border">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project List */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-4"
            >
              {activeProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Projects;
