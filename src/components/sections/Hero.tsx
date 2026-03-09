import { useState, useEffect } from "react";
import { Briefcase, Download, ChevronDown, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const ROLES = [
  "Cybersecurity Student",
  "Penetration Tester",
  "Ethical Hacker",
  "Problem Solver",
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < currentRole.length) {
      timeout = setTimeout(() => setDisplayed(currentRole.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center terminal-bg overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-border/20 rounded-full opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-border/20 rounded-full opacity-30" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Terminal className="w-4 h-4" />
            <span className="font-mono">Available for opportunities</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-4 tracking-tight">
            NAPHT<span className="text-primary">A</span>LIE
          </h1>

          <div className="h-10 md:h-12 flex items-center justify-center mb-6">
            <span className="font-mono text-xl md:text-2xl text-primary">
              {displayed}
              <span className="border-r-2 border-primary animate-blink ml-0.5">&nbsp;</span>
            </span>
          </div>

          <p className="font-mono text-muted-foreground text-sm md:text-base mb-8">
            &quot;Securing systems, one vulnerability at a time.&quot;
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="gap-2 text-base">
              <a href="#projects">
                <Briefcase className="w-5 h-5" />
                View My Work
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 text-base border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <a href="#">
                <Download className="w-5 h-5" />
                Download CV
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Scroll down">
            <ChevronDown className="w-8 h-8" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
