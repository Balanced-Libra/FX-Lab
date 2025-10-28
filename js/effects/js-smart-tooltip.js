const effectSmartTooltip = {
  id: "js-smart-tooltip",
  name: "Smart Tooltip (Clamp to Bounds)",
  type: "JS",
  tags: ["interaction","a11y"],
  perf: "CPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>A tooltip that follows the pointer.</li>
      <li>Clamped so it never overflows the sandbox.</li>
      <li>Arrow flips based on which side was clamped.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .tt-stage{position:relative;height:100%;border:1px solid var(--line);border-radius:12px;background:#0b0d12}
        .tt-target{position:absolute; display:grid; place-items:center; width:120px; height:60px;
          border:1px solid var(--line); border-radius:10px; background:#0f1218; color:#e7eaf0}
        .tt-target:nth-child(1){ top:14%; left:12%}
        .tt-target:nth-child(2){ top:18%; right:12%}
        .tt-target:nth-child(3){ bottom:18%; left:22%}
        .tt-target:nth-child(4){ bottom:16%; right:20%}
        .tt{position:absolute; padding:8px 10px; background:#0f1218; color:#e7eaf0; border:1px solid var(--line);
            border-radius:8px; pointer-events:none; transform:translate(-50%,-120%); transition:opacity .08s ease}
        .tt[hidden]{opacity:0}
        .tt::after{
          content:""; position:absolute; width:10px; height:10px; background:#0f1218; border-left:1px solid var(--line); border-top:1px solid var(--line);
          transform:rotate(45deg); left:50%; top:100%; margin-left:-5px;
        }
        .tt[data-side="left"]{ transform:translate(12px,-50%); }
        .tt[data-side="left"]::after{ left:-5px; top:50%; transform:rotate(225deg); }
        .tt[data-side="right"]{ transform:translate(-100%,-50%); }
        .tt[data-side="right"]::after{ left:calc(100% - 5px); top:50%; transform:rotate(45deg); }
        .tt[data-side="bottom"]{ transform:translate(-50%,12px); }
        .tt[data-side="bottom"]::after{ top:-5px; transform:rotate(135deg); }
      </style>
      <div class="tt-stage" id="stage" aria-label="Tooltip stage">
        <div class="tt-target" tabindex="0">Alpha</div>
        <div class="tt-target" tabindex="0">Bravo</div>
        <div class="tt-target" tabindex="0">Charlie</div>
        <div class="tt-target" tabindex="0">Delta</div>
        <div class="tt" id="tip" hidden>Tooltip</div>
      </div>`;
    const stage = container.querySelector("#stage");
    const tip = container.querySelector("#tip");
    let active=null;

    function show(text){ tip.textContent=text; tip.hidden=false; }
    function hide(){ tip.hidden=true; }

    const clamp = (x, y)=>{
      const r = stage.getBoundingClientRect();
      const tw = 160, th = 40; // approx tooltip bounds
      const pad = 8;
      let side = "top";
      let cx = Math.max(r.left+pad, Math.min(r.right-pad, x));
      let cy = Math.max(r.top+pad,  Math.min(r.bottom-pad, y));
      // pick side if clamped strongly
      if (x > r.right - tw/2) side="left";
      else if (x < r.left + tw/2) side="right";
      else if (y > r.bottom - th) side="top";
      else if (y < r.top + th) side="bottom";
      return { x: cx - r.left, y: cy - r.top, side };
    };

    const move = (e)=>{
      if(!active) return;
      const {x,y,side} = clamp(e.clientX, e.clientY);
      tip.style.left = x+"px";
      tip.style.top  = y+"px";
      tip.dataset.side = side;
    };

    const enter = (e)=>{
      if(!(e.target).classList.contains("tt-target")) return;
      active = e.target; show(active.textContent);
    };
    const leave = (e)=>{
      if(e.relatedTarget?.closest?.(".tt-target") === active) return;
      active=null; hide();
    };

    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerover", enter);
    stage.addEventListener("pointerout", leave);
    stage.addEventListener("focusin", e=>{ if(e.target.classList.contains("tt-target")){ active=e.target; show(active.textContent); }});
    stage.addEventListener("focusout", e=>{ if(!stage.contains(e.relatedTarget)){ active=null; hide(); }});

    this._cleanup = ()=>{
      stage.replaceWith(stage.cloneNode(true));
      container.innerHTML="";
    };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectSmartTooltip);