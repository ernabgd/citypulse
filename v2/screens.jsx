// screens.jsx — Four hero screens for CityPulse: Feed, Map, Compose, Explore.
// Each screen is a function (state, dir, density, cardStyle, mapStyle) => JSX
// that fills an iOS viewport. Screen chrome (status bar, tab bar) is drawn by the frame.

const SEARCH_HEIGHT = 44;
const HEADER_PAD = 54;  // under status bar

// ── Reusable header: location switcher + trailing icons ───────
const AppHeader = ({ loc, onLoc, dir, trailing = [] }) => (
  <div style={{
    position: 'sticky', top: 0, zIndex: 20,
    background: dir.base, padding: `${HEADER_PAD}px 20px 12px`,
    borderBottom: `1px solid ${dir.borderSoft}`,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <button onClick={onLoc} style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '8px 14px', borderRadius: 999,
        background: dir.surface, border: `1px solid ${dir.border}`,
        cursor: 'pointer', flex: 1, minWidth: 0,
      }}>
        <CPIcon glyph="pin" size={16} color={dir.accent}/>
        <div style={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
          <div style={{
            fontFamily: window.CP_TOKENS.font.mono, fontSize: 10,
            color: dir.inkMute, textTransform: 'uppercase', letterSpacing: 0.8,
          }}>Around me</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: dir.ink, letterSpacing: -0.1,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{loc}</div>
        </div>
        <CPIcon glyph="chevrondown" size={16} color={dir.inkMute}/>
      </button>
      {trailing.map((t, i) => (
        <button key={i} onClick={t.onClick} style={{
          width: 40, height: 40, borderRadius: 999,
          background: dir.surface, border: `1px solid ${dir.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <CPIcon glyph={t.glyph} size={18} color={dir.ink}/>
          {t.badge && <span style={{
            position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: '50%',
            background: dir.accent, border: `2px solid ${dir.base}`,
          }}/>}
        </button>
      ))}
    </div>
  </div>
);

// ── Screen 1: FEED ────────────────────────────────────────────
const FeedScreen = ({ dir, density, cardStyle, activeCat, setActiveCat, activeLoc, openDetail }) => {
  const posts = window.CP_POSTS.filter(p => activeCat === 'all' || p.cat === activeCat);
  return (
    <div style={{ background: dir.base, minHeight: '100%' }}>
      <AppHeader
        loc={activeLoc}
        dir={dir}
        trailing={[
          { glyph: 'search' },
          { glyph: 'bell', badge: true },
        ]}
      />

      {/* Category scroller */}
      <div style={{
        position: 'sticky', top: 110, zIndex: 15,
        background: dir.base, padding: '14px 0 12px',
        borderBottom: `1px solid ${dir.borderSoft}`,
      }}>
        <div style={{
          display: 'flex', gap: 8, padding: '0 20px',
          overflowX: 'auto', scrollbarWidth: 'none',
        }}>
          <button onClick={() => setActiveCat('all')} style={{
            padding: '7px 14px', borderRadius: 999,
            background: activeCat === 'all' ? dir.ink : dir.surface,
            color: activeCat === 'all' ? dir.base : dir.ink,
            border: `1px solid ${activeCat === 'all' ? dir.ink : dir.border}`,
            fontSize: 13, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap',
          }}>All</button>
          {window.CP_TOKENS.categories.map(c => (
            <CatChip key={c.key} cat={c.key} active={activeCat === c.key}
              onClick={() => setActiveCat(c.key)} dir={dir}/>
          ))}
        </div>
      </div>

      {/* Trending strip */}
      <div style={{ padding: '16px 20px 6px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10,
        }}>
          <CPIcon glyph="flash" size={14} color={dir.accent}/>
          <div style={{
            fontFamily: window.CP_TOKENS.font.mono, fontSize: 10.5,
            color: dir.inkSub, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600,
          }}>Trending near you</div>
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', scrollbarWidth: 'none', margin: '0 -20px', padding: '0 20px' }}>
          {window.CP_TRENDING.map((t, i) => (
            <div key={i} style={{
              minWidth: 220, padding: 14, borderRadius: 14,
              background: dir.surface, border: `1px solid ${dir.borderSoft}`,
              flexShrink: 0,
            }}>
              <div style={{
                fontFamily: window.CP_TOKENS.font.mono, fontSize: 10,
                color: dir.accentInk, letterSpacing: 0.5, marginBottom: 6,
              }}>#{i + 1} · {t.loc}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: dir.ink, lineHeight: 1.35, letterSpacing: -0.1, textWrap: 'pretty' }}>
                {t.title}
              </div>
              <div style={{
                marginTop: 8, fontFamily: window.CP_TOKENS.font.mono, fontSize: 11,
                color: dir.inkMute,
              }}>↑ {t.votes} · 4h</div>
            </div>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div style={{ padding: '14px 20px 120px', display: 'flex', flexDirection: 'column', gap: density === 'compact' ? 10 : density === 'spacious' ? 18 : 14 }}>
        {posts.map(p => (
          <PostCard key={p.id} post={p} dir={dir} density={density} cardStyle={cardStyle} onClick={() => openDetail(p)}/>
        ))}
      </div>
    </div>
  );
};

// ── Screen 2: MAP ─────────────────────────────────────────────
const MapScreen = ({ dir, mapStyle, activePin, setActivePin, activeLoc, density, cardStyle }) => {
  const activePost = activePin ? window.CP_POSTS.find(p => p.id === activePin) : null;
  return (
    <div style={{ background: dir.base, minHeight: '100%', position: 'relative' }}>
      {/* Map fills the viewport behind everything */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <CPMap palette={mapStyle} pins={window.CP_POSTS} activePin={activePin}
          onPinClick={(p) => setActivePin(p.id)}/>
      </div>

      {/* Floating header (glass) */}
      <div style={{
        position: 'absolute', top: HEADER_PAD, left: 16, right: 16, zIndex: 20,
        display: 'flex', gap: 10,
      }}>
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 14px', borderRadius: 999,
          background: 'oklch(100% 0 0 / 0.78)',
          backdropFilter: 'blur(16px) saturate(160%)',
          WebkitBackdropFilter: 'blur(16px) saturate(160%)',
          border: `1px solid ${dir.border}`,
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}>
          <CPIcon glyph="search" size={16} color={dir.inkSub}/>
          <input readOnly value={`Search in ${activeLoc}`} style={{
            border: 'none', background: 'transparent', outline: 'none',
            fontSize: 14, flex: 1, color: dir.ink,
          }}/>
        </div>
        <button style={{
          width: 44, height: 44, borderRadius: '50%',
          background: 'oklch(100% 0 0 / 0.88)',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          border: `1px solid ${dir.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)', cursor: 'pointer',
        }}>
          <CPIcon glyph="layers" size={18} color={dir.ink}/>
        </button>
      </div>

      {/* Category filter pills (horizontal, floating) */}
      <div style={{
        position: 'absolute', top: HEADER_PAD + 58, left: 0, right: 0, zIndex: 18,
      }}>
        <div style={{
          display: 'flex', gap: 8, padding: '0 16px',
          overflowX: 'auto', scrollbarWidth: 'none',
        }}>
          {['alert', 'event', 'food', 'traffic', 'offers', 'tip'].map(k => (
            <div key={k} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '7px 12px', borderRadius: 999,
              background: 'oklch(100% 0 0 / 0.88)',
              backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
              border: `1px solid ${dir.border}`,
              fontSize: 12, fontWeight: 500, color: dir.ink, whiteSpace: 'nowrap',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)', flexShrink: 0,
            }}>
              <CatDot cat={k} size={7}/>
              {window.CP_TOKENS.categories.find(c => c.key === k).label}
            </div>
          ))}
        </div>
      </div>

      {/* Recenter button */}
      <button style={{
        position: 'absolute', right: 16, bottom: activePost ? 310 : 110, zIndex: 18,
        width: 44, height: 44, borderRadius: '50%',
        background: 'oklch(100% 0 0 / 0.88)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${dir.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)', cursor: 'pointer',
      }}>
        <CPIcon glyph="target" size={18} color={dir.accent}/>
      </button>

      {/* Bottom drawer — either stats or active post */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 90, zIndex: 19,
        padding: '0 14px',
      }}>
        {activePost ? (
          <div style={{
            background: dir.surface, borderRadius: 20, overflow: 'hidden',
            boxShadow: '0 6px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06)',
            border: `1px solid ${dir.borderSoft}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 0' }}>
              <div style={{ width: 36, height: 4, borderRadius: 2, background: dir.border }}/>
            </div>
            <PostCard post={activePost} dir={dir} density="compact" cardStyle="flat"/>
          </div>
        ) : (
          <div style={{
            background: dir.surface, borderRadius: 20, padding: 18,
            boxShadow: '0 6px 24px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)',
            border: `1px solid ${dir.borderSoft}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
              <div style={{ width: 36, height: 4, borderRadius: 2, background: dir.border }}/>
            </div>
            <div style={{
              fontFamily: window.CP_TOKENS.font.mono, fontSize: 10.5,
              color: dir.inkMute, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4,
            }}>Showing · {activeLoc}</div>
            <div style={{ fontSize: 20, fontFamily: window.CP_TOKENS.font.display, fontWeight: 600, color: dir.ink, letterSpacing: -0.3 }}>
              {window.CP_POSTS.length} posts nearby
            </div>
            <div style={{ display: 'flex', gap: 20, marginTop: 14, fontSize: 13, color: dir.inkSub }}>
              <div><span style={{ fontFamily: window.CP_TOKENS.font.mono, color: dir.alertInk, fontWeight: 600 }}>●</span> 1 alert</div>
              <div><span style={{ fontFamily: window.CP_TOKENS.font.mono, color: dir.accent, fontWeight: 600 }}>●</span> 3 events</div>
              <div><span style={{ fontFamily: window.CP_TOKENS.font.mono, color: dir.inkSub, fontWeight: 600 }}>●</span> 6 more</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ── Unified compose screen — voice dictates into the text field ──
// Voice and text share ONE surface. Mic streams transcript into the
// same editable field. Voice clip is never published — only the text.
// AI "Refine" runs AFTER the user asks for it, showing a side-by-side
// diff with the original preserved.
const ComposeScreen = ({ dir, closeCompose, activeLoc, mode = 'text' }) => {
  const [cat, setCat] = React.useState('tip');
  const [text, setText] = React.useState("Metro card reader at Marjanishvili is broken, cash only today. Rustaveli station still takes cards.");
  const [original, setOriginal] = React.useState(null);
  const [listening, setListening] = React.useState(false);
  const [refining, setRefining] = React.useState(false);

  if (mode === 'live') return <LiveComposeScreen dir={dir} closeCompose={closeCompose} activeLoc={activeLoc}/>;

  // Simulate refine — flip into review mode with diff.
  const onRefine = () => {
    setOriginal(text);
    setText("The metro card reader at Marjanishvili is broken — it's cash-only today. Rustaveli station still takes cards.");
    setRefining(true);
  };

  return (
    <div style={{ background: dir.base, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{
        padding: `${HEADER_PAD}px 16px 14px`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <button onClick={closeCompose} style={{
          width: 36, height: 36, borderRadius: '50%',
          background: dir.surface, border: `1px solid ${dir.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <CPIcon glyph="close" size={16} color={dir.ink}/>
        </button>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '7px 12px', borderRadius: 999,
          background: dir.surface, border: `1px solid ${dir.border}`,
          fontSize: 12.5, color: dir.ink, fontWeight: 500,
        }}>
          <CPIcon glyph="pin" size={13} color={dir.accent}/>
          {activeLoc.split(' · ')[0]}
          <CPIcon glyph="chevrondown" size={11} color={dir.inkMute}/>
        </div>
        <button style={{
          background: dir.accent, color: '#fff', border: 'none',
          padding: '8px 16px', borderRadius: 999,
          fontSize: 14, fontWeight: 600, cursor: 'pointer',
        }}>Post</button>
      </div>

      {/* Single compose surface — text that voice streams into */}
      <div style={{ padding: '4px 20px 0', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {refining ? (
          // ── Refine review ────────────────────────────────────
          <div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10,
            }}>
              <CPIcon glyph="sparkles" size={14} color={dir.accentInk}/>
              <div style={{
                fontFamily: window.CP_TOKENS.font.mono, fontSize: 10.5,
                color: dir.accentInk, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600,
              }}>Suggested edit · your call</div>
            </div>
            <div style={{
              padding: 14, borderRadius: 12, marginBottom: 8,
              background: dir.surfaceAlt, border: `1px solid ${dir.borderSoft}`,
            }}>
              <div style={{
                fontFamily: window.CP_TOKENS.font.mono, fontSize: 10,
                color: dir.inkMute, letterSpacing: 0.5, marginBottom: 6,
              }}>YOUR ORIGINAL</div>
              <div style={{ fontSize: 15, lineHeight: 1.5, color: dir.inkSub, textWrap: 'pretty' }}>
                {original}
              </div>
            </div>
            <div style={{
              padding: 14, borderRadius: 12,
              background: dir.accentSoft, border: `1px solid oklch(from ${dir.accent} l c h / 0.18)`,
            }}>
              <div style={{
                fontFamily: window.CP_TOKENS.font.mono, fontSize: 10,
                color: dir.accentInk, letterSpacing: 0.5, marginBottom: 6,
              }}>REFINED</div>
              <div style={{ fontSize: 16, lineHeight: 1.5, color: dir.ink, textWrap: 'pretty' }}>
                {text}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button onClick={() => { setText(original); setOriginal(null); setRefining(false); }} style={{
                flex: 1, padding: '11px 0', borderRadius: 11,
                background: dir.surface, border: `1px solid ${dir.border}`,
                fontSize: 13.5, fontWeight: 500, color: dir.ink, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}>
                <CPIcon glyph="undo" size={14}/>Keep mine
              </button>
              <button onClick={() => { setOriginal(null); setRefining(false); }} style={{
                flex: 1, padding: '11px 0', borderRadius: 11,
                background: dir.accent, color: '#fff', border: 'none',
                fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}>
                <CPIcon glyph="check" size={14} color="#fff"/>Use refined
              </button>
            </div>
          </div>
        ) : (
          <>
            <textarea value={text} onChange={e => setText(e.target.value)}
              placeholder="Say something about your neighborhood…" style={{
              width: '100%', minHeight: 180, border: 'none', outline: 'none',
              background: 'transparent', resize: 'none',
              fontFamily: dir.font || window.CP_TOKENS.font.sans,
              fontSize: 18, lineHeight: 1.5, color: dir.ink, letterSpacing: -0.1,
              textWrap: 'pretty',
            }}/>

            {/* Inline voice state, when listening */}
            {listening && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 14px', borderRadius: 12, marginTop: 6,
                background: dir.accentSoft, border: `1px solid oklch(from ${dir.accent} l c h / 0.2)`,
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%', background: dir.accent,
                }}/>
                <div style={{
                  fontFamily: window.CP_TOKENS.font.mono, fontSize: 11.5,
                  color: dir.accentInk, letterSpacing: 0.5,
                }}>Listening · adds to your text · voice is not saved</div>
                {/* mini waveform */}
                <div style={{ display: 'flex', gap: 2, alignItems: 'center', marginLeft: 'auto' }}>
                  {[10, 14, 8, 16, 10, 18, 12, 6].map((h, i) => (
                    <div key={i} style={{ width: 2, height: h, borderRadius: 1, background: dir.accent, opacity: 0.6 + (i % 3) * 0.15 }}/>
                  ))}
                </div>
              </div>
            )}

            <div style={{
              fontFamily: window.CP_TOKENS.font.mono, fontSize: 10.5,
              color: dir.inkMute, marginTop: 6, display: 'flex', justifyContent: 'space-between',
            }}>
              <span>{text.length} / 500</span>
              <span>English · auto</span>
            </div>
          </>
        )}
      </div>

      {/* Action row — mic, refine later, photo, category */}
      {!refining && (
        <div style={{
          padding: '14px 16px 14px', display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          {/* Category chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {window.CP_TOKENS.categories.slice(0, 6).map(c => (
              <CatChip key={c.key} cat={c.key} active={cat === c.key} onClick={() => setCat(c.key)} dir={dir}/>
            ))}
          </div>

          {/* Tool row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* mic — primary */}
            <button onClick={() => setListening(!listening)} style={{
              width: 50, height: 50, borderRadius: '50%',
              background: listening ? dir.accent : dir.surface,
              border: `1.5px solid ${listening ? dir.accent : dir.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', flexShrink: 0,
              boxShadow: listening ? `0 4px 14px oklch(from ${dir.accent} l c h / 0.35)` : 'none',
            }}>
              <CPIcon glyph="mic" size={22} color={listening ? '#fff' : dir.ink} strokeWidth={1.8}/>
            </button>
            {/* photo */}
            <button style={{
              width: 44, height: 44, borderRadius: '50%',
              background: dir.surface, border: `1px solid ${dir.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
            }}>
              <CPIcon glyph="camera" size={18} color={dir.ink}/>
            </button>
            {/* pin */}
            <button style={{
              width: 44, height: 44, borderRadius: '50%',
              background: dir.surface, border: `1px solid ${dir.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
            }}>
              <CPIcon glyph="pin" size={18} color={dir.ink}/>
            </button>
            {/* refine — pushed right */}
            <button onClick={onRefine} style={{
              marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '10px 14px', borderRadius: 999,
              background: dir.surface, border: `1px solid ${dir.border}`,
              fontSize: 13, fontWeight: 500, color: dir.ink, cursor: 'pointer',
            }}>
              <CPIcon glyph="sparkles" size={14} color={dir.accent}/>
              Refine with AI
            </button>
          </div>

          {/* Reassurance microcopy */}
          <div style={{
            fontSize: 11.5, color: dir.inkMute, lineHeight: 1.45, padding: '0 4px',
          }}>
            Voice is transcribed into your text. The recording isn't saved or posted. You can refine later — we'll show the original and the suggestion side by side.
          </div>
        </div>
      )}
    </div>
  );
};


// ── Live broadcast compose ───────────────────────────────────
const LiveComposeScreen = ({ dir, closeCompose, activeLoc }) => (
  <div style={{ background: '#0a0a0a', minHeight: '100%', position: 'relative', color: '#fff' }}>
    {/* fake camera preview — striped placeholder with monospace label */}
    <div style={{
      position: 'absolute', inset: 0,
      background: `repeating-linear-gradient(135deg, #1a1a1a, #1a1a1a 12px, #222 12px, #222 24px)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        fontFamily: window.CP_TOKENS.font.mono, fontSize: 11,
        color: 'rgba(255,255,255,0.4)', letterSpacing: 1,
      }}>camera feed · front</div>
    </div>

    {/* top chrome */}
    <div style={{
      position: 'absolute', top: HEADER_PAD, left: 14, right: 14, zIndex: 10,
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <button onClick={closeCompose} style={{
        width: 36, height: 36, borderRadius: '50%',
        background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      }}>
        <CPIcon glyph="close" size={16} color="#fff"/>
      </button>
      <div style={{ flex: 1 }}/>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '6px 12px', borderRadius: 999,
        background: 'oklch(55% 0.22 28)', fontSize: 11, fontWeight: 700, letterSpacing: 1,
      }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff' }}/>
        LIVE · 0:04
      </div>
      <div style={{
        padding: '6px 12px', borderRadius: 999,
        background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)',
        fontFamily: window.CP_TOKENS.font.mono, fontSize: 11, fontWeight: 600,
      }}>
        👁 127
      </div>
    </div>

    {/* title entry */}
    <div style={{
      position: 'absolute', bottom: 180, left: 16, right: 16, zIndex: 10,
    }}>
      <input placeholder="What are you showing? (optional)" style={{
        width: '100%', padding: '14px 16px', borderRadius: 12,
        background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.15)',
        color: '#fff', fontSize: 15, outline: 'none',
      }}/>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        marginTop: 10, padding: '6px 12px', borderRadius: 999,
        background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.15)',
        fontSize: 12, color: '#fff',
      }}>
        <CPIcon glyph="pin" size={13} color={dir.accent}/>
        {activeLoc}
      </div>
    </div>

    {/* stop button */}
    <div style={{
      position: 'absolute', bottom: 50, left: 0, right: 0, zIndex: 10,
      display: 'flex', justifyContent: 'center',
    }}>
      <div style={{
        width: 78, height: 78, borderRadius: '50%', padding: 5,
        background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)',
        border: '3px solid #fff',
      }}>
        <div style={{
          width: '100%', height: '100%', borderRadius: 12,
          background: 'oklch(55% 0.22 28)',
        }}/>
      </div>
    </div>
  </div>
);

// ── Screen 4: EXPLORE (with Pulse video strip) ───────────────
const ExploreScreen = ({ dir, density, cardStyle, setTab, setActiveCat }) => {
  return (
    <div style={{ background: dir.base, minHeight: '100%' }}>
      {/* Header */}
      <div style={{ padding: `${HEADER_PAD}px 20px 10px` }}>
        <div style={{
          fontFamily: dir.displayFont || window.CP_TOKENS.font.display,
          fontSize: 30, fontWeight: 700, color: dir.ink, letterSpacing: -0.8,
        }}>Explore</div>
        <div style={{ fontSize: 14, color: dir.inkSub, marginTop: 2 }}>
          Your city, around you, and places you follow.
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: '12px 20px 0' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 14px', borderRadius: 12,
          background: dir.surface, border: `1px solid ${dir.border}`,
        }}>
          <CPIcon glyph="search" size={16} color={dir.inkSub}/>
          <input placeholder="Search places, tags, people" style={{
            border: 'none', outline: 'none', background: 'transparent',
            fontSize: 14, flex: 1, color: dir.ink,
            fontFamily: dir.font || window.CP_TOKENS.font.sans,
          }}/>
        </div>
      </div>

      {/* Pulse — video strip */}
      <div style={{ padding: '22px 0 0' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 20px', marginBottom: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <CPIcon glyph="live" size={14} color={dir.accent}/>
            <div style={{
              fontFamily: window.CP_TOKENS.font.mono, fontSize: 10.5,
              color: dir.inkSub, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600,
            }}>Pulse · live & recent</div>
          </div>
          <a style={{ fontSize: 12, color: dir.accentInk, fontWeight: 500 }}>See all</a>
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', padding: '0 20px', scrollbarWidth: 'none' }}>
          {[
            { live: true,  label: 'Fabrika courtyard', user: 'Keti R.',  views: 127, hue: 280 },
            { live: true,  label: 'Protest @ Rustaveli', user: 'Dato K.', views: 842, hue: 28 },
            { live: false, label: 'Vake Park morning', user: 'Nino K.',  views: '2.1k', hue: 140 },
            { live: false, label: 'Old Town by night', user: 'Beka A.',  views: 530, hue: 240 },
            { live: false, label: 'Shoti at 10am',      user: 'Giorgi T.',views: 318, hue: 80 },
          ].map((v, i) => (
            <div key={i} style={{
              minWidth: 130, aspectRatio: '9/14', borderRadius: 14, flexShrink: 0,
              background: `repeating-linear-gradient(135deg, oklch(88% 0.06 ${v.hue}), oklch(88% 0.06 ${v.hue}) 8px, oklch(92% 0.04 ${v.hue}) 8px, oklch(92% 0.04 ${v.hue}) 16px)`,
              position: 'relative', overflow: 'hidden', cursor: 'pointer',
            }}>
              {/* play glyph */}
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'oklch(100% 0 0 / 0.7)', backdropFilter: 'blur(6px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <CPIcon glyph="play" size={16} color="oklch(25% 0 0)"/>
                </div>
              </div>
              {/* top badges */}
              <div style={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 5 }}>
                {v.live && (
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    padding: '3px 7px', borderRadius: 5,
                    background: 'oklch(55% 0.22 28)', color: '#fff',
                    fontSize: 9, fontWeight: 700, letterSpacing: 0.5,
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff' }}/>
                    LIVE
                  </div>
                )}
              </div>
              {/* bottom meta */}
              <div style={{
                position: 'absolute', left: 0, right: 0, bottom: 0, padding: 10,
                background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                color: '#fff',
              }}>
                <div style={{ fontSize: 11.5, fontWeight: 600, lineHeight: 1.25, textWrap: 'pretty' }}>{v.label}</div>
                <div style={{ fontFamily: window.CP_TOKENS.font.mono, fontSize: 9.5, opacity: 0.85, marginTop: 3 }}>
                  {v.user} · 👁 {v.views}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories grid */}
      <div style={{ padding: '22px 20px 0' }}>
        <div style={{
          fontFamily: window.CP_TOKENS.font.mono, fontSize: 10.5,
          color: dir.inkSub, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600, marginBottom: 12,
        }}>Categories</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {window.CP_TOKENS.categories.slice(0, 9).map(c => {
            const color = `oklch(62% 0.15 ${c.hue})`;
            return (
              <button key={c.key} onClick={() => { setActiveCat(c.key); setTab('home'); }} style={{
                padding: 14, borderRadius: 14,
                background: dir.surface, border: `1px solid ${dir.borderSoft}`,
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10,
                cursor: 'pointer', textAlign: 'left',
              }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 10,
                  background: `oklch(94% 0.04 ${c.hue})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <CPIcon glyph={c.glyph} size={18} color={color}/>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: dir.ink }}>{c.label}</div>
                  <div style={{ fontFamily: window.CP_TOKENS.font.mono, fontSize: 10.5, color: dir.inkMute, marginTop: 1 }}>
                    {[12, 34, 6, 18, 45, 9, 22, 7, 14][window.CP_TOKENS.categories.indexOf(c) % 9]} new
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Neighborhoods */}
      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <div style={{
            fontFamily: window.CP_TOKENS.font.mono, fontSize: 10.5,
            color: dir.inkSub, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600,
          }}>Near you</div>
          <a style={{ fontSize: 12, color: dir.accentInk, fontWeight: 500 }}>See all</a>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: dir.border, borderRadius: 14, overflow: 'hidden', border: `1px solid ${dir.border}` }}>
          {window.CP_TOKENS.neighborhoods.slice(0, 5).map(n => (
            <div key={n.key} style={{
              padding: '14px 16px', background: dir.surface,
              display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `oklch(94% 0.03 ${60 + window.CP_TOKENS.neighborhoods.indexOf(n) * 40})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <CPIcon glyph="map" size={16} color={`oklch(45% 0.1 ${60 + window.CP_TOKENS.neighborhoods.indexOf(n) * 40})`}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: dir.ink, letterSpacing: -0.1 }}>{n.label}</div>
                <div style={{ fontFamily: window.CP_TOKENS.font.mono, fontSize: 11, color: dir.inkMute, marginTop: 1 }}>
                  {n.distance} · {n.posts} posts today
                </div>
              </div>
              <CPIcon glyph="chevron" size={16} color={dir.inkMute}/>
            </div>
          ))}
        </div>
      </div>

      {/* Followed places */}
      <div style={{ padding: '24px 20px 140px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <div style={{
            fontFamily: window.CP_TOKENS.font.mono, fontSize: 10.5,
            color: dir.inkSub, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600,
          }}>Following</div>
          <a style={{ fontSize: 12, color: dir.accentInk, fontWeight: 500 }}>Add place</a>
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', margin: '0 -20px', padding: '0 20px', scrollbarWidth: 'none' }}>
          {window.CP_FOLLOWED.map((f, i) => (
            <div key={i} style={{
              minWidth: 180, padding: 14, borderRadius: 14,
              background: dir.surface, border: `1px solid ${dir.borderSoft}`,
              flexShrink: 0,
            }}>
              <CPIcon glyph="bookmark" size={16} color={dir.accent}/>
              <div style={{ fontSize: 14, fontWeight: 600, color: dir.ink, marginTop: 10, letterSpacing: -0.1 }}>{f.label}</div>
              <div style={{ fontFamily: window.CP_TOKENS.font.mono, fontSize: 10.5, color: dir.inkMute, marginTop: 4 }}>
                {f.distance} · {f.posts} new
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { FeedScreen, MapScreen, ComposeScreen, LiveComposeScreen, ExploreScreen, PlacesScreen });

// ── Screen 5: PLACES (renamed from Saved) ─────────────────────
// Three lists: Saved (restaurants/shops) · Following (neighborhoods) · My pins.
function PlacesScreen({ dir }) {
  const [tab, setTab] = React.useState('saved');
  const saved = [
    { name: 'Café Stamba', cat: 'Café · Old Town',        tag: 'food',   note: 'Best flat white in the city', hue: 80 },
    { name: 'Botanica',     cat: 'Plant shop · Vake',      tag: 'offers', note: '20% off this weekend',         hue: 330 },
    { name: 'Cinnamon',     cat: 'Bakery · Saburtalo',     tag: 'food',   note: 'Shoti 1.50 ₾ at 10am',         hue: 80 },
    { name: 'Fabrika',      cat: 'Venue · Old Town',       tag: 'event',  note: 'Open-air cinema Fri',          hue: 280 },
    { name: 'Lisi Lake',    cat: 'Outdoors · Saburtalo',   tag: 'tip',    note: 'Quietest before 9am',          hue: 160 },
  ];
  const following = window.CP_TOKENS.neighborhoods.slice(0, 3).concat([
    { key: 'batumi', label: 'Batumi · Old Boulevard', posts: 12, distance: '378 km' },
    { key: 'kutaisi', label: 'Kutaisi · Centre', posts: 6, distance: '231 km' },
  ]);
  const pins = [
    { title: 'Chess tables back at Vake Park', loc: 'Vake', tag: 'event', time: '12 min', hue: 280 },
    { title: 'Water shutoff on Nutsubidze', loc: 'Saburtalo', tag: 'alert', time: '3 hr', hue: 28 },
    { title: 'Metro card top-up cash-only', loc: 'Old Town', tag: 'tip', time: '2 hr', hue: 160 },
  ];
  return (
    <div style={{ background: dir.base, minHeight: '100%' }}>
      <div style={{ padding: `${HEADER_PAD}px 20px 10px` }}>
        <div style={{ fontFamily: dir.displayFont || window.CP_TOKENS.font.display, fontSize: 30, fontWeight: 700, color: dir.ink, letterSpacing: -0.8 }}>Places</div>
        <div style={{ fontSize: 14, color: dir.inkSub, marginTop: 2 }}>Your spots, followed areas, posts you've pinned.</div>
      </div>
      {/* Segmented */}
      <div style={{ padding: '14px 20px 0' }}>
        <div style={{ display: 'flex', gap: 2, background: dir.surfaceAlt, padding: 3, borderRadius: 11, border: `1px solid ${dir.borderSoft}` }}>
          {[['saved', 'Saved', 12], ['following', 'Following', 5], ['pins', 'My pins', 3]].map(([k, l, n]) => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '8px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
              background: tab === k ? dir.surface : 'transparent',
              color: tab === k ? dir.ink : dir.inkMute,
              fontSize: 13, fontWeight: tab === k ? 600 : 500,
              boxShadow: tab === k ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
            }}>{l} · <span style={{ fontFamily: window.CP_TOKENS.font.mono, fontSize: 11, opacity: 0.65 }}>{n}</span></button>
          ))}
        </div>
      </div>
      <div style={{ padding: '18px 20px 140px' }}>
        {tab === 'saved' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {saved.map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: 14, borderRadius: 14,
                background: dir.surface, border: `1px solid ${dir.borderSoft}`,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: `repeating-linear-gradient(135deg, oklch(90% 0.05 ${s.hue}), oklch(90% 0.05 ${s.hue}) 4px, oklch(94% 0.03 ${s.hue}) 4px, oklch(94% 0.03 ${s.hue}) 8px)`,
                  flexShrink: 0,
                }}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: dir.ink, letterSpacing: -0.1 }}>{s.name}</div>
                  <div style={{ fontFamily: window.CP_TOKENS.font.mono, fontSize: 11, color: dir.inkMute, marginTop: 1 }}>{s.cat}</div>
                  <div style={{ fontSize: 12.5, color: dir.inkSub, marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <CatDot cat={s.tag} size={6}/>{s.note}
                  </div>
                </div>
                <CPIcon glyph="bookmark" size={18} color={dir.accent}/>
              </div>
            ))}
            <button style={{
              marginTop: 4, padding: 14, borderRadius: 14,
              background: 'transparent', border: `1.5px dashed ${dir.border}`,
              color: dir.inkSub, fontSize: 13, fontWeight: 500, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              <CPIcon glyph="plus" size={15}/>Save a new place
            </button>
          </div>
        )}
        {tab === 'following' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: dir.border, borderRadius: 14, overflow: 'hidden', border: `1px solid ${dir.border}` }}>
            {following.map((f, i) => (
              <div key={i} style={{ padding: '14px 16px', background: dir.surface, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: `oklch(94% 0.03 ${60 + i * 40})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <CPIcon glyph="map" size={16} color={`oklch(45% 0.1 ${60 + i * 40})`}/>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: dir.ink, letterSpacing: -0.1 }}>{f.label}</div>
                  <div style={{ fontFamily: window.CP_TOKENS.font.mono, fontSize: 11, color: dir.inkMute, marginTop: 1 }}>{f.distance} · {f.posts} today</div>
                </div>
                <CPIcon glyph="chevron" size={16} color={dir.inkMute}/>
              </div>
            ))}
          </div>
        )}
        {tab === 'pins' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {pins.map((p, i) => (
              <div key={i} style={{ padding: 14, borderRadius: 14, background: dir.surface, border: `1px solid ${dir.borderSoft}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <CatDot cat={p.tag} size={7}/>
                  <span style={{ fontFamily: window.CP_TOKENS.font.mono, fontSize: 10.5, color: dir.inkMute, letterSpacing: 0.5 }}>{p.loc.toUpperCase()} · {p.time}</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: dir.ink, letterSpacing: -0.15, lineHeight: 1.3, textWrap: 'pretty' }}>{p.title}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
window.PlacesScreen = PlacesScreen;
