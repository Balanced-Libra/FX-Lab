const effectInfiniteScroll = {
  id: "scroll-infinite-loader",
  name: "Infinite Scroll (Internal)",
  type: "Scroll",
  tags: ["scroll","a11y","forms"],
  perf: "CPU-light",
  description: `
    <h3>What this shows</h3>
    <ul><li><code>IntersectionObserver</code> sentinel to load more items.</li>
        <li>Fake latency + skeletons; stops after 5 pages.</li></ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .inf{height:100%;overflow:auto;padding:12px;display:grid;gap:12px}
        .card{border:1px solid var(--line);border-radius:12px;background:#0f1218;padding:14px;color:#cfd5df}
        .sk{height:18px;border-radius:8px;background:#141923;position:relative;overflow:hidden}
        .sk::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.06),transparent);
                    transform:translateX(-100%);animation:sh 1.2s linear infinite}
        @keyframes sh{ to { transform:translateX(100%); } }
        .sent{height:1px}
      </style>
      <div class="inf" id="root"></div>
      <div class="sent" id="sentinel"></div>`;
    const root = container.querySelector("#root");
    const sentinel = container.querySelector("#sentinel");
    let page=0, max=5, busy=false;

    const renderSkeletons = ()=>{
      const frag = document.createDocumentFragment();
      for(let i=0;i<6;i++){
        const el = document.createElement("article");
        el.className="card"; el.innerHTML = `<div class="sk"></div><div class="sk" style="margin-top:8px;width:60%"></div>`;
        frag.appendChild(el);
      }
      root.appendChild(frag);
      return ()=>{ for(let i=0;i<6;i++) root.lastElementChild?.remove(); };
    };

    const loadPage = async()=>{
      if(busy) return; busy=true;
      const removeSk = renderSkeletons();
      await new Promise(r=>setTimeout(r, 650)); // simulated latency
      removeSk();
      const frag = document.createDocumentFragment();
      for(let i=0;i<8;i++){
        const idx = page*8 + i + 1;
        const el = document.createElement("article");
        el.className="card"; el.innerHTML = `<strong>Item #${idx}</strong><p style="margin:6px 0 0 0;color:#9aa1ad">Loaded via IO sentinel</p>`;
        frag.appendChild(el);
      }
      root.appendChild(frag);
      page++; busy=false;
      if(page>=max) io.disconnect();
    };

    const io = new IntersectionObserver((entries)=>{
      for(const e of entries){ if(e.isIntersecting) loadPage(); }
    }, {root: container, threshold:0.1});
    io.observe(sentinel);
    loadPage();

    this._cleanup=()=>{ io.disconnect(); container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectInfiniteScroll);