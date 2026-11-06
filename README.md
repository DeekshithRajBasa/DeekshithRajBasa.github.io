# deekshithrajbasa.github.io

Personal portfolio of **Deekshith Raj Basa** — Senior Software Engineer (Frontend).

Live: https://deekshithrajbasa.github.io/

## Stack

A dependency-free static site — no build step:

- `index.html` — all content (experience, skills, education, certifications, testimonials, contact)
- `assets/css/main.css` — design system (light-first blue/slate theme with dark mode, responsive layout, animations)
- `assets/js/main.js` — theme toggle, mobile menu, scroll reveal, Formspree contact form

Fully responsive (mobile, tablet, desktop), respects `prefers-color-scheme` and `prefers-reduced-motion`.

## Updating content

Edit `index.html` directly — each experience entry is an `<li class="job">`,
each certification an `<li>` in `.cert-list`, each testimonial a `<figure class="quote">`.
Push to `master` and GitHub Pages deploys automatically.

## Brand

**Pointer D** symbol (a rounded capital D whose counter is a mouse pointer) + **drb** lowercase wordmark.
Files in `assets/brand/`: `logo.svg` (blue gradient), `logo-black.svg`, `logo-white.svg`, `logo-tile.svg` (app icon),
`wordmark.svg`, `logo-horizontal.svg` / `logo-horizontal-white.svg` (lockups), plus `favicon.ico`, `favicon.svg`,
`apple-touch-icon.png` and 192/512 px icons. Brand blue: `#1c52db` (gradient `#3b67f0` → `#1742b4`), font: Plus Jakarta Sans.
