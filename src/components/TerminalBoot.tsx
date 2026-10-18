import { useState, useEffect, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  { text: "$ initializing system...", delay: 0 },
  { text: "[OK] loading kernel modules", delay: 150 },
  { text: "[OK] mounting filesystem", delay: 300 },
  { text: "[OK] starting network services", delay: 450 },
  { text: "$ loading portfolio.config", delay: 600 },
  { text: "[OK] components loaded: 7/7", delay: 750 },
  { text: "[OK] scanline overlay enabled", delay: 900 },
  { text: "$ amemo-naphtalie --launch", delay: 1050 },
];
const READY_AT = 1350;
const SESSION_KEY = "naphtalie-portfolio-booted";

/** Repeat visits in the same tab, and visitors who prefer reduced motion, skip the intro. */
export const shouldSkipBoot = () => {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
    return sessionStorage.getItem(SESSION_KEY) === "true";
  } catch {
    return false;
  }
};

interface TerminalBootProps {
  onComplete: () => void;
}

// The page is already rendered underneath, so the intro costs no content and is safe to skip at any time.
const TerminalBoot = ({ onComplete }: TerminalBootProps) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // sessionStorage unavailable (private browsing): the intro just plays again next time
    }
    setIsExiting(true);
    setTimeout(onComplete, 300);
  }, [onComplete]);

  useEffect(() => {
    const timers = BOOT_LINES.map((line, i) => setTimeout(() => setVisibleLines(i + 1), line.delay));
    timers.push(setTimeout(finish, READY_AT));
    return () => timers.forEach(clearTimeout);
  }, [finish]);

  useEffect(() => {
    if (isExiting) return;
    window.addEventListener("keydown", finish);
    return () => window.removeEventListener("keydown", finish);
  }, [isExiting, finish]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <m.div
          className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="status"
          aria-label="Loading portfolio"
        >
          <div className="w-full max-w-xl px-6">
            <div className="border border-border bg-card p-6 font-mono text-sm">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border" aria-hidden="true">
                <span className="w-3 h-3 rounded-full bg-destructive" />
                <span className="w-3 h-3 rounded-full bg-muted-foreground/50" />
                <span className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                <span className="ml-3 text-xs text-muted-foreground">terminal</span>
              </div>

              <div className="space-y-1.5 min-h-[220px]" aria-hidden="true">
                {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                  <div key={i} className={line.text.startsWith("[OK]") ? "text-primary" : "text-muted-foreground"}>
                    {line.text}
                  </div>
                ))}
                <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
              </div>

              <button
                onClick={finish}
                className="mt-4 min-h-[44px] px-4 font-mono text-sm text-primary border border-primary/50 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Skip intro
              </button>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default TerminalBoot;
