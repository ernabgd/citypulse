# CityPulse — Project Context

## What is this?
CityPulse is a hyperlocal social feed app — like Citizen meets Nextdoor. Users see posts from people physically nearby, can upvote/downvote, post text + photos, use voice dictation, and get AI-assisted text refinement. Currently focused on Tbilisi, Georgia for an internal test with 10–30 users.

## Owner
Erna (ernabgd on GitHub). No coding experience — this is a vibecoding project.

## Live URLs
- **Vercel (production):** https://citypulse-10jc9jdhx-ernabgds-projects.vercel.app
- **GitHub Pages:** https://ernabgd.github.io/citypulse
- **GitHub repo:** https://github.com/ernabgd/citypulse.git

## Current State
Single `index.html` — a fully working static demo with fake data. No backend yet.

### What works in the demo:
- Mobile-first phone UI with iOS-style layout
- Location selector: "Around Me" + Tbilisi neighborhoods (Vake, Saburtalo, Old Town, Vera, Mtatsminda)
- Feed with 8 fake Tbilisi posts (alerts, food, events, tips, questions)
- Upvote/downvote with toggle logic
- Distance badges on each post (200m, 1.4km, etc.)
- Post composer with tag selector, photo attach, voice (simulated), AI refine (simulated)
- Comment threads
- Trending section (horizontal scroll cards)
- Profile screen, Alerts/Notifications screen, Explore screen
- Dark mode toggle
- Smooth screen transitions

### What's NOT built yet (next phase):
- Real backend (Supabase)
- Real user auth (email + Google OAuth)
- Real GPS-based geolocation
- Real photo upload to cloud storage
- Real voice dictation (Web Speech API)
- Real AI text refinement (Claude API via Vercel serverless)
- PWA manifest + service worker

## Planned Tech Stack
- **Frontend:** Vanilla JS + HTML/CSS (no frameworks, no build tools — keep it simple for vibecoding)
- **Backend:** Supabase (auth, Postgres DB, file storage, realtime)
- **Hosting:** Vercel (connected to GitHub, auto-deploys on push)
- **Voice:** Browser Web Speech API (SpeechRecognition), hold-to-talk UX like Citizen app
- **AI Refine:** Vercel serverless function → Claude API (keeps API key server-side)
- **Geo:** Browser Geolocation API + Haversine formula for distance

## Design Decisions
- **Accent color:** #FF6B35 (orange)
- **Font:** Inter
- **Style:** Clean, modern, mobile-first, iOS-feel
- **Dark mode:** CSS custom properties, toggle in profile screen
- **Feed modes:** "Around Me" (moves with GPS) + pinned neighborhood tabs at top
- **Location tabs:** Hide on scroll down, show on scroll up
- **Voice UX:** Hold-to-talk button (Citizen-style), live transcription shown in textarea
- **AI Refine:** Gmail-style suggestion bar — non-intrusive, only shows when text looks messy
- **Post tags:** Alert, Event, Food, General, Question, Tip (color-coded)
- **Distance:** shown in meters under 1km, km above (e.g. "200m", "1.4km")
- **Voting:** Anonymous (like feedc.com original concept)

## Known Bugs / TODOs
- New posts submitted via compose don't always appear at top of feed
- Profile screen doesn't show user's own posts
- Location tabs sometimes disappear when scrolling
- Voice and AI refine are simulated (not real yet)

## Monetization Direction (future)
- Local business verification + advertising
- Premium user features
- Short-form video feed (separate tab, TBD)

## Workflow
- Edit files locally on Mac (Claude Code in /Users/nico/Documents/citypulse)
- Claude makes changes → auto-pushed to GitHub → Vercel auto-deploys in ~30 seconds
- Test live on phone via Vercel URL
