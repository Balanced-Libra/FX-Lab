const effectScrollSnapCarousel = {
  id: "css-scroll-snap",
  name: "Scroll-Snap Carousel",
  type: "CSS",
  tags: ["scroll","css"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul><li><code>scroll-snap-type</code> for natural snapping.</li>
        <li>Smooth programmatic scroll with buttons.</li></ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .snap-wrap{height:100%;display:grid;grid-template-rows:auto 1fr;gap:10px;padding:12px}
        .snap-track{display:flex;gap:12px;overflow:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;padding-bottom:10px}
        .snap-card{flex:0 0 80%;scroll-snap-align:center;border:1px solid var(--line);border-radius:16px;
                   background:#10131a;height:70%;display:grid;place-items:center;color:#cfd5df}
        .snap-track::-webkit-scrollbar{height:8px}
      </style>
      <div class="snap-wrap">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div class="badges"><span class="badge">scroll-snap-type</span><span class="badge">smooth</span></div>
          <div style="display:flex;gap:8px">
            <button class="btn" id="prev">◀</button>
            <button class="btn" id="next">▶</button>
          </div>
        </div>
        <div class="snap-track" id="track" aria-label="Carousel">
          ${Array.from({length:5},(_,i)=>`<div class="snap-card">Card ${i+1}</div>`).join("")}
        </div>
      </div>`;
    const track = container.querySelector("#track");
    const prev = container.querySelector("#prev");
    const next = container.querySelector("#next");
    const onPrev = ()=> track.scrollBy({left: -track.clientWidth*0.85, behavior:"smooth"});
    const onNext = ()=> track.scrollBy({left:  track.clientWidth*0.85, behavior:"smooth"});
    prev.addEventListener("click", onPrev); next.addEventListener("click", onNext);
    this._cleanup = ()=>{ prev.removeEventListener("click", onPrev); next.removeEventListener("click", onNext); container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectScrollSnapCarousel);