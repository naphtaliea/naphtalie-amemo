import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { POSTS, getCaseNumber } from "@/data/posts";
import SectionHeading from "./SectionHeading";

const Writeups = () => {
  const posts = [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <section id="writeups" className="py-16 md:py-24 border-b border-border">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading number="06" title="Writeups" subtitle="Notes on cybersecurity, CTFs, and what I'm learning." />

        <div className="max-w-3xl">
          {posts.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="ledger-row flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 group">
              <div className="sm:w-28 shrink-0 font-mono text-xs text-muted-foreground">
                <div className="text-primary">{getCaseNumber(post.slug)}</div>
                <div>{post.date}</div>
              </div>
              <div className="flex-1">
                <p className="case-label mb-1">{post.category}</p>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm max-w-xl">{post.excerpt}</p>
              </div>
              <ArrowRight className="hidden sm:block w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Writeups;
