◇ injected env (6) from .env.local // tip: ⌘ multiple files { path: ['.env.local', '.env'] }
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "users" (
    "f_name" VARCHAR(255) NOT NULL,
    "l_name" VARCHAR(255) NOT NULL,
    "id" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

