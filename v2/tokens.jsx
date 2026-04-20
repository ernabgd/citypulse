// tokens.jsx — CityPulse design system tokens
// Three visual directions (A/B/C). Each defines: accent, base, surface, ink, map style.
// Tokens are pure values; components consume them via the active direction object.

const CP_TOKENS = {
  // ── Visual directions ──────────────────────────────────────────
  directions: {
    A: {
      name: 'Clay',
      subtitle: 'Evolved orange · warm paper · editorial',
      accent:      'oklch(62% 0.14 42)',        // terracotta
      accentSoft:  'oklch(92% 0.04 42)',
      accentInk:   'oklch(35% 0.08 42)',
      base:        'oklch(98.5% 0.008 80)',     // warm off-white
      surface:     'oklch(100% 0 0)',
      surfaceAlt:  'oklch(96% 0.008 80)',
      ink:         'oklch(18% 0.01 80)',
      inkSub:      'oklch(42% 0.01 80)',
      inkMute:     'oklch(62% 0.01 80)',
      border:      'oklch(91% 0.008 80)',
      borderSoft:  'oklch(94% 0.006 80)',
      alertInk:    'oklch(48% 0.16 28)',
      mapTone:     'warm',                      // light warm map
      bgBody:      'oklch(94% 0.008 80)',
    },
    B: {
      name: 'Civic',
      subtitle: 'Trustworthy teal · cool neutrals · calm',
      accent:      'oklch(55% 0.11 195)',       // teal
      accentSoft:  'oklch(93% 0.03 195)',
      accentInk:   'oklch(30% 0.07 195)',
      base:        'oklch(98.5% 0.005 240)',
      surface:     'oklch(100% 0 0)',
      surfaceAlt:  'oklch(96% 0.005 240)',
      ink:         'oklch(17% 0.01 240)',
      inkSub:      'oklch(42% 0.01 240)',
      inkMute:     'oklch(62% 0.01 240)',
      border:      'oklch(91% 0.005 240)',
      borderSoft:  'oklch(94% 0.004 240)',
      alertInk:    'oklch(48% 0.16 28)',
      mapTone:     'cool',
      bgBody:      'oklch(94% 0.005 240)',
    },
    C: {
      name: 'Ink',
      subtitle: 'Near-monochrome · one hot accent · quiet',
      accent:      'oklch(58% 0.18 25)',        // red-orange
      accentSoft:  'oklch(94% 0.02 25)',
      accentInk:   'oklch(32% 0.09 25)',
      base:        'oklch(99% 0.002 60)',
      surface:     'oklch(100% 0 0)',
      surfaceAlt:  'oklch(97% 0.002 60)',
      ink:         'oklch(15% 0 0)',
      inkSub:      'oklch(40% 0 0)',
      inkMute:     'oklch(62% 0 0)',
      border:      'oklch(90% 0 0)',
      borderSoft:  'oklch(94% 0 0)',
      alertInk:    'oklch(48% 0.16 28)',
      mapTone:     'muted',
      bgBody:      'oklch(93% 0 0)',
    },
  },

  // ── Type ──────────────────────────────────────────────────────
  // Inter (body) + Inter Display via weight (headlines), JetBrains Mono for metadata.
  font: {
    sans: '"Inter", -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
    display: '"Inter Display", "Inter", -apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace',
  },
  size: {
    display: 34,
    h1: 28,
    h2: 22,
    h3: 18,
    body: 16,
    small: 14,
    micro: 12,
    meta: 11,   // monospace
  },

  // ── Category taxonomy ─────────────────────────────────────────
  // Each category: label, dot hue, icon glyph (stroked, single line-weight).
  // We avoid emoji in feed; dot color + label carries meaning.
  categories: [
    { key: 'alert',     label: 'Alert',     hue: 28,  glyph: 'alert' },
    { key: 'event',     label: 'Event',     hue: 280, glyph: 'calendar' },
    { key: 'food',      label: 'Food',      hue: 80,  glyph: 'bowl' },
    { key: 'pet',       label: 'Pet',       hue: 40,  glyph: 'paw' },
    { key: 'question',  label: 'Question',  hue: 200, glyph: 'question' },
    { key: 'tip',       label: 'Tip',       hue: 160, glyph: 'lightbulb' },
    { key: 'offers',    label: 'Deals',     hue: 330, glyph: 'tag' },
    { key: 'traffic',   label: 'Traffic',   hue: 48,  glyph: 'cone' },
    { key: 'lost',      label: 'Lost+Found',hue: 240, glyph: 'key' },
    { key: 'business',  label: 'Business',  hue: 60,  glyph: 'store' },
    { key: 'general',   label: 'General',   hue: 260, glyph: 'chat' },
    { key: 'utility',   label: 'Utility',   hue: 220, glyph: 'spark' },
  ],

  // ── Neighborhoods (Tbilisi) ───────────────────────────────────
  neighborhoods: [
    { key: 'vake',       label: 'Vake',         posts: 142, distance: '0.4 km' },
    { key: 'saburtalo',  label: 'Saburtalo',    posts: 98,  distance: '1.2 km' },
    { key: 'oldtown',    label: 'Old Town',     posts: 76,  distance: '2.1 km' },
    { key: 'vera',       label: 'Vera',         posts: 54,  distance: '0.9 km' },
    { key: 'mtatsminda', label: 'Mtatsminda',   posts: 33,  distance: '1.8 km' },
    { key: 'isani',      label: 'Isani',        posts: 41,  distance: '3.4 km' },
  ],

  // ── Map palettes (SVG gradients / polygon fills) ─────────────
  // We fake a map with layered SVG shapes — river, roads, blocks.
  mapPalettes: {
    warm: {
      land:  'oklch(97% 0.01 80)',
      park:  'oklch(92% 0.04 140)',
      water: 'oklch(88% 0.05 220)',
      road:  'oklch(99% 0.005 80)',
      roadStroke: 'oklch(88% 0.008 80)',
      label: 'oklch(55% 0.01 80)',
    },
    cool: {
      land:  'oklch(97% 0.005 240)',
      park:  'oklch(91% 0.04 150)',
      water: 'oklch(86% 0.06 220)',
      road:  'oklch(99% 0.003 240)',
      roadStroke: 'oklch(88% 0.005 240)',
      label: 'oklch(52% 0.01 240)',
    },
    muted: {
      land:  'oklch(96% 0 0)',
      park:  'oklch(90% 0.02 140)',
      water: 'oklch(84% 0.03 220)',
      road:  'oklch(99% 0 0)',
      roadStroke: 'oklch(86% 0 0)',
      label: 'oklch(50% 0 0)',
    },
    colorful: {
      land:  'oklch(97% 0.01 80)',
      park:  'oklch(85% 0.09 140)',
      water: 'oklch(80% 0.1 220)',
      road:  'oklch(100% 0 0)',
      roadStroke: 'oklch(85% 0.02 60)',
      label: 'oklch(45% 0.02 80)',
    },
  },
};

window.CP_TOKENS = CP_TOKENS;
