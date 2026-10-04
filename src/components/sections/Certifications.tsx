import { Progress } from "@/components/ui/progress";
import SectionHeading from "./SectionHeading";

const CERTS = [
  {
    name: "CompTIA Network+",
    issuer: "CompTIA",
    expected: "Q3 2026",
    progress: 45,
  },
  {
    name: "CompTIA Security+",
    issuer: "CompTIA",
    expected: "Q4 2026",
    progress: 25,
  },
];

const Certifications = () => {
  return (
    <section id="certifications" className="py-16 md:py-24 border-b border-border">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading number="05" title="Certifications" subtitle="Professional certifications I'm working towards." />

        <div className="max-w-2xl">
          {CERTS.map((cert) => (
            <div key={cert.name} className="ledger-row">
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <div>
                  <span className="font-semibold text-foreground">{cert.name}</span>
                  <span className="text-sm text-muted-foreground ml-2">{cert.issuer}</span>
                </div>
                <span className="font-mono text-xs text-muted-foreground shrink-0">Expected {cert.expected}</span>
              </div>
              <div className="flex items-center gap-3">
                <Progress value={cert.progress} className="h-1.5 rounded-none [&>div]:bg-primary" />
                <span className="font-mono text-xs text-primary shrink-0 w-10 text-right">{cert.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
