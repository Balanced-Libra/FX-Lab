const effectTableSortSearch = {
  id: "js-table-sort-search",
  name: "Table — Sort + Search",
  type: "JS",
  tags: ["tables","forms","a11y"],
  perf: "CPU-light",
  description: `
    <h3>What this shows</h3>
    <ul><li>Click headers to sort (asc/desc).</li>
        <li>Client-side search filter.</li></ul>`,
  async load(){},
  init(container){
    const data = [
      { name:"Alpha",   score:82,  role:"Engineer" },
      { name:"Bravo",   score:91,  role:"Designer" },
      { name:"Charlie", score:67,  role:"PM" },
      { name:"Delta",   score:74,  role:"Engineer" },
      { name:"Echo",    score:99,  role:"Analyst" },
      { name:"Foxtrot", score:85,  role:"Engineer" },
    ];
    container.innerHTML = `
      <style>
        .tbl-wrap{height:100%;display:grid;grid-template-rows:auto 1fr;gap:10px}
        .tbl-wrap .panel{display:flex;gap:10px;align-items:center;border:1px solid var(--line);
          border-radius:12px;background:#0f1218;padding:10px;color:#cfd5df}
        table{width:100%;border-collapse:collapse;border:1px solid var(--line);border-radius:12px;overflow:hidden;background:#0b0d12;color:#e7eaf0}
        thead th{background:#10141c;text-align:left;padding:10px;border-bottom:1px solid var(--line);user-select:none}
        tbody td{padding:10px;border-top:1px solid var(--line);color:#cfd5df}
        th.sort{cursor:pointer}
        th.sort .dir{opacity:.7;font-size:12px;margin-left:6px}
        tr:nth-child(odd){background:#0e1219}
      </style>
      <div class="tbl-wrap">
        <div class="panel">
          <label>Search <input id="q" placeholder="name or role" style="padding:8px;border-radius:8px;border:1px solid var(--line);background:#0c1016;color:#e7eaf0"></label>
        </div>
        <div style="overflow:auto">
          <table aria-label="Sortable">
            <thead>
              <tr>
                <th class="sort" data-key="name">Name<span class="dir"></span></th>
                <th class="sort" data-key="score">Score<span class="dir"></span></th>
                <th class="sort" data-key="role">Role<span class="dir"></span></th>
              </tr>
            </thead>
            <tbody id="body"></tbody>
          </table>
        </div>
      </div>`;
    const body = container.querySelector("#body");
    const q = container.querySelector("#q");
    let sortKey = "name", sortDir = 1;

    const render = ()=>{
      const term = (q.value||"").trim().toLowerCase();
      const filtered = data.filter(r => !term || `${r.name} ${r.role}`.toLowerCase().includes(term));
      const rows = filtered.sort((a,b)=>{
        const A=a[sortKey], B=b[sortKey];
        const na = typeof A==="number", nb = typeof B==="number";
        return (na&&nb ? (A-B) : String(A).localeCompare(String(B))) * sortDir;
      });
      body.innerHTML = rows.map(r=>`<tr><td>${r.name}</td><td>${r.score}</td><td>${r.role}</td></tr>`).join("");
      container.querySelectorAll("th.sort .dir").forEach(el=>el.textContent="");
      const th = container.querySelector(`th[data-key="${sortKey}"] .dir`);
      th.textContent = sortDir>0 ? "▲" : "▼";
    };

    container.querySelectorAll("th.sort").forEach(th=>{
      th.addEventListener("click", ()=>{
        const key = th.dataset.key;
        if(sortKey===key) sortDir *= -1; else { sortKey = key; sortDir = 1; }
        render();
      });
    });
    q.addEventListener("input", render);
    render();

    this._cleanup=()=>{ q.replaceWith(q.cloneNode(true)); container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectTableSortSearch);