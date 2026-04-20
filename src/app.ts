import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import { Server } from "http";
import { APP_ENV, PORT, ORIGIN, CREDENTIALS } from "@config/index";
import type { Routes } from "@interfaces/routes.interface.ts";
import { ErrorMiddleware } from "@middlewares/error.middleware";
import { logger } from "@utils/logger";
import { prisma } from "@utils/prisma";

export class App {
  public app: express.Application;
  public port: NodeJS.ProcessEnv["PORT"];
  public env: NodeJS.ProcessEnv["APP_ENV"];
  private server?: Server;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = PORT || 3000;
    this.env = APP_ENV;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    // this.initializeSwagger(); // TODO
    this.initializeErrorHandling();
  }

  public async listen() {
    try {
      await prisma.$connect();
      logger.info(`Prisma connected to database`);
      this.server = this.app.listen(this.port);
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);

      // Graceful shutdown handlers
      process.on("SIGINT", this.stop.bind(this));
      process.on("SIGTERM", this.stop.bind(this));
      process.on("uncaughtException", (error) => {
        logger.error(`Uncaught Exception`, error);
        this.stop();
      });
      process.on("unhandledRejection", (reason, promise) => {
        logger.error(`Unhandled Rejection at:`, promise, `reason:`, reason);
        this.stop();
      });
    } catch (error) {
      logger.error(`App initialization failed`, error);
      await this.stop();
    }
  }

  public async stop() {
    logger.info(`Stopping the application...`);
    await prisma.$disconnect();
    if (this.server) {
      this.server.close();
    }
    process.exit(0);
  }

  private initializeMiddlewares() {
    // this.app.use(morgan(LOG_FORMAT, { stream })); // TODO
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use(route.path || "/", route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
