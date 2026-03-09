import { Award, BookOpen, Code, User } from "lucide-react";
import { motion } from "framer-motion";

const STATS = [
  { icon: BookOpen, number: "2", label: "Certs in Progress" },
  { icon: Code, number: "3", label: "Projects Built" },
  { icon: Award, number: "1", label: "CTF Competed" },
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
              Hey there! I'm Naphtalie, a passionate cybersecurity student at the{" "}
              <span className="text-primary font-medium">
                University of Mines and Technology (UMAT)
              </span>
              , Tarkwa, Ghana.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              I'm deeply interested in penetration testing, ethical hacking, and building
              secure digital systems. Currently preparing for CompTIA Network+ and Security+
              certifications while building a hands-on homelab. When I'm not hunting
              vulnerabilities, you'll find me participating in CTF competitions or writing
              about cybersecurity topics.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {STATS.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-4 bg-card rounded-xl border border-border"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary">{stat.number}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
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
                  {/* Mock terminal / nmap scan */}
                  <div className="w-44 h-44 md:w-56 md:h-56 rounded-lg bg-background border border-border p-3 font-mono text-[10px] md:text-xs text-muted-foreground overflow-hidden">
                    <p className="text-primary">$ nmap -sV 192.168.1.0/24</p>
                    <p className="mt-1">Starting Nmap 7.94...</p>
                    <p className="text-muted-foreground/60 mt-1">PORT   STATE SERVICE</p>
                    <p>22/tcp  open  ssh</p>
                    <p>80/tcp  open  http</p>
                    <p>443/tcp open  https</p>
                    <p className="text-primary mt-1">3 hosts up</p>
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
