// compose-variants-2.jsx — More compose flows + audience scope feature.
// Addresses: (1) easy editing of speech-recognized Georgian/mixed text,
// (2) choose audience scope (this neighborhood · this city · follower places).

// Pull shared helpers from compose-variants.jsx off window (babel scripts don't share scope)
const { CV_HP, ComposeTopBar, CatDot, CPIcon: _CPIcon } = window;
// CPIcon is already global via icons.jsx, but alias in case

// ──────────────────────────────────────────────────────────────
// Reusable: audience scope selector — three levels of reach.
// Shows which neighborhoods/city/followers will see the post.
// ──────────────────────────────────────────────────────────────
const AudiencePill = ({ dir, scope = 'neighborhood', expanded = false }) => {
  const scopes = {
    neighborhood: { label: 'Vake only',       sub: '~12k people',    icon: 'pin',      ring: 0 },
    city:         { label: 'All of Tbilisi',  sub: '~1.2M people',   icon: 'around',   ring: 1 },
    followers:    { label: 'Anyone following Vake', sub: '~4.8k follow this neighborhood', icon: 'user', ring: 2 },
  };
  const s = scopes[scope];
  return (
    <button style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '8px 14px 8px 10px', borderRadius: 999,
      background: dir.surface, border: `1px solid ${dir.border}`,
      cursor: 'pointer', fontFamily: dir.font || window.CP_TOKENS.font.sans,
    }}>
      {/* radar-like scope glyph — dot with N rings */}
      <span style={{
        width: 24, height: 24, position: 'relative', flexShrink: 0,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: dir.accent, position: 'absolute' }}/>
        {[0, 1, 2].slice(0, s.ring + 1).map(r => (
          <span key={r} style={{
            position: 'absolute',
            width: 10 + r * 7, height: 10 + r * 7,
            borderRadius: '50%', border: `1px solid ${dir.accent}`, opacity: 0.9 - r * 0.25,
          }}/>
        ))}
      </span>
      <span style={{ fontSize: 13, fontWeight: 600, color: dir.ink, letterSpacing: -0.1 }}>{s.label}</span>
      <span style={{
        fontFamily: window.CP_TOKENS.font.mono, fontSize: 10.5,
        color: dir.inkMute, letterSpacing: 0.3,
      }}>· {s.sub}</span>
      <CPIcon glyph="chevrondown" size={12} color={dir.inkMute}/>
    </button>
  );
};

// Bigger audience picker sheet — shown when user taps the pill
const AudienceSheet = ({ dir, current = 'neighborhood' }) => {
  const rows = [
    {
      key: 'neighborhood',
      title: 'Vake only',
      sub: 'People here right now or who follow Vake',
      detail: '~12,000 people · closest match for local alerts, lost items, small events',
      rings: 1,
      recommended: 'Tip · Alert · Lost & found · Local event',
    },
    {
      key: 'city',
      title: 'All of Tbilisi',
      sub: 'Everyone in the city sees it',
      detail: '~1.2M people · use sparingly — for protests, citywide alerts, big news',
      rings: 3,
      recommended: 'Protest · Traffic on main roads · Citywide alert',
    },
    {
      key: 'followers',
      title: 'Followers of Vake',
      sub: 'People who follow this neighborhood, wherever they are',
      detail: '~4,800 follow Vake · good for neighborhood news with diaspora reach',
      rings: 2,
      recommended: 'Business news · Construction · Changes in the area',
    },
  ];
  return (
    <div style={{ padding: '10px 12px' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '6px 4px 14px',
      }}>
        <div style={{
          fontFamily: dir.displayFont || window.CP_TOKENS.font.display,
          fontSize: 19, fontWeight: 600, color: dir.ink, letterSpacing: -0.3,
        }}>Who should see this?</div>
        <div style={{ flex: 1 }}/>
        <div style={{
          fontFamily: window.CP_TOKENS.font.mono, fontSize: 10,
          color: dir.inkMute, letterSpacing: 0.5,
        }}>AUDIENCE</div>
      </div>
      {rows.map(r => (
        <div key={r.key} style={{
          display: 'flex', alignItems: 'flex-start', gap: 12,
          padding: 14, borderRadius: 14, marginBottom: 8,
          background: r.key === current ? dir.accentSoft : dir.surface,
          border: `1.5px solid ${r.key === current ? 'oklch(from ' + dir.accent + ' l c h / 0.3)' : dir.borderSoft}`,
          cursor: 'pointer',
        }}>
          {/* rings glyph scaled by scope */}
          <div style={{
            width: 44, height: 44, position: 'relative', flexShrink: 0,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: dir.accent, position: 'absolute' }}/>
            {[...Array(r.rings)].map((_, i) => (
              <span key={i} style={{
                position: 'absolute',
                width: 14 + i * 10, height: 14 + i * 10,
                borderRadius: '50%', border: `1px solid ${dir.accent}`, opacity: 0.85 - i * 0.2,
              }}/>
            ))}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <div style={{
                fontSize: 15, fontWeight: 600, color: dir.ink, letterSpacing: -0.2,
              }}>{r.title}</div>
              {r.key === current && (
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '2px 7px', borderRadius: 999,
                  background: dir.accent, color: '#fff',
                  fontFamily: window.CP_TOKENS.font.mono, fontSize: 9.5, fontWeight: 600, letterSpacing: 0.5,
                }}>SELECTED</div>
              )}
            </div>
            <div style={{ fontSize: 13, color: dir.inkSub, marginTop: 2, lineHeight: 1.4 }}>
              {r.sub}
            </div>
            <div style={{
              fontFamily: window.CP_TOKENS.font.mono, fontSize: 10.5,
              color: dir.inkMute, marginTop: 6, lineHeight: 1.45,
            }}>{r.detail}</div>
            <div style={{
              marginTop: 6, fontSize: 11, color: dir.accentInk,
            }}>Best for: {r.recommended}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ──────────────────────────────────────────────────────────────
// FLOW D — Georgian-first editing
// Shows how transcription errors are surfaced visually (wavy underlines)
// and how users can tap any word to correct it, pick from alternatives,
// or hold to re-speak that word/phrase.
// ──────────────────────────────────────────────────────────────

// Word with optional uncertainty state
const Word = ({ text, uncertain, picked, wrong, dir, last }) => {
  const style = {
    color: dir.ink,
    marginRight: last ? 0 : 4,
    position: 'relative',
    display: 'inline-block',
    cursor: uncertain || wrong ? 'pointer' : 'text',
  };
  if (wrong) style.background = 'oklch(88% 0.12 28)';
  if (uncertain) {
    style.textDecoration = 'underline wavy';
    style.textDecorationColor = 'oklch(70% 0.15 55)';
    style.textDecorationThickness = 1.5;
    style.textUnderlineOffset = 4;
  }
  if (picked) {
    style.background = dir.accentSoft;
    style.padding = '0 3px';
    style.borderRadius = 3;
  }
  return <span style={style}>{text}</span>;
};

const FlowD_GeorgianEdit = ({ dir, activeLoc }) => (
  <div style={{ background: dir.base, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
    <ComposeTopBar dir={dir} activeLoc={activeLoc} onClose={()=>{}} postLabel="Post"/>

    <div style={{ padding: '8px 20px 4px' }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '4px 10px', borderRadius: 999, background: dir.accentSoft,
        fontFamily: window.CP_TOKENS.font.mono, fontSize: 10.5, color: dir.accentInk,
        letterSpacing: 0.5, fontWeight: 600,
      }}>
        <CPIcon glyph="mic" size={10} color={dir.accentInk}/>
        ქართული · 3 words to check
      </div>
    </div>

    <div style={{ padding: '10px 20px', flex: 1 }}>
      <div style={{
        fontSize: 17, lineHeight: 1.7, color: dir.ink, letterSpacing: -0.1, textWrap: 'pretty',
      }}>
        <Word text="მარჯანიშვილის" dir={dir}/>
        <Word text="მეტროში" dir={dir}/>
        <Word text="ბარათის" dir={dir}/>
        <Word text="წამკითხავი" uncertain dir={dir}/>
        <Word text="გატეხილია," dir={dir}/>
        <Word text="მხოლოდ" dir={dir}/>
        <Word text="ნაღდი" dir={dir}/>
        <Word text="ფული." dir={dir}/>
        <Word text="რუსთავში" uncertain dir={dir}/>
        <Word text="ჯერ" dir={dir}/>
        <Word text="ბარათი" dir={dir}/>
        <Word text="მუშაობს," dir={dir}/>
        <Word text="მეგობარმა" dir={dir}/>
        <Word text="დამირეკა" dir={dir}/>
        <Word text="ახლა" dir={dir} last/>
      </div>

      {/* Correction bubble — points at "რუსთავში" */}
      <div style={{
        marginTop: 24, background: dir.surface,
        border: `1px solid ${dir.border}`,
        borderRadius: 14, padding: 14,
        boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: -7, left: 90,
          width: 14, height: 14, background: dir.surface,
          borderTop: `1px solid ${dir.border}`, borderLeft: `1px solid ${dir.border}`,
          transform: 'rotate(45deg)',
        }}/>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8,
          fontFamily: window.CP_TOKENS.font.mono, fontSize: 10,
          color: dir.inkMute, letterSpacing: 0.5, fontWeight: 600,
        }}>DID YOU MEAN</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['რუსთაველზე', 'რუსთავში', 'რუსთავი', 'რუსთავში'].map((w, i) => (
            <button key={i} style={{
              padding: '8px 12px', borderRadius: 10,
              background: i === 0 ? dir.accent : dir.surfaceAlt,
              color: i === 0 ? '#fff' : dir.ink,
              border: `1px solid ${i === 0 ? dir.accent : dir.border}`,
              fontSize: 14, fontWeight: 500, cursor: 'pointer',
            }}>{w}</button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
          <button style={{
            flex: 1, padding: '8px 0', borderRadius: 10,
            background: dir.surface, border: `1px solid ${dir.border}`,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            fontSize: 12.5, color: dir.ink, cursor: 'pointer', fontWeight: 500,
          }}>
            <CPIcon glyph="mic" size={14} color={dir.accent}/>
            Say the word again
          </button>
          <button style={{
            flex: 1, padding: '8px 0', borderRadius: 10,
            background: dir.surface, border: `1px solid ${dir.border}`,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            fontSize: 12.5, color: dir.ink, cursor: 'pointer', fontWeight: 500,
          }}>
            <CPIcon glyph="edit" size={14} color={dir.inkSub}/>
            Type it
          </button>
        </div>
      </div>
    </div>

    {/* Bottom dock */}
    <div style={{
      padding: '12px 14px 110px', display: 'flex', gap: 8, alignItems: 'center',
      borderTop: `1px solid ${dir.borderSoft}`,
    }}>
      <button style={{
        padding: '10px 14px', borderRadius: 999,
        background: dir.surface, border: `1px solid ${dir.border}`,
        fontSize: 13, color: dir.ink, cursor: 'pointer', fontWeight: 500,
        display: 'inline-flex', alignItems: 'center', gap: 6,
      }}>
        <CPIcon glyph="sparkles" size={14} color={dir.accent}/>
        Clean up all
      </button>
      <div style={{ flex: 1 }}/>
      <button style={{
        width: 44, height: 44, borderRadius: '50%',
        background: dir.accent, border: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        boxShadow: `0 4px 12px oklch(from ${dir.accent} l c h / 0.3)`,
      }}>
        <CPIcon glyph="mic" size={18} color="#fff" strokeWidth={2}/>
      </button>
    </div>
  </div>
);

// ──────────────────────────────────────────────────────────────
// FLOW E — Audience-aware post (scope picker integrated)
// Shows scope choice as an equal-primary decision alongside category.
// The "who sees this" pill is right next to the location chip in the header.
// ──────────────────────────────────────────────────────────────

const FlowE_WithScope = ({ dir, activeLoc }) => (
  <div style={{ background: dir.base, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
    {/* Top bar — close + audience pill on right (not Post yet) */}
    <div style={{
      padding: `${CV_HP}px 14px 10px`,
      display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <button style={{
        width: 36, height: 36, borderRadius: '50%',
        background: dir.surface, border: `1px solid ${dir.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      }}>
        <CPIcon glyph="close" size={16} color={dir.ink}/>
      </button>
      <div style={{ flex: 1 }}/>
      <button style={{
        background: dir.accent, color: '#fff', border: 'none',
        padding: '8px 16px', borderRadius: 999,
        fontSize: 14, fontWeight: 600, cursor: 'pointer',
      }}>Post</button>
    </div>

    {/* Audience as a prominent banner */}
    <div style={{ padding: '6px 14px 0' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 12px', borderRadius: 12,
        background: dir.accentSoft,
        border: `1px solid oklch(from ${dir.accent} l c h / 0.18)`,
      }}>
        <div style={{
          width: 28, height: 28, position: 'relative', flexShrink: 0,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: dir.accent, position: 'absolute' }}/>
          <span style={{ position: 'absolute', width: 14, height: 14, borderRadius: '50%', border: `1px solid ${dir.accent}` }}/>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: dir.ink, letterSpacing: -0.1 }}>
            Posting to <span style={{ color: dir.accentInk }}>Vake only</span>
          </div>
          <div style={{ fontFamily: window.CP_TOKENS.font.mono, fontSize: 10.5, color: dir.inkMute, marginTop: 1 }}>
            ~12k people · tap to change reach
          </div>
        </div>
        <CPIcon glyph="chevron" size={14} color={dir.inkMute}/>
      </div>
    </div>

    {/* Composer */}
    <div style={{ padding: '14px 20px 0', flex: 1 }}>
      <div style={{
        fontSize: 18, lineHeight: 1.55, color: dir.ink, letterSpacing: -0.1,
        textWrap: 'pretty', minHeight: 120,
        fontFamily: dir.font || window.CP_TOKENS.font.sans,
      }}>
        Lost grey cat near Vake park, responds to "Cheezy". Collar with my number, please call if seen.
      </div>
    </div>

    {/* Category picker with scope hints */}
    <div style={{ padding: '8px 14px 0' }}>
      <div style={{
        fontFamily: window.CP_TOKENS.font.mono, fontSize: 10,
        color: dir.inkMute, letterSpacing: 0.5, padding: '0 6px 8px',
      }}>CATEGORY · CHANGES WHO SEES IT</div>
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {[
          { k: 'paws', l: 'Lost & found', sel: true, scope: 'neighborhood' },
          { k: 'alert', l: 'Alert', scope: 'city' },
          { k: 'tip', l: 'Tip', scope: 'neighborhood' },
          { k: 'event', l: 'Event', scope: 'city' },
          { k: 'traffic', l: 'Traffic', scope: 'city' },
        ].map((c, i) => (
          <button key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '8px 12px', borderRadius: 999,
            background: c.sel ? dir.ink : dir.surface,
            color: c.sel ? dir.base : dir.ink,
            border: `1px solid ${c.sel ? dir.ink : dir.border}`,
            fontSize: 12.5, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap',
          }}>
            <CatDot cat={c.k === 'paws' ? 'paws' : c.k === 'alert' ? 'alert' : c.k === 'tip' ? 'tip' : c.k === 'event' ? 'event' : 'traffic'} size={6}/>
            {c.l}
          </button>
        ))}
      </div>
    </div>

    {/* Bottom dock — voice + attach + scope */}
    <div style={{
      padding: '14px 14px 110px', display: 'flex', gap: 8, alignItems: 'center',
    }}>
      <button style={{
        width: 44, height: 44, borderRadius: 14,
        background: dir.surface, border: `1px solid ${dir.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      }}>
        <CPIcon glyph="mic" size={18} color={dir.accent}/>
      </button>
      <button style={{
        width: 44, height: 44, borderRadius: 14,
        background: dir.surface, border: `1px solid ${dir.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      }}>
        <CPIcon glyph="camera" size={18} color={dir.ink}/>
      </button>
      <div style={{ flex: 1 }}/>
      <AudiencePill dir={dir} scope="neighborhood"/>
    </div>
  </div>
);

// Expanded audience sheet screen
const FlowE_AudienceSheet = ({ dir, activeLoc }) => (
  <div style={{ background: dir.base, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
    <div style={{
      padding: `${CV_HP}px 14px 10px`,
      display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <button style={{
        width: 36, height: 36, borderRadius: '50%',
        background: dir.surface, border: `1px solid ${dir.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      }}>
        <CPIcon glyph="close" size={16} color={dir.ink}/>
      </button>
      <div style={{
        fontFamily: dir.displayFont || window.CP_TOKENS.font.display,
        fontSize: 17, fontWeight: 600, color: dir.ink, letterSpacing: -0.2, marginLeft: 4,
      }}>Who sees this?</div>
    </div>
    <AudienceSheet dir={dir} current="neighborhood"/>
    <div style={{
      padding: '12px 14px 110px', marginTop: 'auto',
      display: 'flex', gap: 8, alignItems: 'center',
      borderTop: `1px solid ${dir.borderSoft}`,
    }}>
      <div style={{ flex: 1, fontSize: 12, color: dir.inkMute, lineHeight: 1.4 }}>
        You can always change reach before posting.
      </div>
      <button style={{
        padding: '10px 18px', borderRadius: 999,
        background: dir.accent, color: '#fff', border: 'none',
        fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
      }}>Done</button>
    </div>
  </div>
);

// ──────────────────────────────────────────────────────────────
// FLOW F — Quick-draft mode (speak now, decide later)
// For when you want to just get a thought out fast. Single voice bubble,
// optional "save as draft" without posting. Great for on-the-go.
// ──────────────────────────────────────────────────────────────

const FlowF_QuickDraft = ({ dir, activeLoc }) => (
  <div style={{ background: dir.base, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
    <ComposeTopBar dir={dir} activeLoc={activeLoc} onClose={()=>{}} postLabel="Post"/>

    {/* Draft header — subtle "you're in draft mode" */}
    <div style={{ padding: '6px 20px 0', display: 'flex', gap: 8, alignItems: 'center' }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '4px 10px', borderRadius: 999, background: dir.surfaceAlt,
        fontFamily: window.CP_TOKENS.font.mono, fontSize: 10.5, color: dir.inkMute,
        letterSpacing: 0.5, fontWeight: 500,
      }}>
        DRAFT · auto-saves
      </div>
    </div>

    <div style={{ padding: '12px 20px', flex: 1 }}>
      <div style={{
        fontSize: 17, lineHeight: 1.55, color: dir.ink, letterSpacing: -0.1,
        textWrap: 'pretty', fontFamily: dir.font || window.CP_TOKENS.font.sans,
      }}>
        There's a power outage on Abashidze street, just called the company and they said it will be fixed in about an hour.
      </div>
    </div>

    {/* Inline voice chips — "keep talking" buttons that glue to the thought */}
    <div style={{ padding: '0 14px 4px' }}>
      <div style={{
        fontFamily: window.CP_TOKENS.font.mono, fontSize: 10,
        color: dir.inkMute, letterSpacing: 0.5, padding: '0 6px 6px',
      }}>ADD TO IT</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {[
          { g: 'mic', l: 'Speak more', primary: true },
          { g: 'edit', l: 'Edit text' },
          { g: 'camera', l: 'Add photo' },
          { g: 'pin', l: 'Exact spot' },
        ].map((b, i) => (
          <button key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '9px 14px', borderRadius: 12,
            background: b.primary ? dir.accent : dir.surface,
            color: b.primary ? '#fff' : dir.ink,
            border: `1px solid ${b.primary ? dir.accent : dir.border}`,
            fontSize: 13, fontWeight: b.primary ? 600 : 500, cursor: 'pointer',
          }}>
            <CPIcon glyph={b.g} size={14} color={b.primary ? '#fff' : dir.inkSub}/>
            {b.l}
          </button>
        ))}
      </div>
    </div>

    {/* Bottom — scope + category */}
    <div style={{
      padding: '12px 14px 110px', display: 'flex', flexDirection: 'column', gap: 8,
      borderTop: `1px solid ${dir.borderSoft}`,
    }}>
      <div style={{ display: 'flex', gap: 6 }}>
        <AudiencePill dir={dir} scope="neighborhood"/>
      </div>
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {[
          { k: 'alert', l: 'Alert', sel: true },
          { k: 'tip', l: 'Tip' },
          { k: 'traffic', l: 'Utilities' },
        ].map((c, i) => (
          <div key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '6px 10px', borderRadius: 999,
            background: c.sel ? dir.ink : dir.surface,
            color: c.sel ? dir.base : dir.ink,
            border: `1px solid ${c.sel ? dir.ink : dir.border}`,
            fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap',
          }}>
            <CatDot cat={c.k} size={6}/>{c.l}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ──────────────────────────────────────────────────────────────
// FLOW G — "Thinking out loud" — punt on refinement
// Raw recording shown as an orange-tinted transcript with acceptance
// prompt below. Voice note option stays embedded in post, too.
// ──────────────────────────────────────────────────────────────

const FlowG_Review = ({ dir, activeLoc }) => (
  <div style={{ background: dir.base, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
    <ComposeTopBar dir={dir} activeLoc={activeLoc} onClose={()=>{}} postLabel="Post"/>

    {/* Voice note card — optional embed */}
    <div style={{ padding: '8px 14px 0' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: 12, borderRadius: 14,
        background: dir.surface, border: `1px solid ${dir.border}`,
      }}>
        <button style={{
          width: 38, height: 38, borderRadius: '50%',
          background: dir.accent, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <CPIcon glyph="play" size={14} color="#fff"/>
        </button>
        <div style={{ flex: 1 }}>
          {/* mini waveform */}
          <div style={{ display: 'flex', gap: 2, alignItems: 'center', height: 22 }}>
            {[8,14,20,12,18,8,16,22,10,14,8,18,12,20,16,10,14,8,18,12,20,14,8,16].map((h,i) => (
              <div key={i} style={{ width: 2, height: h, borderRadius: 1, background: dir.accent, opacity: 0.8 }}/>
            ))}
          </div>
          <div style={{ fontFamily: window.CP_TOKENS.font.mono, fontSize: 10, color: dir.inkMute, letterSpacing: 0.3, marginTop: 4 }}>
            0:22 · attach to post
          </div>
        </div>
        <div style={{
          width: 36, height: 22, borderRadius: 999, background: dir.accent, position: 'relative',
          cursor: 'pointer', flexShrink: 0,
        }}>
          <div style={{
            position: 'absolute', top: 2, left: 16,
            width: 18, height: 18, borderRadius: '50%', background: '#fff',
            boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
          }}/>
        </div>
      </div>
    </div>

    {/* Transcript — filling */}
    <div style={{ padding: '14px 20px 0', flex: 1 }}>
      <div style={{
        fontSize: 16.5, lineHeight: 1.55, color: dir.ink, letterSpacing: -0.1, textWrap: 'pretty',
      }}>
        I just heard that the road near the school will be closed tomorrow morning for some kind of repair work. Not sure about the time but probably early. Maybe someone from the school can confirm.
      </div>
      <div style={{
        marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '4px 10px', borderRadius: 999, background: dir.accentSoft,
        fontFamily: window.CP_TOKENS.font.mono, fontSize: 10.5,
        color: dir.accentInk, letterSpacing: 0.5, fontWeight: 600,
      }}>
        <CPIcon glyph="mic" size={10} color={dir.accentInk}/>
        transcribed · edit anytime
      </div>
    </div>

    {/* Scope + category */}
    <div style={{
      padding: '12px 14px 110px', display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <div style={{ display: 'flex', gap: 6 }}>
        <AudiencePill dir={dir} scope="neighborhood"/>
      </div>
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {[
          { k: 'question', l: 'Question', sel: true },
          { k: 'traffic', l: 'Traffic' },
          { k: 'tip', l: 'Tip' },
        ].map((c, i) => (
          <div key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '6px 10px', borderRadius: 999,
            background: c.sel ? dir.ink : dir.surface,
            color: c.sel ? dir.base : dir.ink,
            border: `1px solid ${c.sel ? dir.ink : dir.border}`,
            fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap',
          }}>
            <CatDot cat={c.k} size={6}/>{c.l}
          </div>
        ))}
      </div>
    </div>
  </div>
);

Object.assign(window, {
  AudiencePill, AudienceSheet,
  FlowD_GeorgianEdit, FlowE_WithScope, FlowE_AudienceSheet, FlowF_QuickDraft, FlowG_Review,
});
