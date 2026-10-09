import { Request, Response } from "express";
import httpStatus from "http-status";

export const notFound = (req: Request, res: Response): void => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API Route Not Found",
    errorSources: [
      {
        path: req.originalUrl,
        message: `Route ${req.originalUrl} not found`,
      },
    ],
  });
};

export default notFound;
