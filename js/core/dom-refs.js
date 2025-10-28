/**
 * Centralized DOM References
 */
class DOMReferences {
  constructor() {
    this.grid = document.getElementById('grid');
    this.search = document.getElementById('search');
    this.tags = document.getElementById('tags');
    this.modal = document.getElementById('demoModal');
    this.sandbox = document.getElementById('sandbox');
    this.title = document.getElementById('demoTitle');
    this.metaType = document.getElementById('metaType');
    this.metaLoad = document.getElementById('metaLoad');
    this.metaTags = document.getElementById('metaTags');
    this.close = document.getElementById('closeModal');
    this.explain = document.getElementById('explain');
  }
}

window.$DOM = new DOMReferences();

