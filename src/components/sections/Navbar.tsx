import { useState, useEffect, useRef } from "react";
import { Command, Download, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useActiveSection } from "@/hooks/use-active-section";
import { OPEN_PALETTE_EVENT } from "@/components/CommandPalette";
import { RESUME_URL } from "@/lib/site";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#background" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];
// Module-level so the scroll observer is created once, not on every render.
const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace("#", ""));

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const activeSection = useActiveSection(SECTION_IDS, isHome);

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

  return (
    <nav
      aria-label="Primary"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 focus-within:translate-y-0 ${
        isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
      } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="font-display text-lg font-bold text-foreground flex items-center gap-1 min-h-[44px]">
            <span className="text-primary">&lt;</span>
            <span>Amemo Naphtalie</span>
            <span className="text-primary">/&gt;</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-5">
            {isHome &&
              NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`nav-link text-sm font-medium inline-flex items-center min-h-[44px] ${
                    activeSection === link.href.replace("#", "") ? "active" : ""
                  }`}
                >
                  {link.label}
                </a>
              ))}
            {!isHome && (
              <Link to="/" className="nav-link text-sm font-medium inline-flex items-center min-h-[44px]">
                Home
              </Link>
            )}
            {isHome && (
              <button
                onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
                className="hidden lg:inline-flex items-center gap-2 min-h-[44px] px-3 font-mono text-xs text-muted-foreground hover:text-primary border border-border rounded-md transition-colors"
                aria-label="Ctrl K: open command palette"
              >
                <Command className="w-3.5 h-3.5" />
                Ctrl K
              </button>
            )}
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-11 gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <a href={RESUME_URL} download>
                <Download className="w-4 h-4" />
                Resume
              </a>
            </Button>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <button className="w-11 h-11 inline-flex items-center justify-center text-foreground" aria-label="Open menu">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background border-border">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">Jump to a section of the portfolio or download the resume.</SheetDescription>
                <div className="flex flex-col gap-2 mt-8">
                  {isHome &&
                    NAV_LINKS.map((link) => (
                      <SheetClose asChild key={link.href}>
                        <a
                          href={link.href}
                          className="text-lg text-muted-foreground hover:text-primary transition-colors min-h-[44px] inline-flex items-center"
                        >
                          {link.label}
                        </a>
                      </SheetClose>
                    ))}
                  {!isHome && (
                    <SheetClose asChild>
                      <Link to="/" className="text-lg text-muted-foreground hover:text-primary transition-colors min-h-[44px] inline-flex items-center">
                        Home
                      </Link>
                    </SheetClose>
                  )}
                  <a
                    href={RESUME_URL}
                    download
                    className="text-lg text-primary min-h-[44px] inline-flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Resume
                  </a>
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
