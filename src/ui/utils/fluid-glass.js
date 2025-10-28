/**
 * Fluid Glass Effect
 * Creates the interactive glass effect for the topbar
 */
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

window.FluidGlassEffect = FluidGlassEffect;

