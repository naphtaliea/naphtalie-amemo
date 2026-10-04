import Masthead from "@/components/sections/Masthead";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Findings from "@/components/sections/Findings";
import Certifications from "@/components/sections/Certifications";
import Writeups from "@/components/sections/Writeups";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Masthead />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Findings />
      <Certifications />
      <Writeups />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
