// icons.jsx — CityPulse icon set. Single-weight (1.6), rounded caps, 24×24 grid.
// All glyphs take { size, color, strokeWidth } props; consistent line-weight.

const CPIcon = ({ glyph, size = 20, color = 'currentColor', strokeWidth = 1.6, style = {} }) => {
  const p = { fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const S = { width: size, height: size, viewBox: '0 0 24 24', style };

  switch (glyph) {
    // category glyphs
    case 'alert':
      return <svg {...S}><path {...p} d="M12 3L2 20h20L12 3z"/><path {...p} d="M12 10v4"/><circle {...p} cx="12" cy="17" r="0.5" fill={color}/></svg>;
    case 'calendar':
      return <svg {...S}><rect {...p} x="3" y="5" width="18" height="16" rx="2"/><path {...p} d="M3 10h18M8 3v4M16 3v4"/></svg>;
    case 'bowl':
      return <svg {...S}><path {...p} d="M3 11h18a9 9 0 01-18 0z"/><path {...p} d="M7 8c0-1 1-2 2-2M12 6c0-1 1-2 2-2"/></svg>;
    case 'paw':
      return <svg {...S}><ellipse {...p} cx="12" cy="16" rx="4" ry="3.5"/><circle {...p} cx="6" cy="10" r="1.8"/><circle {...p} cx="18" cy="10" r="1.8"/><circle {...p} cx="9" cy="6" r="1.6"/><circle {...p} cx="15" cy="6" r="1.6"/></svg>;
    case 'question':
      return <svg {...S}><circle {...p} cx="12" cy="12" r="9"/><path {...p} d="M9.5 9.5a2.5 2.5 0 115 0c0 1.5-2.5 2-2.5 4"/><circle cx="12" cy="17" r="0.8" fill={color}/></svg>;
    case 'lightbulb':
      return <svg {...S}><path {...p} d="M9 18h6M10 21h4"/><path {...p} d="M12 3a6 6 0 00-4 10.5c.5.5 1 1.5 1 2.5v1h6v-1c0-1 .5-2 1-2.5A6 6 0 0012 3z"/></svg>;
    case 'tag':
      return <svg {...S}><path {...p} d="M3 13l8-8h8v8l-8 8-8-8z"/><circle cx="15" cy="9" r="1.3" fill={color}/></svg>;
    case 'cone':
      return <svg {...S}><path {...p} d="M8 20l4-14 4 14M7 15h10M6 20h12"/></svg>;
    case 'key':
      return <svg {...S}><circle {...p} cx="8" cy="12" r="4"/><path {...p} d="M11 12h10M18 12v3M21 12v4"/></svg>;
    case 'store':
      return <svg {...S}><path {...p} d="M4 9l1-4h14l1 4v1a3 3 0 01-6 0 3 3 0 01-6 0 3 3 0 01-4-1z"/><path {...p} d="M5 10v10h14V10M10 20v-5h4v5"/></svg>;
    case 'chat':
      return <svg {...S}><path {...p} d="M4 5h16v11H9l-5 4V5z"/></svg>;
    case 'spark':
      return <svg {...S}><path {...p} d="M13 2L7 13h4l-1 9 7-12h-5l1-8z" fill={color} fillOpacity="0.12"/></svg>;

    // nav + UI
    case 'compass':
      return <svg {...S}><circle {...p} cx="12" cy="12" r="9"/><path {...p} d="M15 9l-1.5 4.5L9 15l1.5-4.5L15 9z"/></svg>;
    case 'map':
      return <svg {...S}><path {...p} d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6z"/><path {...p} d="M9 4v16M15 6v16"/></svg>;
    case 'around':
      return <svg {...S}><circle {...p} cx="12" cy="12" r="9"/><circle {...p} cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1.5" fill={color}/></svg>;
    case 'plus':
      return <svg {...S}><path {...p} d="M12 5v14M5 12h14"/></svg>;
    case 'bookmark':
      return <svg {...S}><path {...p} d="M6 3h12v18l-6-4-6 4V3z"/></svg>;
    case 'user':
      return <svg {...S}><circle {...p} cx="12" cy="8" r="4"/><path {...p} d="M4 21a8 8 0 0116 0"/></svg>;
    case 'search':
      return <svg {...S}><circle {...p} cx="11" cy="11" r="7"/><path {...p} d="M21 21l-5-5"/></svg>;
    case 'arrowup':
      return <svg {...S}><path {...p} d="M12 19V5M6 11l6-6 6 6"/></svg>;
    case 'comment':
      return <svg {...S}><path {...p} d="M4 5h16v11H9l-5 4V5z"/></svg>;
    case 'share':
      return <svg {...S}><path {...p} d="M12 3v13M7 8l5-5 5 5M5 14v6h14v-6"/></svg>;
    case 'check':
      return <svg {...S}><path {...p} d="M4 12l5 5L20 6"/></svg>;
    case 'pin':
      return <svg {...S}><path {...p} d="M12 22s7-7 7-13a7 7 0 10-14 0c0 6 7 13 7 13z"/><circle {...p} cx="12" cy="9" r="2.5"/></svg>;
    case 'camera':
      return <svg {...S}><path {...p} d="M4 8h4l2-3h4l2 3h4v12H4V8z"/><circle {...p} cx="12" cy="13" r="3.5"/></svg>;
    case 'mic':
      return <svg {...S}><rect {...p} x="9" y="3" width="6" height="12" rx="3"/><path {...p} d="M5 12a7 7 0 0014 0M12 19v3"/></svg>;
    case 'bell':
      return <svg {...S}><path {...p} d="M6 9a6 6 0 0112 0c0 5 2 7 2 7H4s2-2 2-7z"/><path {...p} d="M10 19a2 2 0 004 0"/></svg>;
    case 'arrow':
      return <svg {...S}><path {...p} d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case 'close':
      return <svg {...S}><path {...p} d="M6 6l12 12M18 6L6 18"/></svg>;
    case 'chevron':
      return <svg {...S}><path {...p} d="M9 6l6 6-6 6"/></svg>;
    case 'chevronup':
      return <svg {...S}><path {...p} d="M6 15l6-6 6 6"/></svg>;
    case 'chevrondown':
      return <svg {...S}><path {...p} d="M6 9l6 6 6-6"/></svg>;
    case 'settings':
      return <svg {...S}><circle {...p} cx="12" cy="12" r="3"/><path {...p} d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></svg>;
    case 'image':
      return <svg {...S}><rect {...p} x="3" y="3" width="18" height="18" rx="2"/><circle {...p} cx="9" cy="9" r="2"/><path {...p} d="M21 15l-5-5L5 21"/></svg>;
    case 'target':
      return <svg {...S}><circle {...p} cx="12" cy="12" r="9"/><circle {...p} cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill={color}/></svg>;
    case 'layers':
      return <svg {...S}><path {...p} d="M12 3l9 5-9 5-9-5 9-5z"/><path {...p} d="M3 13l9 5 9-5M3 17l9 5 9-5"/></svg>;
    case 'flash':
      return <svg {...S}><path {...p} d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>;
    case 'sparkles':
      return <svg {...S}><path {...p} d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5zM19 14l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z"/></svg>;
    case 'pulse':
      return <svg {...S}><circle cx="12" cy="12" r="2.5" fill={color}/><path {...p} d="M7.5 7.5a6.5 6.5 0 000 9M16.5 7.5a6.5 6.5 0 010 9M4.5 4.5a10.5 10.5 0 000 15M19.5 4.5a10.5 10.5 0 010 15"/></svg>;
    case 'pinplus':
      // map pin with a + inside — "add to the city"
      return <svg {...S}><path {...p} d="M12 22s7-7 7-13a7 7 0 10-14 0c0 6 7 13 7 13z"/><path {...p} d="M12 6v6M9 9h6"/></svg>;
    case 'radar':
      // single sweeping arc — softer than concentric rings
      return <svg {...S}><circle cx="12" cy="12" r="2" fill={color}/><path {...p} d="M12 12L5.5 5.5"/><path {...p} d="M4 12a8 8 0 018-8"/></svg>;
    case 'speech':
      // speech wave — nods to voice without dogma
      return <svg {...S}><path {...p} d="M4 6h14a2 2 0 012 2v7a2 2 0 01-2 2h-8l-5 4v-4H4a2 2 0 01-2-2V8a2 2 0 012-2z"/><path {...p} d="M8 11v2M12 10v4M16 11v2"/></svg>;
    case 'plusbold':
      return <svg {...S}><path {...p} d="M12 5v14M5 12h14" strokeWidth="2.4"/></svg>;
    case 'live':
      return <svg {...S}><circle cx="12" cy="12" r="4" fill={color}/><path {...p} d="M7 7a7 7 0 000 10M17 7a7 7 0 010 10"/></svg>;
    case 'edit':
      return <svg {...S}><path {...p} d="M4 20h4l11-11-4-4L4 16v4z"/><path {...p} d="M14 6l4 4"/></svg>;
    case 'video':
      return <svg {...S}><rect {...p} x="3" y="7" width="13" height="10" rx="2"/><path {...p} d="M16 10l5-3v10l-5-3z"/></svg>;
    case 'play':
      return <svg {...S}><path {...p} d="M7 5l12 7-12 7V5z" fill={color}/></svg>;
    case 'places':
      return <svg {...S}><path {...p} d="M12 22s7-7 7-13a7 7 0 10-14 0c0 6 7 13 7 13z"/><path {...p} d="M9 10h6M9 13h4"/></svg>;
    case 'undo':
      return <svg {...S}><path {...p} d="M9 14L3 8l6-6M3 8h11a7 7 0 017 7v0a7 7 0 01-7 7H9"/></svg>;

    // ── Post-button glyph candidates (center tab bar) ─────────
    // Citizen-inspired: single arc each side of a dot (signal out from you)
    case 'signal':
      return <svg {...S}>
        <circle cx="12" cy="12" r="2.4" fill={color}/>
        <path {...p} d="M7.5 8.5a5 5 0 000 7"/>
        <path {...p} d="M16.5 8.5a5 5 0 010 7"/>
      </svg>;
    // Pin + speech dot — hyperlocal "say something here"
    case 'pinspeak':
      return <svg {...S}>
        <path {...p} d="M12 22s7-7 7-13a7 7 0 10-14 0c0 6 7 13 7 13z"/>
        <circle cx="9" cy="9" r="0.9" fill={color}/>
        <circle cx="12" cy="9" r="0.9" fill={color}/>
        <circle cx="15" cy="9" r="0.9" fill={color}/>
      </svg>;
    // Megaphone — lo-fi broadcast, friendly
    case 'megaphone':
      return <svg {...S}>
        <path {...p} d="M4 10v4l10 5V5L4 10z"/>
        <path {...p} d="M14 8a4 4 0 010 8"/>
        <path {...p} d="M7 14v4h3v-3"/>
      </svg>;
    // Quote / speech bubble with pin tail
    case 'bubblepin':
      return <svg {...S}>
        <path {...p} d="M4 6h16v10H13l-4 4-1-4H4V6z"/>
        <circle cx="12" cy="11" r="1" fill={color}/>
      </svg>;
    // Plus inside a soft square — neutral fallback
    case 'plussquare':
      return <svg {...S}>
        <rect {...p} x="3.5" y="3.5" width="17" height="17" rx="5"/>
        <path {...p} d="M12 8v8M8 12h8"/>
      </svg>;
    // Compass arrow pointing up — "send from here"
    case 'sendhere':
      return <svg {...S}>
        <circle {...p} cx="12" cy="12" r="9"/>
        <path {...p} d="M12 7l3 8-3-2-3 2 3-8z" fill={color} fillOpacity="0.15"/>
      </svg>;

    default:
      return <svg {...S}><circle {...p} cx="12" cy="12" r="8"/></svg>;
  }
};

window.CPIcon = CPIcon;
