import SectionHeading from "./SectionHeading";

const SKILLS = [
  "Kali Linux",
  "Nmap",
  "Metasploit",
  "Burp Suite",
  "Wireshark",
  "Wazuh",
  "TCP/IP",
  "DNS",
  "Firewalls",
  "VPNs",
  "pfSense",
  "Python",
  "JavaScript",
  "TypeScript",
  "Bash",
  "TryHackMe",
  "Hack The Box",
  "GitHub",
  "React",
  "Canva",
  "Meta Ads",
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading title="Tools I use" />
        <div className="flex flex-wrap gap-3 max-w-3xl">
          {SKILLS.map((skill) => (
            <span key={skill} className="tag">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
