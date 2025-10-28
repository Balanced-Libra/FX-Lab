/**
 * Grid Component
 * Handles the main effects grid rendering
 */
import { normalizeTags } from '../utils/tags.js';
import { addMagneticThumbEffect } from '../utils/magnetic.js';

export class Grid {
  constructor(state, dom) {
    this.state = state;
    this.dom = dom;
  }

  render() {
    // Clean up previous magnetic effects
    document.querySelectorAll('.thumb').forEach(thumb => {
      if (thumb._magneticCleanup) {
        thumb._magneticCleanup();
      }
    });

    const q = this.dom.search.value ? this.dom.search.value.trim().toLowerCase() : '';
    this.dom.grid.innerHTML = '';

    const filtered = this.state.effects.filter(e => {
      const normalizedTags = normalizeTags(e);
      const qHit = !q || [e.name, e.type, normalizedTags.join(' ')].toLowerCase().includes(q);
      const tagHit = this.state.activeFilter.size === 0 || [...this.state.activeFilter].every(tag =>
        normalizedTags.includes(tag.toLowerCase())
      );
      return qHit && tagHit;
    }).sort((a, b) => a.name.localeCompare(b.name));

    for (const e of filtered) {
      const normalizedTags = normalizeTags(e);
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <div class="thumb"></div>
        <div class="body">
          <h3>${e.name}</h3>
          <div class="badges">
            <span class="badge">${e.type}</span>
            ${normalizedTags.slice(0, 3).map(t => `<span class="badge">#${t}</span>`).join('') || ''}
          </div>
          <div class="actions">
            <button class="btn" data-id="${e.id}">Run</button>
            <span class="badge">${e.perf || ''}</span>
          </div>
        </div>`;

      addMagneticThumbEffect(card);

      card.addEventListener('click', (ev) => {
        if (!ev.target.closest('button')) {
          this.state.setActiveEffect(e);
          this.state.notify('openDemo', e);
        }
      });

      card.tabIndex = 0;
      card.addEventListener('keydown', (ev) => {
        if ((ev.key === 'Enter' || ev.key === ' ') && !ev.target.closest('button')) {
          ev.preventDefault();
          this.state.setActiveEffect(e);
          this.state.notify('openDemo', e);
        }
      });

      this.dom.grid.appendChild(card);
    }

    if (filtered.length === 0) {
      const empty = document.createElement('div');
      empty.style.cssText = 'grid-column:1/-1; color:#9aa1ad; padding:24px';
      empty.textContent = 'No matches. Try a different search term.';
      this.dom.grid.appendChild(empty);
    }
  }
}

