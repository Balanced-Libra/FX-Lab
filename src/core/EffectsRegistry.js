/**
 * Effects Registry
 * Central registry for managing all effects
 */
export class EffectsRegistry {
  constructor() {
    this.effects = [];
  }

  registerEffect(effect) {
    const key = effect.id || effect.name;
    if (this.effects.some(e => (e.id || e.name) === key)) {
      console.warn(`Duplicate registration skipped: ${key}`);
      return;
    }
    this.effects.push(effect);
    console.log(`Registered effect: ${effect.name}`);
  }

  getAllEffects() {
    return this.effects;
  }

  getEffectById(id) {
    return this.effects.find(e => e.id === id);
  }

  getFilteredEffects(filterFn) {
    return this.effects.filter(filterFn);
  }
}

// Global instance for backward compatibility
window.EFFECTS_REGISTRY = {
  EFFECTS: [],
  registerEffect(effect) {
    const key = effect.id || effect.name;
    if (window.EFFECTS_REGISTRY.EFFECTS.some(e => (e.id || e.name) === key)) {
      console.warn(`Duplicate registration skipped: ${key}`);
      return;
    }
    window.EFFECTS_REGISTRY.EFFECTS.push(effect);
    console.log(`Registered effect: ${effect.name}`);
  }
};

// Global reference for easy access
window.EFFECTS = window.EFFECTS_REGISTRY.EFFECTS;

