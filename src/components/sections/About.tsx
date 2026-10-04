const About = () => {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <p className="text-xl md:text-2xl text-foreground/80 leading-snug max-w-2xl">
          I'm a cybersecurity student at the University of Mines and Technology (UMAT) in
          Tarkwa, Ghana, focused on penetration testing and ethical hacking — and a developer
          who ships real products on the side.{" "}
          <span className="text-foreground font-medium">
            4 projects shipped, 2 certifications in progress, 1 CTF completed.
          </span>
        </p>
      </div>
    </section>
  );
};

export default About;
