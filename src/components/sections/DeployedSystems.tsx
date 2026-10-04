import { Github, ExternalLink } from "lucide-react";
import SectionHeading from "./SectionHeading";

interface System {
  name: string;
  description: string;
  stack: string[];
  status: "Live" | "Built";
  github?: string;
  live?: string;
}

const SYSTEMS: System[] = [
  {
    name: "RapidBoost",
    description:
      "Self-built e-commerce/SMM platform for social media growth services, with payment integration and an admin dashboard.",
    stack: ["React", "TypeScript", "Supabase", "Vercel"],
    status: "Live",
    live: "https://rapidboostgh.com",
  },
  {
    name: "Carrington Express",
    description: "Logistics/booking application for intercity bus travel in Ghana.",
    stack: ["React", "TypeScript", "Cloudflare Workers", "Supabase", "Paystack"],
    status: "Live",
    live: "https://carringtonexpress.com",
  },
  {
    name: "Bedarts Storefront",
    description: "Customer-facing storefront for Bedarts, backed by Supabase.",
    stack: ["Next.js", "TypeScript", "Supabase"],
    status: "Live",
    live: "https://bedarts-storefront.vercel.app",
  },
  {
    name: "Bedarts POS",
    description:
      "Installable, offline-capable point-of-sale system for Bedarts — Supabase-backed sales data, PDF receipts, and analytics. Staff-facing, not publicly browsable.",
    stack: ["Next.js", "TypeScript", "Supabase", "PWA"],
    status: "Live",
  },
];

const DeployedSystems = () => {
  return (
    <section id="systems" className="py-16 md:py-24 border-b border-border">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading number="04" title="Deployed systems" subtitle="Products I've built and shipped end to end." />

        <div className="max-w-3xl">
          {/* Column headers — visible on larger screens where the row has room */}
          <div className="hidden md:flex items-baseline justify-between gap-4 pb-2 case-label">
            <span className="w-32 shrink-0">Name</span>
            <span className="flex-1">Stack &amp; description</span>
            <span className="w-16 shrink-0 text-right">Status</span>
            <span className="w-8 shrink-0" />
          </div>

          {SYSTEMS.map((system) => (
            <div key={system.name} className="ledger-row flex flex-col md:flex-row md:items-start justify-between gap-2 md:gap-4">
              <span className="font-semibold text-foreground md:w-32 shrink-0">{system.name}</span>
              <div className="flex-1">
                <p className="text-muted-foreground text-sm mb-1.5">{system.description}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {system.stack.map((tech) => (
                    <span key={tech} className="font-mono text-xs text-primary/80">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <span className="font-mono text-xs md:w-16 shrink-0 md:text-right uppercase tracking-wide text-muted-foreground">
                {system.status}
              </span>
              <div className="flex items-center gap-3 md:w-8 shrink-0">
                {system.github && (
                  <a
                    href={system.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`${system.name} GitHub`}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {system.live && (
                  <a
                    href={system.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`${system.name} live site`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeployedSystems;
