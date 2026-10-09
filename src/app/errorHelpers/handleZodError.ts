import { ZodError } from "zod";
import httpStatus from "http-status";
import { TErrorResponse, TErrorSources } from "../interface/error.interface";

export const handleZodError = (error: ZodError): TErrorResponse => {
  const errorSources: TErrorSources = error.issues.map((issue) => {
    const lastPath = issue.path[issue.path.length - 1];
    return {
      path: typeof lastPath === "symbol" ? lastPath.toString() : (lastPath ?? ""),
      message: issue.message,
    };
  });

  const statusCode: number = httpStatus.BAD_REQUEST;

  return {
    statusCode,
    success: false,
    message: "Validation Error",
    errorSources,
  };
};

export default handleZodError;
