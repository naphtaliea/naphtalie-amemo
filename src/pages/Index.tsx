import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Certifications from "@/components/sections/Certifications";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import ScanlineOverlay from "@/components/sections/ScanlineOverlay";
import StatusBar from "@/components/sections/StatusBar";
import TerminalBoot from "@/components/TerminalBoot";

const Index = () => {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!booted && <TerminalBoot onComplete={() => setBooted(true)} />}
      </AnimatePresence>

      {booted && (
        <motion.div
          className="min-h-screen bg-background pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ScanlineOverlay />
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Certifications />
          <Blog />
          <Contact />
          <Footer />
          <StatusBar />
        </motion.div>
      )}
    </>
  );
};

export default Index;
