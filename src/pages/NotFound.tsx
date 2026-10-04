import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="case-frame p-8 text-center max-w-sm">
        <p className="case-label mb-3">File not found</p>
        <h1 className="font-display text-4xl font-bold text-foreground mb-2">404</h1>
        <p className="mb-6 text-muted-foreground">No record matches this path.</p>
        <a href="/" className="font-mono text-sm text-primary hover:underline">
          Return to case file
        </a>
      </div>
    </div>
  );
};

export default NotFound;
