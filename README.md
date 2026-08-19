# Dayton Interactive Briefing Dashboard

Production URL: https://workfolios.github.io/Dayton-Dashboard/

## Production Architecture

This repository contains the static Dayton 2.0 Sprint 1 assessment dashboard used to brief the founders on the business model, financial scenarios, validation priorities, and funding roadmap.

- `index.html` contains the single-page application structure, business content, interaction logic, and Chart.js configuration.
- `assets/dayton.css` is the deterministic local stylesheet used by the production page. The Tailwind Play CDN is not required at runtime.
- Six local MP3/MP4 files provide the three paired audio/video Strategic Learning Center modules.
- Chart.js is pinned to 4.5.1 and Lucide is pinned to 1.27.0. Google Fonts supplies Inter and Montserrat.

## Interaction and Media Contract

- Native audio/video controls are preserved. Media does not autoplay and uses `preload="metadata"`.
- Audio/video playback is paused when the user changes briefing sections.
- The five-stage navigation, financial scenario controls, cash-burn sensitivity control, Validation Funnel, and Dayton Ecosystem Blueprint remain the principal interactive surfaces.
- Keyboard, touch, focus, mobile-drawer, programmatic state, and reduced-motion behavior are part of the production interaction baseline.
- The final “Launch Validation App” CTA opens the separate Google AI Studio validation workflow and is not implemented inside this repository.

## Release Validation

Before a production release, verify the final diff against the approved website authority and run the applicable responsive, overflow, keyboard/focus, interaction-state, reduced-motion, browser, console/network, media, and live-public-URL checks.

## Authority-Constrained Asset Dependency

The source currently references two approved historical assets that are absent from the repository:

- `0022-from-the-hip-photo-1_orig.jpg`
- `pirate-chef-final-trans-color-rgb-hr.png`

Do not replace either file with an approximation or newly invented asset. Restore only an authoritative approved copy if one becomes available. The existing Pirate Chef text fallback remains intentional while the approved logo asset is unavailable.
