// Master list of all possible tags for categorization and search
const TAGS_MASTER = [
    // Tech
    "css","svg","canvas","webgl","audio","worker",
    // Pattern
    "layout","scroll","nav","forms","table","loader","chart","dataviz","media",
    // Interaction
    "drag","keyboard","pointer","toggle",
    // Visual
    "particles","3d","shader","filter","mask","typography","animation",
    // A11y/Perf
    "a11y","reduced-motion","performance","heavy"
  ];
  
  // Aliases to map common search terms to canonical tags
  const TAG_ALIASES = {
    navigation: 'nav',
    'micro-interaction': 'animation',
    'micro-interactions': 'animation',
    filters: 'filter',
    'audio-reactive': 'audio',
    '3D': '3d'
  };