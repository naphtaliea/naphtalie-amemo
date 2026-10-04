import { Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DecryptText from "@/components/DecryptText";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl">
          <p className="text-primary font-medium mb-5">Cybersecurity · Ghana</p>

          <DecryptText
            as="h1"
            text="NAPHTALIE AMEMO"
            className="font-display text-5xl sm:text-6xl md:text-8xl font-extrabold text-foreground tracking-tight leading-[0.95] mb-6"
          />

          <p className="text-xl md:text-2xl text-foreground/70 leading-snug mb-10 max-w-xl">
            Cybersecurity student &amp; developer — building secure systems
            and breaking insecure ones.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="gap-2 text-base rounded-full px-7">
              <a href="#work">
                View work
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 text-base rounded-full px-7">
              <a href="/Naphtalie-Amemo-CV.pdf" download>
                <Download className="w-4 h-4" />
                CV
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
