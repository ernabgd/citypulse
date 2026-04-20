// compose-variants.jsx — Icon explorer + 3 compose flow options.
// Each flow shows multiple steps side-by-side so you can read the whole journey.

const CV_HP = 54; // header pad under status bar

// ── Reusable "Post" floating button preview used in the icon-explorer ──
const PostFab = ({ glyph, dir, label, sub }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
    <div style={{
      width: 64, height: 64, borderRadius: '50%',
      background: dir.accent, border: '2.5px solid #fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: `0 10px 24px oklch(from ${dir.accent} l c h / 0.4), 0 0 0 8px oklch(from ${dir.accent} l c h / 0.08)`,
    }}>
      <CPIcon glyph={glyph} size={28} color="#fff" strokeWidth={2}/>
    </div>
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: window.CP_TOKENS.font.mono, fontSize: 10.5, letterSpacing: 0.5, color: dir.ink, fontWeight: 600, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 11, color: dir.inkMute, marginTop: 2, maxWidth: 140, lineHeight: 1.3, textWrap: 'pretty' }}>{sub}</div>
    </div>
  </div>
);

// ── Top bar shared by all compose variants ────────────────────
const ComposeTopBar = ({ dir, activeLoc, onClose, postLabel = 'Post' }) => (
  <div style={{
    padding: `${CV_HP}px 16px 14px`,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  }}>
    <button onClick={onClose} style={{
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
      fontSize: 14, fontWeight: 600, cursor: 'pointer', opacity: postLabel === 'Post' ? 0.4 : 1,
    }}>{postLabel}</button>
  </div>
);

// ── Voice bar: the visible "speak to post" surface, inline ────
const VoiceBar = ({ dir, listening, paused, onTap, time = '0:14', waveform = true }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '10px 12px', borderRadius: 14,
    background: listening ? dir.accent : dir.surface,
    border: `1.5px solid ${listening ? dir.accent : dir.border}`,
    boxShadow: listening ? `0 6px 18px oklch(from ${dir.accent} l c h / 0.28)` : 'none',
    transition: 'all .2s', cursor: 'pointer',
  }} onClick={onTap}>
    <div style={{
      width: 34, height: 34, borderRadius: '50%',
      background: listening ? 'oklch(100% 0 0 / 0.25)' : dir.accentSoft,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      <CPIcon glyph={paused ? 'play' : 'mic'} size={17} color={listening ? '#fff' : dir.accent} strokeWidth={2}/>
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{
        fontSize: 13, fontWeight: 600, letterSpacing: -0.1,
        color: listening ? '#fff' : dir.ink,
      }}>
        {listening ? (paused ? 'Paused · tap to continue' : 'Listening · tap to pause') : 'Tap to speak · we turn it into a post'}
      </div>
      <div style={{
        fontFamily: window.CP_TOKENS.font.mono, fontSize: 10.5,
        color: listening ? 'oklch(100% 0 0 / 0.7)' : dir.inkMute, marginTop: 1,
      }}>{listening ? `${time} · voice isn't saved or posted` : 'English · auto-language · works offline'}</div>
    </div>
    {listening && waveform && !paused && (
      <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        {[10, 18, 12, 22, 14, 8, 20, 10, 16].map((h, i) => (
          <div key={i} style={{
            width: 2.5, height: h, borderRadius: 2, background: '#fff',
            opacity: 0.6 + (i % 3) * 0.15,
          }}/>
        ))}
      </div>
    )}
  </div>
);

// ──────────────────────────────────────────────────────────────
// FLOW A — "Persistent voice bar"
// The voice bar is always visible at the bottom. Text field is primary.
// User can tap mic anytime (before, during, after typing) to add more.
// ──────────────────────────────────────────────────────────────

const FlowA_Empty = ({ dir, activeLoc }) => (
  <div style={{ background: dir.base, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
    <ComposeTopBar dir={dir} activeLoc={activeLoc} onClose={()=>{}}/>
    <div style={{ padding: '12px 20px', flex: 1 }}>
      <div style={{
        fontSize: 20, lineHeight: 1.4, color: dir.inkMute, letterSpacing: -0.2,
        fontFamily: dir.font || window.CP_TOKENS.font.sans, minHeight: 120,
      }}>What's happening in your neighborhood?</div>
    </div>
    <div style={{ padding: '10px 14px 110px' }}>
      <VoiceBar dir={dir} listening={false}/>
      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
        <PillBtn dir={dir} glyph="camera" label="Photo"/>
        <PillBtn dir={dir} glyph="pin" label="Pin spot"/>
        <PillBtn dir={dir} glyph="tag" label="Category"/>
      </div>
    </div>
  </div>
);

const FlowA_Listening = ({ dir, activeLoc }) => (
  <div style={{ background: dir.base, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
    <ComposeTopBar dir={dir} activeLoc={activeLoc} onClose={()=>{}}/>
    <div style={{ padding: '12px 20px', flex: 1 }}>
      <div style={{
        fontSize: 18, lineHeight: 1.5, color: dir.ink, letterSpacing: -0.1,
        fontFamily: dir.font || window.CP_TOKENS.font.sans, minHeight: 120, textWrap: 'pretty',
      }}>
        Metro card reader at Marjanishvili is broken, cash only today
        <span style={{
          display: 'inline-block', width: 2, height: 18, background: dir.accent,
          verticalAlign: '-3px', marginLeft: 2, animation: 'pulse 1.2s infinite',
        }}/>
      </div>
    </div>
    <div style={{ padding: '10px 14px 110px' }}>
      <VoiceBar dir={dir} listening={true} time="0:08"/>
    </div>
  </div>
);

const FlowA_Mixed = ({ dir, activeLoc }) => (
  <div style={{ background: dir.base, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
    <ComposeTopBar dir={dir} activeLoc={activeLoc} onClose={()=>{}} postLabel="Post"/>
    <div style={{ padding: '12px 20px 4px', flex: 1 }}>
      <div style={{
        fontSize: 17, lineHeight: 1.55, color: dir.ink, letterSpacing: -0.1,
        fontFamily: dir.font || window.CP_TOKENS.font.sans, textWrap: 'pretty',
      }}>
        Metro card reader at Marjanishvili is broken, cash only today.{' '}
        <span style={{ color: dir.accent, fontWeight: 500, background: dir.accentSoft, padding: '0 3px', borderRadius: 3 }}>Rustaveli station still takes cards</span>
      </div>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 14,
        padding: '4px 10px', borderRadius: 999, background: dir.surfaceAlt,
        fontFamily: window.CP_TOKENS.font.mono, fontSize: 10.5, color: dir.inkMute, letterSpacing: 0.5,
      }}>
        <CPIcon glyph="undo" size={10} color={dir.inkMute}/>
        just dictated · tap to edit
      </div>
    </div>
    <div style={{ padding: '10px 14px 110px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {/* category picker */}
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {['traffic','tip','alert','event','food'].map((k,i) => (
          <div key={k} style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '6px 10px', borderRadius: 999,
            background: i === 0 ? dir.ink : dir.surface,
            color: i === 0 ? dir.base : dir.ink,
            border: `1px solid ${i === 0 ? dir.ink : dir.border}`,
            fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap',
          }}>
            <CatDot cat={k} size={6}/>
            {window.CP_TOKENS.categories.find(c => c.key === k).label}
          </div>
        ))}
      </div>
      <VoiceBar dir={dir} listening={false}/>
      <div style={{ display: 'flex', gap: 6 }}>
        <PillBtn dir={dir} glyph="sparkles" label="Refine" accent/>
        <PillBtn dir={dir} glyph="camera" label=""/>
        <PillBtn dir={dir} glyph="pin" label=""/>
      </div>
    </div>
  </div>
);

// Small pill button
const PillBtn = ({ dir, glyph, label, accent }) => (
  <button style={{
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: label ? '9px 14px' : '9px 12px', borderRadius: 999,
    background: accent ? dir.accentSoft : dir.surface,
    border: `1px solid ${accent ? 'oklch(from ' + dir.accent + ' l c h / 0.2)' : dir.border}`,
    fontSize: 12.5, fontWeight: 500, color: accent ? dir.accentInk : dir.ink,
    cursor: 'pointer', whiteSpace: 'nowrap',
  }}>
    <CPIcon glyph={glyph} size={14} color={accent ? dir.accent : dir.inkSub}/>{label}
  </button>
);

// ──────────────────────────────────────────────────────────────
// FLOW B — "Big mic hero, reveal text"
// Opens on a big, centered mic. Speaking grows a card below with transcript.
// A "Switch to typing" link is always available; after first words, text is editable.
// ──────────────────────────────────────────────────────────────

const FlowB_Hero = ({ dir, activeLoc }) => (
  <div style={{ background: dir.base, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
    <ComposeTopBar dir={dir} activeLoc={activeLoc} onClose={()=>{}}/>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 24px 40px' }}>
      <div style={{
        fontFamily: dir.displayFont || window.CP_TOKENS.font.display,
        fontSize: 28, fontWeight: 600, color: dir.ink, letterSpacing: -0.5,
        textAlign: 'center', textWrap: 'balance', maxWidth: 280,
      }}>What do you want to share?</div>
      <div style={{ fontSize: 14, color: dir.inkSub, marginTop: 8, textAlign: 'center', maxWidth: 260, lineHeight: 1.45 }}>
        Tap and speak. We'll write it out — you can edit anything before it goes up.
      </div>

      <button style={{
        marginTop: 40, width: 156, height: 156, borderRadius: '50%',
        background: dir.accent, border: 'none',
        boxShadow: `0 16px 40px oklch(from ${dir.accent} l c h / 0.4), 0 0 0 10px oklch(from ${dir.accent} l c h / 0.1), 0 0 0 20px oklch(from ${dir.accent} l c h / 0.04)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        position: 'relative',
      }}>
        <CPIcon glyph="mic" size={56} color="#fff" strokeWidth={1.8}/>
      </button>
      <div style={{
        fontFamily: window.CP_TOKENS.font.mono, fontSize: 11, color: dir.inkMute,
        letterSpacing: 1.2, marginTop: 20, textTransform: 'uppercase',
      }}>Tap to speak</div>

      <button style={{
        marginTop: 'auto', background: 'transparent', border: 'none',
        display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer',
        fontSize: 13, color: dir.inkSub, fontWeight: 500, padding: '8px 12px', borderRadius: 8,
      }}>
        <CPIcon glyph="edit" size={14} color={dir.inkSub}/>
        Type instead
      </button>
    </div>
  </div>
);

const FlowB_Speaking = ({ dir, activeLoc }) => (
  <div style={{ background: dir.base, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
    <ComposeTopBar dir={dir} activeLoc={activeLoc} onClose={()=>{}}/>

    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 20px 0', position: 'relative' }}>
      {/* live transcript card */}
      <div style={{
        width: '100%', background: dir.surface, borderRadius: 18,
        padding: 18, border: `1px solid ${dir.borderSoft}`,
        boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
      }}>
        <div style={{
          fontFamily: window.CP_TOKENS.font.mono, fontSize: 10,
          color: dir.accentInk, letterSpacing: 0.5, marginBottom: 8, fontWeight: 600,
        }}>TRANSCRIBING · 0:11</div>
        <div style={{
          fontSize: 17, lineHeight: 1.55, color: dir.ink, letterSpacing: -0.1, textWrap: 'pretty',
        }}>
          Metro card reader at Marjanishvili is broken, cash only today.
          <span style={{ color: dir.inkMute }}> Rustaveli station</span>
          <span style={{
            display: 'inline-block', width: 2, height: 18, background: dir.accent,
            verticalAlign: '-3px', marginLeft: 2, animation: 'pulse 1.2s infinite',
          }}/>
        </div>
      </div>

      {/* Big mic with waveform */}
      <div style={{ marginTop: 30, position: 'relative' }}>
        <button style={{
          width: 132, height: 132, borderRadius: '50%',
          background: dir.accent, border: 'none',
          boxShadow: `0 12px 30px oklch(from ${dir.accent} l c h / 0.35), 0 0 0 8px oklch(from ${dir.accent} l c h / 0.1)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <CPIcon glyph="mic" size={48} color="#fff" strokeWidth={1.8}/>
        </button>
        {/* animated rings */}
        {[1, 2].map(i => (
          <div key={i} style={{
            position: 'absolute', inset: -10 * i, borderRadius: '50%',
            border: `1.5px solid ${dir.accent}`, opacity: 0.3 / i, pointerEvents: 'none',
          }}/>
        ))}
      </div>

      {/* waveform */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 36, marginTop: 20 }}>
        {[14,22,30,18,26,34,22,14,28,36,24,18,32,26,14,22,30,18,26,22,14,28,36,24].map((h,i) => (
          <div key={i} style={{
            width: 3, height: h, borderRadius: 2,
            background: i < 16 ? dir.accent : dir.border,
          }}/>
        ))}
      </div>

      <div style={{
        display: 'flex', gap: 12, marginTop: 24, alignItems: 'center',
      }}>
        <button style={{
          padding: '10px 18px', borderRadius: 999,
          background: dir.surface, border: `1px solid ${dir.border}`,
          fontSize: 13, fontWeight: 500, color: dir.ink, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: dir.ink }}/>
          Pause
        </button>
        <button style={{
          padding: '10px 18px', borderRadius: 999,
          background: dir.ink, color: dir.base, border: 'none',
          fontSize: 13, fontWeight: 600, cursor: 'pointer',
        }}>
          Done
        </button>
      </div>
    </div>
  </div>
);

const FlowB_EditContinue = ({ dir, activeLoc }) => (
  <div style={{ background: dir.base, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
    <ComposeTopBar dir={dir} activeLoc={activeLoc} onClose={()=>{}} postLabel="Post"/>
    <div style={{ padding: '12px 20px 10px', flex: 1 }}>
      <div style={{
        fontSize: 17, lineHeight: 1.55, color: dir.ink, letterSpacing: -0.1, textWrap: 'pretty',
      }}>
        Metro card reader at Marjanishvili is broken, cash only today. Rustaveli station still takes cards.
      </div>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 14,
        padding: '4px 10px', borderRadius: 999, background: dir.accentSoft,
        fontFamily: window.CP_TOKENS.font.mono, fontSize: 10.5, color: dir.accentInk, letterSpacing: 0.5, fontWeight: 600,
      }}>
        <CPIcon glyph="mic" size={10} color={dir.accentInk}/>
        dictated · 14s
      </div>
    </div>
    <div style={{ padding: '10px 14px 110px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{
        padding: '10px 12px', borderRadius: 12,
        background: dir.surfaceAlt, border: `1px dashed ${dir.border}`,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: dir.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <CPIcon glyph="mic" size={14} color="#fff" strokeWidth={2}/>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: dir.ink }}>Keep talking — we'll add to the end</div>
          <div style={{ fontSize: 11, color: dir.inkMute, marginTop: 1 }}>Or edit the text directly</div>
        </div>
        <CPIcon glyph="chevron" size={14} color={dir.inkMute}/>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <PillBtn dir={dir} glyph="sparkles" label="Refine" accent/>
        <PillBtn dir={dir} glyph="camera" label="Photo"/>
        <PillBtn dir={dir} glyph="tag" label="Tip"/>
      </div>
    </div>
  </div>
);

// ──────────────────────────────────────────────────────────────
// FLOW C — "Chat-like" — mic is always an IME row, like a messaging app
// Voice segments are shown as blocks in the transcript; user can insert
// more by tapping mic again mid-edit. Each chunk shows a ••• tap-to-edit.
// ──────────────────────────────────────────────────────────────

const FlowC_First = ({ dir, activeLoc }) => (
  <div style={{ background: dir.base, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
    <ComposeTopBar dir={dir} activeLoc={activeLoc} onClose={()=>{}}/>

    <div style={{ flex: 1, padding: '20px 20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        background: dir.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: `1px solid oklch(from ${dir.accent} l c h / 0.2)`,
      }}>
        <CPIcon glyph="mic" size={28} color={dir.accent} strokeWidth={1.8}/>
      </div>
      <div style={{
        marginTop: 16, fontFamily: dir.displayFont || window.CP_TOKENS.font.display,
        fontSize: 22, fontWeight: 600, color: dir.ink, letterSpacing: -0.3, textWrap: 'balance', maxWidth: 240,
      }}>Hold to speak.<br/>Tap to type.</div>
      <div style={{ fontSize: 13.5, color: dir.inkSub, marginTop: 8, lineHeight: 1.45, maxWidth: 260 }}>
        You can switch any time. Voice becomes text you can edit.
      </div>
    </div>

    {/* Dock — mic as primary action, keyboard icon as secondary */}
    <div style={{
      padding: '14px 14px 110px', display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <button style={{
        width: 44, height: 44, borderRadius: 14,
        background: dir.surface, border: `1px solid ${dir.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      }}>
        <CPIcon glyph="edit" size={18} color={dir.ink}/>
      </button>
      <button style={{
        flex: 1, height: 54, borderRadius: 16,
        background: dir.accent, color: '#fff', border: 'none',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        fontSize: 15, fontWeight: 600, cursor: 'pointer', letterSpacing: -0.1,
        boxShadow: `0 6px 18px oklch(from ${dir.accent} l c h / 0.3)`,
      }}>
        <CPIcon glyph="mic" size={20} color="#fff" strokeWidth={2}/>
        Hold to speak
      </button>
      <button style={{
        width: 44, height: 44, borderRadius: 14,
        background: dir.surface, border: `1px solid ${dir.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      }}>
        <CPIcon glyph="camera" size={18} color={dir.ink}/>
      </button>
    </div>
  </div>
);

const FlowC_Chunks = ({ dir, activeLoc }) => (
  <div style={{ background: dir.base, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
    <ComposeTopBar dir={dir} activeLoc={activeLoc} onClose={()=>{}} postLabel="Post"/>
    <div style={{ flex: 1, padding: '8px 16px', overflow: 'auto' }}>
      {/* Chunk 1 */}
      <ChunkBlock dir={dir} kind="voice" time="8s">
        Metro card reader at Marjanishvili is broken, cash only today.
      </ChunkBlock>
      {/* Chunk 2 — typed */}
      <ChunkBlock dir={dir} kind="typed" time="just now">
        Rustaveli station still takes cards.
      </ChunkBlock>
      {/* insertion point */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, margin: '8px 8px',
        fontFamily: window.CP_TOKENS.font.mono, fontSize: 10.5, color: dir.inkMute, letterSpacing: 0.5,
      }}>
        <div style={{ flex: 1, height: 1, background: dir.borderSoft }}/>
        + add more
        <div style={{ flex: 1, height: 1, background: dir.borderSoft }}/>
      </div>
    </div>

    {/* Input row */}
    <div style={{
      padding: '10px 12px 110px', display: 'flex', alignItems: 'center', gap: 8,
      borderTop: `1px solid ${dir.borderSoft}`, background: dir.base,
    }}>
      <button style={{
        width: 40, height: 40, borderRadius: 12, background: dir.surface,
        border: `1px solid ${dir.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      }}>
        <CPIcon glyph="camera" size={16} color={dir.ink}/>
      </button>
      <div style={{
        flex: 1, height: 40, borderRadius: 20,
        background: dir.surface, border: `1px solid ${dir.border}`,
        display: 'flex', alignItems: 'center', padding: '0 14px',
        fontSize: 13, color: dir.inkMute,
      }}>Add more, or tap mic…</div>
      <button style={{
        width: 44, height: 44, borderRadius: 14,
        background: dir.accent, border: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        boxShadow: `0 4px 12px oklch(from ${dir.accent} l c h / 0.3)`,
      }}>
        <CPIcon glyph="mic" size={18} color="#fff" strokeWidth={2}/>
      </button>
    </div>
  </div>
);

// A single chunk in the chat-like flow
const ChunkBlock = ({ dir, kind, time, children }) => (
  <div style={{
    margin: '6px 0', padding: '12px 14px', borderRadius: 14,
    background: kind === 'voice' ? dir.accentSoft : dir.surface,
    border: `1px solid ${kind === 'voice' ? 'oklch(from ' + dir.accent + ' l c h / 0.18)' : dir.borderSoft}`,
  }}>
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6,
      fontFamily: window.CP_TOKENS.font.mono, fontSize: 10,
      color: kind === 'voice' ? dir.accentInk : dir.inkMute,
      letterSpacing: 0.5, fontWeight: 600, textTransform: 'uppercase',
    }}>
      <CPIcon glyph={kind === 'voice' ? 'mic' : 'edit'} size={11} color={kind === 'voice' ? dir.accentInk : dir.inkMute}/>
      {kind === 'voice' ? 'Voice' : 'Typed'} · {time}
      <div style={{ flex: 1 }}/>
      <span style={{ color: dir.inkMute, fontWeight: 400, letterSpacing: 0 }}>tap to edit</span>
    </div>
    <div style={{
      fontSize: 15.5, lineHeight: 1.5, color: dir.ink, letterSpacing: -0.1, textWrap: 'pretty',
    }}>{children}</div>
  </div>
);

// Expose
Object.assign(window, {
  PostFab, VoiceBar, PillBtn,
  ComposeTopBar, CatDot, CV_HP,
  FlowA_Empty, FlowA_Listening, FlowA_Mixed,
  FlowB_Hero, FlowB_Speaking, FlowB_EditContinue,
  FlowC_First, FlowC_Chunks,
});
