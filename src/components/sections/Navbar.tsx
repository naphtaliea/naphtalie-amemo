import { useState, useEffect, useRef } from "react";
import { Menu, Sun, Moon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  const [isDark, setIsDark] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    // Default to dark
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      setIsVisible(currentScrollY < lastScrollY.current || currentScrollY < 50);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for active section
  useEffect(() => {
    if (!isHome) return;
    const sections = NAV_LINKS.map(l => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            to="/"
            className="font-mono text-lg font-semibold text-foreground flex items-center gap-1"
          >
            <span className="text-primary">&lt;</span>
            <span>Naphtalie</span>
            <span className="text-primary">/&gt;</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {isHome &&
              NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`nav-link text-sm font-medium ${
                    activeSection === link.href.replace("#", "") ? "active" : ""
                  }`}
                >
                  {link.label}
                </a>
              ))}
            {!isHome && (
              <Link to="/" className="nav-link text-sm font-medium">
                Home
              </Link>
            )}

            <button
              onClick={toggleTheme}
              className="relative w-14 h-8 rounded-full bg-secondary border border-border flex items-center transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Toggle dark mode"
            >
              <motion.div
                className="absolute w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                animate={{ x: isDark ? 28 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <motion.div
                  key={isDark ? "moon" : "sun"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <Moon className="w-3.5 h-3.5 text-primary-foreground" /> : <Sun className="w-3.5 h-3.5 text-primary-foreground" />}
                </motion.div>
              </motion.div>
            </button>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-3">
            <div className="flex items-center gap-1">
              <Sun className="w-3 h-3 text-muted-foreground" />
              <Switch checked={isDark} onCheckedChange={toggleTheme} aria-label="Toggle dark mode" className="scale-75" />
              <Moon className="w-3 h-3 text-muted-foreground" />
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 text-foreground" aria-label="Open menu">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background border-border">
                <div className="flex flex-col gap-6 mt-8">
                  {isHome &&
                    NAV_LINKS.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="text-lg text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  {!isHome && (
                    <Link to="/" className="text-lg text-muted-foreground hover:text-primary transition-colors">
                      Home
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
