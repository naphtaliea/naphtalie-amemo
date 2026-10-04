/**
 * A single, deliberate load-time flourish: the status stamp lands once,
 * like ink hitting paper. Nothing else on the page waits for it, and
 * nothing is gated behind it — it's decorative, not a gate.
 */
const StampMark = () => (
  <span
    className="inline-flex items-center gap-1.5 border border-primary text-primary px-2 py-0.5 animate-stamp-in"
    aria-hidden="true"
  >
    <span className="w-1.5 h-1.5 bg-primary" />
    <span className="font-mono text-[11px] uppercase tracking-wider">Active</span>
  </span>
);

export default StampMark;
