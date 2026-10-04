import SectionHeading from "./SectionHeading";

const SKILLS_DATA: Record<string, { name: string; desc: string }[]> = {
  "Security tools": [
    { name: "Kali Linux", desc: "Penetration testing OS" },
    { name: "Nmap", desc: "Network discovery & security auditing" },
    { name: "Metasploit", desc: "Exploitation framework" },
    { name: "Burp Suite", desc: "Web vulnerability scanner" },
    { name: "Wireshark", desc: "Network protocol analyzer" },
    { name: "Wazuh", desc: "Open source SIEM platform" },
  ],
  Networking: [
    { name: "TCP/IP", desc: "Core internet protocol suite" },
    { name: "DNS", desc: "Domain name resolution" },
    { name: "Firewalls", desc: "Network security systems" },
    { name: "VPNs", desc: "Encrypted network tunneling" },
    { name: "pfSense", desc: "Open source firewall/router" },
  ],
  Programming: [
    { name: "Python", desc: "Scripting & automation" },
    { name: "JavaScript", desc: "Web development" },
    { name: "TypeScript", desc: "Typed JavaScript for scalable apps" },
    { name: "Bash", desc: "Shell scripting & automation" },
  ],
  Platforms: [
    { name: "TryHackMe", desc: "Cybersecurity training platform" },
    { name: "Hack The Box", desc: "Penetration testing labs" },
    { name: "GitHub", desc: "Code hosting & collaboration" },
  ],
  "Web & marketing": [
    { name: "React", desc: "Front-end UI library" },
    { name: "Web development", desc: "Building and shipping web apps" },
    { name: "Canva", desc: "Design & content creation" },
    { name: "Meta Ads", desc: "Facebook & Instagram ad campaigns" },
  ],
};

const Ledger = () => {
  return (
    <section id="ledger" className="py-16 md:py-24 border-b border-border">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          number="02"
          title="Proficiency ledger"
          subtitle="The tools and technologies I use to secure and build systems."
        />

        <div className="grid md:grid-cols-2 gap-x-12">
          {Object.entries(SKILLS_DATA).map(([category, skills]) => (
            <div key={category} className="mb-10">
              <p className="case-label mb-1">{category}</p>
              <div>
                {skills.map((skill) => (
                  <div key={skill.name} className="ledger-row flex items-baseline justify-between gap-4">
                    <span className="font-medium text-foreground">{skill.name}</span>
                    <span className="text-sm text-muted-foreground text-right">{skill.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ledger;
