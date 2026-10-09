import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { ShiftServices } from "./shift.services";

const createShift = catchAsync(async (req: Request, res: Response) => {
  const result = await ShiftServices.createShift(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Shift created successfully",
    data: result,
  });
});

const getAllShifts = catchAsync(async (req: Request, res: Response) => {
  const result = await ShiftServices.getAllShifts(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shifts retrieved successfully",
    data: result,
  });
});

const getShiftById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ShiftServices.getShiftById(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shift retrieved successfully",
    data: result,
  });
});

const updateShift = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ShiftServices.updateShift(id as string, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shift updated successfully",
    data: result,
  });
});

const deleteShift = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ShiftServices.deleteShift(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shift deleted successfully",
    data: result,
  });
});

export const ShiftControllers = {
  createShift,
  getAllShifts,
  getShiftById,
  updateShift,
  deleteShift,
};
