const effectSvgPathDrawV2 = {
  id: "svg-path-draw-v2",
  name: "SVG Path Draw (Simple)",
  type: "SVG",
  tags: ["svg","typography","animation","minimal"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>A single curved SVG line that draws itself from start to finish.</li>
      <li>Powered entirely by a CSS animation — no JavaScript animation loop.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        @keyframes draw { from{ stroke-dashoffset: var(--len, 1000);} to{ stroke-dashoffset: 0;} }
        .draw path{ stroke:#5b9dff; stroke-width:3; fill:none; stroke-linecap:round; stroke-linejoin:round; animation:draw 2.5s ease forwards;}
      </style>
      <div style="display:grid;place-items:center;height:100%;">
        <svg class="draw" viewBox="0 0 600 200" width="90%" height="60%">
          <path id="p" d="M40 140 C 120 40, 220 40, 300 140 S 480 240, 560 140" />
        </svg>
      </div>`;
    const path = container.querySelector("#p");
    const len = Math.ceil(path.getTotalLength());
    path.style.strokeDasharray = String(len);
    path.style.strokeDashoffset = String(len);
    container.querySelector(".draw").style.setProperty("--len", len);
    this._cleanup = ()=>{ container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectSvgPathDrawV2);