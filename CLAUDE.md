# shadhin-folio

Best practices for building a minimal, fast, and maintainable personal portfolio website.

## Guiding principle

Ship the least amount of code that looks intentional. Every added dependency, animation, or abstraction must earn its place.

## Structure & stack

- Prefer plain HTML/CSS/JS or a lightweight static site approach (e.g. Astro, or a single build-free `index.html`) over a heavy framework unless interactivity genuinely requires one.
- Keep the folder flat: `index.html`, `styles.css`, `script.js` (or a small `src/` if using a bundler). Avoid deep nesting for a small site.
- One page beats many pages until content actually requires separate routes.

## Performance

- Ship system fonts or at most one web font, self-hosted or via `<link rel="preconnect">` + `font-display: swap`.
- Optimize and lazy-load images (`loading="lazy"`, modern formats like WebP/AVIF, correct `width`/`height` to avoid layout shift).
- No unused CSS/JS. No UI framework for a handful of components — write the CSS by hand.
- Target a single-digit number of network requests. Inline critical CSS if it stays small.

## Design

- Establish a small design system before writing markup: 1 type scale, 1 spacing scale (e.g. 4/8px grid), 2–3 colors plus neutrals.
- Prioritize whitespace, readable line length (~60–75 characters), and clear hierarchy over decoration.
- Respect `prefers-color-scheme` and `prefers-reduced-motion`.
- Mobile-first responsive layout; test at 375px, 768px, 1280px.

## Accessibility

- Semantic HTML first (`<nav>`, `<main>`, `<header>`, `<footer>`, headings in order) — don't reach for `<div>` + ARIA when a native element does the job.
- All interactive elements reachable and operable by keyboard; visible focus states.
- Sufficient color contrast (WCAG AA minimum).
- Meaningful `alt` text on images; skip-to-content link if navigation is non-trivial.

## Content

- Write copy before layout. A minimal site lives or dies on clear, short copy — cut anything that doesn't help a visitor decide to contact you or view your work.
- Keep the project list curated (3–6 strongest projects) rather than exhaustive.

## SEO & meta

- One clear `<title>` and `<meta name="description">` per page.
- Open Graph tags for link previews (`og:title`, `og:description`, `og:image`).
- A single `favicon.ico`/`svg`, no unnecessary meta cruft.

## Deployment

- Static hosting (GitHub Pages, Netlify, Vercel, Cloudflare Pages) — no server needed for a portfolio.
- Set long-cache headers for static assets; use cache-busted filenames if the host doesn't do it automatically.
- Enable HTTPS (default on the above hosts) and a custom domain if desired.

## What to avoid

- Heavy JS frameworks/state management for content that doesn't change.
- Carousel/slider libraries, parallax, or animation libraries for a portfolio — a few CSS transitions are enough.
- Analytics/tracking scripts beyond one lightweight, privacy-respecting option (or none).
- Icon font libraries when a handful of inline SVGs will do.
