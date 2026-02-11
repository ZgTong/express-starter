// Augmentation of NodeJS ProcessEnv to include custom environment variables
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    PORT: number;
    ORIGIN: string;
    CREDENTIALS: "true" | "false";
    LOG_FORMAT: string;
    LOG_DIR: string;
  }
}
