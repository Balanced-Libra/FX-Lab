/**
 * Tag Utilities
 * Helper functions for working with tags
 */
/**
 * Determines technology tag from effect type
 */
function techFromType(type = '') {
  const t = type.toLowerCase();
  if (t.includes('webgl')) return 'webgl';
  if (t.includes('svg')) return 'svg';
  if (t.includes('canvas')) return 'canvas';
  if (t.includes('audio')) return 'audio';
  if (t.includes('worker')) return 'worker';
  if (t.includes('css')) return 'css';
  return null;
}

/**
 * Normalizes and de-duplicates tags for an effect
 */
function normalizeTags(effect) {
  const raw = Array.isArray(effect.tags) ? effect.tags : [];
  const tech = techFromType(effect.type);
  const mapped = raw.map(t => (window.TAG_ALIASES && window.TAG_ALIASES[t]) || t);
  return [...new Set(tech ? [tech, ...mapped] : mapped)];
}

window.techFromType = techFromType;
window.normalizeTags = normalizeTags;

