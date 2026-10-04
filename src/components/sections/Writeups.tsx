import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { POSTS } from "@/data/posts";
import SectionHeading from "./SectionHeading";

const Writeups = () => {
  const posts = [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <section id="writeups" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading title="Writeups" subtitle="Notes on cybersecurity, CTFs, and what I'm learning." />

        <div className="max-w-2xl">
          {posts.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="block-link group flex items-start justify-between gap-6">
              <div>
                <p className="font-mono text-xs text-muted-foreground mb-1">
                  {post.date} · {post.category}
                </p>
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Writeups;
