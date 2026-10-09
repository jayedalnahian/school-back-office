import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { ClassServices } from "./class.services";

const createClass = catchAsync(async (req: Request, res: Response) => {
  const result = await ClassServices.createClass(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Class created successfully",
    data: result,
  });
});

const getAllClasses = catchAsync(async (req: Request, res: Response) => {
  const result = await ClassServices.getAllClasses(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Classes retrieved successfully",
    data: result,
  });
});

const getClassById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ClassServices.getClassById(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Class retrieved successfully",
    data: result,
  });
});

const updateClass = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ClassServices.updateClass(id as string, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Class updated successfully",
    data: result,
  });
});

const deleteClass = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ClassServices.deleteClass(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Class deleted successfully",
    data: result,
  });
});

export const ClassControllers = {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
};
