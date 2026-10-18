import { Bug, Code, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const STATS = [
  { icon: Code, number: "4", label: "Projects Built" },
  { icon: Bug, number: "3", label: "Security Assessments" },
  { icon: Rocket, number: "1 mo", label: "POS in Daily Use" },
];

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-secondary/30 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="order-2 md:order-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">About Me</h2>
            <p className="text-muted-foreground mb-4 text-lg leading-relaxed">
              Full-stack developer and BSc Cybersecurity student at the{" "}
              <span className="text-primary font-medium">
                University of Mines and Technology (UMaT)
              </span>
              . I learn by building real projects with React, TypeScript, Next.js, Supabase and
              Cloudflare Workers, then pentesting and debugging them while people use them.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Currently building web apps for small business clients. Eager to keep learning in
              remote software engineering work.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {STATS.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-card rounded-lg border border-border">
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary">{stat.number}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="order-1 md:order-2 flex justify-center"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-card flex items-center justify-center border-2 border-primary/20">
                  <div className="w-44 h-44 md:w-56 md:h-56 bg-background border border-border p-3 font-mono text-[10px] md:text-xs text-muted-foreground overflow-hidden">
                    <p className="text-primary">$ whoami</p>
                    <p>amemo-naphtalie</p>
                    <p className="text-primary mt-1">$ ls projects/</p>
                    <p>bedarts-pos/</p>
                    <p>carrington-express/</p>
                    <p>rapidboost/</p>
                    <p>hair-relief/</p>
                    <p className="animate-blink mt-1 text-primary">█</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
