import { useState, useEffect, useRef } from "react";
import {
  Shield,
  Terminal,
  Code,
  Globe,
  Github,
  Linkedin,
  ExternalLink,
  Download,
  Menu,
  X,
  Send,
  ChevronDown,
  User,
  BookOpen,
  Mail,
  Briefcase,
  Award,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// ============ DATA ============
const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const SKILLS = {
  "Security Tools": [
    "Kali Linux",
    "Wireshark",
    "Metasploit",
    "Nmap",
    "Burp Suite",
  ],
  Networking: ["TCP/IP", "DNS", "Firewalls", "VPNs"],
  Programming: ["Python", "JavaScript", "Bash"],
  Platforms: ["TryHackMe", "Hack The Box"],
};

const PROJECTS = [
  {
    title: "Home SIEM Lab",
    description:
      "Built a Security Information and Event Management system using Wazuh on a local VM network to monitor and detect threats.",
    tags: ["Wazuh", "Linux", "Networking"],
    github: "#",
    demo: "#",
  },
  {
    title: "CampusMarket",
    description:
      "A student-to-student marketplace web app for university students in Ghana.",
    tags: ["React", "Firebase", "Paystack", "Tailwind"],
    github: "#",
    demo: "#",
  },
  {
    title: "Vulnerability Assessment Report",
    description:
      "Performed a full vulnerability scan on Metasploitable 2 and produced a professional remediation report.",
    tags: ["Nmap", "Metasploit", "Kali Linux"],
    github: "#",
    demo: "#",
  },
];

const BLOG_POSTS = [
  {
    title: "My First CTF — What I Learned",
    date: "January 15, 2024",
    excerpt:
      "Breaking down my experience participating in my first Capture The Flag competition and the key takeaways.",
    link: "#",
  },
  {
    title: "Setting Up a Homelab on a Budget",
    date: "December 8, 2023",
    excerpt:
      "A step-by-step guide to building your own cybersecurity lab without breaking the bank.",
    link: "#",
  },
  {
    title: "Understanding Ghana's Cybersecurity Act 2020",
    date: "November 20, 2023",
    excerpt:
      "An analysis of the key provisions and implications of Ghana's cybersecurity legislation.",
    link: "#",
  },
];

const FUN_FACTS = [
  { icon: Award, text: "TryHackMe Top 5% globally" },
  { icon: BookOpen, text: "CompTIA Security+ in progress" },
  { icon: Code, text: "100+ CTF challenges solved" },
];

// ============ COMPONENTS ============

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

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
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a
            href="#"
            className="font-mono text-xl font-semibold text-foreground flex items-center gap-2"
          >
            <Shield className="w-6 h-6 text-primary" />
            <span>Naphtalie</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="nav-link text-sm font-medium">
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileOpen ? "max-h-64 pb-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center terminal-bg overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow animation-delay-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-border/30 rounded-full opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-border/30 rounded-full opacity-30" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6 animate-fade-in-up">
            <Terminal className="w-4 h-4" />
            <span className="font-mono">Available for opportunities</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 animate-fade-in-up animation-delay-100">
            Naphtalie
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-4 animate-fade-in-up animation-delay-200">
            Cybersecurity Student & Aspiring Analyst
          </p>

          <p className="font-mono text-primary text-lg mb-8 animate-fade-in-up animation-delay-300">
            "Securing systems, one vulnerability at a time."
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-400">
            <a href="#projects" className="btn-primary">
              <Briefcase className="w-5 h-5" />
              View My Work
            </a>
            <a href="#" className="btn-outline">
              <Download className="w-5 h-5" />
              Download CV
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
            <ChevronDown className="w-8 h-8" />
          </a>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="section-title">About Me</h2>
            <p className="section-subtitle mb-6">
              Hey there! I'm Naphtalie, a passionate cybersecurity student at the{" "}
              <span className="text-primary font-medium">
                University of Mines and Technology (UMAT)
              </span>
              , Ghana.
            </p>
            <p className="text-muted-foreground mb-8">
              I'm deeply interested in penetration testing, ethical hacking, and building
              secure systems. When I'm not hunting vulnerabilities, you'll find me
              participating in CTF competitions, exploring new security tools, or writing
              about cybersecurity topics that matter.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              {FUN_FACTS.map((fact, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border"
                >
                  <fact.icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{fact.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-secondary flex items-center justify-center border-4 border-primary/20">
                  <User className="w-24 h-24 text-muted-foreground" />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-lg">
                <Shield className="w-10 h-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SkillsSection = () => {
  const iconMap: Record<string, React.ElementType> = {
    "Security Tools": Shield,
    Networking: Globe,
    Programming: Code,
    Platforms: Terminal,
  };

  return (
    <section id="skills" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">Skills & Tools</h2>
          <p className="section-subtitle mx-auto">
            The technologies and tools I use to secure and analyze systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(SKILLS).map(([category, skills]) => {
            const Icon = iconMap[category] || Shield;
            return (
              <div key={category} className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill} className="skill-badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle mx-auto">
            A selection of security projects and tools I've built.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => (
            <div key={index} className="project-card flex flex-col h-full">
              <h3 className="text-xl font-semibold text-foreground mb-3">{project.title}</h3>
              <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <a
                  href={project.github}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href={project.demo}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BlogSection = () => {
  return (
    <section id="blog" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">Blog & Writeups</h2>
          <p className="section-subtitle mx-auto">
            Sharing knowledge about cybersecurity, CTFs, and more.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post, index) => (
            <article
              key={index}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <time className="text-sm text-muted-foreground font-mono">{post.date}</time>
              <h3 className="text-lg font-semibold text-foreground mt-2 mb-3">{post.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
              <a
                href={post.link}
                className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:underline"
              >
                Read More
                <ExternalLink className="w-4 h-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle mx-auto">
              Have a question or want to work together? Drop me a message!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary disabled:opacity-50"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>

          <div className="flex items-center justify-center gap-6 mt-12">
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-mono text-sm">© 2024 Naphtalie. All rights reserved.</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built with security in mind 🔒
          </p>
        </div>
      </div>
    </footer>
  );
};

// ============ MAIN PAGE ============
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
