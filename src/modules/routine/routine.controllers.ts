import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { RoutineServices } from "./routine.services";

const createRoutine = catchAsync(async (req: Request, res: Response) => {
  const result = await RoutineServices.createRoutine(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Class routine created successfully",
    data: result,
  });
});

const getAllRoutines = catchAsync(async (req: Request, res: Response) => {
  const result = await RoutineServices.getAllRoutines(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Class routines retrieved successfully",
    data: result,
  });
});

const getRoutineById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RoutineServices.getRoutineById(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Class routine retrieved successfully",
    data: result,
  });
});

const updateRoutine = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RoutineServices.updateRoutine(id as string, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Class routine updated successfully",
    data: result,
  });
});

const deleteRoutine = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RoutineServices.deleteRoutine(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Class routine deleted successfully",
    data: result,
  });
});

export const RoutineControllers = {
  createRoutine,
  getAllRoutines,
  getRoutineById,
  updateRoutine,
  deleteRoutine,
};
