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
  { text: "[OK] cursor glow enabled", delay: 2400 },
  { text: "$ naphtalie.dev --launch", delay: 2700 },
  { text: "", delay: 3100, isReady: true },
];

interface TerminalBootProps {
  onComplete: () => void;
}

const TerminalBoot = ({ onComplete }: TerminalBootProps) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isExiting, setIsExiting] = useState(false);

  const handleComplete = useCallback(() => {
    setIsExiting(true);
    setTimeout(onComplete, 600);
  }, [onComplete]);

  useEffect(() => {
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
  }, [handleComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
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
