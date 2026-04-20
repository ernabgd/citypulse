// map.jsx — CityPulse stylized SVG "map" (fake Tbilisi). Warm/cool/muted/colorful palettes.
// Not a real map — a stylized placeholder with a river, blocks, parks, roads, and pins.

const CPMap = ({ palette = 'warm', pins = [], activePin = null, onPinClick, style = {}, zoom = 1, blur = false }) => {
  const T = window.CP_TOKENS.mapPalettes[palette];
  const pinFor = (cat) => {
    const c = window.CP_TOKENS.categories.find(x => x.key === cat);
    return c ? `oklch(62% 0.15 ${c.hue})` : 'oklch(50% 0.1 40)';
  };

  return (
    <svg width="100%" height="100%" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice"
         style={{ display: 'block', ...style, filter: blur ? 'blur(1.5px)' : 'none' }}>
      <defs>
        <pattern id={`grid-${palette}`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke={T.roadStroke} strokeWidth="0.3" opacity="0.5"/>
        </pattern>
      </defs>

      {/* land */}
      <rect x="0" y="0" width="400" height="600" fill={T.land}/>
      <rect x="0" y="0" width="400" height="600" fill={`url(#grid-${palette})`}/>

      {/* river (Mtkvari) — curves diagonally */}
      <path d="M-20 180 C 80 220, 120 320, 180 360 S 320 480, 420 520 L 420 600 L -20 600 Z"
            fill={T.water} opacity="0.7"/>
      <path d="M-20 180 C 80 220, 120 320, 180 360 S 320 480, 420 520"
            fill="none" stroke={T.water} strokeWidth="32" strokeLinecap="round" opacity="0.9"/>

      {/* parks — Vake Park, Mtatsminda */}
      <ellipse cx="140" cy="240" rx="60" ry="42" fill={T.park} opacity="0.85"/>
      <ellipse cx="300" cy="380" rx="50" ry="38" fill={T.park} opacity="0.75"/>
      <ellipse cx="90" cy="480" rx="40" ry="30" fill={T.park} opacity="0.7"/>

      {/* roads — major avenues */}
      {[
        { d: 'M 0 120 L 400 180', w: 4 },
        { d: 'M 0 280 L 400 320', w: 5 },
        { d: 'M 50 0 L 150 600', w: 4 },
        { d: 'M 260 0 L 320 600', w: 3.5 },
        { d: 'M 0 440 L 400 460', w: 3 },
        { d: 'M 180 0 L 220 280', w: 2.5 },
      ].map((r, i) => (
        <g key={i}>
          <path d={r.d} stroke={T.roadStroke} strokeWidth={r.w + 1} fill="none" strokeLinecap="round"/>
          <path d={r.d} stroke={T.road} strokeWidth={r.w} fill="none" strokeLinecap="round"/>
        </g>
      ))}

      {/* minor streets */}
      {Array.from({ length: 18 }).map((_, i) => {
        const y = 30 + i * 33;
        return <path key={`h${i}`} d={`M 0 ${y} L 400 ${y + (i%3)*4}`} stroke={T.roadStroke} strokeWidth="0.8" fill="none" opacity="0.45"/>;
      })}
      {Array.from({ length: 12 }).map((_, i) => {
        const x = 20 + i * 35;
        return <path key={`v${i}`} d={`M ${x} 0 L ${x + (i%3)*6} 600`} stroke={T.roadStroke} strokeWidth="0.8" fill="none" opacity="0.45"/>;
      })}

      {/* neighborhood labels (subtle) */}
      <text x="140" y="180" fontSize="9" fontFamily="Inter, sans-serif" fontWeight="600" letterSpacing="2" fill={T.label} opacity="0.55" textAnchor="middle">VAKE</text>
      <text x="90" y="420" fontSize="9" fontFamily="Inter, sans-serif" fontWeight="600" letterSpacing="2" fill={T.label} opacity="0.5" textAnchor="middle">SABURTALO</text>
      <text x="300" y="200" fontSize="9" fontFamily="Inter, sans-serif" fontWeight="600" letterSpacing="2" fill={T.label} opacity="0.5" textAnchor="middle">OLD TOWN</text>
      <text x="250" y="480" fontSize="9" fontFamily="Inter, sans-serif" fontWeight="600" letterSpacing="2" fill={T.label} opacity="0.5" textAnchor="middle">ISANI</text>

      {/* you-are-here ring */}
      <circle cx="200" cy="300" r="30" fill="oklch(62% 0.14 42)" opacity="0.08"/>
      <circle cx="200" cy="300" r="16" fill="oklch(62% 0.14 42)" opacity="0.18"/>
      <circle cx="200" cy="300" r="6" fill="#fff" stroke="oklch(62% 0.14 42)" strokeWidth="2.5"/>

      {/* pins */}
      {pins.map(pin => {
        const x = pin.pin.x * 400, y = pin.pin.y * 600;
        const color = pinFor(pin.cat);
        const active = activePin === pin.id;
        return (
          <g key={pin.id} onClick={() => onPinClick && onPinClick(pin)} style={{ cursor: 'pointer' }}>
            {active && <circle cx={x} cy={y} r="20" fill={color} opacity="0.15"/>}
            <circle cx={x} cy={y + 2} rx="7" ry="2" fill="#000" opacity="0.18"/>
            <circle cx={x} cy={y} r={active ? 10 : 7} fill="#fff" stroke={color} strokeWidth={active ? 3 : 2.2}/>
            <circle cx={x} cy={y} r={active ? 4 : 3} fill={color}/>
          </g>
        );
      })}
    </svg>
  );
};

window.CPMap = CPMap;
