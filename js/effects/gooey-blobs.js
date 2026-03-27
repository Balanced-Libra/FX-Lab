const effectSvgGooeyBlobs = {
  id: "svg-gooey-blobs",
  name: "Gooey Blobs",
  type: "SVG/Filter",
  tags: ["svg","filter","playful","calming"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li><code>feGaussianBlur</code> + <code>feColorMatrix</code> to create a gooey merge.</li>
      <li>CSS keyframes move circles; filter applied to a group.</li>
    </ul>
  `,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        @keyframes driftX { 0%{transform:translateX(-60px)} 50%{transform:translateX(60px)} 100%{transform:translateX(-60px)} }
        @keyframes driftY { 0%{transform:translateY(30px)} 50%{transform:translateY(-30px)} 100%{transform:translateY(30px)} }
        .blob{mix-blend-mode:screen}
      </style>
      <div style="display:grid;place-items:center;height:100%;">
        <svg viewBox="0 0 400 240" width="90%" height="75%">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
              <feColorMatrix in="blur" mode="matrix"
                values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 20 -10" result="goo"/>
              <feBlend in="SourceGraphic" in2="goo"/>
            </filter>
          </defs>
          <g filter="url(#goo)">
            <circle class="blob" cx="160" cy="120" r="40" fill="#5b9dff" style="animation:driftX 5s ease-in-out infinite"/>
            <circle class="blob" cx="220" cy="120" r="40" fill="#34d399" style="animation:driftY 4.5s ease-in-out infinite"/>
            <circle class="blob" cx="190" cy="120" r="32" fill="#f472b6"/>
          </g>
        </svg>
      </div>`;
    this._cleanup = ()=>{ container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectSvgGooeyBlobs);