/**
 * Tag Filter Component
 * Manages tag filtering and rendering
 */
import { TAG_CATEGORIES } from '../../config/categories.js';
import { normalizeTags } from '../utils/tags.js';

export class TagFilter {
  constructor(state, dom) {
    this.state = state;
    this.dom = dom;
  }

  render() {
    const allTags = new Set();
    this.state.effects.forEach(e => {
      const normalizedTags = normalizeTags(e);
      normalizedTags.forEach(t => allTags.add(t));
    });

    let html = '';
    Object.entries(TAG_CATEGORIES).forEach(([categoryName, categoryTags]) => {
      const availableTags = categoryTags.filter(tag => allTags.has(tag));
      if (availableTags.length === 0) return;

      html += `<div class="tag-group">`;
      html += `<div class="tag-group-header">${categoryName}</div>`;
      html += `<div class="tag-group-items">`;
      availableTags.forEach(tag => {
        const active = this.state.activeFilter.has(tag);
        html += `<span class="tag ${active ? 'active' : ''}" data-tag="${tag}">${tag}</span>`;
      });
      html += `</div></div>`;
    });

    this.dom.tags.innerHTML = html;
    this.attachClickHandlers();
  }

  attachClickHandlers() {
    this.dom.tags.querySelectorAll('.tag').forEach(el => {
      el.addEventListener('click', () => {
        const tag = el.dataset.tag;
        if (this.state.activeFilter.has(tag)) {
          this.state.removeFilter(tag);
        } else {
          this.state.addFilter(tag);
        }
        this.render();
        this.state.notify('filterChanged');
      });
    });
  }
}

