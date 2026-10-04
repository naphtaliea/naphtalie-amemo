import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Masthead from "@/components/sections/Masthead";
import Footer from "@/components/sections/Footer";
import { POSTS } from "@/data/posts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = POSTS.find((p) => p.slug === slug);

  return (
    <div className="min-h-screen bg-background">
      <Masthead />
      <main className="container mx-auto px-4 md:px-6 pt-32 pb-20 max-w-2xl">
        <Link
          to="/#writeups"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to writeups
        </Link>

        {!post && (
          <div className="py-20">
            <p className="text-muted-foreground">Post not found.</p>
          </div>
        )}

        {post && (
          <article>
            <header className="mb-8">
              <p className="font-mono text-xs text-muted-foreground mb-3">
                {post.date} · {post.category}
              </p>
              <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
                {post.title}
              </h1>
            </header>
            <div className="text-foreground/70 text-lg leading-relaxed whitespace-pre-line max-w-xl">
              {post.content}
            </div>
          </article>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
