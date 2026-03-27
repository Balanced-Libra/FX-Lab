# FX-Lab Roadmap

_Last updated: 2026-03-27_

## Priority Queue

### P0 — Foundation (In Progress)
- [x] Create .claude/ memory structure
- [x] Write CLAUDE.md coordinator brief
- [ ] Teardown audit: verify all 72 effects have proper teardown()
- [ ] Standards audit: verify all effects match required shape
- [ ] Fix all identified bugs

### P1 — UI: Card Previews (Next Up)
- [ ] Implement lazy hover preview system in app.js / styles.css
- [ ] Each card shows a live mini-preview of the effect on hover
- [ ] Preview tears down on mouseout (IntersectionObserver pattern)
- [ ] Smooth fade-in transition on preview reveal

### P2 — Client UX Polish
- [ ] Add vibe tags to all effects: "calming", "energetic", "minimal", "bold", "playful", "dramatic"
- [ ] Audit all description text — remove jargon, write in plain English
- [ ] Add category sidebar / pill navigation (CSS / Canvas / WebGL / Audio / Interaction)
- [ ] Add difficulty badge: "Simple" / "Intermediate" / "Advanced"
- [ ] Move code copy button to secondary (collapsed by default)
- [ ] "Similar effects" suggestions at bottom of modal

### P3 — New Effects (Ongoing)
Target: grow from 72 to 100+ effects. Add 1-2 per week.

**Candidate effects to add** (see effects-catalog.md for research):
- [ ] CSS text reveal on scroll (mask animation)
- [ ] 3D card tilt with reflection (CSS perspective)
- [ ] Liquid/mercury blob (Canvas metaballs variant)
- [ ] Glitch text effect (CSS + JS)
- [ ] SVG animated wave divider
- [ ] Particle network (Canvas — connected dots)
- [ ] CSS spotlight on mouse move
- [ ] Ripple water effect (WebGL shader)
- [ ] Typewriter with cursor blink (variant)
- [ ] Mosaic/pixel reveal image effect (Canvas)

### P4 — Architecture
- [ ] Complete `src/` modular refactor — migrate js/ → src/
- [ ] Add effect unit tests (validate init/teardown contract)
- [ ] Automated screenshot generation for effects catalog

### P5 — Advanced
- [ ] "I want something like..." natural language search
- [ ] Effect tagging by mood/vibe browsable gallery view
- [ ] Client-facing mode (hide code panel entirely, show owner toggle)
- [ ] Bundle/export individual effects as copyable snippets

## Completed

_Nothing completed yet — agency just launched._
