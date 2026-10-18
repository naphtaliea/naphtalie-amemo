import { Shield } from "lucide-react";
import { LINKS, RESUME_URL } from "@/lib/site";

const FOOTER_LINKS = [
  { label: "Email", href: `mailto:${LINKS.email}` },
  { label: "GitHub", href: LINKS.github },
  { label: "LinkedIn", href: LINKS.linkedin },
  { label: "Resume", href: RESUME_URL },
  { label: "Source", href: LINKS.source },
];

const Footer = () => (
  <footer className="py-8 border-t border-border relative z-10">
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Shield className="w-5 h-5 text-primary" aria-hidden="true" />
          <span className="font-mono text-sm">© {new Date().getFullYear()} Amemo Naphtalie</span>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-2">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex items-center min-h-[44px] px-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  </footer>
);

export default Footer;
