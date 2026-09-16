#!/bin/bash
set -e

# Runs once when the Postgres volume is first created.
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE DATABASE ova_app;
	CREATE DATABASE ova_cms;
EOSQL
