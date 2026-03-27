# Effects Research Catalog

_Last updated: 2026-03-27_
_Used by: Effect Researcher agent_

This file tracks candidate effects to add, with research notes and sources.
Update this file before implementing; mark as Done when shipped.

---

## Status Legend
- `[ ]` Candidate — not yet started
- `[~]` In progress — being implemented
- `[x]` Done — shipped in js/effects/

---

## Queue

### High Priority

- [ ] **Particle Network** — connected dots that react to cursor distance
  - Source: classic canvas technique, many CodePen examples
  - Tags: canvas, particles, pointer, energetic
  - Perf: GPU/CPU medium

- [ ] **CSS Glitch Text** — RGB-split glitch animation on text
  - Source: CSS `clip-path` + pseudo-elements, common on Codrops
  - Tags: css, typography, bold, dramatic
  - Perf: GPU-light

- [ ] **SVG Wave Divider** — animated sine-wave SVG that could be used as a page divider
  - Source: SVG `path` + JS animation
  - Tags: svg, animation, calming
  - Perf: CPU-light

- [ ] **Mosaic Pixel Reveal** — image dissolves in/out as pixelated tiles
  - Source: Canvas `drawImage` + grid redraw
  - Tags: canvas, media, animation, dramatic
  - Perf: GPU/CPU light

- [ ] **Magnetic Cursor** — cursor warps toward nearby interactive elements
  - Source: JS pointer tracking + CSS transform
  - Tags: pointer, animation, playful
  - Perf: CPU-light

- [ ] **CSS Scroll-Driven Text Reveal** — text animates in as you scroll (CSS scroll timeline)
  - Source: CSS `animation-timeline: scroll()`
  - Tags: css, scroll, typography, minimal
  - Perf: GPU-light

- [ ] **WebGL Ripple Water** — realistic water ripple on click
  - Source: WebGL fragment shader, displacement map technique
  - Tags: webgl, shader, pointer, calming
  - Perf: GPU-light

- [ ] **3D CSS Card Flip Stack** — stack of cards that fan out and flip on hover
  - Source: CSS 3D transforms + perspective
  - Tags: css, 3d, animation, bold
  - Perf: GPU-light

- [ ] **Confetti Burst (Physics)** — realistic gravity/rotation confetti physics
  - Source: Canvas + simple physics simulation
  - Tags: canvas, particles, playful, energetic
  - Perf: GPU/CPU light

- [ ] **Smooth Ink Spread** — ink drop spreading from click point
  - Source: Canvas radial gradient animation
  - Tags: canvas, animation, pointer, dramatic
  - Perf: GPU/CPU light

### Medium Priority

- [ ] **CSS Animated Gradient Mesh** — fluid color mesh gradient in motion
  - Tags: css, color, animation, calming

- [ ] **SVG Handwriting Animation** — SVG path that draws itself like handwriting
  - Tags: svg, typography, animation, playful

- [ ] **Elastic Drag Bounce** — draggable element with spring physics on release
  - Tags: drag, animation, playful

- [ ] **Audio Spectrum Bars** — bar equalizer visualization from microphone
  - Tags: audio, animation, energetic

- [ ] **CSS Perspective Grid** — infinite scrolling perspective grid floor
  - Tags: css, 3d, animation, dramatic

### Low Priority / Future

- [ ] **WebGL Fluid Simulation** — real-time fluid/smoke sim
  - Tags: webgl, shader, calming, heavy
  - Perf: Heavy

- [ ] **CSS Variable Font Morph** — font weight/shape morphs on hover
  - Tags: css, typography, minimal

- [ ] **Canvas Fire Simulation** — realistic fire particle system
  - Tags: canvas, particles, dramatic
  - Perf: GPU/CPU medium

---

## Knowledge Sources to Monitor

- https://css-tricks.com/ — CSS techniques
- https://tympanus.net/codrops/ — advanced UI effects
- https://codepen.io/trending — community demos
- https://www.shadertoy.com/ — WebGL shaders
- https://web.dev/ — modern web platform APIs
