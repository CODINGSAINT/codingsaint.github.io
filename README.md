# DigitalYogi website

Jekyll site served by GitHub Pages at https://digitalyogi.tech.

## Pages

| URL | Source |
| --- | --- |
| `/` | `index.markdown` → `_layouts/home.html` |
| `/courses/` | `courses/index.html` (cards: `_includes/course-cards.html`) |
| `/kb/` | `kb/index.html` |
| `/about/` | `about.html` |
| `/privacy/`, `/terms/` | `privacy.markdown`, `terms.markdown` |
| `/sitemap.xml`, `/robots.txt` | Liquid templates; the sitemap lists the pages above plus every post (set `sitemap: false` in a post's front matter to leave it out) |

Every page uses `_layouts/brand.html` (head metadata, header, footer). Front matter it reads:
`seo_title` (full `<title>`), `description`, `crumb` (adds a breadcrumb + BreadcrumbList),
`robots` (e.g. `noindex, follow`), `og_image`. Page-specific JSON-LD sits at the top of each page.

Design system: the same tokens as Learn and KB (`--ground`, `--raised`, `--ink`, `--muted`, `--line`,
indigo `#1f1a4d` fields, Manrope + JetBrains Mono) with light/dark themes. The header toggle saves
the choice under `digitalyogi-theme`, the same key the other DigitalYogi sites use. The `#c81e3a`
bindu is only for the logo. Practice tracks use KB's track colours (LLD, HLD, AI, DSA).

Header/footer: `_includes/site-header.html`, `_includes/site-footer.html`.
Styles: `assets/css/site.css`. Script: `assets/js/site.js` (menu, reveals, lazy hero).
Fonts are self-hosted in `assets/fonts/`.

Legacy articles stay at their original URLs and use the old `post`/`default` layouts; they are
not linked from the new navigation yet.

## The Three.js hero

`_src/hero/scene.js` → built to `assets/js/hero.js` (tree-shaken three.js, ~130 KB gzipped).
Inside the brand's indigo hero panel, a particle cloud assembles into the free course's architecture (API → Retrieval → Model →
Guardrails), a request pulse runs along it, particles part around the pointer, and scrolling
lets it drift apart. It loads during idle time after the text has painted, pauses off-screen,
respects `prefers-reduced-motion` and Save-Data, and falls back to a static CSS diagram.

```bash
cd _src/hero && npm install && npm run build   # rewrites assets/js/hero.js
```

Commit the rebuilt `assets/js/hero.js` — GitHub Pages does not run npm. Jekyll ignores `_src/`.

## Search Console / analytics

Uncomment and fill in `google_site_verification`, `bing_site_verification` or
`cloudflare_beacon` in `_config.yml`; the layout adds the tags only when they are set.

## Preview

`bundle install && bundle exec jekyll serve`, then check home, courses, kb, about, 404, a narrow
mobile width, keyboard navigation and the Udemy referral links.
