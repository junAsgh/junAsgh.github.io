# Redesign v2 Plan: Less scrolling, less filler, more impact

## Implementation plan (short)
1. Audit and compress page structure so each page has fewer, higher-value sections.
2. Rebuild the home page as a compact entry point with a cinematic hero, proof strip, one featured project preview, and clear CTAs.
3. Reframe the projects page as a cinematic focus deck with keyboard navigation and low scroll.
4. Tighten CV and Contact pages into concise recruiter-friendly layouts.
5. Apply motion, accessibility, and mobile rules so the experience is polished and usable on all devices.

## Strategic direction
The site should feel strong within the first 10 to 30 seconds. The home page should signal clarity and intent, then route people quickly to Projects and CV. The projects page should do most of the persuasion work.

Inspired by the mood and compact confidence of https://xeuxdev.vercel.app/, but with a unique structure and visual language for machine learning, analytics, and AI work.

## Page-by-page plan

### 1) Home page (`index.html`)
Goal: compact, high-signal, and visually confident.

Keep only:
- **Cinematic hero**
- **Small proof strip**
- **One featured project preview area**
- **Strong CTA row** to Projects and CV

#### New home section flow
1. Hero (headline, one-line descriptor, short intro, primary CTA, secondary CTA)
2. Recruiter Mode strip (quick summary pills or compact tiles with no fake numbers)
3. Featured project preview (single project spotlight with visual backdrop and link to full Projects deck)
4. Quick Jump Dock (subtle mini nav to Projects, CV, Contact)

#### Home content compression guidance
- Keep hero copy to short blocks, max 2 lines per paragraph.
- Use one supporting statement instead of multiple explanatory sections.
- Replace long lists with 3 to 5 compact proof points.
- Remove repeated stack and process descriptions from home and place detail on Projects and CV pages.

### 2) Projects page (`projects.html`)
Goal: premium visual showcase with low scroll.

#### Core interaction model
- One project visible at a time.
- Full-bleed project background visual per project.
- Foreground content card (glass or solid panel) with high contrast.
- Visible stack row.
- Left and right keyboard arrows.
- Optional click and swipe controls.
- Cinematic transitions between projects.

#### Project Focus Deck details
For each of the exact projects:
1. Real-Time Visual Diagnosis System
2. E-commerce Analytics Platform
3. PlantOps: Automated Plant Disease Monitoring & Analysis System

Display in each panel:
- Project name
- Short problem statement
- Approach summary
- Stack row
- One clear link action (for example Contact)

Each project should have a distinct accent mood via colour, overlay, and motion timing.

#### Content compression guidance for Projects
- Keep each project panel to concise content blocks.
- Move deeper case-study detail behind optional expanders or a secondary layer.
- Remove duplicate sections that repeat challenge, approach, and results in separate long blocks.

### 3) CV page (`cv.html`)
Goal: compact and elegant.

Keep sections:
- Summary
- Skills
- Education
- Project highlights
- Links

Add:
- Optional print-friendly stylesheet treatment using `@media print`.
- Cleaner single-column mobile layout.

Compression guidance:
- Keep summary short and direct.
- Merge overlapping tools and interests content where possible.
- Keep project highlights to concise cards linked to Projects.

### 4) Contact page (`contact.html`)
Goal: short, polished, and direct.

Keep sections:
- Intro with clear invitation to connect.
- Direct link actions (LinkedIn, GitHub, email).
- Email copy action with clear feedback.

Compression guidance:
- Remove secondary filler copy.
- Keep action-first structure with minimal scrolling.

## Unique twists to include

### Recruiter Mode
A compact high-signal summary near the hero.
Possible formats:
- Pill row with capability tags.
- Small metric-style tiles with factual labels only, no fabricated numbers.
- “What I build” micro strip.

### Project Focus Deck
Projects page as a cinematic deck:
- Background visual for each project.
- Foreground card with core project narrative.
- Distinct accent mood per project.
- Smooth but quick transitions.

### Quick Jump Dock
Subtle fixed or semi-fixed mini dock for rapid jumps to:
- Projects
- CV
- Contact

Should feel premium, intuitive, and quiet.

## Proposed file changes

### Update
- `index.html`: reduce section count and restructure into compact flow.
- `projects.html`: replace long stacked sections with cinematic deck layout.
- `cv.html`: compress to concise section set and clean hierarchy.
- `contact.html`: simplify to direct polished actions.
- `assets/css/pages/home.css`: hero, proof strip, dock, compact spacing.
- `assets/css/pages/projects.css`: full-bleed visuals, panel, transitions, mood accents.
- `assets/css/pages/cv.css`: compact layout and print-friendly refinements.
- `assets/css/pages/contact.css`: action-first compact layout.
- `assets/js/home.js`: render compact Recruiter Mode and featured preview.
- `assets/js/projects-page.js`: manage cinematic deck state, keyboard arrows, transitions.
- `assets/js/projects-slider.js`: adapt or merge into new focus deck controller.
- `assets/js/cv.js`: support compressed CV content binding.
- `assets/js/contact.js`: keep copy interaction crisp and minimal.
- `assets/data/home-data.js`: compress and refocus home content.
- `assets/data/projects-data.js`: ensure concise deck-oriented content fields.
- `assets/data/cv-data.js`: tighten summary and highlight data.
- `assets/data/contact-data.js`: keep direct concise contact copy.

### Add (optional)
- `assets/css/pages/print-cv.css`: print-specific CV styling, if separation is cleaner than inline print rules.

## What should be removed from the current home page
Remove or merge these current sections:
- Selected Focus Areas
- Currently Building / Learning
- Working Stack
- Education Snapshot
- How I Work
- Large final CTA ribbon if CTA is already clear in hero and dock

Rationale:
- These add scroll and repetition.
- They dilute the first impression.
- Their useful detail can live on Projects and CV pages.

## Motion guidance
- Use short, smooth transitions for deck changes and hero load.
- Keep animation subtle and purposeful.
- Prioritise opacity, transform, and blur transitions with restrained duration.
- Avoid long chained animations that delay content access.

## Accessibility and reduced-motion rules
- Preserve semantic landmarks and heading order.
- Maintain keyboard access for nav, deck controls, and actions.
- Add visible focus states with strong contrast.
- Ensure text contrast over background images is WCAG-conscious.
- Respect `prefers-reduced-motion: reduce`:
  - Disable cinematic transitions.
  - Remove parallax-like effects.
  - Use instant or near-instant state changes.
- Keep skip link and screen-reader labels intact.

## Mobile rules
- Prioritise above-the-fold clarity.
- Keep hero and Recruiter Mode compact.
- Ensure deck controls are thumb-friendly and clearly labelled.
- Avoid cramped content cards over visual backdrops.
- Keep dock unobtrusive and collapsible if needed.

---

## Current page structure
- Home: Hero, Featured Project Spotlight, Selected Focus Areas, Currently Building/Learning, Working Stack, Education Snapshot, How I Work, Final CTA.
- Projects: Hero, Why These Projects framing, Featured slider, Metadata, Case Study Detail, Stack, Architecture/Process/Lessons, CTA.
- CV: Intro, Key strengths, Education, Selected projects, Tools/interests, Contact.
- Contact: Intro, Primary channels, Availability/collaboration, Reasons to reach out.

## Proposed new page structure
- Home: Cinematic Hero, Recruiter Mode strip, Featured Project Preview, Quick Jump Dock, strong CTAs.
- Projects: Cinematic Project Focus Deck (one project at a time), compact controls, concise stack row, direct action.
- CV: Summary, Skills, Education, Project highlights, Links, optional print style.
- Contact: Short intro, direct links, email copy action, clear invitation.

## Home-page sections to remove or merge
Remove:
- Selected Focus Areas
- Currently Building / Learning
- Working Stack
- Education Snapshot
- How I Work

Merge:
- Final CTA into Hero CTA row and Quick Jump Dock.
- Project spotlight into one stronger featured preview block.
