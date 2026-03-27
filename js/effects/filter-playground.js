const effectFilterPlayground = {
  id: "css-filter-playground",
  name: "Filter Playground",
  type: "JS+CSS",
  tags: ["filter","media","interaction","bold","playful"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>Live CSS <code>filter</code> chain controlled by range inputs.</li>
      <li>Blur, brightness, saturate, hue-rotate.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .fp{height:100%;display:grid;grid-template-columns:min(380px,40%) 1fr;gap:12px}
        .fp .panel{border:1px solid var(--line);border-radius:12px;background:#0f1218;padding:14px;color:#cfd5df}
        .fp label{display:grid;grid-template-columns:90px 1fr auto;gap:10px;align-items:center;margin:8px 0}
        .fp input[type="range"]{width:100%}
        .fp .stage{display:grid;place-items:center;border:1px solid var(--line);border-radius:12px;background:#0b0d12}
        .fp .pic{width:min(92%,520px);aspect-ratio:16/10;border-radius:12px;
          background:
            radial-gradient(120% 120% at 10% 10%, rgba(91,157,255,.25), transparent 60%),
            url('https://picsum.photos/960/600?random=5') center/cover no-repeat; }
        @media (prefers-reduced-data: reduce){
          .fp .pic{ background:
            radial-gradient(120% 120% at 10% 10%, rgba(91,157,255,.25), transparent 60%),
            linear-gradient(135deg,#17202e,#0f1218); }
        }
      </style>
      <div class="fp">
        <div class="panel">
          <label>Blur
            <input id="bl" type="range" min="0" max="12" value="0" step="1"/>
            <output id="obl">0px</output>
          </label>
          <label>Brightness
            <input id="br" type="range" min="50" max="150" value="100" step="1"/>
            <output id="obr">100%</output>
          </label>
          <label>Saturate
            <input id="sa" type="range" min="50" max="250" value="120" step="1"/>
            <output id="osa">120%</output>
          </label>
          <label>Hue
            <input id="hu" type="range" min="0" max="360" value="0" step="1"/>
            <output id="ohu">0°</output>
          </label>
        </div>
        <div class="stage"><div class="pic" id="pic"></div></div>
      </div>`;
    const pic = container.querySelector("#pic");
    const $ = id => container.querySelector(id);
    const update = ()=>{
      const blur = +$("#bl").value, br=+$("#br").value, sa=+$("#sa").value, hu=+$("#hu").value;
      $("#obl").value = blur+"px"; $("#obr").value = br+"%"; $("#osa").value = sa+"%"; $("#ohu").value = hu+"°";
      pic.style.filter = `blur(${blur}px) brightness(${br}%) saturate(${sa}%) hue-rotate(${hu}deg)`;
    };
    ["#bl","#br","#sa","#hu"].forEach(id=> $(id).addEventListener("input", update));
    update();
    this._cleanup = ()=>{ container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectFilterPlayground);