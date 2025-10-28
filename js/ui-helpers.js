// Fluid glass effect for topbar
class FluidGlassEffect {
    constructor(element) {
      this.element = element;
      this.init();
    }
    init() {
      this.element.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }
    handleMouseMove(e) {
      const rect = this.element.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      this.element.style.setProperty('--mouse-x', `${x}%`);
      this.element.style.setProperty('--mouse-y', `${y}%`);
    }
    destroy() {
      this.element.removeEventListener('mousemove', this.handleMouseMove);
    }
  }
  
  // Add magnetic effect to card thumbs
  function addMagneticThumbEffect(card) {
    const thumb = card.querySelector('.thumb');
    if (!thumb) return;
    const onMove = (e) => {
      const rect = thumb.getBoundingClientRect();
      const x = e.clientX - rect.left; const y = e.clientY - rect.top;
      const xPercent = (x / rect.width) * 100; const yPercent = (y / rect.height) * 100;
      thumb.style.setProperty('--thumb-mx', `${xPercent}%`);
      thumb.style.setProperty('--thumb-my', `${yPercent}%`);
      const maxTilt = 12;
      const dx = ((x / rect.width) - 0.5) * maxTilt;
      const dy = ((y / rect.height) - 0.5) * maxTilt;
      thumb.style.setProperty('--thumb-dx', `${dx.toFixed(1)}px`);
      thumb.style.setProperty('--thumb-dy', `${dy.toFixed(1)}px`);
    };
    const onLeave = () => {
      thumb.style.removeProperty('--thumb-mx'); thumb.style.removeProperty('--thumb-my');
      thumb.style.removeProperty('--thumb-dx'); thumb.style.removeProperty('--thumb-dy');
    };
    thumb.addEventListener('pointermove', onMove);
    thumb.addEventListener('pointerleave', onLeave);
    thumb._magneticCleanup = () => {
      thumb.removeEventListener('pointermove', onMove);
      thumb.removeEventListener('pointerleave', onLeave);
    };
  }
  
  // Helper to determine tech tag from effect type string
  function techFromType(type='') {
    const t = type.toLowerCase();
    if (t.includes('webgl')) return 'webgl'; if (t.includes('svg')) return 'svg';
    if (t.includes('canvas'))return 'canvas'; if (t.includes('audio')) return 'audio';
    if (t.includes('worker'))return 'worker'; if (t.includes('css'))   return 'css';
    return null;
  }
  
  // Normalizes and de-duplicates tags for an effect
  function normalizeTags(effect){
    const raw = Array.isArray(effect.tags) ? effect.tags : [];
    const tech = techFromType(effect.type);
    const mapped = raw.map(t => TAG_ALIASES[t] || t);
    return [...new Set(tech ? [tech, ...mapped] : mapped)];
  }