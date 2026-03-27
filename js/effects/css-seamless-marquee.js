const effectCssMarquee = {
  id: "css-seamless-marquee",
  name: "Seamless Marquee (Speed Slider)",
  type: "CSS",
  tags: ["css","typography","micro-interaction","minimal","calming"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>Infinite loop using duplicated content + <code>translateX</code> animation.</li>
      <li>Speed controlled by a CSS variable from a range input.</li>
      <li>Respects <code>prefers-reduced-motion</code> (pauses).</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        @keyframes slideX { to { transform: translateX(-50%); } }
        .mq{height:100%;display:grid;grid-template-rows:auto 1fr;gap:10px}
        .mq .panel{display:flex;align-items:center;gap:10px;border:1px solid var(--line);border-radius:12px;background:#0f1218;padding:10px;color:#cfd5df}
        .track{--speed: 14s; position:relative; overflow:hidden; border:1px solid var(--line); border-radius:12px; background:#0b0d12}
        .inner{display:flex; width:max-content; gap:32px; padding:18px; animation: slideX var(--speed) linear infinite}
        .chunk{white-space:nowrap; font-size:22px; color:#e7eaf0}
        .chunk .badge{margin-left:10px}
        @media (prefers-reduced-motion: reduce){
          .inner{ animation: none; }
        }
      </style>
      <div class="mq">
        <div class="panel">
          <label>Speed
            <input id="spd" type="range" min="4" max="30" value="14" />
          </label>
          <span id="spdOut">14s</span>
        </div>
        <div class="track" id="track" aria-label="Marquee">
          <div class="inner" id="inner">
            <div class="chunk">Effects Lab • CSS • SVG • Canvas • WebGL <span class="badge">∞</span></div>
            <div class="chunk">Micro-demos • Interactions • Scroll • Filters <span class="badge">∞</span></div>
            <!-- duplicate to make it seamless -->
            <div class="chunk">Effects Lab • CSS • SVG • Canvas • WebGL <span class="badge">∞</span></div>
            <div class="chunk">Micro-demos • Interactions • Scroll • Filters <span class="badge">∞</span></div>
          </div>
        </div>
      </div>`;
    const track = container.querySelector("#track");
    const inner = container.querySelector("#inner");
    const spd = container.querySelector("#spd");
    const out = container.querySelector("#spdOut");
    const update=()=>{ const s = spd.value+"s"; inner.style.setProperty("--speed", s); out.textContent = s; };
    spd.addEventListener("input", update); update();
    this._cleanup = ()=>{ spd.replaceWith(spd.cloneNode(true)); container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectCssMarquee);