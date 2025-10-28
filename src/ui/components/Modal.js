/**
 * Modal Component
 * Manages the demo modal dialog
 */
import { normalizeTags } from '../utils/tags.js';

export class Modal {
  constructor(state, dom, background) {
    this.state = state;
    this.dom = dom;
    this.background = background;
  }

  init() {
    this.dom.close.onclick = () => this.close();

    this.dom.modal.addEventListener('close', () => {
      if (this.state.activeEffect?.teardown) {
        this.state.activeEffect.teardown();
      }
      if (this.background) {
        this.background.start();
      }
    });

    this.dom.modal.addEventListener('click', (e) => {
      if (e.target === this.dom.modal) {
        this.close();
      }
    });
  }

  async open(effect) {
    if (this.background) {
      this.background.stop();
    }

    if (this.state.activeEffect?.teardown) {
      this.state.activeEffect.teardown();
    }

    this.dom.sandbox.innerHTML = '';
    this.dom.title.textContent = effect.name;
    this.dom.metaType.textContent = effect.type;
    const normalizedTags = normalizeTags(effect);
    this.dom.metaTags.textContent = normalizedTags.map(t => `#${t}`).join(' ');
    this.dom.metaLoad.textContent = 'loading…';
    this.dom.explain.innerHTML = effect.description || '<h3>About this demo</h3><p>No description provided.</p>';

    if (!this.dom.modal.open) {
      this.dom.modal.showModal();
    }

    const t0 = performance.now();
    await effect.load?.();
    this.dom.metaLoad.textContent = `load ${Math.round(performance.now() - t0)}ms`;

    effect.init(this.dom.sandbox);
    this.state.setActiveEffect(effect);
  }

  close() {
    this.dom.modal.close();
  }
}

