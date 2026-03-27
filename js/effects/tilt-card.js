// 4) JS "Card Tilt (Pointer)"
const effectTiltCard = {
  id: "js-tilt-card",
  name: "Card Tilt (Pointer)",
  type: "JS",
  tags: ["interaction","css","3d","bold","playful"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul><li>Pointer tracking</li><li>3D tilt with perspective</li><li>Reset on leave</li></ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .tilt-wrap{display:grid;place-items:center;height:100%;}
        .tilt-card{ width:min(420px,90%); height:220px; border-radius:16px; border:1px solid var(--line);
          background:radial-gradient(120% 160% at 30% 10%, rgba(91,157,255,.18), transparent 60%), #0f1218;
          transition:transform .12s ease; transform-style:preserve-3d; will-change:transform; }
      </style>
      <div class="tilt-wrap"><div class="tilt-card" id="tilt"></div></div>`;
    const card = container.querySelector("#tilt");
    const max = 10;
    const onMove = (e)=>{
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left)/r.width - .5;
      const y = (e.clientY - r.top)/r.height - .5;
      card.style.transform = `perspective(800px) rotateX(${(y*-max).toFixed(2)}deg) rotateY(${(x*max).toFixed(2)}deg)`;
    };
    const onLeave = ()=>{ card.style.transform = "perspective(800px) rotateX(0) rotateY(0)"; };
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);
    this._cleanup = ()=>{ card.removeEventListener("pointermove", onMove); card.removeEventListener("pointerleave", onLeave); container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectTiltCard);