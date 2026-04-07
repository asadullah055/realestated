# ImmoVoice AI — Real Estate Voice AI Dashboard

## Project Overview

A SaaS-style Real Estate Voice AI Dashboard targeting the **German market**. Built with React + Vite. Displays live market metrics, voice AI analytics, conversation history, and an analytics suite — all in a dark, professional UI.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite` plugin) |
| Charts | Recharts 3 |
| Icons | react-icons 5 |
| Dev Server | `npm run dev` |
| Build | `npm run build` |
| Lint | `npm run lint` |

## Project Structure

```
src/
  App.jsx                  # Root: state-based routing, layout shell
  main.jsx                 # React DOM entry point
  index.css                # Global styles + Tailwind import
  App.css                  # Legacy (unused — leave empty or delete)

  data/
    mockData.js            # All mock data: prices, sales, rentals,
                           # interest rates, voice metrics, conversations

  components/
    Sidebar.jsx            # Fixed left nav (collapsible, 240px / 68px)
    Header.jsx             # Sticky top bar: title, search, notifications, VoiceButton
    MetricCard.jsx         # Reusable KPI card with value, change badge, icon
    VoiceButton.jsx        # Animated mic button (pulse rings when active)

  pages/
    Dashboard.jsx          # Market metrics, price trend chart, AI insights, voice summary
    History.jsx            # Conversation list + transcript viewer + audio player
    VoiceAIFeatures.jsx    # STT demo, TTS voice selector/controls, automation workflows
    Analytics.jsx          # Conversion funnel, radar chart, intent pie, market charts
```

## Navigation

Routing is **state-based** (no react-router). `App.jsx` holds `activePage` state and renders the matching page component. The `Sidebar` calls `onNavigate(id)` to switch pages.

Page IDs:
- `dashboard` → Dashboard
- `history` → History (Verlauf)
- `voice` → VoiceAIFeatures (Voice AI)
- `analytics` → Analytics

## Brand

**Company:** Nebulanexus — space/nebula aesthetic. Every design decision reflects deep-space dark tones with vibrant nebula glow accents.

## Design System

**Font:** Inter (loaded via Google Fonts in `index.html`)

**Color palette** (all inline styles — not Tailwind config):
- Background: `#04080f` (deep space)
- Sidebar: `rgba(6,10,22,0.97)` with `backdrop-filter: blur(24px)`
- Cards: `rgba(255,255,255,0.025)` + `backdrop-filter: blur(20px)` + `border: 1px solid rgba(255,255,255,0.07)`
- Primary purple: `#a855f7`
- Violet: `#8b5cf6` / Indigo: `#6366f1`
- Cyan: `#22d3ee`
- Pink/magenta: `#e879f9`
- Emerald: `#34d399`
- Amber: `#fbbf24`
- Danger: `#f87171`
- Text primary: `#f1f5f9`, secondary: `#94a3b8`, muted: `#475569`

**Gradient text pattern:**
```jsx
style={{ background: 'linear-gradient(135deg, #f8fafc, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
```

**Glass card pattern** — use the `card` const defined in each page, or:
```jsx
style={{ background: 'rgba(255,255,255,0.025)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '24px' }}
```

**MetricCard** — has colored `borderTop: 2px solid {accent}` and gradient number text.

**Decorative background orbs** — defined in `App.jsx` as fixed absolute divs with radial-gradient + blur.

**Tooltip pattern** (Recharts) — each page defines a local `Tip` component (not extracted to shared).

## Data

All data is mock/static in `src/data/mockData.js`. Key exports:

| Export | Description |
|---|---|
| `cityPriceData` | Monthly €/m² prices for 6 German cities |
| `salesVolumeData` | Monthly transactions by segment (Bestand/Neubau/Gewerbe) |
| `rentalData` | Rental rates + yield by city |
| `interestRateData` | Baufinanzierung + EURIBOR trend |
| `constructionData` | Building permits vs completions |
| `voiceQueryData` | Hourly voice query volume |
| `intentDistribution` | Pie data for query intent categories |
| `conversionFunnel` | 6-stage funnel from voice query to Abschluss |
| `weeklyPerformance` | Daily accuracy, satisfaction, query count |
| `conversationHistory` | 5 full conversation objects with transcripts |
| `economicIndicators` | 6 macro KPIs (BIP, inflation, EZB rate, etc.) |
| `aiInsights` | 4 AI-generated market insight objects |
| `voiceMetrics` | Aggregate voice AI KPIs |
| `ttsVoices` | Available TTS voice profiles |
| `automationWorkflows` | 4 workflow definitions |

## Key Conventions

- **No react-router** — page switching via `useState` in App.jsx.
- **Inline styles for colors** — Tailwind utility classes are used for layout/spacing/sizing; colors and gradients are inline to allow precise control.
- **German locale** — all numbers formatted with `toLocaleString('de-DE')`, all UI labels in German.
- **No shared CustomTooltip** — each page file defines its own to avoid coupling.
- **No prop-drilling beyond one level** — components receive only what they need directly.
- **App.css is unused** — do not add styles there; use `index.css` or inline styles.

## Adding a New Page

1. Create `src/pages/NewPage.jsx`
2. Add entry to `pages` object in `src/App.jsx`
3. Add nav item to `navItems` array in `src/components/Sidebar.jsx`
4. Add title entry to `pageTitles` in `src/components/Header.jsx`

## Sidebar Collapse

The sidebar is collapsible (240px ↔ 68px). The main content area has a fixed `marginLeft: '240px'` in `App.jsx`. If dynamic collapse sync is needed, lift the collapsed state up to `App.jsx` and pass it as a prop.
