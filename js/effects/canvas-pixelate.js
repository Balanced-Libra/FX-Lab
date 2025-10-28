const effectCanvasPixelate = {
    id: "canvas-pixelate",
    name: "Pixelate Filter (Slider)",
    type: "JS/Canvas",
    tags: ["canvas","media","interaction"],
    perf: "GPU/CPU light",
    description: `
      <h3>What this shows</h3>
      <ul>
        <li>Classic pixelation via downscale &amp; upscale with smoothing off.</li>
        <li>Responsive canvas + slider for block size.</li>
        <li>Draws a generated scene (gradient + text) to avoid CORS issues.</li>
      </ul>`,
    async load(){},
    init(container){
      container.innerHTML = `
        <style>
          .px{height:100%;display:grid;grid-template-rows:auto 1fr;gap:10px}
          .px .panel{display:flex;gap:10px;align-items:center;border:1px solid var(--line);border-radius:12px;background:#0f1218;padding:10px;color:#cfd5df}
          .px canvas{display:block;width:100%;height:100%;border:1px solid var(--line);border-radius:12px;background:#0b0d12}
        </style>
        <div class="px">
          <div class="panel">Block size <input id="blk" type="range" min="1" max="40" value="8"><output id="out">8</output> px</div>
          <canvas id="cv"></canvas>
        </div>`;
      const c = container.querySelector("#cv");
      const ctx = c.getContext("2d");
      const dpr = Math.min(2, window.devicePixelRatio||1);
      const off = document.createElement("canvas");
      const octx = off.getContext("2d");
  
      const renderSource = (w,h)=>{
        off.width = w; off.height = h;
        const g = octx.createLinearGradient(0,0,w,h);
        g.addColorStop(0,"#0f131b"); g.addColorStop(1,"#172133");
        octx.fillStyle=g; octx.fillRect(0,0,w,h);
        // blobs
        for(let i=0;i<8;i++){
          const rx=Math.random()*w, ry=Math.random()*h, rr=60+Math.random()*160;
          const rgrad = octx.createRadialGradient(rx,ry,0, rx,ry,rr);
          rgrad.addColorStop(0, "rgba(91,157,255,.55)");
          rgrad.addColorStop(1, "rgba(91,157,255,0)");
          octx.fillStyle=rgrad; octx.beginPath(); octx.arc(rx,ry,rr,0,Math.PI*2); octx.fill();
        }
        // title
        octx.fillStyle="#e7eaf0"; octx.font="600 48px system-ui,Segoe UI,Roboto,Inter"; octx.textAlign="center";
        octx.fillText("PIXELATE", w/2, h/2);
      };
  
      const resize = ()=>{
        const w = container.clientWidth, h = container.clientHeight - 48;
        c.width = Math.floor(w*dpr); c.height = Math.floor(h*dpr);
        c.style.width = w+"px"; c.style.height = h+"px";
        ctx.setTransform(dpr,0,0,dpr,0,0);
        renderSource(w, h);
        draw();
      };
  
      let block = 8;
      const blk = container.querySelector("#blk"), out = container.querySelector("#out");
      const ro = new ResizeObserver(resize); ro.observe(container);
      blk.addEventListener("input", ()=>{ block=+blk.value; out.value=String(block); draw(); });
  
      function draw(){
        const w = c.clientWidth, h = c.clientHeight;
        if(block<=1){ ctx.drawImage(off,0,0,w,h); return; }
        const sw = Math.ceil(w / block), sh = Math.ceil(h / block);
        ctx.imageSmoothingEnabled = false;
        // downscale to tiny temp canvas
        const tmp = document.createElement("canvas");
        tmp.width = sw; tmp.height = sh;
        const tctx = tmp.getContext("2d");
        tctx.imageSmoothingEnabled = false;
        tctx.drawImage(off,0,0,w,h, 0,0, sw,sh);
        ctx.clearRect(0,0,w,h);
        ctx.drawImage(tmp, 0,0, sw,sh, 0,0, w,h);
      }
  
      resize();
      this._cleanup = ()=>{ ro.disconnect(); blk.replaceWith(blk.cloneNode(true)); container.innerHTML=""; };
    },
    teardown(){ this._cleanup?.(); }
  };
  
  // Register this effect
  window.EFFECTS_REGISTRY.registerEffect(effectCanvasPixelate);