import { config } from "dotenv";

const envFile = process.env.APP_ENV 
  ? `.env.${process.env.APP_ENV}` 
  : `.env.local`;

config({
  path: envFile,
});

export const CREDENTIALS = process.env.CREDENTIALS === "true";
export const { APP_ENV, NODE_ENV } = process.env; // 'development' | 'production' | 'test', injeceted by external tools, not in .env files
export const { PORT, ORIGIN, LOG_FORMAT, LOG_DIR, DATABASE_URL } = process.env; // defined in .env file
