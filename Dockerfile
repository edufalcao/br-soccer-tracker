# Development target
FROM node:24-alpine AS dev
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Stage 1: Install dependencies
FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Stage 2: Build
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Build-time env vars required by Nuxt/Supabase (overridable via --build-arg)
ARG SUPABASE_URL=http://placeholder.supabase.co
ARG SUPABASE_KEY=placeholder-anon-key
ARG NUXT_SUPABASE_SERVICE_ROLE_KEY=placeholder
ENV SUPABASE_URL=$SUPABASE_URL
ENV SUPABASE_KEY=$SUPABASE_KEY
ENV NUXT_SUPABASE_SERVICE_ROLE_KEY=$NUXT_SUPABASE_SERVICE_ROLE_KEY
RUN npm run build

# Stage 3: Production runtime
FROM node:24-alpine AS runtime
WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=build /app/.output ./.output

ENV NODE_ENV=production
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

USER appuser
CMD ["node", ".output/server/index.mjs"]
