-- RBAC migration

CREATE TYPE "role" AS ENUM ('owner','admin','member');

CREATE TABLE IF NOT EXISTS "organization_member" (
    "id" SERIAL PRIMARY KEY,
    "organization_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" "role" NOT NULL DEFAULT 'member',
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT organization_user_unique UNIQUE ("organization_id","user_id")
); 