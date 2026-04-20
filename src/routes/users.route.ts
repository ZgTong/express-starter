import { Router } from "express";
import type { Routes } from "@interfaces/routes.interface";
import { prisma } from "@utils/prisma";
import { logger } from "@utils/logger";

export class UsersRoute implements Routes {
  public path = "/users";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/`, async (req, res, next) => {
      logger.info("Find all users");
      try {
        const allUsers = await prisma.users.findMany();
        res.status(200).json({ data: allUsers, message: "findAll" });
      } catch (error) {
        next(error);
      }
    });
  }
}
