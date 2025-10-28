const effectA11yContrast = {
  id: "a11y-contrast-checker",
  name: "Color Contrast Checker (WCAG)",
  type: "JS+CSS",
  tags: ["a11y","forms","typography"],
  perf: "CPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>Computes contrast ratio per WCAG (relative luminance).</li>
      <li>Live verdicts for AA/AAA (normal &amp; large text).</li>
      <li>Preview blocks update in real time.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .cc{height:100%;display:grid;grid-template-columns:min(360px,40%) 1fr;gap:12px}
        .cc .panel{border:1px solid var(--line);border-radius:12px;background:#0f1218;padding:12px;color:#cfd5df;display:grid;gap:10px}
        .cc .row{display:grid;grid-template-columns:80px 1fr auto;gap:8px;align-items:center}
        .cc input[type="text"]{padding:10px;border-radius:8px;border:1px solid var(--line);background:#0c1016;color:#e7eaf0}
        .cc input[type="color"]{width:44px;height:32px;border:none;background:transparent}
        .cc .stage{border:1px solid var(--line);border-radius:12px;background:#0b0d12;display:grid;grid-template-rows:auto 1fr;gap:10px;padding:12px}
        .cc .swatch{display:grid;grid-template-columns:1fr 1fr;gap:10px}
        .cc .box{border:1px solid var(--line);border-radius:10px;padding:12px}
        .cc .big{font-size:28px}
        .cc .ratio{font-size:18px;color:#e7eaf0}
        .cc .badges{display:flex;gap:8px;flex-wrap:wrap}
        .cc .pass{border:1px solid #245d3f;background:#11261d;padding:4px 8px;border-radius:8px;color:#7fe2b1}
        .cc .fail{border:1px solid #5d2424;background:#261111;padding:4px 8px;border-radius:8px;color:#ffb3b3}
      </style>
      <div class="cc">
        <div class="panel">
          <div class="row">
            <label>Foreground</label>
            <input id="fgTxt" type="text" value="#e7eaf0" />
            <input id="fgPick" type="color" value="#e7eaf0" />
          </div>
          <div class="row">
            <label>Background</label>
            <input id="bgTxt" type="text" value="#0b0d12" />
            <input id="bgPick" type="color" value="#0b0d12" />
          </div>
          <div><span class="ratio" id="ratio">–</span></div>
          <div class="badges" id="verdicts"></div>
        </div>
        <div class="stage">
          <div class="swatch">
            <div class="box" id="normal">Normal text sample — lorem ipsum dolor sit amet.</div>
            <div class="box big" id="large">Large text sample — Display</div>
          </div>
          <div class="box" id="code">
            <code>ratio = (L1 + 0.05) / (L2 + 0.05)</code>
          </div>
        </div>
      </div>`;
    const $ = s => container.querySelector(s);
    const fgTxt=$("#fgTxt"), bgTxt=$("#bgTxt"), fgPick=$("#fgPick"), bgPick=$("#bgPick");
    const normal=$("#normal"), large=$("#large"), ratioEl=$("#ratio"), verdicts=$("#verdicts");

    const hex = s => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(s) ? s : null;
    const parse = h=>{
      h=h.replace("#",""); if(h.length===3) h=[...h].map(c=>c+c).join("");
      const n=parseInt(h,16); return {r:(n>>16)&255,g:(n>>8)&255,b:n&255};
    };
    const srgb2lin = v=>{ v/=255; return v<=0.04045 ? v/12.92 : Math.pow((v+0.055)/1.055,2.4); };
    const luminance = ({r,g,b})=> 0.2126*srgb2lin(r)+0.7152*srgb2lin(g)+0.0722*srgb2lin(b);
    const fmt = n => (Math.round(n*100)/100).toFixed(2);

    const classify = ratio => ({
      AA_normal: ratio >= 4.5, AAA_normal: ratio >= 7,
      AA_large:  ratio >= 3,   AAA_large:  ratio >= 4.5
    });

    const update = ()=>{
      const f = hex(fgTxt.value.trim()) || fgPick.value;
      const b = hex(bgTxt.value.trim()) || bgPick.value;
      fgTxt.value=f; fgPick.value=f; bgTxt.value=b; bgPick.value=b;
      normal.style.color=f; normal.style.background=b;
      large.style.color=f;  large.style.background=b;
      const Lf=luminance(parse(f)), Lb=luminance(parse(b));
      const ratio = (Math.max(Lf,Lb)+0.05)/(Math.min(Lf,Lb)+0.05);
      ratioEl.textContent = `Contrast: ${fmt(ratio)} : 1`;
      const v = classify(ratio);
      verdicts.innerHTML = `
        <span class="${v.AA_normal?'pass':'fail'}">AA normal</span>
        <span class="${v.AAA_normal?'pass':'fail'}">AAA normal</span>
        <span class="${v.AA_large?'pass':'fail'}">AA large</span>
        <span class="${v.AAA_large?'pass':'fail'}">AAA large</span>`;
    };

    const link = (picker, input) => {
      picker.addEventListener("input", ()=>{ input.value=picker.value; update(); });
      input.addEventListener("input", ()=>{ if(hex(input.value)) picker.value=input.value; update(); });
    };
    link(fgPick, fgTxt); link(bgPick, bgTxt); update();

    this._cleanup = ()=>{
      fgPick.replaceWith(fgPick.cloneNode(true));
      bgPick.replaceWith(bgPick.cloneNode(true));
      fgTxt.replaceWith(fgTxt.cloneNode(true));
      bgTxt.replaceWith(bgTxt.cloneNode(true));
      container.innerHTML="";
    };
  },
  teardown(){ this._cleanup?.(); }
};

// Register this effect
window.EFFECTS_REGISTRY.registerEffect(effectA11yContrast);