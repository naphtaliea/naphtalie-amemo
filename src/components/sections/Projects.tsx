import { Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const PROJECTS = [
  {
    title: "Home SIEM Lab",
    description:
      "Built a Security Information and Event Management system using Wazuh on a local VM network to detect and respond to threats in real time.",
    tags: ["Wazuh", "Linux", "VirtualBox", "Networking"],
    github: "#",
    demo: "#",
  },
  {
    title: "CampusMarket",
    description:
      "A student-to-student marketplace for Ghanaian university students with real-time listings, Firebase backend, and Paystack mobile money integration.",
    tags: ["React", "Firebase", "Paystack", "Tailwind"],
    github: "#",
    demo: "#",
  },
  {
    title: "Vulnerability Assessment Report",
    description:
      "Full vulnerability scan on Metasploitable 2 using Nmap and Metasploit, followed by a professional remediation report.",
    tags: ["Nmap", "Metasploit", "Kali Linux"],
    github: "#",
    demo: "#",
  },
  {
    title: "AccraHomes",
    description:
      "A modern real estate listings platform for Accra, Ghana with property search, filtering, and agent contact features.",
    tags: ["React", "Tailwind", "shadcn/ui"],
    github: "#",
    demo: "#",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 md:py-32 bg-secondary/30 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle mx-auto">
            A selection of security projects and tools I've built.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full flex flex-col bg-card border-border hover:border-primary/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-0 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="gap-3">
                  <Button asChild variant="default" size="sm" className="flex-1 gap-2">
                    <a href={project.github}>
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="flex-1 gap-2">
                    <a href={project.demo}>
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
