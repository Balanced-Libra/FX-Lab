# FX-Lab Agency — Master Memory

_Last updated: 2026-03-27_
_Last run by: Coordinator (initial setup)_

---

## Current State

| Item | Status |
|------|--------|
| Effects count | 72 |
| Broken effects | Unknown — scan pending |
| Standards compliance | ~80% — teardown audit pending |
| Card previews | Not yet implemented |
| UI client-polish | Not yet done |
| Schedule active | Not yet set up |

## What Was Done Last Session

**2026-03-27 — Phase 0: Foundation**
- Created CLAUDE.md coordinator brief at repo root
- Created .claude/ memory folder structure (this file, roadmap.md, standards.md, effects-catalog.md, agents/roles.md)
- Identified 72 effects across CSS/SVG/Canvas/WebGL/Audio/JS categories
- Architecture: legacy `js/` + in-progress modular `src/` refactor
- Dual-architecture: `js/app.js` is the active app; `src/` is WIP

## Known Issues

- [ ] Teardown audit not yet done — some effects likely missing teardown()
- [ ] Card hover previews not yet implemented
- [ ] `src/` modular architecture is incomplete/parallel to `js/` — needs resolution
- [ ] No vibe tags on any effects yet
- [ ] Non-technical descriptions need audit (jargon in some effects)

## Active Effect Count by Category

| Category | Count | Files |
|----------|-------|-------|
| CSS | ~10 | css-*.js |
| SVG | ~7 | svg-*.js |
| Canvas | ~9 | canvas-*.js |
| WebGL | 1 | webgl-plasma.js |
| Audio | 2 | audio-*.js |
| Interaction/JS | ~43 | everything else |

## Next Priorities

See roadmap.md for full queue. Immediate:
1. Run teardown audit on all 72 effects
2. Implement card hover previews (lazy-loaded live preview on hover)
3. Add vibe tags to all effects
4. Add 5 new high-quality effects

## Architecture Notes

- Active app entry: `index.html` → `js/effects-registry.js` → 72 `js/effects/*.js` files → `js/app.js`
- `src/` directory is a parallel WIP modular refactor — do NOT break js/ while src/ is incomplete
- Zero npm dependencies — keep it that way
- No build step — all files are served directly
- Deployed: fx-lab.netlify.app (auto-deploys from main branch)
