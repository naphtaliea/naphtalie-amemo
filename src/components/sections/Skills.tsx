import { Shield, Globe, Code } from "lucide-react";
import { m } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SKILLS_DATA = {
  Development: {
    icon: Code,
    skills: [
      { name: "TypeScript", desc: "Typed JavaScript" },
      { name: "JavaScript", desc: "Web development" },
      { name: "Node.js", desc: "JavaScript runtime for servers" },
      { name: "React", desc: "Front-end UI library" },
      { name: "Next.js", desc: "React framework with server rendering" },
      { name: "TanStack Start", desc: "Full-stack React framework" },
      { name: "SQL (Postgres, RLS)", desc: "Queries and row-level security policies" },
      { name: "Supabase", desc: "Postgres database, auth and storage" },
      { name: "Cloudflare Workers", desc: "Serverless hosting at the edge" },
      { name: "Tailwind CSS", desc: "Utility-first styling" },
      { name: "Playwright", desc: "End-to-end browser testing" },
      { name: "Vitest", desc: "Unit testing" },
      { name: "k6", desc: "Load testing" },
      { name: "Python", desc: "Scripting" },
    ],
  },
  "Security Tools": {
    icon: Shield,
    skills: [
      { name: "Burp Suite", desc: "Web vulnerability scanner and proxy" },
      { name: "Kali Linux", desc: "Penetration testing OS" },
      { name: "Nmap", desc: "Network discovery and security auditing" },
      { name: "Metasploit", desc: "Exploitation framework" },
      { name: "Wireshark", desc: "Network protocol analyzer" },
      { name: "Wazuh", desc: "Open source SIEM platform" },
    ],
  },
  Languages: {
    icon: Globe,
    skills: [
      { name: "English", desc: "Fluent" },
      { name: "Twi", desc: "Conversational" },
    ],
  },
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 md:py-32 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <m.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Skills & Tools</h2>
          <p className="section-subtitle mx-auto">What I build with, and what I use to test it.</p>
        </m.div>

        <Tabs defaultValue="Development" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-3 w-full h-auto bg-secondary/50 mb-8">
            {Object.entries(SKILLS_DATA).map(([category, data]) => {
              const Icon = data.icon;
              return (
                <TabsTrigger key={category} value={category} className="gap-2 min-h-[44px] text-sm">
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  <span className="hidden sm:inline">{category}</span>
                  <span className="sm:hidden">{category.split(" ")[0]}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {Object.entries(SKILLS_DATA).map(([category, data]) => (
            <TabsContent key={category} value={category} className="mt-0">
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {data.skills.map((skill) => (
                  <li key={skill.name} className="px-4 py-3 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
                    <p className="font-medium text-foreground">{skill.name}</p>
                    <p className="text-sm text-muted-foreground">{skill.desc}</p>
                  </li>
                ))}
              </ul>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Skills;
