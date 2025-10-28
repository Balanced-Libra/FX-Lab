// Effects Registry - This file imports and registers all effects

// Create the effects array that will be populated by the individual effect files
const EFFECTS = [];

function registerEffect(effect) {
  const key = effect.id || effect.name;
  if (EFFECTS.some(e => (e.id || e.name) === key)) {
    console.warn(`Duplicate registration skipped: ${key}`);
    return;
  }
  EFFECTS.push(effect);
  console.log(`Registered effect: ${effect.name}`);
}

// Export the effects array and register function
window.EFFECTS_REGISTRY = {
  EFFECTS,
  registerEffect
};