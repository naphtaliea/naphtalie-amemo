import { Shield } from "lucide-react";

const Footer = () => (
  <footer className="py-8 border-t border-border relative z-10">
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

export default Footer;
