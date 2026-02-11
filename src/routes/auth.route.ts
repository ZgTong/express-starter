import { Router } from "express";
import type { Routes } from "@interfaces/routes.interface";

export class AuthRoute implements Routes {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/auth", (req, res) => {
      res.send("Auth Route");
    });
  }
}
