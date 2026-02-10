# BR Soccer Tracker

Bilingual (PT-BR / English) website to track Brazilian soccer — Campeonato Brasileiro Série A, Série B, and Copa do Brasil.

Live scores, match results, league standings, and news — all in one place.

## Tech Stack

- **Framework:** Nuxt 4 (100% TypeScript, strict mode)
- **Styling:** Tailwind CSS
- **Database / Auth:** Supabase
- **Runtime:** Node >= 24
- **Containerization:** Docker

## Prerequisites

- [Node.js](https://nodejs.org/) >= 24
- [Docker](https://www.docker.com/) (required for local Supabase, optional for containerized dev)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` with your keys:

| Variable                         | Description                                                          |
| -------------------------------- | -------------------------------------------------------------------- |
| `SUPABASE_URL`                   | Supabase project URL (local: `http://localhost:54321`)               |
| `SUPABASE_KEY`                   | Supabase anon key                                                    |
| `NUXT_SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server tasks)                             |
| `NUXT_API_FOOTBALL_KEY`          | API-Football key from [api-sports.io](https://www.api-football.com/) |
| `NUXT_GNEWS_API_KEY`             | GNews API key from [gnews.io](https://gnews.io/)                     |
| `NUXT_FOOTBALL_DATA_KEY`         | football-data.org API key (fallback, optional)                       |

### 3. Start Supabase locally

```bash
npm run db:start
```

This spins up a local Postgres database, Auth server, and REST API. Migrations in `supabase/migrations/` are applied automatically.

### 4. Run the dev server

```bash
npm run dev
```

The app is available at [http://localhost:3000](http://localhost:3000).

## Docker

### Development

```bash
docker compose up
```

Runs the Nuxt dev server with hot reload inside a container. Requires a running Supabase instance (via `npm run db:start` on the host or a separate Supabase container).

### Production build

```bash
docker build --target runtime -t br-soccer-tracker .
docker run -p 3000:3000 --env-file .env br-soccer-tracker
```

## Scripts

| Command                 | Description                        |
| ----------------------- | ---------------------------------- |
| `npm run dev`           | Start development server           |
| `npm run build`         | Build for production               |
| `npm run preview`       | Preview production build           |
| `npm run lint`          | Run ESLint                         |
| `npm run lint:fix`      | Run ESLint with auto-fix           |
| `npm run format`        | Format all files with Prettier     |
| `npm run format:check`  | Check Prettier formatting          |
| `npm test`              | Run all tests (Vitest)             |
| `npm run test:watch`    | Run tests in watch mode            |
| `npm run test:coverage` | Run tests with coverage report     |
| `npm run db:start`      | Start local Supabase (via Docker)  |
| `npm run db:stop`       | Stop local Supabase                |
| `npm run db:reset`      | Reset database & re-run migrations |
| `npm run db:status`     | Show Supabase service status       |

## Testing

Tests are written with [Vitest](https://vitest.dev/) and [@nuxt/test-utils](https://nuxt.com/docs/getting-started/testing).

```bash
# Run all tests
npm test

# Watch mode (re-runs on file changes)
npm run test:watch

# With coverage report
npm run test:coverage
```

### Test Structure

```
tests/
├── composables/      # Unit tests for Vue composables
├── server/api/       # Server API route tests
└── utils/            # Utility function tests
```

**Current coverage:** 74 tests passing across composables, server API routes, and utilities.

## Project Structure

```
app/                  # Client-side (Nuxt 4)
├── components/       # Vue components (auto-imported)
├── composables/      # Data-fetching composables
├── layouts/          # Page layouts
├── pages/            # File-based routing
└── utils/            # Client utilities

server/               # Server-side (Nitro)
├── api/              # API routes (news, matches, standings, teams)
├── tasks/            # Scheduled tasks (cron jobs)
└── utils/            # Server utilities

shared/types/         # TypeScript types shared between client & server
i18n/locales/         # Translation files (pt-BR.json, en.json)
supabase/migrations/  # Database schema & RLS policies
```

## External APIs

All external API calls happen exclusively in server-side Nitro scheduled tasks. Client-facing routes read only from Supabase.

| Purpose               | API                                                | Free Tier   |
| --------------------- | -------------------------------------------------- | ----------- |
| Match data (primary)  | [API-Football](https://www.api-football.com/)      | 100 req/day |
| Match data (fallback) | [football-data.org](https://www.football-data.org) | 10 req/min  |
| News (primary)        | [GNews](https://gnews.io/)                         | 100 req/day |
| News (supplementary)  | Google News RSS                                    | Unlimited   |

## Health Check

The `/api/health` endpoint returns system health status:

```bash
curl http://localhost:3000/api/health
```

Response includes:

- **status**: `ok` | `degraded` | `error`
- **supabase**: database connectivity
- **apiFootball / gnews**: remaining daily API calls and health
- **uptime**: server uptime in seconds

## License

Private project.
