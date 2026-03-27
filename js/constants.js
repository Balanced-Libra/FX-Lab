// Master list of all possible tags for categorization and search
const TAGS_MASTER = [
    // Tech
    "css","svg","canvas","webgl","audio","worker",
    // Pattern
    "layout","scroll","nav","forms","table","loader","chart","dataviz","media",
    // Interaction
    "drag","keyboard","pointer","toggle",
    // Visual
    "particles","3d","shader","filter","mask","typography","animation","color",
    // A11y/Perf
    "a11y","reduced-motion","performance","heavy",
    // Vibe
    "calming","energetic","minimal","bold","playful","dramatic"
  ];

  // Aliases to map common search terms to canonical tags
  const TAG_ALIASES = {
    navigation: 'nav',
    'micro-interaction': 'animation',
    'micro-interactions': 'animation',
    filters: 'filter',
    'audio-reactive': 'audio',
    '3D': '3d',
    // Vibe aliases — natural language search
    calm: 'calming',
    relaxing: 'calming',
    soothing: 'calming',
    chill: 'calming',
    exciting: 'energetic',
    fast: 'energetic',
    lively: 'energetic',
    active: 'energetic',
    simple: 'minimal',
    clean: 'minimal',
    elegant: 'minimal',
    'eye-catching': 'bold',
    striking: 'bold',
    intense: 'bold',
    fun: 'playful',
    interactive: 'playful',
    whimsical: 'playful',
    dark: 'dramatic',
    moody: 'dramatic',
    cinematic: 'dramatic'
  };