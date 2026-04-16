# CityPulse — Project Context

## What is this?
Hyperlocal social feed PWA for Tbilisi, Georgia. Users see posts from nearby neighborhoods, upvote, comment, post text + photos. Like Citizen meets Nextdoor. Currently a polished static prototype used for demos and user testing.

## Owner
Erna / Nico (ernabgd on GitHub).

## Live URLs
- **Vercel (production):** https://citypulse-10jc9jdhx-ernabgds-projects.vercel.app
- **GitHub repo:** https://github.com/ernabgd/citypulse.git

---

## Architecture

Single-file PWA. Everything — CSS, HTML, JS — lives in `index.html` (~4200 lines). No framework, no build step. `sw.js` is the service worker.

**Deployed:** push to `main` → Vercel auto-deploys in ~30 seconds. No build command needed.

---

## Key globals (inside index.html)

- `DEMO_POSTS` — 41 posts, IDs 1–41. Fields: `id, user, tag, title, body, image, votes, comments, commentData, time, distance, loc, confirmations, isBusiness, isOwn`
- `TAG_CONFIG` — maps tag keys → `{ label, emoji, class }`. Tags: `alert, collision, breakin, police, protest, event, food, pet, question, tip, offers, general`
- `TRENDING_BY_LOC` — object keyed by loc, 4 trending cards per neighborhood
- `DEMO_USERS` — array of user objects with name, initials, color, role
- `APP_PASSWORD` — gate password is `'feedc'`
- `state.activeLocation` — active neighborhood: `'around' | 'vake' | 'saburtalo' | 'oldtown' | 'vera' | 'mtatsminda'`
- `state.activeTag` — active tag filter, null = show all
- `state.activeUser` — filter feed by user name, null = show all

## Screens
`password-gate` → `auth-screen` → `feed-screen` (main), `explore-screen`, `compose-screen` (slide-up), `detail-screen` (slide-up), `profile-screen`

Navigation: `showScreen(id)`. Bottom nav shows on main screens, hides on compose/detail.

---

## Things fixed — do NOT revert

- **Header:** `position: sticky` inside flex column. Do NOT change to `position: fixed` — breaks desktop layout.
- **Alert stripe:** `border-top: 3px solid #ef4444` on `.post-card.alert-card`. No inner div needed.
- **Service worker cache:** currently `citypulse-v3` in `sw.js`. Bump version (v4, v5…) only when `sw.js` itself changes — otherwise cached old versions serve on mobile.
- **`filterByTag()`** resets `state.activeLocation` to `'around'` — explore tag clicks always show city-wide results.
- **Compose submit:** splits text at first sentence boundary → `title` = first sentence, `body` = remainder. Prevents text doubling in card render.
- **Card render:** `${post.body ? '<div class="post-body">...</div>' : ''}` — body div is conditional.

---

## Design tokens

- **Accent:** `#FF6B35` (orange)
- **Font:** Inter
- **App frame:** `max-width: 430px; margin: 0 auto` on desktop. Dark navy body bg `#1a1a2e` outside the frame.
- **Dark mode:** CSS custom properties on `:root` / `[data-theme="dark"]`. Toggle in profile screen, stored in `localStorage`.
- **Primary CSS vars:** `--bg, --card, --border, --border-strong, --text, --text-secondary, --text-tertiary, --primary`

---

## Seed data style guide

When adding posts, keep them realistic for Tbilisi:
- Real streets: Chavchavadze Ave, Paliashvili St, Barnovi St, Kostava St, Agmashenebeli Ave, Vazha-Pshavela Ave, Kazbegi Ave, Nutsubidze, Tsereteli Ave, Rustaveli Ave
- Real landmarks: Vake Park, Rike Park, Turtle Lake, Lisi Lake, Fabrika, Dezerter Bazaar, Freedom Square, Dry Bridge, Narikala, Marjanishvili
- Georgian names: Nino, Giorgi, Tamta, Levan, Beka, Salome, Zviad, Mariam, Keti, Lasha, Dato, Irakli
- Prices in lari (₾). Metro fare 0.50 ₾, khinkali ~0.80–1.20 ₾ each.
- Utility companies: GWP (water), Telasi / Energo-Pro (electricity)

---

## What's NOT real (all simulated)

- Auth: `localStorage.setItem('cp_logged_in', '1')` — no real accounts
- Posts: in-memory array, gone on refresh
- Votes/comments: `state` object, lost on refresh
- Voice dictation: UI only, no Web Speech API hooked up
- AI refine: reformats text locally (trim, capitalize, add period) — no API call
- Push notifications: hardcoded array

---

## Monetization direction
Local business verification + promoted posts (`isBusiness: true` renders gold border card). Premium user features. Short-form video tab (future).
