# Amemo Naphtalie, portfolio

Portfolio of a full-stack developer and BSc Cybersecurity student: four shipped projects, security work and case studies. A dark terminal theme with a short boot intro, scanlines and a Ctrl K command palette.

Live: https://naphtalie-amemo.vercel.app

## Stack

React 18, TypeScript, Vite, Tailwind CSS, Radix UI primitives, Framer Motion (loaded on demand), React Router. Fonts are self-hosted through `@fontsource`.

## Develop

```sh
npm install
npm run dev      # http://localhost:8080
npm run build    # production build into dist/
npm test         # vitest
```

## Where things live

| Path | What it holds |
|---|---|
| `src/data/projects.ts` | Projects and security experience (the text mirrors the resume) |
| `src/data/posts.ts` | Case studies shown under Blog and at `/blog/:slug` |
| `src/lib/site.ts` | Canonical URL, resume path and contact links |
| `public/` | Resume PDF, project screenshots, share image, `sitemap.xml`, `404.html` |
| `vercel.json` | Security headers (including the Content-Security-Policy) and the `/blog/:slug` rewrite |

## Adding a post

1. Add an entry to `POSTS` in `src/data/posts.ts`.
2. Add its URL to `public/sitemap.xml`. A test fails if the sitemap is missing a post.

## Notes

- The site is dark only. `class="dark"` is set in `index.html` and kept in the build with a Tailwind `safelist`.
- The same build is deployed to several Vercel projects, so `SITE_URL` in `src/lib/site.ts` and `index.html` names one canonical address.
- Contact form: EmailJS service, template and public key are in `src/components/sections/Contact.tsx`. They are public by design, so restrict allowed origins in the EmailJS dashboard.
