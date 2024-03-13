import { Router } from "express";
import { createNaturalPersonController } from "../controllers/create-natural-person";

export const naturalPersonRoutes = Router();

naturalPersonRoutes.post("/", createNaturalPersonController);
