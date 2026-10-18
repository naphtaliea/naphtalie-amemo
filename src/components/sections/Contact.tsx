import { useState, useRef } from "react";
import { Send, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { m } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LINKS } from "@/lib/site";

const COOLDOWN_MS = 60_000;
const LAST_SENT_KEY = "contact-last-sent";

const readLastSent = () => {
  try {
    return Number(localStorage.getItem(LAST_SENT_KEY) || 0);
  } catch {
    return 0;
  }
};

const SOCIAL_LINKS = [
  { icon: Github, href: LINKS.github, label: "GitHub" },
  { icon: Linkedin, href: LINKS.linkedin, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${LINKS.email}`, label: "Email" },
  { icon: MessageCircle, href: LINKS.whatsapp, label: "WhatsApp" },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Hidden "website" field: people never see it, so a filled value means a bot. Pretend success and send nothing.
    if (new FormData(formRef.current!).get("website")) {
      setFormData({ name: "", email: "", message: "" });
      return;
    }

    const wait = COOLDOWN_MS - (Date.now() - readLastSent());
    if (wait > 0) {
      toast({
        title: "Message already sent",
        description: `Please wait ${Math.ceil(wait / 1000)} seconds before sending another.`,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Loaded on submit so visitors who never write don't download the mail client.
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.sendForm("service_uqwilvs", "template_rgxwm9g", formRef.current!, "NnZM0QV_OXiG6zpzw");
      try {
        localStorage.setItem(LAST_SENT_KEY, String(Date.now()));
      } catch {
        // storage unavailable: the cooldown simply does not apply
      }
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "Failed to send",
        description: `Something went wrong. Please try again, or email ${LINKS.email}.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <m.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title">Open a Channel</h2>
            <p className="section-subtitle mx-auto">Have a question or want to work together? Send a message directly.</p>
            <p className="mt-3 font-mono text-sm text-muted-foreground">
              Or email{" "}
              <a
                href={`mailto:${LINKS.email}`}
                className="inline-flex items-center min-h-[44px] text-primary hover:underline"
              >
                {LINKS.email}
              </a>
            </p>
          </m.div>

          <m.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="h-11 bg-card border-border input-glow"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="h-11 bg-card border-border input-glow"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                required
                rows={5}
                maxLength={2000}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Your message..."
                className="bg-card border-border input-glow resize-none"
              />
            </div>

            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="website">Leave this field empty</label>
              <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full gap-2" size="lg">
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </Button>
          </m.form>

          <div className="flex items-center justify-center gap-4 mt-12">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
