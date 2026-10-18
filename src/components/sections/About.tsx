import { Bug, FlaskConical, Rocket, TestTube2 } from "lucide-react";
import { m } from "framer-motion";

const PROOF = [
  { icon: Rocket, text: "Bedarts POS in daily use for a month" },
  { icon: Bug, text: "Pentested my own platform and fixed what I found" },
  { icon: TestTube2, text: "22 Playwright tests cover the POS till" },
  { icon: FlaskConical, text: "59 unit tests on RapidBoost" },
];

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-secondary/30 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <m.div
            className="order-2 md:order-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">About Me</h2>
            <p className="text-muted-foreground mb-4 text-lg leading-relaxed">
              Full-stack developer and BSc Cybersecurity student at the{" "}
              <span className="text-primary font-medium">University of Mines and Technology (UMaT)</span>. I learn by
              building real projects with React, TypeScript, Next.js, Supabase and Cloudflare Workers, then pentesting
              and debugging them while people use them.
            </p>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              Currently building web apps for small business clients. Eager to keep learning in remote software
              engineering work.
            </p>

            <ul className="grid sm:grid-cols-2 gap-3">
              {PROOF.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                  <Icon className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-sm text-foreground/90">{text}</span>
                </li>
              ))}
            </ul>
          </m.div>

          <m.div
            className="order-1 md:order-2 flex justify-center"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            aria-hidden="true"
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-card flex items-center justify-center border-2 border-primary/20">
                  <div className="w-44 h-44 md:w-56 md:h-56 bg-background border border-border p-3 font-mono text-xs text-muted-foreground overflow-hidden">
                    <p className="text-primary">$ whoami</p>
                    <p>amemo-naphtalie</p>
                    <p className="text-primary mt-1">$ ls projects/</p>
                    <p>bedarts-pos/</p>
                    <p className="truncate">carrington-express/</p>
                    <p>rapidboost/</p>
                    <p>hair-relief/</p>
                    <p className="animate-blink mt-1 text-primary">█</p>
                  </div>
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
};

export default About;
