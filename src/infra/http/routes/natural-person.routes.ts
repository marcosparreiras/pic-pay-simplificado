import { Router } from "express";
import { createNaturalPersonController } from "../controllers/create-natural-person";
import { ensureAuthMiddleware } from "../middlewares/ensure-auth";
import { bankTransactionController } from "../controllers/bank-transaction";

export const naturalPersonRoutes = Router();

naturalPersonRoutes.post("/", createNaturalPersonController);
naturalPersonRoutes.post(
  "/transaction",
  ensureAuthMiddleware,
  bankTransactionController
);
