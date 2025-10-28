const effectSvgPathDraw = {
  id: "svg-path-draw",
  name: "SVG Path Draw",
  type: "SVG",
  tags: ["svg","typography","micro-interaction"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>Compute path lengths, set <code>stroke-dasharray</code>/<code>dashoffset</code>.</li>
      <li>Replay by resetting offsets and triggering a reflow.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .pd{height:100%;display:grid;grid-template-rows:auto 1fr;gap:10px}
        .pd .panel{display:flex;gap:8px;align-items:center;border:1px solid var(--line);border-radius:12px;background:#0f1218;padding:10px;color:#cfd5df}
        .pd svg{display:block;width:100%;height:100%;border:1px solid var(--line);border-radius:12px;background:#0b0d12}
        .path{fill:none;stroke:#5b9dff;stroke-width:3;stroke-linecap:round}
        .dash{transition:stroke-dashoffset 2.2s cubic-bezier(.2,.7,.2,1)}
      </style>
      <div class="pd">
        <div class="panel">
          <button class="btn" id="play">Replay</button>
          <span class="hint">Stroke-dash draws the paths.</span>
        </div>
        <svg viewBox="0 0 600 240" id="svg">
          <path class="path dash" d="M40,140 C120,40 240,200 320,100 S520,40 560,140"/>
          <path class="path dash" stroke="#34d399" d="M60,180 Q160,120 260,180 T460,180"/>
          <path class="path dash" stroke="#fbbf24" d="M80,70 h120 a40,40 0 0 1 40,40 v60"/>
          <text x="50%" y="42" text-anchor="middle" fill="#e7eaf0" font-size="18">SVG Stroke Path Draw</text>
        </svg>
      </div>`;
    const svg = container.querySelector("#svg");
    const btn = container.querySelector("#play");
    const paths = [...svg.querySelectorAll(".dash")];
    const prep = ()=>{
      paths.forEach(p=>{
        const L = p.getTotalLength();
        p.style.strokeDasharray = String(L);
        p.style.strokeDashoffset = String(L);
        // force reflow so next change animates
        void p.getBoundingClientRect();
        p.style.strokeDashoffset = "0";
      });
    };
    const replay = ()=>{
      paths.forEach(p=>{
        const L = parseFloat(p.style.strokeDasharray||p.getTotalLength());
        p.style.transition = "none";
        p.style.strokeDashoffset = String(L);
        void p.getBoundingClientRect();
        p.style.transition = ""; // restore
        p.style.strokeDashoffset = "0";
      });
    };
    btn.addEventListener("click", replay);
    prep();
    this._cleanup = ()=>{ btn.removeEventListener("click", replay); container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectSvgPathDraw);