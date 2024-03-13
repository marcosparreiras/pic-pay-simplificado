import { Router } from "express";
import { naturalPersonRoutes } from "./natural-person.routes";
import { shopkeeperRoutes } from "./shopkeeper.routes";

export const routes = Router();

routes.use("/natural-person", naturalPersonRoutes);
routes.use("/shopkeeper", shopkeeperRoutes);
