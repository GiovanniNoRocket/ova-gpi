# syntax=docker/dockerfile:1
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NPM_CONFIG_UPDATE_NOTIFIER=false

FROM base AS deps
COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm \
  npm install --legacy-peer-deps

FROM base AS db-setup
RUN apk add --no-cache postgresql-client
COPY --from=deps /app/node_modules ./node_modules
COPY package.json tsconfig.json prisma.config.ts payload.config.ts ./
COPY prisma ./prisma
COPY content/seeds ./content/seeds
COPY src/collections ./src/collections
COPY src/types ./src/types
COPY src/lib/prisma.ts ./src/lib/prisma.ts
COPY scripts/non-interactive.ts ./scripts/non-interactive.ts
COPY scripts/sync-payload-db.ts ./scripts/sync-payload-db.ts
COPY scripts/docker-db-setup.sh ./scripts/docker-db-setup.sh
RUN chmod +x ./scripts/docker-db-setup.sh
ENV NODE_ENV=development
CMD ["./scripts/docker-db-setup.sh"]

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URL=postgresql://ova:ova@localhost:5432/ova_app
ENV PAYLOAD_DATABASE_URL=postgresql://ova:ova@localhost:5432/ova_cms
ENV PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000

RUN --mount=type=cache,target=/root/.npm \
  npx prisma generate
RUN npm run generate:importmap
RUN --mount=type=cache,target=/app/.next/cache \
  npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/sharp ./node_modules/sharp
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@img ./node_modules/@img

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node", "server.js"]
