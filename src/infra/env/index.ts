import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number(),
  JWT_SECRET: z.string(),
  TRANSACTION_AUTHORIZATION_SERVICE_URI: z.string(),
  NOTIFICATION_SERVICE_URI: z.string(),
});

export const env = envSchema.parse(process.env);
