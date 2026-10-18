import SectionHeading from "./SectionHeading";

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

const Group = ({ heading, items }: { heading: string; items: typeof EDUCATION }) => (
  <div>
    <h3 className="font-display text-2xl font-bold text-foreground mb-6">{heading}</h3>
    {items.map((item) => (
      <div key={item.title} className="mb-6">
        <p className="font-mono text-xs text-muted-foreground mb-1">{item.period}</p>
        <p className="font-semibold text-foreground">{item.title}</p>
        <p className="text-foreground/60 max-w-md">{item.detail}</p>
      </div>
    ))}
  </div>
);

const Background = () => {
  return (
    <section id="background" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading title="Education and work" />
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl">
          <Group heading="Education" items={EDUCATION} />
          <Group heading="Work experience" items={WORK} />
        </div>
      </div>
    </section>
  );
};

export default Background;
