import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { IndicatorServices } from "./indicator.services";

const createIndicator = catchAsync(async (req: Request, res: Response) => {
  const result = await IndicatorServices.createIndicator(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Evaluation indicator created successfully",
    data: result,
  });
});

const getAllIndicators = catchAsync(async (req: Request, res: Response) => {
  const result = await IndicatorServices.getAllIndicators(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Evaluation indicators retrieved successfully",
    data: result,
  });
});

const getIndicatorById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await IndicatorServices.getIndicatorById(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Evaluation indicator retrieved successfully",
    data: result,
  });
});

const updateIndicator = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await IndicatorServices.updateIndicator(id as string, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Evaluation indicator updated successfully",
    data: result,
  });
});

const deleteIndicator = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await IndicatorServices.deleteIndicator(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Evaluation indicator deleted successfully",
    data: result,
  });
});

export const IndicatorControllers = {
  createIndicator,
  getAllIndicators,
  getIndicatorById,
  updateIndicator,
  deleteIndicator,
};
