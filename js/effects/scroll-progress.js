const effectScrollProgress = {
  id: "scroll-progress-bar",
  name: "Scroll Progress (Internal)",
  type: "Scroll",
  tags: ["scroll","a11y"],
  perf: "CPU-light",
  description: `
    <h3>What this shows</h3>
    <ul><li>Maps scroll position to a top progress bar.</li>
        <li>Works inside the modal via an internal scroller.</li></ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .prog-wrap{height:100%; position:relative; border-radius:12px; overflow:auto; background:#0e1116;}
        .prog-bar{position:sticky; top:0; height:4px; background:#1a2233}
        .prog-fill{height:100%; width:0; background:#5b9dff; transition:width .06s linear}
        .content{padding:16px; color:#cfd5df}
        .blk{border:1px solid var(--line); border-radius:12px; padding:16px; margin:12px 0; background:#10131a}
      </style>
      <div class="prog-wrap" id="prog">
        <div class="prog-bar"><div class="prog-fill" id="fill"></div></div>
        <div class="content">
          ${Array.from({length:12},(_,i)=>`<div class="blk">Scrollable content block #${i+1}</div>`).join("")}
        </div>
      </div>`;
    const root = container.querySelector("#prog"), fill = container.querySelector("#fill");
    const onScroll=()=>{
      const max = root.scrollHeight - root.clientHeight;
      const pct = max>0 ? (root.scrollTop / max) * 100 : 0;
      fill.style.width = pct.toFixed(1) + "%";
    };
    root.addEventListener("scroll", onScroll, {passive:true}); onScroll();
    this._cleanup=()=>{ root.removeEventListener("scroll", onScroll); container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectScrollProgress);