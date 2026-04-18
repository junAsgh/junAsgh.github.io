# Junaid Asghar Portfolio (`junasgh.github.io`)

A static, GitHub portfolio built with semantic HTML, modular CSS, and vanilla JavaScript modules.

## Page map

- `/index.html`
- `/cv.html`
- `/projects.html`
- `/contact.html`
- `/404.html`

## File structure

```text
.
├── index.html
├── cv.html
├── projects.html
├── contact.html
├── 404.html
├── assets/
│   ├── css/
│   │   ├── theme.css
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   ├── utilities.css
│   │   ├── animations.css
│   │   └── pages/
│   ├── data/
│   │   ├── site-content.js
│   │   ├── home-data.js
│   │   ├── projects-data.js
│   │   ├── cv-data.js
│   │   └── contact-data.js
│   ├── js/
│   │   ├── main.js
│   │   ├── nav.js
│   │   ├── theme.js
│   │   ├── reveal.js
│   │   ├── motion.js
│   │   ├── page-transitions.js
│   │   ├── home.js
│   │   ├── cv.js
│   │   ├── projects-page.js
│   │   ├── projects-slider.js
│   │   └── contact.js
│   └── JunaidAsgharCV.pdf
└── README.md
```

## How to edit CV content

Primary source: `assets/data/cv-data.js`

Update these keys:
- `summary`
- `strengths[]`
- `education[]`
- `projects[]`
- `experience[]`
- `tools[]`
- `interests[]`
- `links[]`

Rendering logic lives in `assets/js/cv.js`.

## How to edit project content

Primary source: `assets/data/projects-data.js`

Each object in `projectsData[]` maps to one case study. Edit:
- hero copy (`hero`)
- metadata strip (`metadata`)
- deep dive (`deepDive`)
- architecture/process/lessons (`process`)
- case-study sections (`caseStudy`)
- CTA links/buttons (`links`, `caseStudy.ctaButtons`, `cta`)

Projects page orchestration:
- `assets/js/projects-page.js` (framing cards + setup)
- `assets/js/projects-slider.js` (interactive slider rendering)

## How to edit home page content

Primary source: `assets/data/home-data.js`

Edit:
- hero content (`hero`)
- spotlight order (`spotlightProjectNames`)
- focus cards (`selectedFocus`)
- currently building/learning (`nowBuilding`)
- stack strip (`stackGroups`)
- education teaser (`educationTeaser`)
- approach statement (`approach`)

Rendering logic: `assets/js/home.js`.

## How to edit contact content

Primary source: `assets/data/contact-data.js`

Edit:
- `intro`
- `cards[]`
- `availability`
- `topics[]`

Rendering logic: `assets/js/contact.js`.

## How to edit colors, theme, and motion

- Design tokens and color system: `assets/css/theme.css`
- Global base styles: `assets/css/base.css`
- Shared component styles: `assets/css/components.css`
- Page layout primitives: `assets/css/layout.css`
- Utility classes: `assets/css/utilities.css`
- Motion keyframes and transitions: `assets/css/animations.css`
- Page-specific styling: `assets/css/pages/*.css`

JavaScript motion behavior:
- `assets/js/motion.js`
- `assets/js/reveal.js`
- `assets/js/page-transitions.js`

Always keep animations compatible with `prefers-reduced-motion`.

## How to replace images/assets

- Place new files under `assets/` (or subfolders like `assets/images/`).
- Update references in HTML/data files to match the new file paths.
- For CV download, keep/update: `assets/JunaidAsgharCV.pdf`.
- If replacing files used in data objects, update both display label and `href` together.

## Maintenance tips

- Keep content edits in `assets/data/*` first.
- Keep behavior edits in `assets/js/*`.
- Keep visual edits in `assets/css/*`.
- Avoid adding build tooling unless truly required; repo is static-hosting-first.
- Preserve truthful TODO markers for any unknown/unverified details.
