import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  { text: "$ initializing system...", delay: 0 },
  { text: "[OK] loading kernel modules", delay: 400 },
  { text: "[OK] mounting filesystem", delay: 700 },
  { text: "[OK] starting network services", delay: 1000 },
  { text: "$ loading portfolio.config", delay: 1400 },
  { text: "[OK] components loaded: 9/9", delay: 1800 },
  { text: "[OK] design system initialized", delay: 2100 },
  { text: "[OK] scanline overlay enabled", delay: 2400 },
  { text: "$ naphtalie.dev --launch", delay: 2700 },
  { text: "", delay: 3100, isReady: true },
];

interface TerminalBootProps {
  onComplete: () => void;
}

const SESSION_KEY = "naphtalie-portfolio-booted";

const TerminalBoot = ({ onComplete }: TerminalBootProps) => {
  // Skip the boot sequence on repeat visits within the same tab session —
  // the first-visit ritual shouldn't replay every time someone re-opens
  // the page (e.g. a recruiter clicking back into the tab).
  const alreadyBooted =
    typeof sessionStorage !== "undefined" && sessionStorage.getItem(SESSION_KEY) === "true";

  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isExiting, setIsExiting] = useState(alreadyBooted);

  const handleComplete = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // sessionStorage unavailable (private browsing, etc.) — not critical
    }
    setIsExiting(true);
    setTimeout(onComplete, alreadyBooted ? 0 : 600);
  }, [onComplete, alreadyBooted]);

  useEffect(() => {
    if (alreadyBooted) {
      onComplete();
      return;
    }

    const timers: NodeJS.Timeout[] = [];

    BOOT_LINES.forEach((line, index) => {
      const timer = setTimeout(() => {
        if (line.isReady) {
          handleComplete();
        } else {
          setVisibleLines(index + 1);
        }
      }, line.delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alreadyBooted, handleComplete]);

  // Skip on any keypress or click — the terminal conceit works best when
  // it's optional, not a mandatory gate every single visit.
  useEffect(() => {
    if (alreadyBooted || isExiting) return;
    const skip = () => handleComplete();
    window.addEventListener("keydown", skip);
    window.addEventListener("click", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("click", skip);
    };
  }, [alreadyBooted, isExiting, handleComplete]);

  if (alreadyBooted) return null;

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-background flex items-center justify-center cursor-pointer"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full max-w-xl px-6">
            <div className="border border-border bg-card p-6 font-mono text-sm">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
                <span className="w-3 h-3 rounded-full bg-destructive" />
                <span className="w-3 h-3 rounded-full bg-muted-foreground/50" />
                <span className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                <span className="ml-3 text-xs text-muted-foreground">terminal</span>
                <span className="ml-auto text-xs text-muted-foreground/60">
                  press any key to skip
                </span>
              </div>

              <div className="space-y-1.5 min-h-[280px]">
                {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className={
                      line.text.startsWith("[OK]")
                        ? "text-primary"
                        : "text-muted-foreground"
                    }
                  >
                    {line.text}
                  </motion.div>
                ))}

                {/* Blinking cursor */}
                <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TerminalBoot;
