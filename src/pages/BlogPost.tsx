import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Masthead from "@/components/sections/Masthead";
import Footer from "@/components/sections/Footer";
import { POSTS, getCaseNumber } from "@/data/posts";

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
            <header className="mb-8 border-b border-border pb-6">
              <div className="flex items-center gap-3 mb-3 flex-wrap font-mono text-xs text-muted-foreground">
                <span className="text-primary">{getCaseNumber(post.slug)}</span>
                <time>{post.date}</time>
                <span className="case-label">{post.category}</span>
              </div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                {post.title}
              </h1>
            </header>
            <div className="text-foreground/80 leading-relaxed whitespace-pre-line max-w-xl">
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
