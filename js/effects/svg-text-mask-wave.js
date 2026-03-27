const effectSvgTextMaskWave = {
  id: "svg-text-mask-wave",
  name: "Text Mask Wave",
  type: "SVG",
  tags: ["svg","typography","filter","bold","dramatic"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li><code>&lt;mask&gt;</code> to show a moving gradient only where text is.</li>
      <li>CSS animation shifts the gradient for a wave effect.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .tm{height:100%;display:grid;place-items:center}
        .wave{
          --bg: linear-gradient(90deg, #5b9dff, #34d399, #fbbf24, #5b9dff);
          background: var(--bg); background-size: 300% 100%;
          animation: slide 6s linear infinite;
          -webkit-background-clip: text; background-clip: text; color: transparent;
          font-size: clamp(28px, 7vw, 72px); font-weight: 800; letter-spacing:.04em;
        }
        @keyframes slide{ to { background-position: 300% 0; } }
        /* fallback (SVG mask variant) */
        .maskbox { display:none; }
        @supports not ((background-clip: text) or (-webkit-background-clip: text)){
          .wave{ display:none }
          .maskbox{ display:block }
          .gradMove{ animation: slide 6s linear infinite }
        }
      </style>
      <div class="tm">
        <div class="wave">MASKED WAVE</div>
        <svg class="maskbox" viewBox="0 0 800 200" width="90%" height="60%">
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="3" y2="0" gradientUnits="userSpaceOnUse" class="gradMove">
              <stop offset="0" stop-color="#5b9dff"/><stop offset="0.5" stop-color="#34d399"/><stop offset="1" stop-color="#fbbf24"/>
            </linearGradient>
            <mask id="txtmask">
              <rect width="100%" height="100%" fill="white"/>
              <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
                    font-size="120" font-weight="800" font-family="system-ui,Segoe UI,Roboto,Inter,sans-serif" fill="black">MASKED WAVE</text>
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad)" mask="url(#txtmask)"/>
        </svg>
      </div>`;
    this._cleanup = ()=>{ container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectSvgTextMaskWave);