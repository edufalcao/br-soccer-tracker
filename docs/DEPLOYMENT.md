# Deployment Guide

## Prerequisites

- **Node.js** >= 24
- **Docker** (for containerized deployment and local Supabase)
- **Supabase** project (cloud or local)
- **API keys** for external services (see Environment Variables)

## Local Development Setup

```bash
# 1. Clone the repository
git clone git@github.com:<owner>/br-soccer-tracker.git
cd br-soccer-tracker

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your actual values

# 4. Start local Supabase (runs in Docker)
npm run db:start

# 5. Start the dev server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Docker Development

```bash
# Start with docker compose (hot reload enabled)
docker compose up
```

> **Note:** You still need Supabase running on the host (`npm run db:start`) or configured to point to a remote instance.

## Environment Variables

| Variable                         | Required | Description                                   |
| -------------------------------- | -------- | --------------------------------------------- |
| `SUPABASE_URL`                   | ✅       | Supabase project URL                          |
| `SUPABASE_KEY`                   | ✅       | Supabase anon (public) key                    |
| `NUXT_SUPABASE_SERVICE_ROLE_KEY` | ✅       | Supabase service role key (server-side only)  |
| `NUXT_FOOTBALL_API_KEY`          | ❌       | API-Football key (api-sports.io) — match data |
| `NUXT_GNEWS_API_KEY`             | ❌       | GNews API key — news articles                 |
| `NUXT_FOOTBALL_DATA_API_KEY`     | ❌       | football-data.org key — fallback match data   |

Optional keys control scheduled sync tasks. Without them, the corresponding features won't populate data but the app will still run.

## Docker Deployment

### Build

```bash
docker build --target runtime -t br-soccer-tracker .
```

### Run

```bash
docker run -d \
  --name br-soccer-tracker \
  -p 3000:3000 \
  -e SUPABASE_URL=https://your-project.supabase.co \
  -e SUPABASE_KEY=your-anon-key \
  -e NUXT_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key \
  -e NUXT_FOOTBALL_API_KEY=your-key \
  -e NUXT_GNEWS_API_KEY=your-key \
  br-soccer-tracker
```

The container includes a health check on `/api/health` (every 30s).

### Verify

```bash
# Check health
curl http://localhost:3000/api/health

# Check container status
docker ps
```

## CI/CD Pipeline

The GitHub Actions CI pipeline (`.github/workflows/ci.yml`) runs on every push to `main` and on pull requests:

| Job         | Description                                          |
| ----------- | ---------------------------------------------------- |
| **quality** | ESLint, Prettier format check, TypeScript type check |
| **test**    | Vitest unit & integration tests                      |
| **build**   | Nuxt production build (with dummy env vars)          |
| **docker**  | Docker image build validation (no push)              |

The `build` and `docker` jobs run after `quality` and `test` pass.

## Production Checklist

- [ ] **Supabase** project created with all migrations applied
- [ ] **RLS policies** enabled on all tables
- [ ] **Environment variables** set for all required keys
- [ ] **API keys** obtained: API-Football, GNews (optional: football-data.org)
- [ ] **DNS** configured to point to your server
- [ ] **HTTPS** / TLS termination configured (reverse proxy or platform)
- [ ] **Health check** endpoint responding: `GET /api/health`
- [ ] **Scheduled tasks** verified (team sync, match sync, news fetch)
- [ ] **Backups** configured for Supabase database
