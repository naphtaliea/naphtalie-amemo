import { useEffect } from "react";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_URL } from "@/lib/site";

interface PageMeta {
  title?: string;
  description?: string;
  path?: string;
  noindex?: boolean;
}

const setTag = (selector: string, create: () => HTMLElement, attr: string, value: string) => {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

const meta = (key: "name" | "property", name: string) => () => {
  const el = document.createElement("meta");
  el.setAttribute(key, name);
  return el;
};

// The site is a single-page app, so each route updates the head tags that crawlers and share cards read.
export const usePageMeta = ({ title = DEFAULT_TITLE, description = DEFAULT_DESCRIPTION, path = "/", noindex = false }: PageMeta) => {
  useEffect(() => {
    const url = SITE_URL + path;
    document.title = title;
    setTag('meta[name="description"]', meta("name", "description"), "content", description);
    setTag('meta[property="og:title"]', meta("property", "og:title"), "content", title);
    setTag('meta[property="og:description"]', meta("property", "og:description"), "content", description);
    setTag('meta[property="og:url"]', meta("property", "og:url"), "content", url);
    setTag('meta[name="twitter:title"]', meta("name", "twitter:title"), "content", title);
    setTag('meta[name="twitter:description"]', meta("name", "twitter:description"), "content", description);
    setTag('link[rel="canonical"]', () => Object.assign(document.createElement("link"), { rel: "canonical" }), "href", url);
    setTag('meta[name="robots"]', meta("name", "robots"), "content", noindex ? "noindex" : "index, follow");
  }, [title, description, path, noindex]);
};
