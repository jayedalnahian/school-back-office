import { Prisma } from "@prisma/client";
import httpStatus from "http-status";
import { TErrorResponse, TErrorSources } from "../interface/error.interface";

export const handlePrismaClientKnownRequestError = (
  error: Prisma.PrismaClientKnownRequestError
): TErrorResponse => {
  let statusCode: number;
  let message: string;
  let errorSources: TErrorSources;

  switch (error.code) {
    case "P2002": {
      statusCode = httpStatus.CONFLICT;
      message = "Unique constraint violation";
      const target = (error.meta?.target as string[] | string) ?? "field";
      const field = Array.isArray(target) ? target.join(", ") : String(target);
      errorSources = [
        {
          path: field,
          message: `${field} already exists. Please provide a unique value.`,
        },
      ];
      break;
    }
    case "P2025": {
      statusCode = httpStatus.NOT_FOUND;
      message = (error.meta?.cause as string) || "Record not found";
      errorSources = [
        {
          path: "",
          message,
        },
      ];
      break;
    }
    case "P2003": {
      statusCode = httpStatus.BAD_REQUEST;
      message = "Foreign key constraint failed";
      const field = (error.meta?.field_name as string) || "foreign_key";
      errorSources = [
        {
          path: field,
          message: `Foreign key constraint failed on field: ${field}`,
        },
      ];
      break;
    }
    default: {
      statusCode = httpStatus.BAD_REQUEST;
      message = error.message;
      errorSources = [
        {
          path: "",
          message: error.message,
        },
      ];
      break;
    }
  }

  return {
    statusCode,
    success: false,
    message,
    errorSources,
  };
};

export const handlePrismaValidationError = (
  error: Prisma.PrismaClientValidationError
): TErrorResponse => {
  const statusCode = httpStatus.BAD_REQUEST;
  const message = "Prisma Validation Error";
  const errorSources: TErrorSources = [
    {
      path: "",
      message: error.message,
    },
  ];

  return {
    statusCode,
    success: false,
    message,
    errorSources,
  };
};

export const handlePrismaError = (
  error: Prisma.PrismaClientKnownRequestError | Prisma.PrismaClientValidationError
): TErrorResponse => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return handlePrismaClientKnownRequestError(error);
  }
  return handlePrismaValidationError(error);
};

export default handlePrismaError;
