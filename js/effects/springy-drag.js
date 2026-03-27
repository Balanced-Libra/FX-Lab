const effectSpringyDrag = {
  id: "physics-springy-drag",
  name: "Springy Drag Dot",
  type: "JS/Physics",
  tags: ["physics","interaction","playful","energetic"],
  perf: "CPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>Simple spring integration (Hooke's law + damping).</li>
      <li>Pointer moves the target; dot eases toward it.</li>
    </ul>
  `,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .spr{ position:relative; height:100%; }
        .spr::before{ content:""; position:absolute; inset:0; background:radial-gradient(60% 40% at 50% 20%, #121a2a, transparent 60%); }
        .dot{ position:absolute; width:26px; height:26px; border-radius:50%; background:#5b9dff; box-shadow:0 6px 18px rgba(91,157,255,.35); }
      </style>
      <div class="spr" id="spr"></div>`;
    const el = container.querySelector("#spr");
    const dot = document.createElement("div"); dot.className="dot"; el.appendChild(dot);

    const center = ()=>({ x: el.clientWidth/2, y: el.clientHeight/2 });
    let target = center(), x=target.x, y=target.y, vx=0, vy=0;
    const k = 0.08, damp = 0.85;

    const onMove = (e)=>{ const r=el.getBoundingClientRect(); target={ x:e.clientX-r.left, y:e.clientY-r.top }; };
    const onLeave= ()=>{ target = center(); };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    let raf;
    const step=()=>{
      const ax = (target.x - x) * k;
      const ay = (target.y - y) * k;
      vx = (vx + ax) * damp;
      vy = (vy + ay) * damp;
      x += vx; y += vy;
      dot.style.transform = `translate(${(x-13).toFixed(1)}px, ${(y-13).toFixed(1)}px)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    this._cleanup = ()=>{ cancelAnimationFrame(raf); el.removeEventListener("pointermove", onMove); el.removeEventListener("pointerleave", onLeave); container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectSpringyDrag);