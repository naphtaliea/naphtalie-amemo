import SectionHeading from "./SectionHeading";

type Severity = "Critical" | "High" | "Medium" | "Low";

interface Finding {
  title: string;
  description: string;
  tags: string[];
  severity?: Severity;
}

const SEVERITY_STYLES: Record<Severity, string> = {
  Critical: "bg-[hsl(var(--severity-critical)/0.1)] text-[hsl(var(--severity-critical))] border-[hsl(var(--severity-critical)/0.4)]",
  High: "bg-[hsl(var(--severity-high)/0.1)] text-[hsl(var(--severity-high))] border-[hsl(var(--severity-high)/0.4)]",
  Medium: "bg-[hsl(var(--severity-medium)/0.1)] text-[hsl(var(--severity-medium))] border-[hsl(var(--severity-medium)/0.4)]",
  Low: "bg-[hsl(var(--severity-low)/0.1)] text-[hsl(var(--severity-low))] border-[hsl(var(--severity-low)/0.4)]",
};

const FINDINGS: Finding[] = [
  {
    title: "RapidBoost Security Assessment",
    description:
      "Conducted an independent penetration test of RapidBoost (a self-built e-commerce/SMM platform), identifying and remediating a critical database access-control flaw along with several other vulnerabilities.",
    tags: ["Penetration Testing", "Access Control", "Web Security"],
    severity: "Critical",
  },
  {
    title: "Food-Delivery App Security Assessment",
    description:
      "Conducted a security assessment of a food-delivery mobile application as an academic project, identifying and documenting multiple CVEs/CWEs, including a denial-of-service vulnerability and insecure token storage.",
    tags: ["Mobile Security", "CVE/CWE", "Vulnerability Assessment"],
    severity: "High",
  },
  {
    title: "Vulnerability Assessment — Metasploitable 2",
    description:
      "A full penetration test and documented vulnerability assessment on Metasploitable 2, covering enumeration, exploitation, and reporting.",
    tags: ["Nmap", "Metasploit", "Kali Linux"],
    severity: "Medium",
  },
  {
    title: "Home Security Lab",
    description:
      "Built a home lab using Wazuh SIEM, Kali Linux, and Metasploitable 2 to practice applied penetration-testing techniques.",
    tags: ["Wazuh", "Kali Linux", "Metasploitable 2"],
  },
];

const Findings = () => {
  return (
    <section id="findings" className="py-16 md:py-24 border-b border-border">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          number="03"
          title="Findings"
          subtitle="Security assessments I've conducted, with severity as rated in each report."
        />

        <div className="max-w-3xl">
          {FINDINGS.map((finding) => (
            <div key={finding.title} className="ledger-row">
              <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                <h3 className="font-semibold text-foreground">{finding.title}</h3>
                {finding.severity && (
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wide px-2 py-0.5 border shrink-0 ${SEVERITY_STYLES[finding.severity]}`}
                  >
                    {finding.severity}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground text-sm mb-3 max-w-2xl">{finding.description}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {finding.tags.map((tag) => (
                  <span key={tag} className="font-mono text-xs text-primary/80">
                    #{tag.replace(/\s+/g, "-").toLowerCase()}
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

export default Findings;
