import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import { NODE_ENV, PORT, ORIGIN, CREDENTIALS } from "@config/index";
import type { Routes } from "@interfaces/routes.interface.ts";
import { ErrorMiddleware } from "@middlewares/error.middleware";
import { logger } from "@utils/logger";
export class App {
  public app: express.Application;
  public port: NodeJS.ProcessEnv["PORT"];
  public env: NodeJS.ProcessEnv["NODE_ENV"];

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = PORT || 3000;
    this.env = NODE_ENV || "development";

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    // this.initializeSwagger(); // TODO
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
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
