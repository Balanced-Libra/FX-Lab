const effectDragSortList = {
  id: "js-drag-sort-list",
  name: "Drag-Sort List",
  type: "JS",
  tags: ["interaction","forms","nav"],
  perf: "CPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>Native HTML5 drag &amp; drop (<code>draggable</code>).</li>
      <li>Reorders items by inserting before/after nearest sibling.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .dl-wrap{height:100%;display:grid;place-items:center;padding:12px}
        .dl{width:min(520px,92%); border:1px solid var(--line); border-radius:12px; background:#0f1218; padding:10px}
        .item{user-select:none; background:#10131a; color:#e7eaf0; padding:12px; border:1px solid var(--line);
              border-radius:10px; margin:8px 0; display:flex; align-items:center; gap:10px}
        .handle{font-weight:700; opacity:.6; cursor:grab}
        .dragging{opacity:.6; border-style:dashed}
      </style>
      <div class="dl-wrap">
        <div class="dl" id="list">
          ${["Alpha","Bravo","Charlie","Delta","Echo","Foxtrot"].map(t=>`
            <div class="item" draggable="true"><span class="handle">⋮⋮</span>${t}</div>`).join("")}
        </div>
      </div>`;
    const list = container.querySelector("#list");
    const items = ()=>[...list.querySelectorAll(".item")];

    const getAfter = (y)=>{
      const els = items().filter(el=>!el.classList.contains("dragging"));
      let closest = null, closestOffset = Number.NEGATIVE_INFINITY;
      for(const el of els){
        const box = el.getBoundingClientRect();
        const offset = y - box.top - box.height/2;
        if(offset < 0 && offset > closestOffset){ closestOffset = offset; closest = el; }
      }
      return closest;
    };

    list.addEventListener("dragstart", e=>{
      if(!e.target.classList.contains("item")) return;
      e.dataTransfer.effectAllowed = "move";
      e.target.classList.add("dragging");
    });
    list.addEventListener("dragend", e=>{
      e.target.classList.remove("dragging");
    });
    list.addEventListener("dragover", e=>{
      e.preventDefault();
      const after = getAfter(e.clientY);
      const dragging = list.querySelector(".dragging");
      if(!dragging) return;
      after ? list.insertBefore(dragging, after) : list.appendChild(dragging);
    });

    this._cleanup = ()=>{ container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectDragSortList);