import { Download, FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 border-b border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl">
          <p className="case-label mb-4">Subject — Cybersecurity Student &amp; Developer</p>

          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground tracking-tight leading-[1.05] mb-6">
            Naphtalie Amemo
          </h1>

          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-2 max-w-xl">
            Cybersecurity student at UMAT, Tarkwa, Ghana — building secure systems
            and breaking insecure ones, on the record.
          </p>
          <p className="font-mono text-sm text-muted-foreground mb-10">
            4 projects shipped · 2 certifications in progress · 1 CTF completed
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="gap-2 text-base">
              <a href="#findings">
                <FileSearch className="w-5 h-5" />
                View findings
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 text-base">
              <a href="/Naphtalie-Amemo-CV.pdf" download>
                <Download className="w-5 h-5" />
                Download CV
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
