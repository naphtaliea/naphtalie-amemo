interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

const SectionHeading = ({ title, subtitle }: SectionHeadingProps) => (
  <div className="mb-10 md:mb-14">
    <h2 className="font-display text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-3">
      {title}
    </h2>
    {subtitle && <p className="text-foreground/60 text-lg max-w-xl">{subtitle}</p>}
  </div>
);

export default SectionHeading;
