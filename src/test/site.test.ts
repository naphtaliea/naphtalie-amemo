import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { POSTS, sortedPosts } from "@/data/posts";
import { PROJECTS } from "@/data/projects";
import { LINKS, SITE_URL } from "@/lib/site";

const root = path.resolve(__dirname, "../..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("posts", () => {
  it("have unique slugs and point at real projects", () => {
    const slugs = POSTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const post of POSTS) {
      if (post.project) expect(PROJECTS.map((p) => p.slug)).toContain(post.project);
    }
  });

  it("show the featured post first, then newest first", () => {
    const sorted = sortedPosts();
    expect(sorted[0].featured).toBe(true);
    const rest = sorted.slice(1).map((p) => p.date);
    expect(rest).toEqual([...rest].sort().reverse());
  });
});

describe("projects", () => {
  it("have unique slugs, https live links and screenshots that exist", () => {
    expect(new Set(PROJECTS.map((p) => p.slug)).size).toBe(PROJECTS.length);
    for (const project of PROJECTS) {
      expect(project.live.href.startsWith("https://")).toBe(true);
      expect(fs.existsSync(path.join(root, "public", project.image.src))).toBe(true);
    }
  });
});

describe("sitemap", () => {
  it("lists the home page and every post", () => {
    const xml = read("public/sitemap.xml");
    expect(xml).toContain(`<loc>${SITE_URL}/</loc>`);
    for (const post of POSTS) expect(xml).toContain(`<loc>${SITE_URL}/blog/${post.slug}</loc>`);
  });
});

describe("deploy config", () => {
  it("sends security headers and does not rewrite unknown paths", () => {
    const config = JSON.parse(read("vercel.json"));
    const headerKeys = config.headers.flatMap((h: { headers: { key: string }[] }) => h.headers.map((x) => x.key));
    expect(headerKeys).toEqual(expect.arrayContaining(["Content-Security-Policy", "X-Content-Type-Options", "Referrer-Policy"]));
    expect(config.rewrites.map((r: { source: string }) => r.source)).toEqual(["/blog/:slug"]);
  });

  it("keeps the dark theme rules in the build when only index.html sets the class", () => {
    expect(read("index.html")).toContain('class="dark"');
    expect(read("tailwind.config.ts")).toMatch(/safelist:\s*\[\s*"dark"\s*\]/);
  });

  it("shows the email in the no-JavaScript fallback", () => {
    expect(LINKS.email).toBe("amemonaphtalie@gmail.com");
    expect(read("index.html")).toContain(`href="mailto:${LINKS.email}"`);
  });

  it("names a canonical URL and an absolute share image", () => {
    const html = read("index.html");
    expect(html).toContain(`rel="canonical" href="${SITE_URL}/"`);
    expect(html).toContain(`property="og:image" content="${SITE_URL}/og.png"`);
  });
});
