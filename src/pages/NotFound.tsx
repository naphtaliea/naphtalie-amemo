import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/use-page-meta";
import { SITE_NAME } from "@/lib/site";

const NotFound = () => {
  usePageMeta({ title: `Page not found | ${SITE_NAME}`, path: "/404", noindex: true });

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center font-mono">
        <p className="text-primary mb-2">$ cd /requested/page</p>
        <h1 className="mb-2 text-5xl font-bold text-foreground">404</h1>
        <p className="mb-6 text-muted-foreground">No such file or directory.</p>
        <Link to="/" className="inline-flex items-center min-h-[44px] px-4 text-primary underline hover:text-primary/90">
          cd ~
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
