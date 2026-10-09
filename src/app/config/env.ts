import dotenv from "dotenv";
import path from "path";
import { z } from "zod";
import AppError from "../errorHelpers/AppError";
import httpStatus from "http-status";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(5000),
  DATABASE_URL: z.string({
    message: "DATABASE_URL is required in environment variables",
  }),
  FRONTEND_URL: z.string({
    message: "FRONTEND_URL is required in environment variables",
  }),
});

const parseEnv = () => {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const errorDetails = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join(", ");
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Environment configuration error: ${errorDetails}`
    );
  }

  return result.data;
};

export const env = parseEnv();
export const envVars = env;
export default env;
