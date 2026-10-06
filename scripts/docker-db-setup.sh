#!/bin/sh
set -e

export CI=true

PGHOST="${PGHOST:-postgres}"
PGUSER="${PGUSER:-ova}"
PGPASSWORD="${PGPASSWORD:-ova}"

echo "==> [0/4] Ensure databases ova_app and ova_cms exist"
for db in ova_app ova_cms; do
  exists=$(psql -h "$PGHOST" -U "$PGUSER" -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname = '${db}'" 2>/dev/null || true)
  if [ "$exists" != "1" ]; then
    echo "    Creating database ${db}..."
    psql -h "$PGHOST" -U "$PGUSER" -d postgres -c "CREATE DATABASE ${db};"
  else
    echo "    Database ${db} already exists."
  fi
done

echo "==> [1/4] Prisma migrate (ova_app)"
npx prisma migrate deploy

echo "==> [2/4] Prisma generate"
npx prisma generate

echo "==> [3/4] Payload schema sync (ova_cms)"
npx tsx scripts/sync-payload-db.ts

echo "==> [4/4] Database seed"
npx tsx prisma/seed.ts

echo "==> db-setup completed successfully"
