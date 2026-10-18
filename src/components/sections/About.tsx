const About = () => {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <p className="text-xl md:text-2xl text-foreground/80 leading-snug max-w-2xl">
          Full-stack developer and BSc Cybersecurity student at the University of Mines and
          Technology (UMaT). I learn by building real projects with React, TypeScript, Next.js,
          Supabase and Cloudflare Workers, then pentesting and debugging them while people use
          them.{" "}
          <span className="text-foreground font-medium">
            Currently building web apps for small business clients.
          </span>{" "}
          Eager to keep learning in remote software engineering work.
        </p>
      </div>
    </section>
  );
};

export default About;
