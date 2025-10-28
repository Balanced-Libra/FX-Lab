// 6) Scroll "Mini Parallax"
const effectMiniParallax = {
  id: "scroll-mini-parallax",
  name: "Mini Parallax (Internal Scroll)",
  type: "Scroll",
  tags: ["scroll","parallax"],
  perf: "CPU-light",
  description: `
    <h3>What this shows</h3>
    <ul><li>Parallax via translateY()</li><li>Internal scroller in the modal</li></ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .para-wrap{height:100%; overflow:auto; position:relative; border-radius:12px;}
        .para-scene{position:relative; height:1400px; background:linear-gradient(#0b0d12,#0e1116);}
        .layer{position:absolute; left:0; right:0; will-change:transform;}
        .l-back{top:0; height:100%; background:radial-gradient(60% 40% at 50% 20%, #1a2336, transparent 60%);}
        .l-mid{top:120px; display:grid; place-items:center;}
        .l-front{top:420px; display:grid; place-items:center;}
        .para-card{ width:min(520px,88%); border:1px solid var(--line); border-radius:16px; background:#10131a; padding:16px; text-align:center; color:#cfd5df; }
      </style>
      <div class="para-wrap" id="scroller">
        <div class="para-scene">
          <div class="layer l-back" data-speed="0.2"></div>
          <div class="layer l-mid" data-speed="0.5"><div class="para-card">Mid Layer</div></div>
          <div class="layer l-front" data-speed="0.9"><div class="para-card">Front Layer</div></div>
        </div>
      </div>`;
    const scroller = container.querySelector("#scroller");
    const layers = [...container.querySelectorAll(".layer")];
    let ticking = false;
    const onScroll = ()=>{
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(()=>{
        const y = scroller.scrollTop;
        for(const el of layers){
          const s = parseFloat(el.dataset.speed||"0.5");
          el.style.transform = `translateY(${-(y*s).toFixed(1)}px)`;
        }
        ticking = false;
      });
    };
    scroller.addEventListener("scroll", onScroll, {passive:true});
    this._cleanup = ()=>{ scroller.removeEventListener("scroll", onScroll); container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectMiniParallax);