/**
 * State Management
 * Centralized application state
 */
export class State {
  constructor() {
    this.activeEffect = null;
    this.activeFilter = new Set();
    this.effects = [];
    this.listeners = {};
  }

  setActiveEffect(effect) {
    this.activeEffect = effect;
    this.notify('effectChanged', effect);
  }

  addFilter(tag) {
    this.activeFilter.add(tag);
  }

  removeFilter(tag) {
    this.activeFilter.delete(tag);
  }

  clearFilters() {
    this.activeFilter.clear();
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event, callback) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
  }

  notify(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }
}

