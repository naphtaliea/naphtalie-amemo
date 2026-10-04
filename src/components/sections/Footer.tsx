const Footer = () => (
  <footer className="py-6 border-t border-border">
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        <span className="case-label">© {new Date().getFullYear()} Naphtalie Amemo. All rights reserved.</span>
        <span className="case-label">End of file.</span>
      </div>
    </div>
  </footer>
);

export default Footer;
