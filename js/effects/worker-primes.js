const effectWorkerPrimes = {
  id: "worker-primes",
  name: "Web Worker: Prime Sieve",
  type: "JS/Worker",
  tags: ["performance","worker","heavy"],
  perf: "CPU-medium",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>Compute primes in a Web Worker (UI stays responsive).</li>
      <li>Progress messages and cancel/terminate.</li>
      <li>Falls back to chunked main-thread if workers are blocked (e.g., file://).</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .wk{height:100%;display:grid;grid-template-rows:auto 1fr;gap:10px}
        .wk .panel{display:flex;gap:10px;align-items:center;border:1px solid var(--line);
                   border-radius:12px;background:#0f1218;padding:10px;color:#cfd5df}
        .wk .out{border:1px solid var(--line);border-radius:12px;background:#0b0d12;padding:10px;overflow:auto}
        progress{width:240px}
      </style>
      <div class="wk">
        <div class="panel">
          <label>Max N <input id="max" type="number" min="10000" step="10000" value="300000"></label>
          <button class="btn" id="run">Start</button>
          <button class="btn" id="cancel">Cancel</button>
          <progress id="prog" value="0" max="100"></progress>
          <span id="status" class="mut"></span>
        </div>
        <div class="out" id="out"></div>
      </div>`;
    const maxI=container.querySelector("#max"),
          run=container.querySelector("#run"),
          cancel=container.querySelector("#cancel"),
          prog=container.querySelector("#prog"),
          status=container.querySelector("#status"),
          out=container.querySelector("#out");

    // --- Worker code as a string (classic worker) ---
    const code = `
      self.onmessage = e=>{
        const N = e.data.max|0;
        const sieve = new Uint8Array(N+1);
        let last = 0, count = 0;
        for(let i=2;i<=N;i++){
          if(!sieve[i]){ count++; if(i*i<=N){ for(let j=i*i;j<=N;j+=i) sieve[j]=1; } }
          const p = ((i/N)*100)|0;
          if(p!==last && (i%5000===0)){ last=p; postMessage({t:'p', v:p}); }
        }
        const tail=[]; for(let k=N;k>=2 && tail.length<10;k--) if(!sieve[k]) tail.push(k);
        postMessage({t:'d', count, last: tail.reverse()});
      };`;

    let w=null, blobUrl=null, fallbackCancel=false;

    function newWorker(){
      try{
        const blob = new Blob([code], { type: "application/javascript" });
        const url = URL.createObjectURL(blob);
        const worker = new Worker(url); // may throw on file:// (SecurityError)
        worker._blobUrl = url;
        return worker;
      }catch(err){
        return null;
      }
    }

    function start(){
      cancelRun(); // clear old runs
      out.textContent=""; prog.value=0; status.textContent="Starting…";

      // Prefer Worker; if blocked (file://) run fallback
      w = newWorker();
      if(w){
        blobUrl = w._blobUrl;
        status.textContent = "Working in Web Worker…";
        w.onmessage = (e)=>{
          if(e.data.t==='p'){ prog.value = e.data.v; }
          else if(e.data.t==='d'){
            status.textContent = `Found ${e.data.count} primes.`;
            out.textContent = "Last 10 primes: " + e.data.last.join(", ");
            cancelRun(false);
          }
        };
        w.postMessage({max: +maxI.value || 300000});
        return;
      }

      // --- Fallback: chunked sieve on main thread ---
      const N = (+maxI.value || 300000) | 0;
      const sieve = new Uint8Array(N+1);
      let i = 2, j = 0, count = 0, lastP = 0;
      fallbackCancel = false;
      status.textContent = "Worker blocked — running on main thread (chunked)…";

      const step = ()=>{
        if(fallbackCancel) return;
        const t0 = performance.now();
        // ~16ms budget per slice
        while(performance.now() - t0 < 16 && i <= N){
          if(j){ // marking multiples of current i
            for(; j<=N && performance.now()-t0 < 16; j += i) sieve[j]=1;
            if(j > N){ j = 0; i++; }
          } else {
            if(!sieve[i]){
              count++;
              if(i*i <= N){ j = i*i; } else { i++; }
            } else { i++; }
          }
          const p = ((i/N)*100)|0;
          if(p!==lastP && (i%5000===0)){ lastP = p; prog.value = p; }
        }
        if(i <= N){ setTimeout(step, 0); }
        else {
          const tail=[]; for(let k=N;k>=2 && tail.length<10;k--) if(!sieve[k]) tail.push(k);
          status.textContent = `Found ${count} primes.`;
          out.textContent = "Last 10 primes: " + tail.reverse().join(", ");
        }
      };
      step();
    }

    function cancelRun(updateText=true){
      if(w){ try{ w.terminate(); }catch{} w=null; }
      if(blobUrl){ URL.revokeObjectURL(blobUrl); blobUrl=null; }
      fallbackCancel = true;
      if(updateText) status.textContent = "Cancelled.";
    }

    run.addEventListener("click", start);
    cancel.addEventListener("click", ()=>cancelRun(true));

    this._cleanup=()=>{
      cancelRun(false);
      run.replaceWith(run.cloneNode(true));
      cancel.replaceWith(cancel.cloneNode(true));
      container.innerHTML="";
    };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectWorkerPrimes);