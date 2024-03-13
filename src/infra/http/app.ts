import express from "express";
import { routes } from "./routes";
import { ErrorHanlderMiddleware } from "./middlewares/error-handler";

export const app = express();

app.use(express.json());
app.use(routes);
app.use(ErrorHanlderMiddleware);
