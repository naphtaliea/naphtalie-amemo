import SectionHeading from "./SectionHeading";

type Severity = "Critical" | "High" | "Medium" | "Low";

interface Finding {
  title: string;
  period: string;
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
    title: "RapidBoost penetration test",
    period: "2026",
    description:
      "Pentested my own platform and fixed the findings: a storage bucket anyone could read and write (now private, with signed URLs), anonymous access to pricing functions, and supplier details leaking in API responses. Also replaced a racy rate limiter with an atomic advisory-lock check and added a domain allowlist to stop an open redirect.",
    severity: "Critical",
  },
  {
    title: "Bedarts POS security review",
    period: "2026",
    description:
      "Closed security holes found in review: signup that let anyone make themselves admin, public access to sale and stock functions and to cost prices, and customer-set order prices.",
  },
  {
    title: "Mobile app security assessment (academic project)",
    period: "2026",
    description:
      "Assessed a food-delivery app and documented multiple CVEs/CWEs, including a denial-of-service flaw and insecure token storage.",
  },
  {
    title: "Home security lab",
    period: "2024 – Present",
    description: "Wazuh SIEM, Kali Linux and Metasploitable 2 for practising penetration testing.",
  },
];

const Findings = () => {
  return (
    <section id="findings" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading title="Security experience" subtitle="Assessments I've run and what I fixed." />

        <div>
          {FINDINGS.map((finding) => (
            <div key={finding.title} className="block-link">
              <div className="flex items-start gap-3 mb-2">
                {finding.severity && (
                  <span className={`w-2.5 h-2.5 rounded-full mt-2 shrink-0 ${SEVERITY_COLOR[finding.severity]}`} />
                )}
                <div>
                  <p className="font-mono text-xs text-muted-foreground mb-1">{finding.period}</p>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">{finding.title}</h3>
                </div>
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
