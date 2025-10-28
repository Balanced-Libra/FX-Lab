const effectFlipGridShuffle = {
  id: "js-flip-grid",
  name: "FLIP Grid Shuffle",
  type: "JS",
  tags: ["nav","transitions","interaction"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>FLIP: First → Last → Invert → Play for smooth reorders.</li>
      <li>We measure item rects, reorder DOM, then animate via <code>transform</code>.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .flip-ui{display:flex;gap:8px;justify-content:center;padding:10px}
        .flip-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:12px}
        .flip-item{aspect-ratio:1/1;display:grid;place-items:center;border:1px solid var(--line);
          border-radius:12px;background:#0f1218;color:#e7eaf0;font-weight:600;will-change:transform}
      </style>
      <div class="flip-ui">
        <button class="btn" id="shuffle">Shuffle</button>
        <button class="btn" id="sort">Sort</button>
      </div>
      <div class="flip-grid" id="grid">
        ${Array.from({length:12},(_,i)=>`<div class="flip-item" data-key="${i+1}">${i+1}</div>`).join("")}
      </div>`;
    const grid = container.querySelector("#grid");
    const items = ()=> [...grid.querySelectorAll(".flip-item")];

    function flip(reorderFn){
      const first = new Map(items().map(el=>[el.dataset.key, el.getBoundingClientRect()]));
      reorderFn();
      const last  = new Map(items().map(el=>[el.dataset.key, el.getBoundingClientRect()]));
      items().forEach(el=>{
        const a=first.get(el.dataset.key), b=last.get(el.dataset.key);
        const dx = (a.left - b.left), dy = (a.top - b.top);
        el.style.transform = `translate(${dx}px,${dy}px)`;
        el.style.transition = "transform 0s";
        requestAnimationFrame(()=>{
          el.style.transform = "translate(0,0)";
          el.style.transition = "transform .35s cubic-bezier(.2,.7,.2,1)";
        });
        el.addEventListener("transitionend", ()=>{ el.style.transition=""; }, {once:true});
      });
    }

    const onShuffle = ()=>{
      flip(()=>{
        const arr = items();
        for(let i=arr.length-1;i>0;i--){ const j=(Math.random()*(i+1))|0; arr[i].before(arr[j]); }
      });
    };
    const onSort = ()=>{
      flip(()=>{
        items().sort((a,b)=>a.dataset.key - b.dataset.key).forEach(el=>grid.appendChild(el));
      });
    };
    container.querySelector("#shuffle").addEventListener("click", onShuffle);
    container.querySelector("#sort").addEventListener("click", onSort);
    this._cleanup = ()=>{ container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectFlipGridShuffle);