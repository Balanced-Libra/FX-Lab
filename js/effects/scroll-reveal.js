const effectScrollReveal = {
    id: "scroll-reveal-cards",
    name: "Scroll Reveal Cards",
    type: "Scroll",
    tags: ["scroll","a11y","minimal","calming"],
    perf: "CPU-light",
    description: `
      <h3>What this shows</h3>
      <ul>
        <li><code>IntersectionObserver</code> with a custom root (internal scroller).</li>
        <li>Cards fade/slide in when 20% visible.</li>
      </ul>
    `,
    async load(){},
    init(container){
      container.innerHTML = `
        <style>
          .sr-wrap{height:100%; overflow:auto; padding:24px;}
          .sr-grid{display:grid; gap:16px;}
          .sr-card{
            opacity:.05; transform:translateY(14px);
            transition:opacity .5s ease, transform .5s ease;
            border:1px solid var(--line); border-radius:12px; background:#10131a; padding:16px; color:#cfd5df;
          }
          .sr-card.in{opacity:1; transform:none;}
        </style>
        <div class="sr-wrap" id="srRoot">
          <div class="sr-grid">
            ${Array.from({length:8},(_,i)=>`<article class="sr-card">Reveal card #${i+1}</article>`).join("")}
          </div>
        </div>`;
      const root = container.querySelector("#srRoot");
      const cards = [...container.querySelectorAll(".sr-card")];
      const io = new IntersectionObserver((entries)=>{
        for(const e of entries){ if(e.isIntersecting) e.target.classList.add("in"); }
      }, {root, threshold:0.2});
      cards.forEach(c=>io.observe(c));
      this._cleanup = ()=>{ io.disconnect(); container.innerHTML=""; };
    },
    teardown(){ this._cleanup?.(); }
  };
  
  // Register this effect
  window.EFFECTS_REGISTRY.registerEffect(effectScrollReveal);