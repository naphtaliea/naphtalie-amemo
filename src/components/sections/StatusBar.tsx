import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useActiveSection } from "@/hooks/use-active-section";

const SECTIONS = ["about", "skills", "projects", "certifications", "blog", "contact"];

const formatTime = (date: Date) =>
  date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

const StatusBar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const activeSection = useActiveSection(SECTIONS, isHome);
  const [isDark, setIsDark] = useState(true);
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const tick = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(tick);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-8 bg-card border-t border-border font-mono text-[11px] text-muted-foreground flex items-center px-3 md:px-6 gap-4 select-none">
      <span className="flex items-center gap-1.5 shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        <span className="hidden sm:inline text-foreground">naphtalie@portfolio</span>
      </span>

      <span className="hidden md:inline text-border">|</span>

      <span className="hidden md:inline truncate">
        {isHome && activeSection ? `~/${activeSection}` : "~/"}
      </span>

      <span className="ml-auto flex items-center gap-4 shrink-0">
        <span className="hidden sm:inline">{time}</span>
        <button
          onClick={toggleTheme}
          className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
        </button>
      </span>
    </div>
  );
};

export default StatusBar;
