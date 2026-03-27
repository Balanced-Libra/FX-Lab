# FX-Lab Agency — Master Memory

_Last updated: 2026-03-27_
_Last run by: Coordinator (daily pass #1)_

---

## Current State

| Item | Status |
|------|--------|
| Effects count | 72 |
| Broken effects | 0 — Bug Hunter pass completed |
| Standards compliance | ~95% — 4 bugs fixed, vibe tags on 49 effects |
| Card previews | ✅ Implemented — live hover preview with LIVE badge |
| UI client-polish | Partial — vibe tags done, description audit pending |
| Schedule active | ⚠️ Pending — /schedule connectivity issue; target 22:00 UTC daily |

## What Was Done Last Session

**2026-03-27 — Phase 0 + Major UI Upgrade**
- Created CLAUDE.md and full .claude/ memory structure
- Bug Hunter pass: found and fixed 4 bugs:
  - svg-text-mask-wave: CRITICAL — was never registered, invisible in gallery
  - svg-path-draw: underscore variable name, duplicate name, jargon description
  - magnetic-button: missing description field
  - particle-fountain: missing description field
- Implemented live card hover previews (effect runs in .thumb on hover, 250ms delay)
- LIVE badge injected during preview; tears down clean on mouseleave
- Increased thumb height 120px → 160px
- Added vibe tag system: calming/energetic/minimal/bold/playful/dramatic
- Applied vibe tags to 49 of 72 effects
- Vibe category filter shown first in tag bar, styled in amber
- Added natural-language search aliases (calm→calming, dark→dramatic, etc.)
- Updated search placeholder: "Try 'calming', 'glowing', 'buttons'…"
- Fixed welcome banner count (60+ → 72), mentioned hover preview
- Run button now functional (was inert before)

## Known Issues

- [ ] 23 effects still missing vibe tags (see list below)
- [ ] Many descriptions contain jargon — need plain-English audit
- [ ] No fade-in transition on card previews yet
- [ ] No new effects added yet (P3 queue has 15 candidates)
- [ ] `src/` modular architecture is incomplete/parallel to `js/`

## Effects Missing Vibe Tags

The following files were not in the vibe-tag batch and still need vibe tags:
a11y-contrast-checker, clipboard-toast, css-accordion, css-container-card,
css-masonry-columns, css-radio-tabs, css-shape-outside, device-tilt-parallax,
drag-reorder-list, drag-sort-list, dropzone-preview, filter-playground,
flip-grid-shuffle, form-star-rating, form-strength, hamburger-toggle,
image-compare, infinite-scroll, js-countup, js-smart-tooltip,
js-table-sort-search, js-theme-toggle-card, lazy-images, pan-zoom-viewer,
scroll-pin-steps, scroll-snap-carousel, split-resizer, springy-drag,
wasd-move, worker-primes

## Active Effect Count by Category

| Category | Count | Files |
|----------|-------|-------|
| CSS | 10 | css-*.js |
| SVG | 7 | svg-*.js + svg-path-draw-2.js |
| Canvas | 9 | canvas-*.js |
| WebGL | 1 | webgl-plasma.js |
| Audio | 2 | audio-*.js |
| Interaction/JS | 43 | everything else |

## Next Priorities

1. Add fade-in CSS transition to card hover previews (quick)
2. Add 1 new effect: Particle Network (P3 first item)
3. Jargon audit on effect descriptions
4. Add vibe tags to remaining 23 effects
5. Set up /schedule at 22:00 UTC when connectivity restored

## Architecture Notes

- Active app entry: `index.html` → `js/effects-registry.js` → 72 `js/effects/*.js` files → `js/app.js`
- `src/` directory is a parallel WIP modular refactor — do NOT break js/ while src/ is incomplete
- Zero npm dependencies — keep it that way
- No build step — all files are served directly
- Deployed: fx-lab.netlify.app (auto-deploys from main branch)
- Dev branch: `claude/explore-repo-features-ZrftB`
- Schedule target: `0 22 * * *` (22:00 UTC daily)
