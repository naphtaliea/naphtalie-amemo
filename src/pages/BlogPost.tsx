import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import StatusBar from "@/components/sections/StatusBar";
import { POSTS, getCaseNumber, readingMinutes } from "@/data/posts";
import { PROJECTS } from "@/data/projects";
import { usePageMeta } from "@/hooks/use-page-meta";
import { SITE_NAME } from "@/lib/site";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = POSTS.find((p) => p.slug === slug);
  const project = PROJECTS.find((p) => p.slug === post?.project);

  usePageMeta(
    post
      ? { title: `${post.title} | ${SITE_NAME}`, description: post.excerpt, path: `/blog/${post.slug}` }
      : { title: `Post not found | ${SITE_NAME}`, path: `/blog/${slug ?? ""}`, noindex: true },
  );

  return (
    <div className="min-h-screen bg-background md:pb-8">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="container mx-auto px-4 md:px-6 pt-28 pb-20 max-w-3xl relative z-10">
        <Link
          to="/#blog"
          className="inline-flex items-center gap-2 min-h-[44px] text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back to Blog
        </Link>

        {!post && (
          <div className="text-center py-20">
            <h1 className="font-display text-3xl font-bold text-foreground mb-3">Post not found</h1>
            <p className="text-muted-foreground">That case study does not exist.</p>
          </div>
        )}

        {post && (
          <article>
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="text-sm font-mono text-primary">{getCaseNumber(post.slug)}</span>
                <time className="text-sm text-muted-foreground font-mono">{post.date}</time>
                <span className="text-sm text-muted-foreground font-mono">{readingMinutes(post)} min read</span>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-xs">
                  {post.category}
                </Badge>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">{post.title}</h1>
            </header>
            <div className="text-foreground/80 text-lg leading-relaxed whitespace-pre-line max-w-prose">{post.content}</div>

            {project && (
              <aside className="mt-12 p-5 border border-border rounded-lg bg-card">
                <p className="font-mono text-xs text-muted-foreground mb-1">Related project</p>
                <p className="font-semibold text-foreground mb-1">{project.title}</p>
                <p className="text-sm text-muted-foreground mb-2">{project.summary}</p>
                <Link to="/#projects" className="inline-flex items-center min-h-[44px] text-sm text-primary hover:underline">
                  See it in Projects
                </Link>
              </aside>
            )}
          </article>
        )}
      </main>
      <Footer />
      <StatusBar />
    </div>
  );
};

export default BlogPost;
