/**
 * Application State Management
 */
class ApplicationState {
  constructor() {
    this.activeEffect = null;
    this.activeFilter = new Set();
    this.effects = [];
  }

  setActiveEffect(effect) {
    this.activeEffect = effect;
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
}

// Global instance
window.AppState = new ApplicationState();

