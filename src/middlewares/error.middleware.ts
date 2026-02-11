import type { NextFunction, Request, Response } from "express";
import { HttpException } from "@exceptions/httpExceptions";
import { logger } from "@utils/logger";

export const ErrorMiddleware = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";

    logger.error(
      `[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`,
    );
    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};
