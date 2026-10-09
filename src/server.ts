import { Server } from "http";
import app from "./app";
import { envVars } from "./app/config/env";
import { prisma } from "./app/config/prisma";

let server: Server;

async function bootstrap() {
  try {
    // Connect to database via Prisma ($connect())
    await prisma.$connect();
    console.log("Database connected successfully");

    server = app.listen(envVars.PORT, () => {
      console.log(
        `🚀 School Management Server is running on port ${envVars.PORT} in ${envVars.NODE_ENV} mode`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

// Graceful shutdown helper
const handleGracefulShutdown = (signal: string) => {
  console.log(`${signal} received. Initiating graceful shutdown...`);
  if (server) {
    server.close(async () => {
      console.log("HTTP server closed.");
      await prisma.$disconnect();
      console.log("Database connection closed.");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

// Process listeners for SIGTERM & SIGINT
process.on("SIGTERM", () => handleGracefulShutdown("SIGTERM"));
process.on("SIGINT", () => handleGracefulShutdown("SIGINT"));

// Process listener for unhandled promise rejections
process.on("unhandledRejection", (error) => {
  console.error(
    "Unhandled Rejection detected, closing server gracefully...",
    error
  );
  if (server) {
    server.close(async () => {
      await prisma.$disconnect();
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Process listener for uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception detected, shutting down...", error);
  if (server) {
    server.close(async () => {
      await prisma.$disconnect();
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

bootstrap();
