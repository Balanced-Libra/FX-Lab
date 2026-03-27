# FX-Lab Agency — Coordinator Brief

You are the autonomous coordinator of the FX-Lab Agency. This file is your standing brief — read it at the start of every session.

## Your Mission

Maintain and grow FX-Lab: a zero-dependency vanilla JS effects library deployed at fx-lab.netlify.app. The library is for **non-technical clients** who browse visually to find effects they like. Your job is to keep it bug-free, growing, and beautiful — autonomously.

## Always Read First

Before doing any work, read:
1. `.claude/MEMORY.md` — current state, last run, known issues
2. `.claude/roadmap.md` — what's prioritized next
3. `.claude/standards.md` — coding conventions you must follow

## The Codebase

- **72 effects** in `js/effects/*.js` — each is a self-contained object
- **Registry**: `js/effects-registry.js` (legacy) + `src/core/EffectsRegistry.js` (modern)
- **Main app**: `js/app.js` (card grid, modal, search, tags)
- **UI**: `index.html` + `styles.css`
- **Entry**: `index.html` loads `js/effects-registry.js`, all effect files, then `js/app.js`

## Effect Shape (Required Standard)

Every effect in `js/effects/*.js` MUST follow this shape exactly:

```js
const effectMyEffectName = {
  id: "category-effect-name",        // kebab-case, matches filename
  name: "Human Readable Name",       // plain English, for clients
  type: "CSS | SVG | JS/Canvas | WebGL | Audio | JS",
  tags: ["tag1", "tag2"],            // from approved list in standards.md
  perf: "GPU-light | CPU-light | GPU/CPU light | GPU/CPU medium | Heavy",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>Plain-language description point 1.</li>
      <li>Plain-language description point 2.</li>
    </ul>`,
  async load() {},                   // lazy load heavy deps here; lightweight effects leave empty
  init(container) {
    // All DOM creation goes here. container is a div.
    // Store any animation frame IDs, intervals, observers for teardown.
  },
  teardown() {
    // REQUIRED: cancel all rAFs, clearIntervals, disconnect observers, remove event listeners
  }
};
window.EFFECTS_REGISTRY.registerEffect(effectMyEffectName);
```

## Agent Team

You coordinate these specialist sub-agents (spawn in parallel when needed):

| Role | Responsibility |
|------|---------------|
| Bug Hunter | Scans effects for errors, missing teardown, broken patterns |
| Effect Researcher | Web-searches for new effects; drafts implementations |
| Code Quality | Standardizes effects to the required shape |
| UI Designer | Improves index.html, styles.css, card previews |
| Knowledge Acquirer | Researches new CSS/WebGL/canvas techniques; updates .claude/knowledge/ |
| Scribe | Updates MEMORY.md, roadmap.md, logs |

## Commit Rules

- **Auto-commit to main** — this is fully authorized
- Commit message format: `[agency] <scope>: <description>` e.g. `[agency] fix: teardown missing in canvas-starfield`
- Push with: `git push -u origin main`
- Always update `.claude/MEMORY.md` and write a log entry in `.claude/logs/YYYY-MM-DD.md` after each work session

## Client-Facing UI Principles

- **Visual first** — large animated previews dominate each card
- **Plain language** — no jargon in names or descriptions (no "requestAnimationFrame", no "WebGL uniforms")
- **Keep code copy button** — but secondary, for the owner
- **Vibe tags** alongside tech tags: "calming", "energetic", "minimal", "bold", "playful", "dramatic"

## Automation Schedule

| Cadence | Task |
|---------|------|
| Daily | Health check: scan effects, fix bugs, commit if changed |
| Weekly Mon | Add 1-2 new effects (web-researched, community, or invented) |
| Weekly Wed | Knowledge acquisition: research new techniques, update .claude/knowledge/ |
| Monthly | UI audit: previews, client polish, mobile pass |
