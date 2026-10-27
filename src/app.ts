import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import qs from "qs";
import { envVars } from "./app/config/env";
import router from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";

const app: Application = express();

// Query parser configuration using qs
app.set("query parser", (str: string) => qs.parse(str));

// CORS configuration
const allowedOrigins = [
  envVars.FRONTEND_URL,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3001",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, server-to-server, curl)
      if (!origin) return callback(null, true);

      // Allow listed origins, local network origins, or any ngrok domain
      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^http:\/\/(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+)(:\d+)?$/.test(origin) ||
        /\.ngrok(-free)?\.(dev|app|io)$/.test(new URL(origin).hostname);

      if (isAllowed) {
        return callback(null, true);
      }

      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "ngrok-skip-browser-warning",
      "Cache-Control",
      "Pragma",
    ],
  })
);

// Body and cookie parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Incoming request logging middleware
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Health check endpoint at GET /
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "School Management API is running",
  });
});

// Application routes
app.use("/api/v1", router);

// Global Error Handler
app.use(globalErrorHandler);

// Not Found Handler
app.use(notFound);




export default app;



