const effectClipboardToast = {
    id: "js-clipboard-toast",
    name: "Copy to Clipboard (Toast)",
    type: "JS",
    tags: ["forms","interaction","a11y"],
    perf: "CPU-light",
    description: `
      <h3>What this shows</h3>
      <ul>
        <li><code>navigator.clipboard.writeText</code> with success/fail states.</li>
        <li>Small toast using CSS transitions.</li>
      </ul>`,
    async load(){},
    init(container){
      container.innerHTML = `
        <style>
          .clip-wrap{height:100%;display:grid;place-items:center}
          .card{width:min(560px,92%);border:1px solid var(--line);border-radius:12px;background:#0f1218;padding:16px;color:#cfd5df;display:grid;gap:10px}
          .row{display:grid;grid-template-columns:1fr auto;gap:8px}
          .toast{position:fixed;left:50%;bottom:18px;transform:translateX(-50%) translateY(20px);
                 padding:10px 14px;border:1px solid var(--line);border-radius:10px;background:#0b0d12;color:#e7eaf0;
                 opacity:0; transition:opacity .2s ease, transform .2s ease; pointer-events:none}
          .toast.show{opacity:1; transform:translateX(-50%) translateY(0)}
        </style>
        <div class="clip-wrap">
          <div class="card">
            <label for="txt">Text to copy</label>
            <div class="row">
              <input id="txt" value="Effects Lab — tiny pasteable demos" style="padding:12px;border-radius:10px;border:1px solid var(--line);background:#0c1016;color:#e7eaf0"/>
              <button class="btn" id="copy">Copy</button>
            </div>
            <p class="hint" style="color:#9aa1ad;margin:0">Tip: Try pasting after clicking "Copy".</p>
          </div>
        </div>
        <div class="toast" id="toast" role="status" aria-live="polite">Copied!</div>`;
      const input = container.querySelector("#txt");
      const btn = container.querySelector("#copy");
      const toast = container.querySelector("#toast");
      let t;
  
      const showToast = (msg="Copied!")=>{
        toast.textContent = msg;
        toast.classList.add("show");
        clearTimeout(t);
        t = setTimeout(()=> toast.classList.remove("show"), 1200);
      };
  
      const onCopy = async ()=>{
        try{
          await navigator.clipboard.writeText(input.value);
          showToast("Copied!");
        }catch(e){
          // fallback: select + execCommand (older browsers)
          input.select(); document.execCommand?.("copy");
          showToast("Copied (fallback)");
        }
      };
  
      btn.addEventListener("click", onCopy);
      this._cleanup = ()=>{ clearTimeout(t); btn.removeEventListener("click", onCopy); container.innerHTML=""; };
    },
    teardown(){ this._cleanup?.(); }
  };
  
  // Register this effect
  window.EFFECTS_REGISTRY.registerEffect(effectClipboardToast);