import { Router } from "express";
import { createShopkeeperController } from "../controllers/create-shopkeeper";

export const shopkeeperRoutes = Router();

shopkeeperRoutes.post("/", createShopkeeperController);
