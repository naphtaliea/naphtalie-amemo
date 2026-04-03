import { Shield, Globe, Code, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const SKILLS_DATA = {
  "Security Tools": {
    icon: Shield,
    skills: [
      { name: "Kali Linux", desc: "Penetration testing OS" },
      { name: "Nmap", desc: "Network discovery & security auditing" },
      { name: "Metasploit", desc: "Exploitation framework" },
      { name: "Burp Suite", desc: "Web vulnerability scanner" },
      { name: "Wireshark", desc: "Network protocol analyzer" },
      { name: "Wazuh", desc: "Open source SIEM platform" },
    ],
  },
  Networking: {
    icon: Globe,
    skills: [
      { name: "TCP/IP", desc: "Core internet protocol suite" },
      { name: "DNS", desc: "Domain name resolution" },
      { name: "Firewalls", desc: "Network security systems" },
      { name: "VPNs", desc: "Encrypted network tunneling" },
      { name: "pfSense", desc: "Open source firewall/router" },
    ],
  },
  Programming: {
    icon: Code,
    skills: [
      { name: "Python", desc: "Scripting & automation" },
      { name: "JavaScript", desc: "Web development" },
      { name: "Bash", desc: "Shell scripting & automation" },
    ],
  },
  Platforms: {
    icon: Terminal,
    skills: [
      { name: "TryHackMe", desc: "Cybersecurity training platform" },
      { name: "Hack The Box", desc: "Penetration testing labs" },
      { name: "GitHub", desc: "Code hosting & collaboration" },
    ],
  },
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 md:py-32 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Skills & Tools</h2>
          <p className="section-subtitle mx-auto">
            The technologies and tools I use to secure and analyze systems.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="Security Tools" className="max-w-3xl mx-auto">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full bg-secondary/50 mb-8">
              {Object.entries(SKILLS_DATA).map(([category, data]) => {
                const Icon = data.icon;
                return (
                  <TabsTrigger key={category} value={category} className="gap-2 text-xs md:text-sm">
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{category}</span>
                    <span className="sm:hidden">{category.split(" ")[0]}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <div className="relative min-h-[80px]">
              {Object.entries(SKILLS_DATA).map(([category, data]) => (
                <TabsContent key={category} value={category} className="mt-0 absolute inset-x-0 top-0 data-[state=inactive]:hidden">
                  <div className="flex flex-wrap gap-3 justify-center">
                    {data.skills.map((skill, i) => (
                      <Tooltip key={skill.name}>
                        <TooltipTrigger asChild>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <Badge
                              variant="secondary"
                              className="px-4 py-2 text-sm cursor-default hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                              {skill.name}
                            </Badge>
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{skill.desc}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
