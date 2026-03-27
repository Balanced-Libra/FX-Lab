const effectCssGlassFrosted = {
  id: "css-glass-frosted",
  name: "Glass Frosted Panel",
  type: "CSS",
  tags: ["css","filter","layout","minimal","calming"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>Backdrop blur/saturate ("glassmorphism").</li>
      <li>Animated background blobs for parallax-y depth.</li>
      <li>Graceful fallback if <code>backdrop-filter</code> unsupported.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .glass-root{position:relative;height:100%;border-radius:12px;overflow:hidden}
        .bg{position:absolute;inset:0; background:
          radial-gradient(40% 60% at 20% 30%, #5b9dff33, transparent 60%),
          radial-gradient(50% 40% at 80% 70%, #34d39933, transparent 60%),
          radial-gradient(30% 30% at 50% 50%, #f472b633, transparent 60%);
          animation:move 14s ease-in-out infinite alternate;}
        @keyframes move{
          0%{transform:translate(0,0) scale(1)}
          100%{transform:translate(-20px,10px) scale(1.05)}
        }
        .panel{
          position:absolute; inset:20% 20%; display:grid; place-items:center;
          border:1px solid #ffffff22; border-radius:18px; padding:18px;
          background:rgba(16,19,26,.35);
          -webkit-backdrop-filter: blur(12px) saturate(1.2);
                  backdrop-filter: blur(12px) saturate(1.2);
          color:#e7eaf0; text-align:center;
        }
        @supports not ((backdrop-filter: blur(10px)) or (-webkit-backdrop-filter: blur(10px))){
          .panel{ background:rgba(16,19,26,.8); }
        }
      </style>
      <div class="glass-root">
        <div class="bg"></div>
        <div class="panel"><div>
          <h3 style="margin:0 0 6px 0">Frosted Glass</h3>
          <p style="color:#cfd5df;margin:0">Backdrop blur + subtle animated blobs.</p>
        </div></div>
      </div>`;
    this._cleanup=()=>{ container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectCssGlassFrosted);