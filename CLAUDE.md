# CLAUDE.md — BR Soccer Tracker

Bilingual (PT-BR / English) Nuxt 4 app tracking Campeonato Brasileiro Série A, Série B, and Copa do Brasil — live scores, standings, match results, and news.

## Tech Stack

- **Framework:** Nuxt 4 (Vue 3, Nitro server)
- **Language:** TypeScript (strict mode, no `any`)
- **Styling:** Tailwind CSS (custom `pitch` + `accent` theme)
- **Database / Auth:** Supabase (Postgres + RLS + Auth)
- **Runtime:** Node >= 24
- **Package manager:** npm

## Architecture

```
External APIs ──► Nitro scheduled tasks ──► Supabase DB
                                                │
                        Client composables ◄── Server API routes
                              │
                        Vue components
```

- **Client never calls external APIs.** All external data flows through Nitro tasks into Supabase.
- Server API routes read from Supabase and return `{ data, meta?, error? }`.
- Composables use `useFetch` with `transform` to convert snake_case DB rows to camelCase.

## Project Structure

```
app/                  # Client (Nuxt 4 app directory)
  components/         # PascalCase Vue SFCs (base/, match/, standings/, etc.)
  composables/        # kebab-case (useMatches, useNews, useStandings, etc.)
  pages/              # File-based routing
  utils/              # transform.ts (snakeToCamel), format.ts
server/
  api/                # H3 route handlers (matches/, news/, standings/, teams/, health)
  tasks/              # Nitro scheduled tasks (matches/, news/, teams/)
  utils/              # api-football.ts, football-data.ts, rate-limiter.ts, retry.ts, supabase.ts
  plugins/            # env-check.ts (validates env vars on startup)
shared/
  types/              # Shared TypeScript types (Match, Team, Standing, News, Competition)
  constants/          # competitions.ts (COMPETITIONS array, CURRENT_SEASON)
i18n/locales/         # pt-BR.json, en.json
supabase/migrations/  # SQL migrations + seed.sql
tests/                # Vitest tests (composables/, server/, utils/)
docs/                 # Extended documentation
```

## Development Commands

```bash
npm run dev              # Start dev server
npm run build            # Production build
npm run lint             # ESLint check
npm run lint:fix         # ESLint auto-fix
npm run format           # Prettier write
npm run format:check     # Prettier check
npm run test             # Vitest (single run)
npm run test:watch       # Vitest (watch mode)
npm run test:coverage    # Vitest with v8 coverage
npm run db:start         # Start local Supabase
npm run db:stop          # Stop local Supabase
npm run db:reset         # Reset DB (runs migrations + seed)
```

## Code Conventions

### Formatting (Prettier)

No semicolons, single quotes, 2-space indent, 120 char width, trailing commas, LF line endings.

### Linting (ESLint)

- `@typescript-eslint/no-explicit-any`: error
- `@typescript-eslint/no-unused-vars`: error (prefix unused args with `_`)
- `no-console`: warn
- `vue/component-name-in-template-casing`: PascalCase
- `vue/multi-word-component-names`: off

### Naming

| Context                   | Convention                 | Example                          |
| ------------------------- | -------------------------- | -------------------------------- |
| Vue components            | PascalCase file + template | `MatchCard.vue`, `<MatchCard />` |
| Composables, utils, pages | kebab-case files           | `use-matches.ts`, `format.ts`    |
| Database columns          | snake_case                 | `home_team_id`, `kickoff_at`     |
| TypeScript properties     | camelCase                  | `homeTeamId`, `kickoffAt`        |
| Shared types              | PascalCase                 | `Match`, `Competition`           |

### Pre-commit Hooks

Husky runs `lint-staged` on commit: ESLint + Prettier on `*.{ts,vue}`, Prettier on `*.{json,md,css}`.

## Key Patterns

### Client Data Fetching

```ts
const { data, pending, error, refresh } = useFetch('/api/matches/live', {
  query: { competition: competitionQuery },
  transform: (res: { data: Record<string, unknown>[] }) => ({
    data: snakeToCamelArray<Match>(res.data),
  }),
  default: () => ({ data: [] }),
})
```

### Composables

- Use `useState()` for shared reactive state
- Return `readonly()` refs; expose mutation functions explicitly
- Return `pending`, `error`, `refresh` for UI state management

### Server API Routes

```ts
export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event) // RLS-scoped
  const { data, error } = await client.from('matches').select('*')
  if (error) throw createError({ statusCode: 500, statusMessage: error.message })
  return { data }
})
```

### Supabase Access

- **API routes:** `serverSupabaseClient(event)` — respects RLS
- **Scheduled tasks:** `useSupabaseAdmin()` — bypasses RLS (singleton, service role key)

### API Fallback (External Data)

Tasks try API-Football (primary) first, fall back to football-data.org on failure or rate limit:

```ts
if (canCallApi('api-football')) {
  try {
    data = await withRetry(() => fetchLiveFixtures(leagueId))
    recordApiCall('api-football')
  } catch {
    data = await withRetry(() => fdFetchLiveFixtures(leagueId))
  }
} else {
  data = await withRetry(() => fdFetchLiveFixtures(leagueId))
}
```

- `withRetry()`: exponential backoff with jitter (3 retries, retries on 429/5xx)
- `canCallApi()` / `recordApiCall()`: in-memory daily rate limit tracking
- Both API clients export identical function signatures; fallback adapts response types

### Scheduled Tasks

```ts
export default defineTask({
  meta: { name: 'matches:sync-live', description: '...' },
  async run() {
    const supabase = useSupabaseAdmin()
    // ... fetch + upsert logic
    return { result: '...' }
  },
})
```

Schedule: `teams:sync` (daily 4AM), `matches:sync-fixtures` (6h), `matches:sync-standings` (4h), `matches:sync-live` (5min), `news:fetch` (2h).

### Error Handling

- **Server:** `throw createError({ statusCode, statusMessage })`
- **Client:** `<BaseErrorState :message="error" @retry="refresh" />` component with i18n

## Environment Variables

**Required:**

- `SUPABASE_URL` — Supabase project URL
- `SUPABASE_KEY` — Supabase anon key
- `NUXT_SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key

**Optional (external APIs):**

- `NUXT_FOOTBALL_API_KEY` — API-Football (100 req/day free tier)
- `NUXT_GNEWS_API_KEY` — GNews (100 req/day)
- `NUXT_FOOTBALL_DATA_API_KEY` — football-data.org fallback (10 req/min)

See `.env.example` for reference. The server plugin `env-check.ts` validates on startup.

## Testing

Vitest with `@nuxt/test-utils`. Tests live in `tests/` mirroring source structure.

- **Composable/component tests:** `nuxt` environment (happy-dom)
- **Server/utility tests:** `node` environment (matched via `environmentMatchGlobs`)
- Use `registerEndpoint()` from `@nuxt/test-utils/runtime` to mock API routes in tests
- Coverage: v8 provider, scoped to `app/utils/`, `app/composables/`, `server/utils/`, `server/api/`

## CI/CD

GitHub Actions (`ci.yml`): **quality** (lint + format + typecheck) and **test** run in parallel, then **build** + **docker** run in parallel after both pass.

Docker uses multi-stage build (node:24-alpine) with non-root user and healthcheck. `NUXT_SKIP_TYPECHECK=true` in Docker build (typecheck runs separately in CI quality job).
