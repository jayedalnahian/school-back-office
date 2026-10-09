import { Response } from "express";

export type TResponseData<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPage?: number;
  };
  data: T;
};

export const sendResponse = <T>(res: Response, data: TResponseData<T>): void => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message ?? null,
    ...(data.meta ? { meta: data.meta } : {}),
    data: data.data,
  });
};

export default sendResponse;
