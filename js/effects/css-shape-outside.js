const effectCssShapeOutside = {
  id: "css-shape-outside",
  name: "CSS Shapes (shape-outside)",
  type: "CSS",
  tags: ["css","layout","typography"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li><code>shape-outside</code> with floated elements (circle &amp; polygon).</li>
      <li>Text flows around custom shapes.</li>
      <li>No JS. Pure CSS layout trick.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .sh{height:100%;padding:18px;line-height:1.6;color:#cfd5df}
        .ball,.poly{float:left;margin:0 18px 8px 0;background:#1a2336;border:1px solid var(--line)}
        .ball{width:180px;height:180px;border-radius:50%;shape-outside:circle(50%);}
        .poly{float:right;width:220px;height:220px;margin:0 0 8px 18px;
              clip-path:polygon(10% 10%, 90% 15%, 80% 90%, 20% 80%);
              shape-outside:polygon(10% 10%, 90% 15%, 80% 90%, 20% 80%);}
        .sh p{margin:0 0 12px 0}
        @container (width < 520px){ .poly{display:none} }
      </style>
      <div class="sh">
        <div class="ball"></div>
        <div class="poly"></div>
        <p>CSS Shapes let inline content wrap around arbitrary outlines instead of rectangles. The left circle uses <code>shape-outside: circle()</code>; the right panel uses a polygon. Shapes must be floated and have explicit dimensions.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at turpis tincidunt, porttitor arcu vel, viverra purus. Integer bibendum nisl vitae commodo faucibus. Nulla facilisi. Cras consequat, metus a suscipit porta, felis augue lacinia arcu, vel iaculis massa nibh nec arcu.</p>
      </div>`;
    this._cleanup=()=>{ container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectCssShapeOutside);