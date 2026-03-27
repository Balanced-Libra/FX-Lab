# FX-Lab Coding Standards

_Last updated: 2026-03-27_
_Authority: Coordinator — all agents must follow this file_

---

## Effect File Shape (Canonical)

Every file in `js/effects/*.js` MUST follow this exact shape:

```js
const effectMyEffectName = {
  id: "category-effect-name",
  name: "Human Readable Name",
  type: "CSS",                        // see approved types below
  tags: ["tag1", "tag2"],             // see approved tags below
  perf: "GPU-light",                  // see approved perf values below
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>Plain-language point 1.</li>
      <li>Plain-language point 2.</li>
    </ul>`,
  async load() {},
  init(container) {
    // ... setup
  },
  teardown() {
    // ... cleanup
  }
};
window.EFFECTS_REGISTRY.registerEffect(effectMyEffectName);
```

---

## Approved Types

| Value | Use when |
|-------|----------|
| `CSS` | Pure CSS, no JS animation logic |
| `SVG` | SVG-primary effects |
| `JS/Canvas` | Canvas 2D API |
| `WebGL` | WebGL / shader effects |
| `Audio` | Web Audio API |
| `JS` | DOM interaction, no canvas/WebGL |

---

## Approved Tags

### Technology
`css`, `svg`, `canvas`, `webgl`, `audio`, `worker`

### Interaction
`drag`, `keyboard`, `pointer`, `toggle`, `scroll`, `forms`

### Visual
`particles`, `3d`, `shader`, `filter`, `mask`, `typography`, `animation`, `color`

### Pattern
`layout`, `nav`, `table`, `loader`, `chart`, `dataviz`, `media`, `carousel`

### Quality
`a11y`, `reduced-motion`, `performance`

### Vibe (add to all effects)
`calming`, `energetic`, `minimal`, `bold`, `playful`, `dramatic`

---

## Approved Perf Values

| Value | Meaning |
|-------|---------|
| `GPU-light` | CSS animations, simple SVG |
| `CPU-light` | Light JS, minimal DOM ops |
| `GPU/CPU light` | Canvas with few objects |
| `GPU/CPU medium` | Canvas with many objects |
| `Heavy` | Complex WebGL, many particles |

---

## ID and Filename Convention

- ID must be kebab-case: `canvas-starfield`, `css-neon-text`
- Filename must match ID: `canvas-starfield.js`
- Prefix must match type: `css-`, `svg-`, `canvas-`, `webgl-`, `audio-`, no prefix for JS

---

## init() Rules

- `container` is always a plain `<div>` — never assume its size at call time
- Always use `ResizeObserver` for canvas sizing (not `window.resize`)
- Use `Math.min(2, window.devicePixelRatio || 1)` for DPR
- Store all RAF IDs, interval IDs, observer refs, and event listeners on the effect object for teardown
- Never use `document.body` or `document.getElementById` — only work inside `container`

---

## teardown() Rules

- **REQUIRED on every effect** — no exceptions
- Must cancel all `requestAnimationFrame` loops
- Must `clearInterval` / `clearTimeout` all timers
- Must `.disconnect()` all observers (ResizeObserver, IntersectionObserver, MutationObserver)
- Must `.removeEventListener` for any listeners added to elements outside `container`
- Pattern:
```js
teardown() {
  cancelAnimationFrame(this._raf);
  this._ro?.disconnect();
  this._container?.removeEventListener('click', this._clickHandler);
}
```

---

## Description Rules

- Written for **non-technical clients** — no jargon
- Forbidden words: `requestAnimationFrame`, `WebGL uniforms`, `shader`, `canvas context`, `DPR`, `rAF`
- Allowed technical terms: CSS, animation, SVG (these are widely understood)
- Format: `<h3>What this shows</h3>` followed by `<ul><li>` bullets
- 2–4 bullets max
- Each bullet describes what the user *sees*, not how it's coded

---

## Vibe Tag Guide

Add at least one vibe tag to every effect:

| Tag | Use for |
|-----|---------|
| `calming` | Slow, smooth, flowing effects |
| `energetic` | Fast, bouncy, high-activity effects |
| `minimal` | Clean, few elements, lots of whitespace |
| `bold` | High contrast, large elements, strong motion |
| `playful` | Fun, whimsical, interactive |
| `dramatic` | Dark, intense, cinematic |

---

## File Registration

Every effect file must end with:
```js
window.EFFECTS_REGISTRY.registerEffect(effectMyEffectName);
```

The variable name must be camelCase with `effect` prefix: `effectCssNeonText`, `effectCanvasStarfield`.

---

## What NOT to Do

- Do NOT add npm dependencies
- Do NOT use ES module `import/export` in `js/effects/` files (they are plain scripts)
- Do NOT touch the `src/` directory in `js/effects/` work — that's a separate refactor
- Do NOT access `window` globals other than `window.EFFECTS_REGISTRY` and standard Web APIs
- Do NOT leave `console.log` debug statements in shipped effects
