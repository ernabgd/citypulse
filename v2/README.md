# CityPulse v2 — Design Canvas

This folder contains the **v2 design canvas** from Claude Design — a side-by-side view of 20+ phone screen mockups meant to help choose between variants before committing to a single app design.

## What's here

- `index.html` — entry point. Loads React via CDN + Babel in-browser. No build step.
- `tokens.jsx` — design system tokens (3 directions: Clay / Civic / Ink, 12 categories, Tbilisi neighborhoods, map palettes)
- `screens.jsx` — primary screens (Feed, Map, Compose, Explore, Places, LiveBroadcast, TabBar)
- `compose-variants.jsx` + `compose-variants-2.jsx` — 7 compose flows (A–G) exploring voice + text + Georgian editing + audience scope
- `primitives.jsx` — shared UI primitives (post card, chips, etc.)
- `icons.jsx` — icon set including the "Signal" post glyph (chosen)
- `map.jsx` — stylized SVG map of Tbilisi
- `ios-frame.jsx` + `design-canvas.jsx` — iOS device chrome + layout canvas

## How to view

Start a local server from the repo root, then visit `/v2/`:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/v2/
```

Toggle the **Tweaks** panel (bottom right when in edit mode) to swap:
- Direction (A Clay / B Civic / C Ink)
- Accent color (6 swatches)
- Density (compact / comfy / spacious)
- Card style (flat / bordered / shadow)
- Map style (warm / cool / muted / colorful)

## Status

This is a **design reference**, not the production app. It shows all variants so you can pick one.

- **v1** (the working app) still lives at the repo root (`/index.html`)
- **v2** (this folder) is the design reference
- **Future**: pick one flow from here, build a functional single-view app, eventually replace v1

## Context

See `../design-handoff/README.md` and `../design-handoff/chats/chat1.md` for the full design conversation and rationale.

## Key decisions already locked in the design

- Direction **A "Clay"** (warm off-white, terracotta accent) as default
- **Signal** post glyph (one arc each side of a dot)
- Floating glass tab bar: Around · Explore · Report · Places · You
- Voice + text unified compose with opt-in AI refine
- Audience scope: neighborhood / followers / citywide
- Georgian edit affordance: wavy underline for low-confidence words
- Pulse video strip inside Explore (not a separate tab)
- Places tab: Saved / Following / My pins
