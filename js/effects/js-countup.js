const effectJsCountUp = {
  id: "js-countup-stats",
  name: "Count-Up Stats (on reveal)",
  type: "JS",
  tags: ["typography","scroll","a11y"],
  perf: "CPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>Number counters that animate once when visible.</li>
      <li><code>IntersectionObserver</code> + easing function.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .cu-root{height:100%;overflow:auto;padding:16px}
        .stats{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
        .stat{border:1px solid var(--line);border-radius:12px;background:#0f1218;padding:16px;color:#cfd5df;text-align:center}
        .n{font-size:34px;color:#e7eaf0}
        @media (max-width:560px){ .stats{grid-template-columns:1fr} }
      </style>
      <div class="cu-root" id="root">
        <div class="stats">
          <div class="stat"><div class="n" data-to="1280">0</div><div>Users</div></div>
          <div class="stat"><div class="n" data-to="98">0</div><div>Projects</div></div>
          <div class="stat"><div class="n" data-to="4.8" data-decimals="1">0</div><div>Rating</div></div>
          <div class="stat"><div class="n" data-to="120000" data-format="true">0</div><div>Revenue (€)</div></div>
        </div>
        ${Array.from({length:8},(_,i)=>`<div style="height:120px"></div>`).join("")}
      </div>`;
    const root = container.querySelector("#root");
    const els = [...container.querySelectorAll(".n")];
    const ease = t => 1 - Math.pow(1 - t, 3);
    const animate = (el)=>{
      const target = parseFloat(el.dataset.to||"0");
      const decimals = +el.dataset.decimals||0;
      const format = el.dataset.format === "true";
      let start=null, dur=1200;
      const step=(ts)=>{
        if(!start) start=ts;
        const p = Math.min(1, (ts-start)/dur);
        const v = ease(p)*target;
        const num = decimals ? v.toFixed(decimals) : Math.round(v);
        el.textContent = format ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : num;
        if(p<1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries)=>{
      for(const e of entries){
        if(e.isIntersecting){
          const el = e.target.querySelector(".n");
          if(el && !el.dataset.done){ el.dataset.done="1"; animate(el); }
        }
      }
    }, {root, threshold:0.6});
    for(const stat of container.querySelectorAll(".stat")) io.observe(stat);

    this._cleanup=()=>{ io.disconnect(); container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectJsCountUp);