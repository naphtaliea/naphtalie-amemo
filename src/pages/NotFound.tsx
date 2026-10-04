import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="font-display text-6xl font-extrabold text-foreground mb-4">404</h1>
        <p className="mb-6 text-foreground/60 text-lg">This page doesn't exist.</p>
        <a href="/" className="text-primary font-medium hover:underline">
          Back home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
