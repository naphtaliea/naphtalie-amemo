import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Background from "@/components/sections/Background";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import ScanlineOverlay from "@/components/sections/ScanlineOverlay";
import StatusBar from "@/components/sections/StatusBar";
import CommandPalette from "@/components/CommandPalette";
import TerminalBoot, { shouldSkipBoot } from "@/components/TerminalBoot";
import { usePageMeta } from "@/hooks/use-page-meta";

const Index = () => {
  const [booted, setBooted] = useState(shouldSkipBoot);
  const pageRef = useRef<HTMLDivElement>(null);
  const finishBoot = useCallback(() => setBooted(true), []);

  usePageMeta({ path: "/" });

  // While the intro plays the page is rendered but not focusable, so keyboard and screen reader users never land behind it.
  useEffect(() => {
    if (pageRef.current) pageRef.current.inert = !booted;
  }, [booted]);

  return (
    <>
      {!booted && <TerminalBoot onComplete={finishBoot} />}

      <div ref={pageRef} className="min-h-screen bg-background md:pb-8">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ScanlineOverlay />
        <Navbar />
        <main id="main" tabIndex={-1} className="outline-none">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Background />
          <Blog />
          <Contact />
        </main>
        <Footer />
        <StatusBar />
        <CommandPalette />
      </div>
    </>
  );
};

export default Index;
