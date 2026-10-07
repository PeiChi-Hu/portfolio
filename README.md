# Pei-Chi Hu — Portfolio

Single-page portfolio built with **React + Vite + Tailwind CSS + Framer Motion**. No backend.

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs to dist/
npm run preview   # serve the production build
```

## Deploy to GitHub Pages

1. Create a GitHub repo (e.g. `portfolio`, or `<username>.github.io` for a root site) and push this folder to `main`.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml` and publishes `dist/`.

`vite.config.js` uses `base: './'`, so the build works under any repo path without changes.

## Before publishing — TODO

- `src/data/site.js` → set `github` to your GitHub profile URL (currently a placeholder).
- `public/Resume_PeiChi.pdf` → the public resume. It includes a phone number; swap in a version without it if you prefer.
- `public/PeiChi_ASRS_paper.pdf` → ASRS conference paper linked from the Projects section.

## Structure (v2)

Order: Hero → Experience Path → Selected work (4 case studies) → Production Engineering → Projects → Skills → Education → Contact.
Previous versions are kept in `../Protfolio_archive/` (v1-recruiter, v2-casestudies).

Each Selected Work case has two layers:
- **Scan layer** (`CaseIntro`): category, technical title, subtitle, system visual, 1–2 metrics, *System context* vs *My contribution*, tech tags.
- **Depth layer**: `SolutionArc` (started with → where it broke → turning point → what shipped), `Tradeoffs`, and a collapsible `Disclosure` with the full `ReasoningPath` log and notes.

`ExperiencePath` maps six stack layers to every piece of work and links to its anchor (`#case-*`, `#prod-*`, `#project-*`, `#cmu-*`).

```
src/components/ui/        CaseIntro, ReasoningPath, Tradeoffs, EngineeringNotes, PullQuote, FlowDiagram, TechTag, CTAButton, Reveal, Panel
src/components/sections/  Hero, Experience, Work (Fleet / Perception / Calibration / SLAM), RoboticsStack, Projects (ASRS photo, AMR), Education, FooterCTA
public/images/            asrs.jpg — add more photos you own here (e.g. amr.jpg)
```

To use a photo in a case study instead of a diagram, pass it as `media` to `CaseIntro`:
`media={<img src={`${import.meta.env.BASE_URL}images/your.jpg`} alt="…" width="…" height="…" className="w-full rounded-[24px]" />}`
Only use employer product photos if you have the right to publish them.

All FARobot diagrams are newly drawn, simplified and generic — no proprietary names, code, or internal details.
Motion respects `prefers-reduced-motion` via `<MotionConfig reducedMotion="user">`.
