const effectCanvasParticleNetwork = {
  id: "canvas-particle-network",
  name: "Particle Network",
  type: "JS/Canvas",
  tags: ["canvas", "particles", "pointer", "animation", "calming", "minimal"],
  perf: "GPU/CPU light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>Dozens of drifting dots that connect with lines when they're near each other.</li>
      <li>Move your mouse over the canvas — dots are drawn toward your cursor.</li>
      <li>The network is alive: connections appear and dissolve as dots drift apart.</li>
    </ul>`,
  async load() {},
  init(container) {
    const canvas = document.createElement("canvas");
    container.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const resize = () => {
      const w = container.clientWidth, h = container.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const N = 60;
    const CONNECT_DIST = 110;
    const MOUSE_ATTRACT = 140;
    let mouse = { x: -9999, y: -9999 };

    const dots = Array.from({ length: N }, () => ({
      x: Math.random() * container.clientWidth,
      y: Math.random() * container.clientHeight,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
    }));

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    let raf;
    const step = () => {
      const W = container.clientWidth, H = container.clientHeight;
      ctx.clearRect(0, 0, W, H);

      for (const d of dots) {
        // Mouse attraction
        const dx = mouse.x - d.x, dy = mouse.y - d.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_ATTRACT && dist > 0) {
          const force = (MOUSE_ATTRACT - dist) / MOUSE_ATTRACT * 0.04;
          d.vx += dx / dist * force;
          d.vy += dy / dist * force;
        }

        // Dampen + move
        d.vx *= 0.98; d.vy *= 0.98;
        d.x += d.vx; d.y += d.vy;

        // Wrap edges
        if (d.x < 0) d.x = W; if (d.x > W) d.x = 0;
        if (d.y < 0) d.y = H; if (d.y > H) d.y = 0;
      }

      // Draw connections
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.5;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(91,157,255,${alpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw dots
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(91,157,255,0.8)";
        ctx.fill();
      }

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    this._cleanup = () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  },
  teardown() { this._cleanup?.(); },
};
window.EFFECTS_REGISTRY.registerEffect(effectCanvasParticleNetwork);
