const effectDropzonePreview = {
  id: "dropzone-upload-preview",
  name: "Drag & Drop Upload (Previews)",
  type: "JS",
  tags: ["forms","media","interaction"],
  perf: "CPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>Drop or select images → thumbnail gallery.</li>
      <li>Fake progress bars; uses <code>URL.createObjectURL</code>.</li>
      <li>Keyboard accessible (button opens file input).</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .dz{height:100%;display:grid;grid-template-rows:auto 1fr;gap:10px}
        .zone{border:2px dashed #2a3243;border-radius:12px;background:#0f1218;color:#cfd5df;display:grid;place-items:center;padding:18px}
        .zone.focus{outline:2px solid #5b9dff; outline-offset:4px}
        .grid{margin-top:10px;display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;overflow:auto}
        .thumb{position:relative;border:1px solid var(--line);border-radius:10px;background:#0b0d12;overflow:hidden}
        .thumb img{display:block;width:100%;height:100px;object-fit:cover}
        .bar{position:absolute;left:0;right:0;bottom:0;height:4px;background:#1a2233}
        .bar > span{display:block;height:100%;width:0;background:#5b9dff;transition:width .2s linear}
        .rm{position:absolute;top:6px;right:6px;border:1px solid var(--line);background:#0f1218;color:#e7eaf0;border-radius:8px;font-size:12px;padding:4px 6px;cursor:pointer}
      </style>
      <div class="dz">
        <div class="zone" id="zone" tabindex="0" role="button" aria-label="Upload images">Drop images here or click to choose</div>
        <input id="file" type="file" accept="image/*" multiple hidden>
        <div class="grid" id="grid" aria-live="polite"></div>
      </div>`;
    const zone = container.querySelector("#zone");
    const input = container.querySelector("#file");
    const grid  = container.querySelector("#grid");

    const prevent = e=>{ e.preventDefault(); e.stopPropagation(); };
    ["dragenter","dragover","dragleave","drop"].forEach(ev=> zone.addEventListener(ev, prevent));
    zone.addEventListener("dragenter", ()=> zone.classList.add("focus"));
    zone.addEventListener("dragleave", ()=> zone.classList.remove("focus"));
    zone.addEventListener("drop", e=>{ zone.classList.remove("focus"); handleFiles(e.dataTransfer.files); });
    zone.addEventListener("click", ()=> input.click());
    zone.addEventListener("keydown", e=>{ if(e.key==="Enter"||e.key===" "){ input.click(); }});
    input.addEventListener("change", ()=> handleFiles(input.files));

    function handleFiles(files){
      [...files].forEach(f=>{
        if(!f.type.startsWith("image/")) return;
        const url = URL.createObjectURL(f);
        const card = document.createElement("div");
        card.className="thumb";
        card.innerHTML = `
          <img src="${url}" alt="${f.name}">
          <div class="bar"><span></span></div>
          <div class="rm">✕</div>
        `;
        grid.appendChild(card);
        // fake progress
        const fill = card.querySelector(".bar > span");
        let p = 0; const t = setInterval(()=>{ p+= Math.random()*20+10; fill.style.width = Math.min(100,p).toFixed(0) + "%";
          if(p>=100){ clearInterval(t); setTimeout(()=> card.querySelector(".bar").remove(), 300); }}, 200);
        card.querySelector(".rm").addEventListener("click", ()=>{
          clearInterval(t); URL.revokeObjectURL(url); card.remove();
        }, {once:true});
      });
      input.value = ""; // reset
    }

    this._cleanup = ()=>{
      zone.replaceWith(zone.cloneNode(true));
      input.replaceWith(input.cloneNode(true));
      container.innerHTML="";
    };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectDropzonePreview);