const effectCssGradientBorder = {
  id: "css-gradient-border",
  name: "Animated Gradient Border",
  type: "CSS",
  tags: ["css","micro-interaction","layout"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul><li>Gradient border via double background + masking.</li>
        <li>Slow rotation using <code>@keyframes</code>.</li></ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        @keyframes spinBorder{ to{ transform: rotate(360deg); } }
        .gb-wrap{height:100%;display:grid;place-items:center}
        .gb{
          position:relative; width:min(520px,90%); padding:18px; border-radius:16px;
          background:
            linear-gradient(#0f1218,#0f1218) padding-box,
            conic-gradient(#5b9dff, #34d399, #fbbf24, #5b9dff) border-box;
          border:1.5px solid transparent;
        }
        .gb::before{
          content:""; position:absolute; inset:-40%; border-radius:inherit;
          background: conic-gradient(#5b9dff, #34d399, #fbbf24, #5b9dff);
          filter: blur(18px) saturate(1.2); z-index:-1; animation:spinBorder 20s linear infinite;
        }
        .gb h4{margin:0 0 6px 0; color:#e7eaf0} .gb p{margin:0;color:#9aa1ad}
      </style>
      <div class="gb-wrap">
        <article class="gb">
          <h4>Gradient Border</h4>
          <p>Two-layer background + transparent border; animated glow "under" the card.</p>
        </article>
      </div>`;
    this._cleanup=()=>{ container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectCssGradientBorder);