// primitives.jsx — CityPulse shared components (PostCard, CategoryChip, TabBar, etc.)

const CatDot = ({ cat, size = 8 }) => {
  const c = window.CP_TOKENS.categories.find(x => x.key === cat);
  if (!c) return null;
  return <span style={{
    display: 'inline-block', width: size, height: size, borderRadius: '50%',
    background: `oklch(62% 0.15 ${c.hue})`, flexShrink: 0,
  }}/>;
};

const CatChip = ({ cat, active, onClick, dir, showIcon = true }) => {
  const c = window.CP_TOKENS.categories.find(x => x.key === cat);
  if (!c) return null;
  const color = `oklch(58% 0.14 ${c.hue})`;
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '7px 12px', borderRadius: 999,
      background: active ? color : dir.surface,
      color: active ? '#fff' : dir.ink,
      border: `1px solid ${active ? color : dir.border}`,
      fontFamily: dir.font || window.CP_TOKENS.font.sans, fontSize: 13, fontWeight: 500,
      cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .15s',
    }}>
      {showIcon && <CatDot cat={cat} size={7}/>}
      {c.label}
    </button>
  );
};

const Avatar = ({ initials, hue = 40, size = 36 }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%',
    background: `oklch(88% 0.04 ${hue})`,
    color: `oklch(35% 0.08 ${hue})`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: window.CP_TOKENS.font.sans, fontWeight: 600, fontSize: size * 0.36,
    flexShrink: 0, letterSpacing: -0.2,
  }}>{initials}</div>
);

const ImagePlaceholder = ({ label, height = 200, dir, hue = 40 }) => (
  <div style={{
    width: '100%', height, borderRadius: 12, overflow: 'hidden',
    background: `repeating-linear-gradient(135deg, oklch(94% 0.02 ${hue}), oklch(94% 0.02 ${hue}) 8px, oklch(96% 0.015 ${hue}) 8px, oklch(96% 0.015 ${hue}) 16px)`,
    display: 'flex', alignItems: 'flex-end', padding: 10,
    fontFamily: window.CP_TOKENS.font.mono, fontSize: 10,
    color: 'oklch(45% 0.05 ' + hue + ')', letterSpacing: 0.3,
  }}>
    {label}
  </div>
);

// ── Post card ─────────────────────────────────────────────────
const PostCard = ({ post, dir, density = 'comfy', cardStyle = 'flat', onClick }) => {
  const cat = window.CP_TOKENS.categories.find(x => x.key === post.cat);
  const catColor = `oklch(58% 0.14 ${cat?.hue || 40})`;
  const pad = density === 'compact' ? 14 : density === 'spacious' ? 22 : 18;
  const isAlert = post.cat === 'alert';

  const shell = {
    flat:    { background: dir.surface, border: `1px solid ${dir.borderSoft}` , boxShadow: 'none' },
    shadow:  { background: dir.surface, border: `1px solid transparent`, boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 6px 20px rgba(0,0,0,0.04)' },
    bordered:{ background: dir.surface, border: `1px solid ${dir.border}`, boxShadow: 'none' },
  }[cardStyle];

  return (
    <article onClick={onClick} style={{
      ...shell,
      borderRadius: 16, overflow: 'hidden',
      position: 'relative', cursor: 'pointer',
      ...(post.verified ? { outline: `1.5px solid oklch(78% 0.13 85)`, outlineOffset: -1 } : {}),
    }}>
      {isAlert && <div style={{ height: 3, background: dir.alertInk }}/>}
      <div style={{ padding: pad }}>
        {/* header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: density === 'compact' ? 10 : 12 }}>
          <Avatar initials={post.initials} hue={cat?.hue || 40} size={34}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: dir.ink, letterSpacing: -0.1 }}>
              {post.user}
              {post.verified && <span style={{
                fontSize: 10, padding: '1px 6px', borderRadius: 4,
                background: 'oklch(92% 0.06 85)', color: 'oklch(38% 0.08 85)',
                fontWeight: 600, letterSpacing: 0.3, textTransform: 'uppercase',
              }}>Verified</span>}
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontFamily: window.CP_TOKENS.font.mono, fontSize: 11,
              color: dir.inkMute, letterSpacing: 0.1, marginTop: 2,
            }}>
              <span>{post.loc}</span>
              <span style={{ opacity: 0.5 }}>·</span>
              <span>{post.time}</span>
            </div>
          </div>
          <CatDot cat={post.cat} size={9}/>
        </div>

        {/* title */}
        <h3 style={{
          margin: 0, fontFamily: dir.displayFont || window.CP_TOKENS.font.display,
          fontSize: density === 'compact' ? 16 : 18, fontWeight: 600,
          lineHeight: 1.25, letterSpacing: -0.3, color: dir.ink,
          textWrap: 'pretty',
        }}>{post.title}</h3>

        {/* body */}
        {post.body && density !== 'compact' && (
          <p style={{
            margin: '8px 0 0', fontSize: 14.5, lineHeight: 1.5,
            color: dir.inkSub, textWrap: 'pretty',
          }}>{post.body}</p>
        )}

        {/* image */}
        {post.img && (
          <div style={{ marginTop: 14 }}>
            <ImagePlaceholder label={post.imgLabel} height={density === 'compact' ? 140 : 200} dir={dir} hue={cat?.hue || 40}/>
          </div>
        )}

        {/* footer */}
        <div style={{
          marginTop: 14, display: 'flex', alignItems: 'center', gap: 18,
          fontFamily: window.CP_TOKENS.font.mono, fontSize: 12, color: dir.inkSub,
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <CPIcon glyph="arrowup" size={15}/>{post.votes}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <CPIcon glyph="comment" size={15}/>{post.comments}
          </span>
          {post.confirmations > 0 && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: dir.accentInk }}>
              <CPIcon glyph="check" size={15}/>{post.confirmations} confirmed
            </span>
          )}
          <span style={{ marginLeft: 'auto', color: dir.inkMute }}>{cat?.label}</span>
        </div>
      </div>
    </article>
  );
};

// ── Tab bar (unified report button — uses configurable glyph) ─
const TabBar = ({ active, onTab, dir, onReport, reportGlyph = 'pinplus' }) => {
  const tabs = [
    { key: 'home',    label: 'Around',  glyph: 'around' },
    { key: 'explore', label: 'Explore', glyph: 'compass' },
    { key: 'report',  label: 'Post',    glyph: reportGlyph, center: true },
    { key: 'places',  label: 'Places',  glyph: 'places' },
    { key: 'you',     label: 'You',     glyph: 'user' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 22, left: 14, right: 14, zIndex: 30,
      height: 64, borderRadius: 999,
      background: 'oklch(100% 0 0 / 0.72)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: `1px solid oklch(100% 0 0 / 0.8)`,
      boxShadow: '0 10px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
    }}>
      {tabs.map(t => {
        const isActive = active === t.key;
        if (t.center) {
          return (
            <button key={t.key} onClick={() => { onTab(t.key); onReport && onReport(); }} style={{
              width: 54, height: 54, borderRadius: '50%',
              background: dir.accent, border: '2.5px solid #fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 6px 18px oklch(from ${dir.accent} l c h / 0.45)`,
              cursor: 'pointer', transform: 'translateY(-14px)',
            }}>
              <CPIcon glyph={reportGlyph} size={24} color="#fff" strokeWidth={2.1}/>
            </button>
          );
        }
        return (
          <button key={t.key} onClick={() => onTab(t.key)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: isActive ? dir.ink : dir.inkMute, padding: '4px 10px',
            fontFamily: dir.font || window.CP_TOKENS.font.sans,
          }}>
            <CPIcon glyph={t.glyph} size={22} strokeWidth={isActive ? 2.1 : 1.6}/>
            <span style={{ fontSize: 10, fontWeight: isActive ? 600 : 500, letterSpacing: 0.1 }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
};

// ── Report sheet replaced by direct compose. Kept as no-op export.
const ReportSheet = () => null;

Object.assign(window, { CatDot, CatChip, Avatar, ImagePlaceholder, PostCard, TabBar, ReportSheet });
