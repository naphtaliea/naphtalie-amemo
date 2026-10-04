import { Progress } from "@/components/ui/progress";
import SectionHeading from "./SectionHeading";

const CERTS = [
  { name: "CompTIA Network+", expected: "Q3 2026", progress: 45 },
  { name: "CompTIA Security+", expected: "Q4 2026", progress: 25 },
];

const Certifications = () => {
  return (
    <section id="certifications" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading title="Certifications" />

        <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 max-w-2xl">
          {CERTS.map((cert) => (
            <div key={cert.name} className="flex-1">
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-semibold text-foreground">{cert.name}</span>
                <span className="font-mono text-xs text-muted-foreground">{cert.expected}</span>
              </div>
              <Progress value={cert.progress} className="h-2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
