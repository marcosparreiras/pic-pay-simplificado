import { Router } from "express";
import { naturalPersonRoutes } from "./natural-person.routes";
import { shopkeeperRoutes } from "./shopkeeper.routes";
import { authenticateUserController } from "../controllers/authenticate-user";

export const routes = Router();

routes.use("/natural-person", naturalPersonRoutes);
routes.use("/shopkeeper", shopkeeperRoutes);
routes.post("/session", authenticateUserController);
