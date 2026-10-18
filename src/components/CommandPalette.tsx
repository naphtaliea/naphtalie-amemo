import { useCallback, useEffect, useState } from "react";
import { Copy, FileText, Github, GraduationCap, Linkedin, Mail, MessageCircle, Terminal, User, Briefcase, Code, BookOpen } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useToast } from "@/hooks/use-toast";
import { LINKS, RESUME_URL } from "@/lib/site";

export const OPEN_PALETTE_EVENT = "open-palette";

const SECTIONS = [
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "skills", label: "Skills & Tools", icon: Code },
  { id: "background", label: "Education & Work", icon: GraduationCap },
  { id: "blog", label: "Blog & Writeups", icon: BookOpen },
  { id: "contact", label: "Contact", icon: Terminal },
];

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  const run = useCallback((fn: () => void) => {
    setOpen(false);
    // let the dialog close first so focus returns before the page moves
    setTimeout(fn, 50);
  }, []);

  const goTo = (id: string) =>
    run(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    });

  const openUrl = (url: string) => run(() => window.open(url, "_blank", "noopener,noreferrer"));

  const copyEmail = () =>
    run(async () => {
      try {
        await navigator.clipboard.writeText(LINKS.email);
        toast({ title: "Email copied", description: LINKS.email });
      } catch {
        toast({ title: "Could not copy", description: `Write to ${LINKS.email}`, variant: "destructive" });
      }
    });

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Go to">
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <CommandItem key={id} onSelect={() => goTo(id)}>
              <Icon className="mr-2" />
              {label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Open">
          <CommandItem onSelect={() => openUrl(RESUME_URL)}>
            <FileText className="mr-2" />
            Resume (PDF)
          </CommandItem>
          <CommandItem onSelect={() => openUrl(LINKS.github)}>
            <Github className="mr-2" />
            GitHub
          </CommandItem>
          <CommandItem onSelect={() => openUrl(LINKS.linkedin)}>
            <Linkedin className="mr-2" />
            LinkedIn
          </CommandItem>
          <CommandItem onSelect={() => openUrl(LINKS.whatsapp)}>
            <MessageCircle className="mr-2" />
            WhatsApp
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Contact">
          <CommandItem onSelect={copyEmail}>
            <Copy className="mr-2" />
            Copy email address
          </CommandItem>
          <CommandItem onSelect={() => run(() => (window.location.href = `mailto:${LINKS.email}`))}>
            <Mail className="mr-2" />
            Send an email
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandPalette;
