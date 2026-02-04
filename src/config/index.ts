import { config } from 'dotenv';

config({
  path: `.env.${process.env.NODE_ENV || 'development'}.local`,
});

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV } = process.env; // 'development' | 'production' | 'test', injeceted by external tools, not in .env files
export const { PORT,  ORIGIN, LOG_FORMAT, LOG_DIR } = process.env; // defined in .env files