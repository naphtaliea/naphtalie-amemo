import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { PROJECTS, SECURITY, type Project, type SecurityItem, type Severity } from "@/data/projects";

const SEVERITY_STYLES: Record<Severity, string> = {
  Critical: "bg-[hsl(var(--severity-critical)/0.1)] text-[hsl(var(--severity-critical))] border-[hsl(var(--severity-critical)/0.3)]",
  High: "bg-[hsl(var(--severity-high)/0.1)] text-[hsl(var(--severity-high))] border-[hsl(var(--severity-high)/0.3)]",
  Medium: "bg-[hsl(var(--severity-medium)/0.1)] text-[hsl(var(--severity-medium))] border-[hsl(var(--severity-medium)/0.3)]",
  Low: "bg-[hsl(var(--severity-low)/0.1)] text-[hsl(var(--severity-low))] border-[hsl(var(--severity-low)/0.3)]",
};

const STATUS_STYLES: Record<Project["status"], string> = {
  "In daily use": "bg-primary/10 text-primary border-primary/30",
  Live: "bg-primary/10 text-primary border-primary/30",
  Launched: "bg-secondary text-muted-foreground border-border",
};

const Chip = ({ className, children }: { className: string; children: React.ReactNode }) => (
  <span className={`font-mono text-xs uppercase tracking-wide px-2 py-0.5 rounded border ${className}`}>{children}</span>
);

const ProjectCard = ({ project }: { project: Project }) => (
  <article className="flex flex-col border border-border rounded-lg bg-card overflow-hidden hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
    {/* Duplicate of the text link below, so it is hidden from keyboard and screen readers. */}
    <a href={project.live.href} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true" className="block">
      <div className="flex items-center gap-2 px-4 py-2 bg-background/60 border-b border-border">
        <span className="w-2.5 h-2.5 rounded-full bg-destructive" />
        <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/50" />
        <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
        <span className="ml-2 font-mono text-xs text-muted-foreground truncate">{new URL(project.live.href).host}</span>
      </div>
      <img
        src={project.image.src}
        alt={project.image.alt}
        width={project.image.width}
        height={project.image.height}
        loading="lazy"
        decoding="async"
        className="w-full h-auto"
      />
    </a>

    <div className="flex flex-col flex-1 p-6">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="font-mono text-xs text-muted-foreground">{project.period}</span>
        <Chip className={STATUS_STYLES[project.status]}>{project.status}</Chip>
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
      <p className="text-muted-foreground text-sm mb-3">{project.summary}</p>
      <p className="font-mono text-sm text-primary mb-4">$ {project.proof}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-0 text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      <details className="group mt-auto">
        <summary className="flex items-center gap-2 min-h-[44px] cursor-pointer list-none font-mono text-sm text-primary [&::-webkit-details-marker]:hidden">
          What I built and fixed
          <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <ul className="list-disc pl-5 space-y-2 text-sm text-foreground/85 mt-2 mb-4">
          {project.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mb-2">
          {project.more.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </details>

      <a
        href={project.live.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 min-h-[44px] font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        {project.live.label}
        <ExternalLink className="w-4 h-4" aria-hidden="true" />
      </a>
    </div>
  </article>
);

const SecurityCard = ({ item }: { item: SecurityItem }) => (
  <article className="border border-border rounded-lg p-6 bg-card hover:border-primary/50 transition-colors">
    <div className="flex flex-wrap items-center gap-2 mb-2">
      <span className="font-mono text-xs text-muted-foreground">{item.period}</span>
      {item.severity && <Chip className={SEVERITY_STYLES[item.severity]}>{item.severity}</Chip>}
    </div>
    <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
    <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
    <div className="flex flex-wrap gap-2">
      {item.tags.map((tag) => (
        <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-0 text-xs">
          {tag}
        </Badge>
      ))}
    </div>
  </article>
);

const TABS = [
  { id: "dev", label: "Projects" },
  { id: "security", label: "Security Experience" },
] as const;

const Projects = () => {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["id"]>("dev");

  return (
    <section id="projects" className="py-20 md:py-32 bg-secondary/30 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <m.div
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
        </m.div>

        <div className="flex justify-center mb-10">
          <div role="tablist" aria-label="Project categories" className="inline-flex rounded-lg bg-secondary/50 p-1 border border-border">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={activeTab === tab.id}
                aria-controls="projects-panel"
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 min-h-[44px] text-sm font-medium rounded-md transition-all duration-200 ${
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

        <div id="projects-panel" role="tabpanel" aria-labelledby={`tab-${activeTab}`} className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <m.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className={activeTab === "dev" ? "grid md:grid-cols-2 gap-6 items-stretch" : "flex flex-col gap-4 max-w-3xl mx-auto"}
            >
              {activeTab === "dev"
                ? PROJECTS.map((project) => <ProjectCard key={project.slug} project={project} />)
                : SECURITY.map((item) => <SecurityCard key={item.title} item={item} />)}
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Projects;
