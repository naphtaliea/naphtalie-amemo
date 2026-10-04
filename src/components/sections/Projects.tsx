import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

interface Project {
  name: string;
  description: string;
  stack: string[];
  live?: string;
}

const PROJECTS: Project[] = [
  {
    name: "RapidBoost",
    description: "E-commerce/SMM platform for social media growth services, with payments and an admin dashboard.",
    stack: ["React", "TypeScript", "Supabase"],
    live: "https://rapidboostgh.com",
  },
  {
    name: "Carrington Express",
    description: "Logistics/booking application for intercity bus travel in Ghana.",
    stack: ["React", "TypeScript", "Cloudflare Workers", "Supabase"],
    live: "https://carringtonexpress.com",
  },
  {
    name: "Bedarts Storefront",
    description: "Customer-facing storefront for Bedarts, backed by Supabase.",
    stack: ["Next.js", "TypeScript", "Supabase"],
    live: "https://bedarts-storefront.vercel.app",
  },
  {
    name: "Bedarts POS",
    description: "Offline-capable point-of-sale system — sales data, receipts, and analytics. Staff-facing.",
    stack: ["Next.js", "TypeScript", "Supabase", "PWA"],
  },
];

const Projects = () => {
  return (
    <section id="work" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading title="Work" subtitle="Products I've built and shipped end to end." />

        <div>
          {PROJECTS.map((project) => (
            <div key={project.name} className="block-link group">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3 className="font-display text-2xl md:text-4xl font-extrabold text-foreground mb-2">
                    {project.live ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group-hover:text-primary transition-colors"
                      >
                        {project.name}
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>
                  <p className="text-foreground/60 text-base md:text-lg max-w-xl mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span key={tech} className="font-mono text-xs text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.name} live site`}
                    className="shrink-0"
                  >
                    <ArrowUpRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
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

export default Projects;
