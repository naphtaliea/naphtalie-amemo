import { useState, useEffect, useRef } from "react";
import { Menu, Moon, Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useActiveSection } from "@/hooks/use-active-section";
import StampMark from "@/components/StampMark";

const NAV_LINKS = [
  { label: "Summary", href: "#summary" },
  { label: "Ledger", href: "#ledger" },
  { label: "Findings", href: "#findings" },
  { label: "Systems", href: "#systems" },
  { label: "Certs", href: "#certifications" },
  { label: "Writeups", href: "#writeups" },
  { label: "Contact", href: "#contact" },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace("#", ""));

const Masthead = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const activeSection = useActiveSection(SECTION_IDS, isHome);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 40);
      setIsVisible(currentScrollY < lastScrollY.current || currentScrollY < 40);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      document.documentElement.classList.toggle("dark", !prev);
      return !prev;
    });
  };

  const NavItems = ({ onNavigate }: { onNavigate?: () => void }) =>
    isHome ? (
      <>
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={`nav-link text-sm font-medium font-mono ${
              activeSection === link.href.replace("#", "") ? "active" : ""
            }`}
          >
            {link.label}
          </a>
        ))}
      </>
    ) : (
      <Link to="/" onClick={onNavigate} className="nav-link text-sm font-medium font-mono">
        Home
      </Link>
    );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-border bg-background transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Docket strip */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-8 text-xs border-b border-border/60">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="case-label shrink-0">Case File No. 0417</span>
            <span className="hidden sm:inline text-border">|</span>
            <span className="hidden sm:inline case-label truncate">Filed — Tarkwa, Ghana</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <StampMark />
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 case-label hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Toggle redacted (dark) view"
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isDark ? "Field copy" : "Redacted copy"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary nav */}
      <div className="container mx-auto px-4 md:px-6">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-14" : "h-16"}`}>
          <Link to="/" className="font-display text-lg font-bold text-foreground tracking-tight">
            NAPHTALIE AMEMO
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <NavItems />
          </nav>

          <div className="flex md:hidden items-center">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 text-foreground" aria-label="Open menu">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background border-border">
                <nav className="flex flex-col gap-6 mt-8">
                  <NavItems />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Masthead;
