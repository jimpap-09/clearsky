#!/bin/bash
set -e

echo "Creating databases: $POSTGRES_MULTIPLE_DATABASES"

for db in $(echo $POSTGRES_MULTIPLE_DATABASES | tr ',' ' '); do
  echo "Creating $db database..."
  psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE $db;
    GRANT ALL PRIVILEGES ON DATABASE $db TO $POSTGRES_USER;
EOSQL
done

echo "Databases created!"