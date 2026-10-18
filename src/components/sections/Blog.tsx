import { ArrowRight } from "lucide-react";
import { m } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCaseNumber, readingMinutes, sortedPosts } from "@/data/posts";
import { PROJECTS } from "@/data/projects";

const Blog = () => {
  const posts = sortedPosts();

  return (
    <section id="blog" className="py-20 md:py-32 bg-secondary/30 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <m.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Blog & Writeups</h2>
          <p className="section-subtitle mx-auto">Case studies from the projects above.</p>
        </m.div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => {
            const project = PROJECTS.find((p) => p.slug === post.project);
            return (
              <Card
                key={post.id}
                className={`h-full bg-card border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 ${
                  post.featured ? "md:col-span-3" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-mono text-primary">{getCaseNumber(post.slug)}</span>
                    <time className="text-xs text-muted-foreground font-mono">{post.date}</time>
                    <span className="text-xs text-muted-foreground font-mono">{readingMinutes(post)} min read</span>
                    <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-0">
                      {post.category}
                    </Badge>
                    {post.featured && (
                      <Badge variant="secondary" className="text-xs bg-primary text-primary-foreground border-0">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardTitle className={post.featured ? "text-xl md:text-2xl" : "text-base"}>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 max-w-3xl">{post.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-x-6">
                    <Link
                      to={`/blog/${post.slug}`}
                      aria-label={`Read the case study: ${post.title}`}
                      className="inline-flex items-center gap-2 min-h-[44px] text-primary font-medium text-sm hover:underline"
                    >
                      Read the case study
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                    {project && (
                      <a
                        href="#projects"
                        className="inline-flex items-center min-h-[44px] font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
                      >
                        Related project: {project.title}
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Blog;
