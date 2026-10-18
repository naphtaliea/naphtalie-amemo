import { Briefcase, GraduationCap } from "lucide-react";
import { m } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EDUCATION = [
  {
    period: "2024 – Present",
    title: "University of Mines and Technology (UMaT), Tarkwa",
    detail: "BSc Cybersecurity (Year 3). Courses: Penetration Testing, Cryptography, Business Entrepreneurship",
  },
  {
    period: "2019 – 2022",
    title: "Aggrey Memorial A.M.E. Zion Senior High School, Cape Coast",
    detail: "WASSCE, General Arts",
  },
];

const WORK = [
  {
    period: "2023 – Present",
    title: "Cashier, Bedarts Cold Supplies, Tema (vacation periods)",
    detail: "Handled cash and mobile money for over 150 customers a day with no reconciliation shortfalls.",
  },
];

const GROUPS = [
  { heading: "Education", icon: GraduationCap, items: EDUCATION },
  { heading: "Work experience", icon: Briefcase, items: WORK },
];

const Background = () => {
  return (
    <section id="background" className="py-20 md:py-32 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <m.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Education & Work</h2>
          <p className="section-subtitle mx-auto">Where I study and where I work.</p>
        </m.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {GROUPS.map(({ heading, icon: Icon, items }) => (
            <Card key={heading} className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-base">{heading}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                {items.map((item) => (
                  <div key={item.title}>
                    <p className="font-mono text-xs text-primary mb-1">{item.period}</p>
                    <p className="font-semibold text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Background;
