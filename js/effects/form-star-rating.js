const effectStarRating = {
  id: "form-star-rating",
  name: "Star Rating (Radios)",
  type: "JS+CSS",
  tags: ["forms","a11y","interaction"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul><li>Accessible rating with radio inputs.</li>
        <li>CSS-only hover fill; tiny JS updates readout.</li></ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .rate-wrap{height:100%;display:grid;place-items:center}
        .rate{display:inline-grid;grid-auto-flow:column;gap:6px;direction:rtl}
        .rate input{position:absolute;opacity:0;width:0;height:0}
        .star{
          width:34px;height:34px;display:inline-block;cursor:pointer;border:1px solid var(--line);border-radius:8px;background:#0f1218;
          -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23000" d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>') center/70% no-repeat;
                  mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23000" d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>') center/70% no-repeat;
          background-image: linear-gradient(#222,#222); background-size:0% 0%; background-repeat:no-repeat;
        }
        /* hover fill (rtl + adjacent sibling) */
        .rate label:hover ~ label .star,
        .rate input:checked ~ label .star { background-size:100% 100%; background-image:linear-gradient(#5b9dff,#5b9dff) }
        .out{margin-top:10px;color:#cfd5df;text-align:center}
      </style>
      <div class="rate-wrap">
        <form class="rate" id="rate" aria-label="Star rating" role="radiogroup">
          <input type="radio" id="s5" name="r" value="5"><label for="s5" aria-label="5 stars"><span class="star"></span></label>
          <input type="radio" id="s4" name="r" value="4"><label for="s4" aria-label="4 stars"><span class="star"></span></label>
          <input type="radio" id="s3" name="r" value="3"><label for="s3" aria-label="3 stars"><span class="star"></span></label>
          <input type="radio" id="s2" name="r" value="2"><label for="s2" aria-label="2 stars"><span class="star"></span></label>
          <input type="radio" id="s1" name="r" value="1"><label for="s1" aria-label="1 star"><span class="star"></span></label>
        </form>
        <div class="out" id="out">Choose a rating.</div>
      </div>`;
    const form = container.querySelector("#rate");
    const out = container.querySelector("#out");
    const onChange = (e)=>{
      if(e.target.name!=="r") return;
      out.textContent = `You picked ${e.target.value} / 5`;
    };
    form.addEventListener("change", onChange);
    this._cleanup=()=>{ form.removeEventListener("change", onChange); container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectStarRating);