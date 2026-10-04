import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Masthead = () => {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      document.documentElement.classList.toggle("dark", !prev);
      return !prev;
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="font-display text-base font-bold text-foreground">
            Naphtalie Amemo
          </Link>

          <nav className="flex items-center gap-6">
            {isHome ? (
              <a href="#work" className="nav-link text-sm font-medium hidden sm:inline">
                Work
              </a>
            ) : (
              <Link to="/" className="nav-link text-sm font-medium hidden sm:inline">
                Home
              </Link>
            )}
            <a href={isHome ? "#contact" : "/#contact"} className="nav-link text-sm font-medium">
              Contact
            </a>
            <button
              onClick={toggleTheme}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Masthead;
