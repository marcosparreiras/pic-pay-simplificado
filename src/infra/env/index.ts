import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number(),
  JWT_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
