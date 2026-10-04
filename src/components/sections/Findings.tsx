import SectionHeading from "./SectionHeading";

type Severity = "Critical" | "High" | "Medium" | "Low";

interface Finding {
  title: string;
  description: string;
  severity?: Severity;
}

const SEVERITY_COLOR: Record<Severity, string> = {
  Critical: "bg-[hsl(var(--severity-critical))]",
  High: "bg-[hsl(var(--severity-high))]",
  Medium: "bg-[hsl(var(--severity-medium))]",
  Low: "bg-[hsl(var(--severity-low))]",
};

const FINDINGS: Finding[] = [
  {
    title: "RapidBoost Security Assessment",
    description:
      "Independent penetration test of RapidBoost, identifying and remediating a critical database access-control flaw along with several other vulnerabilities.",
    severity: "Critical",
  },
  {
    title: "Food-Delivery App Security Assessment",
    description:
      "Security assessment of a food-delivery mobile app, documenting multiple CVEs/CWEs including a denial-of-service vulnerability and insecure token storage.",
    severity: "High",
  },
  {
    title: "Vulnerability Assessment — Metasploitable 2",
    description: "Full penetration test and documented vulnerability assessment, covering enumeration, exploitation, and reporting.",
    severity: "Medium",
  },
  {
    title: "Home Security Lab",
    description: "Built a home lab using Wazuh SIEM, Kali Linux, and Metasploitable 2 to practice applied penetration-testing techniques.",
  },
];

const Findings = () => {
  return (
    <section id="findings" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading title="Findings" subtitle="Security assessments I've conducted." />

        <div>
          {FINDINGS.map((finding) => (
            <div key={finding.title} className="block-link">
              <div className="flex items-start gap-3 mb-2">
                {finding.severity && (
                  <span className={`w-2.5 h-2.5 rounded-full mt-2 shrink-0 ${SEVERITY_COLOR[finding.severity]}`} />
                )}
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">{finding.title}</h3>
              </div>
              <p className="text-foreground/60 max-w-xl">{finding.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Findings;
