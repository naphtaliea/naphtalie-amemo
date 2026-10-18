import { Suspense, lazy } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index";

const BlogPost = lazy(() => import("./pages/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  // reducedMotion="user" makes every animation honour the visitor's OS setting.
  <MotionConfig reducedMotion="user">
    <LazyMotion features={domAnimation} strict>
      <Toaster />
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </LazyMotion>
  </MotionConfig>
);

export default App;
