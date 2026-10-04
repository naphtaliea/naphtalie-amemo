import SectionHeading from "./SectionHeading";

const STATS = [
  { label: "Certifications in progress", value: "2" },
  { label: "Projects built", value: "4" },
  { label: "CTFs competed", value: "1" },
];

const About = () => {
  return (
    <section id="summary" className="py-16 md:py-24 border-b border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <SectionHeading number="01" title="Summary" />
            <p className="text-foreground/80 mb-4 leading-relaxed max-w-xl">
              Hey there — I'm Naphtalie, a cybersecurity student at the{" "}
              <span className="text-foreground font-medium">
                University of Mines and Technology (UMAT)
              </span>
              , Tarkwa, Ghana.
            </p>
            <p className="text-foreground/80 leading-relaxed max-w-xl">
              I'm deeply interested in penetration testing, ethical hacking, and building
              secure digital systems. Currently preparing for CompTIA Network+ and Security+
              certifications while building a hands-on homelab. When I'm not hunting
              vulnerabilities, you'll find me participating in CTF competitions or writing
              about cybersecurity topics.
            </p>
          </div>

          <div className="case-frame p-6">
            <p className="case-label mb-4">On record</p>
            <dl className="space-y-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-muted-foreground">{stat.label}</dt>
                  <dd className="font-mono text-xl font-bold text-primary shrink-0">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
