import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import StatusBar from "@/components/sections/StatusBar";
import { POSTS, getCaseNumber } from "@/data/posts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = POSTS.find((p) => p.slug === slug);

  return (
    <div className="min-h-screen bg-background pb-8">
      <Navbar />
      <main className="container mx-auto px-4 md:px-6 pt-28 pb-20 max-w-3xl relative z-10">
        <Link
          to="/#blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {!post && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Post not found.</p>
          </div>
        )}

        {post && (
          <article>
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="text-sm font-mono text-primary">{getCaseNumber(post.slug)}</span>
                <time className="text-sm text-muted-foreground font-mono">{post.date}</time>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-xs">
                  {post.category}
                </Badge>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">{post.title}</h1>
            </header>
            <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
              {post.content}
            </div>
          </article>
        )}
      </main>
      <Footer />
      <StatusBar />
    </div>
  );
};

export default BlogPost;
