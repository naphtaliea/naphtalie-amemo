import SectionHeading from "./SectionHeading";

const SKILL_GROUPS = [
  {
    label: "Development",
    skills: [
      "TypeScript",
      "JavaScript",
      "Node.js",
      "React",
      "Next.js",
      "TanStack Start",
      "SQL (Postgres, RLS)",
      "Supabase",
      "Cloudflare Workers",
      "Tailwind CSS",
      "Playwright",
      "Vitest",
      "k6",
      "Python",
    ],
  },
  {
    label: "Security",
    skills: ["Burp Suite", "Kali Linux", "Nmap", "Metasploit", "Wireshark", "Wazuh"],
  },
  {
    label: "Languages",
    skills: ["English (fluent)", "Twi (conversational)"],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading title="Skills" />
        <div className="space-y-8 max-w-3xl">
          {SKILL_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="font-mono text-xs text-muted-foreground mb-3">{group.label}</p>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill) => (
                  <span key={skill} className="tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
