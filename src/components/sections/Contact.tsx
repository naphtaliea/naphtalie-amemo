import { useState, useRef } from "react";
import { Send, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SectionHeading from "./SectionHeading";

const SOCIAL_LINKS = [
  { icon: Github, href: "https://github.com/naphtaliea", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/naphtalie-amemo/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:amemonaphtalie@gmail.com", label: "Email" },
  { icon: MessageCircle, href: "https://wa.me/233257218162", label: "WhatsApp" },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        "service_uqwilvs",
        "template_rgxwm9g",
        formRef.current!,
        "NnZM0QV_OXiG6zpzw"
      );
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "Failed to send",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-xl">
          <SectionHeading
            number="07"
            title="Open a channel"
            subtitle="Have a question or want to work together? Send a message directly."
          />

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="bg-card border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="bg-card border-border"
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
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Your message..."
                className="bg-card border-border resize-none"
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full gap-2" size="lg">
              {isSubmitting ? "Sending..." : (
                <>
                  <Send className="w-5 h-5" />
                  Send message
                </>
              )}
            </Button>
          </form>

          <div className="flex items-center gap-3 mt-10 pt-8 border-t border-border">
            <span className="case-label mr-2">Also reachable at</span>
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
