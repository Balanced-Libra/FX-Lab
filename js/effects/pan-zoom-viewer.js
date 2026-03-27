const effectPanZoomViewer = {
  id: "js-pan-zoom-viewer",
  name: "Pan & Zoom (Image)",
  type: "JS",
  tags: ["media","interaction","a11y","minimal"],
  perf: "CPU-light",
  description: `
    <h3>What this shows</h3>
    <ul><li>Wheel to zoom around the cursor; drag to pan.</li>
        <li>Clamped scale &amp; momentum-free, simple UX.</li></ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .pz{height:100%;display:grid;place-items:center}
        .viewport{position:relative;width:min(900px,92%);aspect-ratio:16/9;border:1px solid var(--line);border-radius:12px;background:#0b0d12;overflow:hidden;touch-action:none}
        .img{position:absolute;left:0;top:0; user-select:none; will-change:transform}
        .hint{position:absolute;left:10px;bottom:10px;font-size:12px;color:#9aa1ad;background:#10131a;border:1px solid var(--line);border-radius:8px;padding:6px 8px}
      </style>
      <div class="pz">
        <div class="viewport" id="vp" aria-label="Pan & Zoom">
          <img class="img" id="img" src="https://picsum.photos/1600/900?random=7" alt="Zoomable">
          <div class="hint">Wheel = zoom • Drag = pan • Double-click = reset</div>
        </div>
      </div>`;
    const vp = container.querySelector("#vp");
    const img = container.querySelector("#img");
    let scale = 1, minS=1, maxS=5, tx=0, ty=0;
    const render = ()=> img.style.transform = `translate(${tx}px,${ty}px) scale(${scale})`;
    const clampPan = ()=>{
      const vw = vp.clientWidth, vh = vp.clientHeight;
      const iw = img.naturalWidth, ih = img.naturalHeight;
      const sw = iw*scale, sh = ih*scale;
      const maxX = Math.max(0, (sw - vw)/2), maxY = Math.max(0, (sh - vh)/2);
      tx = Math.max(-maxX, Math.min(maxX, tx));
      ty = Math.max(-maxY, Math.min(maxY, ty));
    };
    const zoom = (delta, cx, cy)=>{
      const rect = vp.getBoundingClientRect();
      const x = cx - rect.left - vp.clientWidth/2 - tx;
      const y = cy - rect.top  - vp.clientHeight/2 - ty;
      const prev = scale;
      scale = Math.max(minS, Math.min(maxS, scale * (delta<0 ? 1.1 : 0.9)));
      // keep the point under cursor stationary
      tx -= (x/prev - x/scale);
      ty -= (y/prev - y/scale);
      clampPan(); render();
    };
    vp.addEventListener("wheel", e=>{ e.preventDefault(); zoom(e.deltaY, e.clientX, e.clientY); }, {passive:false});
    // drag
    let dragging=false, sx=0, sy=0, stx=0, sty=0;
    const down = e=>{ dragging=true; sx=e.clientX; sy=e.clientY; stx=tx; sty=ty; vp.setPointerCapture(e.pointerId); };
    const move = e=>{ if(!dragging) return; tx = stx + (e.clientX - sx); ty = sty + (e.clientY - sy); clampPan(); render(); };
    const up = e=>{ dragging=false; vp.releasePointerCapture(e.pointerId); };
    vp.addEventListener("pointerdown", down); vp.addEventListener("pointermove", move); vp.addEventListener("pointerup", up);
    vp.addEventListener("dblclick", ()=>{ scale=1; tx=ty=0; render(); });
    img.addEventListener("load", ()=>{ scale=1; tx=ty=0; render(); });

    this._cleanup=()=>{ vp.replaceWith(vp.cloneNode(true)); };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectPanZoomViewer);