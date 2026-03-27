const effectSpotlightReveal = {
  id: "css-spotlight-reveal",
  name: "Spotlight Reveal (mask)",
  type: "JS+CSS",
  tags: ["css","interaction","filter","dramatic","bold"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>Pointer-controlled CSS <code>mask-image</code> / <code>-webkit-mask</code>.</li>
      <li>We darken the layer and cut a circular "hole" that follows the mouse.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .spot-wrap{position:relative;height:100%;display:grid;place-items:center;
          background: radial-gradient(120% 80% at 10% 0%, #141c2a, transparent),
                      radial-gradient(100% 120% at 90% 100%, #0d1320, #0a0d14);
          color:#e7eaf0; overflow:hidden; border-radius:12px;
        }
        .spot-wrap h2{font-size:42px; letter-spacing:.5px; margin:0; text-align:center}
        .spot-overlay{position:absolute; inset:0; background:rgba(0,0,0,.62);}
        /* cut a hole with a mask: transparent center (hole), opaque outside */
        .spot-overlay{
          -webkit-mask: radial-gradient(closest-side at var(--x,50%) var(--y,50%),
                        transparent 0 120px, #fff 140px);
                  mask: radial-gradient(closest-side at var(--x,50%) var(--y,50%),
                        transparent 0 120px, #fff 140px);
          transition: -webkit-mask-position .06s linear, mask-position .06s linear;
        }
      </style>
      <div class="spot-wrap" id="spot">
        <h2>Spotlight Reveal</h2>
        <div class="spot-overlay"></div>
      </div>`;
    const wrap = container.querySelector("#spot");
    const move = (e)=>{
      const r = wrap.getBoundingClientRect();
      const x = ((e.clientX - r.left)/r.width)*100;
      const y = ((e.clientY - r.top)/r.height)*100;
      wrap.style.setProperty("--x", x+"%");
      wrap.style.setProperty("--y", y+"%");
    };
    const leave = ()=>{
      wrap.style.removeProperty("--x");
      wrap.style.removeProperty("--y");
    };
    wrap.addEventListener("pointermove", move);
    wrap.addEventListener("pointerleave", leave);
    this._cleanup = ()=>{ wrap.removeEventListener("pointermove", move); wrap.removeEventListener("pointerleave", leave); container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectSpotlightReveal);