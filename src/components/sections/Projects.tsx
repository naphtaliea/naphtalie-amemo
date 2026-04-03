import { useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface Project {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
}

const DEV_PROJECTS: Project[] = [
  {
    title: "BookEasy",
    description:
      "A SaaS appointment booking platform for Ghanaian businesses, enabling service providers to manage bookings and accept payments online.",
    tags: ["React", "TypeScript", "Supabase", "Paystack"],
    live: "#",
  },
  {
    title: "GhanaFeed",
    description:
      "A news aggregator that pulls and displays headlines from 11 Ghanaian news sources in one clean feed.",
    tags: ["React", "Node.js", "Express"],
    live: "#",
  },
];

const SECURITY_PROJECTS: Project[] = [
  {
    title: "Home SIEM Lab",
    description:
      "A fully configured home security operations lab using Wazuh for log collection, threat detection, and alerting across three virtual machines.",
    tags: ["Wazuh", "VirtualBox", "Kali Linux", "Ubuntu Server", "Metasploitable 2"],
  },
  {
    title: "Vulnerability Assessment — Metasploitable 2",
    description:
      "A full penetration test and documented vulnerability assessment on Metasploitable 2, covering enumeration, exploitation, and reporting.",
    tags: ["Nmap", "Metasploit", "Kali Linux"],
  },
];

const TABS = [
  { id: "dev", label: "Dev Projects", projects: DEV_PROJECTS },
  { id: "security", label: "Security Projects", projects: SECURITY_PROJECTS },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.4 }}
    className="w-full border border-border rounded-lg p-6 bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
  >
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      <div className="flex-1 min-w-0">
        <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
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
      {(project.github || project.live) && (
        <div className="flex items-center gap-3 shrink-0">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={`${project.title} GitHub`}
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={`${project.title} live demo`}
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      )}
    </div>
  </motion.div>
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
            A selection of development and security projects I've built.
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
              {activeProjects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Projects;
