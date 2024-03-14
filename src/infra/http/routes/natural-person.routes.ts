import { Router } from "express";
import { createNaturalPersonController } from "../controllers/create-natural-person";
import { ensureAuthMiddleware } from "../middlewares/ensure-auth";

export const naturalPersonRoutes = Router();

naturalPersonRoutes.post("/", createNaturalPersonController);
naturalPersonRoutes.get("/", ensureAuthMiddleware);
