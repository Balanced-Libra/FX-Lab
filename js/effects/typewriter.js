const effectTypewriter = {
  id: "js-typewriter",
  name: "Typewriter (Caret)",
  type: "JS",
  tags: ["typography","interaction"],
  perf: "CPU-light",
  description: `
    <h3>What this shows</h3>
    <ul><li>Typed characters with variable delay.</li>
        <li>Blinking caret via CSS animation.</li></ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .tw-wrap{display:grid;place-items:center;height:100%;gap:12px}
        .tw{font-size:28px;color:#e7eaf0}
        .caret{display:inline-block;width:10px; background:#e7eaf0; margin-left:4px; animation:blink 1s steps(1) infinite}
        @keyframes blink{ 0%,50%{opacity:1} 50.01%,100%{opacity:0} }
      </style>
      <div class="tw-wrap">
        <div class="tw" id="t"></div>
        <div style="display:flex;gap:8px">
          <button class="btn" id="prev">Prev</button>
          <button class="btn" id="next">Next</button>
        </div>
      </div>`;
    const phrases=["Small things, well done.","Typewriter with caret.","Pasteable micro-demos.","CSS · SVG · Canvas · Scroll."];
    let i=0, idx=0, timer, el=container.querySelector("#t");
    const type=()=>{
      const text=phrases[i];
      if(idx <= text.length){ el.innerHTML = text.slice(0,idx) + '<span class="caret"></span>'; idx++; timer=setTimeout(type, 40 + Math.random()*90); }
      else { /* pause then reset */ timer=setTimeout(()=>{ idx=0; }, 900); }
    };
    const run=()=>{ clearTimeout(timer); idx=0; type(); };
    container.querySelector("#next").addEventListener("click", ()=>{ i=(i+1)%phrases.length; run(); });
    container.querySelector("#prev").addEventListener("click", ()=>{ i=(i-1+phrases.length)%phrases.length; run(); });
    run();
    this._cleanup=()=>{ clearTimeout(timer); container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectTypewriter);