interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle?: string;
}

/**
 * The numbered section header used throughout — it mirrors a real
 * document's table of contents (01 Summary, 02 Ledger, ...), which is
 * why numbering is used here at all: the content genuinely is organized
 * like a report, not a disguised "3 easy steps" list.
 */
const SectionHeading = ({ number, title, subtitle }: SectionHeadingProps) => (
  <div className="mb-10 md:mb-12">
    <div className="flex items-baseline gap-3 mb-2">
      <span className="font-mono text-sm text-primary shrink-0">{number}</span>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-tight">
        {title}
      </h2>
    </div>
    {subtitle && <p className="text-muted-foreground max-w-xl">{subtitle}</p>}
  </div>
);

export default SectionHeading;
