import { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useActiveSection } from "@/hooks/use-active-section";

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
  const lastScrollY = useRef(0);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const activeSection = useActiveSection(
    NAV_LINKS.map((l) => l.href.replace("#", "")),
    isHome
  );

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
            className="font-display text-lg font-bold text-foreground flex items-center gap-1"
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
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-3">
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
