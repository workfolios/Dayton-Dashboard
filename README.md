# Dayton Interactive Briefing Dashboard

Production repository for the Dayton 2.0 interactive business-plan assessment dashboard.

## Public Site

https://workfolios.github.io/Dayton-Dashboard/

## Runtime

- Static HTML/CSS/JavaScript deployed through GitHub Pages.
- `index.html` contains the briefing architecture, navigation, interactive state, chart configuration, sensitivity control, validation funnel, roadmap, and media lifecycle logic.
- `tailwind.css` is the intended deterministic production stylesheet for the refined release.
- Chart.js and Lucide are loaded as explicitly version-pinned runtime dependencies.
- Six local MP3/MP4 files provide the approved multimodal briefing content.

## Production Boundaries

- Preserve the approved five-stage briefing architecture, copy, CTA strategy, financial assumptions, scenario calculations, validation data, roadmap content, media, and visual character.
- Do not substitute missing approved hero/logo artwork with approximations.
- The external `Launch Validation App` link is a companion workflow and is not hosted by this repository.

## Validation Standard

Before release, verify representative desktop, tablet, and mobile widths; keyboard/focus behavior; touch-equivalent disclosures; reduced motion; media playback/lifecycle; chart and sensitivity interactions; validation funnel state; horizontal overflow; console/network errors; and the final public GitHub Pages URL.

## Deployment

Production is served from the repository's authorized GitHub Pages configuration. Record the pre-change commit before release and verify the actual public URL after publication; merge/build status alone is not live verification.
