# DigitalYogi website

Jekyll website served by GitHub Pages at https://digitalyogi.tech.

## Brand and content

- Primary pages: `index.markdown`, `courses/index.html`, `about.markdown`.
- Shared layout: `_layouts/brand.html`; home content: `_layouts/home.html`.
- Course cards: `_includes/course-cards.html`. Keep referral links intact and check Udemy for pricing.
- Themes: `assets/css/brand.css`; toggle: `assets/js/brand.js`.
- The initial theme follows the operating system. An explicit visitor choice is saved in localStorage. Storage being unavailable does not prevent switching themes.
- Manrope is used for the wordmark and prose; JetBrains Mono for code and topic labels. Fonts have local fallbacks.
- Light: white, ink #0B0D12. Dark: #0B0D12, white. Indigo fields: #1F1A4D. The #C81E3A bindu is reserved for the logo.
- KB lives in a separate repository and deployment at `https://kb.digitalyogi.tech/`; this site links to it without copying or rebuilding it.
- Existing article URLs remain in the repository, but there is no blog feed in the new homepage or navigation.

## Preview

Install Ruby and Bundler, then run `bundle install` and `bundle exec jekyll serve`. Open the printed localhost URL. GitHub Pages performs the deployment build after a push to its configured publishing branch.

Check home, courses, about and 404; both themes; keyboard navigation; narrow mobile widths; course referral links; and `https://kb.digitalyogi.tech/`. Theme preference should persist across reloads and primary pages.
