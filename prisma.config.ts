import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// important, consistant with the .env file naming convention in src/config/index.ts
config({
  path: `.env.${process.env.APP_ENV || "local"}`,
});

export default defineConfig({
  schema: "src/prisma/schema.prisma",
  migrations: {
    path: "src/prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
