import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 md:px-6 pt-28 pb-20 max-w-3xl relative z-10">
        <Link
          to="/#blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {isLoading && (
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-full mt-8" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Post not found.</p>
          </div>
        )}

        {post && (
          <article>
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <time className="text-sm text-muted-foreground font-mono">{post.date}</time>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-xs">
                  {post.category}
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">{post.title}</h1>
            </header>
            <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
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
