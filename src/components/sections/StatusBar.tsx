import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useActiveSection } from "@/hooks/use-active-section";

const SECTIONS = ["about", "projects", "skills", "background", "blog", "contact"];

const formatTime = (date: Date) =>
  date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

// Purely decorative, so it is hidden from assistive tech and from phones, where it only ate screen height.
const StatusBar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const activeSection = useActiveSection(SECTIONS, isHome);
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const tick = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(tick);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="hidden md:flex fixed bottom-0 left-0 right-0 z-40 h-8 bg-card border-t border-border font-mono text-xs text-muted-foreground items-center px-6 gap-4 select-none"
    >
      <span className="flex items-center gap-1.5 shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        <span className="text-foreground">amemo@portfolio</span>
      </span>

      <span className="text-border">|</span>

      <span className="truncate">{isHome && activeSection ? `~/${activeSection}` : "~/"}</span>

      <span className="ml-auto shrink-0">{time}</span>
    </div>
  );
};

export default StatusBar;
