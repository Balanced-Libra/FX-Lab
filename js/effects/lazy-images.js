const effectLazyImages = {
  id: "js-lazy-images",
  name: "Lazy-Load Images",
  type: "JS",
  tags: ["media","scroll","a11y"],
  perf: "CPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>Images only load when they scroll into view, keeping the page fast on first visit.</li>
      <li>A shimmering grey placeholder fills each slot until the image is ready.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .lz-root{height:100%;overflow:auto;padding:12px;display:grid;gap:12px}
        .lz-card{border:1px solid var(--line);border-radius:12px;background:#0f1218;padding:8px}
        .ph{position:relative;height:180px;border-radius:10px;background:#141923; overflow:hidden}
        .ph::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.06),transparent);
                   transform:translateX(-100%); animation:sh 1.2s linear infinite}
        @keyframes sh { to { transform:translateX(100%); } }
        .ph img{opacity:0; width:100%; height:100%; object-fit:cover; transition:opacity .35s ease}
        .ph.loaded::after{display:none}
        .ph.loaded img{opacity:1}
      </style>
      <div class="lz-root" id="root">
        ${Array.from({length:12},(_,i)=>`
          <div class="lz-card">
            <div class="ph"><img data-src="https://picsum.photos/seed/lz${i}/800/500" alt="Lazy ${i+1}" /></div>
          </div>`).join("")}
      </div>`;
    const root = container.querySelector("#root");
    const targets = [...container.querySelectorAll("img[data-src]")];
    const io = new IntersectionObserver((entries)=>{
      for(const e of entries){
        if(!e.isIntersecting) continue;
        const img = e.target;
        img.src = img.dataset.src;
        img.addEventListener("load", ()=>{
          img.parentElement.classList.add("loaded");
          img.removeAttribute("data-src");
        }, {once:true});
        io.unobserve(img);
      }
    }, {root, threshold:0.1});
    targets.forEach(t=>io.observe(t));

    this._cleanup = ()=>{ io.disconnect(); container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectLazyImages);