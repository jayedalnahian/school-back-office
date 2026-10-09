import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { GuardianServices } from "./guardian.services";

const createGuardian = catchAsync(async (req: Request, res: Response) => {
  const result = await GuardianServices.createGuardian(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Guardian profile created successfully",
    data: result,
  });
});

const getAllGuardians = catchAsync(async (req: Request, res: Response) => {
  const result = await GuardianServices.getAllGuardians(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Guardians retrieved successfully",
    data: result,
  });
});

const getGuardianById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await GuardianServices.getGuardianById(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Guardian retrieved successfully",
    data: result,
  });
});

const updateGuardian = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await GuardianServices.updateGuardian(id as string, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Guardian updated successfully",
    data: result,
  });
});

const deleteGuardian = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await GuardianServices.deleteGuardian(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Guardian deleted successfully",
    data: result,
  });
});

export const GuardianControllers = {
  createGuardian,
  getAllGuardians,
  getGuardianById,
  updateGuardian,
  deleteGuardian,
};
