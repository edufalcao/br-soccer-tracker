# BR Soccer Tracker

Bilingual (PT-BR / English) website to track Brazilian soccer — Campeonato Brasileiro Série A, Série B, and Copa do Brasil.

## Tech Stack

- **Runtime:** Node > 24
- **Framework:** Nuxt 4 (100% TypeScript, strict mode)
- **Styling:** Tailwind CSS
- **Database/Auth:** Supabase
- **Containerization:** Docker (multi-stage builds)
- **Design:** Mobile-first responsive

## Features

- Personalized news feed (favorite teams first, then general)
- Live/recent match scores and upcoming fixtures
- League standings for Série A, Série B, and Copa do Brasil
- Favorite team selection (localStorage for anonymous, Supabase for logged-in users)
- User authentication (email/password via Supabase Auth)
- Internationalization (Portuguese + English with quick language switcher)

## External APIs

| Purpose               | API                          | Free Tier   |
| --------------------- | ---------------------------- | ----------- |
| Match data (primary)  | API-Football (api-sports.io) | 100 req/day |
| Match data (fallback) | football-data.org            | 10 req/min  |
| News (primary)        | GNews API (gnews.io)         | 100 req/day |
| News (supplementary)  | Google News RSS              | Unlimited   |

All external API calls happen exclusively in server-side Nitro scheduled tasks. Client-facing routes read only from Supabase.

## Architecture

```
External APIs  →  Nitro scheduled tasks  →  Supabase (cache/store)
                                                     ↓
                                              Server API routes
                                                     ↓
                                              Client composables
                                                     ↓
                                              Vue components
```

## Implementation Status

### Phase 1: Project Foundation ✅

- [x] Create project documentation
- [x] Initialize Nuxt 4 project with TypeScript
- [x] Configure strict TypeScript (`tsconfig.json`)
- [x] Install dependencies (`@nuxtjs/tailwindcss`, `@nuxtjs/supabase`, `@nuxtjs/i18n`)
- [x] Configure linting (ESLint, Prettier, EditorConfig, VSCode settings)
- [x] Configure pre-commit hooks (husky + lint-staged)
- [x] Configure `nuxt.config.ts` (modules, Nitro tasks, runtime config, i18n)
- [x] Create Docker files (Dockerfile, docker-compose.yml, .dockerignore)
- [x] Set up Tailwind with soccer-themed palette
- [x] Create i18n locale files (pt-BR.json, en.json)
- [x] Set up Supabase (init, migrations, RLS policies)
- [x] Create shared types and constants
- [x] Create base layout with header/footer and language switcher

### Phase 2: Data Layer — Server Tasks & API Routes ✅

- [x] Build server utilities (supabase.ts, api-football.ts, news-sources.ts, competitions.ts)
- [x] Implement Nitro scheduled tasks (news fetch, live sync, fixtures sync, standings sync, teams sync)
- [x] Configure cron schedules
- [x] Implement server API routes (news, matches, standings, teams)

### Phase 3: Core UI — News, Matches, Standings ✅

- [x] Build UI primitives (BaseButton, BaseCard, BaseTabs, etc.)
- [x] Home page (live scores ticker + news feed)
- [x] News page (filterable list + detail page)
- [x] Matches page (Live / Recent / Upcoming tabs)
- [x] Standings page (competition tabs + responsive table)

### Phase 4: Favorite Teams

- [ ] Build `useFavoriteTeams` composable (dual persistence)
- [ ] Build FavoriteTeamPicker component and /favorites page
- [ ] Personalize home page based on favorites
- [ ] Highlight favorites in standings and match lists

### Phase 5: Authentication

- [ ] Configure Supabase Auth (email/password)
- [ ] Build login, register, and confirm pages
- [ ] Build auth middleware and settings page
- [ ] Implement user preference API routes
- [ ] Merge localStorage favorites with DB on login

### Phase 6: i18n Polish

- [ ] Complete all translation keys
- [ ] Language switcher persistence (cookie + DB)
- [ ] Locale-aware date/time formatting
- [ ] News content fallback strategy

### Phase 7: Mobile-First Design Polish

- [ ] Bottom tab navigation on mobile
- [ ] Responsive layouts (single-column mobile, multi-column desktop)
- [ ] Skeleton loading states, lazy image loading
- [ ] SEO (useHead, useSeoMeta per page)

### Phase 8: Testing & Error Handling

- [ ] Unit tests for composables (Vitest)
- [ ] Component tests (@nuxt/test-utils)
- [ ] API route tests
- [ ] Global error page and graceful degradation
