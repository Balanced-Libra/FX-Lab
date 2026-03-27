const effectDragReorderList = {
  id: "ui-drag-reorder",
  name: "Drag to Reorder List",
  type: "JS+CSS",
  tags: ["interaction","a11y","forms","playful","minimal"],
  perf: "CPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>Native drag &amp; drop on list items.</li>
      <li>Drop position detection via mouse Y vs item midpoint.</li>
      <li>ARIA live region announces moves.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .re{height:100%;display:grid;grid-template-rows:auto 1fr;gap:10px}
        .re ul{list-style:none;margin:0;padding:8px;border:1px solid var(--line);border-radius:12px;background:#0f1218}
        .re li{padding:10px 12px;margin:6px 0;border:1px solid var(--line);border-radius:10px;background:#0b0d12;cursor:grab}
        .re li.dragging{opacity:.6}
        .re .mut{color:#9aa1ad}
      </style>
      <div class="re">
        <div class="mut">Drag items to reorder. (Keyboard: focus + Alt+Up/Down)</div>
        <ul id="list" aria-live="polite">
          <li draggable="true" tabindex="0">Alpha</li>
          <li draggable="true" tabindex="0">Bravo</li>
          <li draggable="true" tabindex="0">Charlie</li>
          <li draggable="true" tabindex="0">Delta</li>
        </ul>
      </div>`;
    const list = container.querySelector("#list");
    let dragEl=null;

    const onDragStart = e=>{ dragEl = e.target; dragEl.classList.add("dragging"); e.dataTransfer.effectAllowed="move"; };
    const onDragEnd   = e=>{ e.target.classList.remove("dragging"); dragEl=null; };
    const onDragOver  = e=>{
      e.preventDefault();
      const y = e.clientY;
      const siblings = [...list.querySelectorAll("li:not(.dragging)")];
      let next = null;
      for(const s of siblings){
        const r = s.getBoundingClientRect();
        const offset = y - (r.top + r.height/2);
        if(offset < 0){ next = s; break; }
      }
      list.insertBefore(dragEl, next);
    };
    const onKey = e=>{
      if(!["ArrowUp","ArrowDown"].includes(e.key) || !e.altKey) return;
      e.preventDefault();
      const li = e.target.closest("li");
      if(!li) return;
      if(e.key==="ArrowUp" && li.previousElementSibling) list.insertBefore(li, li.previousElementSibling);
      if(e.key==="ArrowDown" && li.nextElementSibling) list.insertBefore(li.nextElementSibling, li);
      list.setAttribute("aria-label", `Moved ${li.textContent}`);
      li.focus();
    };
    list.addEventListener("dragstart", onDragStart);
    list.addEventListener("dragend", onDragEnd);
    list.addEventListener("dragover", onDragOver);
    list.addEventListener("keydown", onKey);

    this._cleanup=()=>{ list.replaceWith(list.cloneNode(true)); container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectDragReorderList);