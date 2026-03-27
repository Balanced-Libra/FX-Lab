const effectImageCompare = {
  id: "media-image-compare",
  name: "Image Compare (Slider)",
  type: "JS+CSS",
  tags: ["media","interaction","a11y","minimal","bold"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>Before/After with a draggable handle or range input.</li>
      <li>CSS variable <code>--split</code> controls the reveal.</li>
      <li>Keyboard accessible via the range.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .cmp-wrap{height:100%;display:grid;place-items:center;padding:12px}
        .cmp{position:relative;width:min(900px,92%);aspect-ratio:16/9;border:1px solid var(--line);border-radius:12px;overflow:hidden;
             --split:50;}
        .cmp img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;user-select:none;pointer-events:none}
        .cmp .top{clip-path:inset(0 calc(100% - var(--split)*1%) 0 0);}
        .cmp .handle{position:absolute;top:0;bottom:0;left:calc(var(--split)*1% - 1px);width:2px;background:#5b9dff}
        .cmp .knob{position:absolute;left:calc(var(--split)*1% - 14px);top:50%;transform:translateY(-50%);
                   width:28px;height:28px;border-radius:50%;background:#0f1218;border:1px solid var(--line);box-shadow:0 4px 12px rgba(0,0,0,.35)}
        .cmp .ui{position:absolute;inset:auto 8px 8px 8px;display:flex;gap:8px;align-items:center}
        .cmp input[type=range]{inline-size:200px}
      </style>
      <div class="cmp-wrap">
        <div class="cmp" id="cmp" aria-label="Image compare">
          <img src="https://picsum.photos/1200/675?random=12" alt="Before">
          <img class="top" src="https://picsum.photos/1200/675?random=24" alt="After">
          <div class="handle" aria-hidden="true"></div>
          <div class="knob" id="knob" role="presentation"></div>
          <div class="ui">
            <span class="badge">Before</span>
            <input id="cmpRange" type="range" min="0" max="100" value="50" aria-label="Reveal amount">
            <span class="badge">After</span>
          </div>
        </div>
      </div>`;
    const cmp = container.querySelector("#cmp");
    const range = container.querySelector("#cmpRange");
    const knob = container.querySelector("#knob");
    const set = v => { cmp.style.setProperty("--split", v); };
    const onInput = ()=> set(range.value);
    range.addEventListener("input", onInput);

    // Drag anywhere
    let dragging=false;
    const pctFromEvent = (e)=>{
      const r = cmp.getBoundingClientRect();
      const x = Math.max(0, Math.min(r.width, e.clientX - r.left));
      return ((x / r.width) * 100).toFixed(1);
    };
    const down = (e)=>{ dragging=true; set(pctFromEvent(e)); range.value = cmp.style.getPropertyValue("--split"); };
    const move = (e)=>{ if(!dragging) return; set(pctFromEvent(e)); range.value = cmp.style.getPropertyValue("--split"); };
    const up   = ()=> dragging=false;

    cmp.addEventListener("pointerdown", down);
    cmp.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);

    this._cleanup = ()=> {
      range.removeEventListener("input", onInput);
      cmp.removeEventListener("pointerdown", down);
      cmp.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      container.innerHTML="";
    };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectImageCompare);