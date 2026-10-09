import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { EnrollmentServices } from "./enrollment.services";

const createEnrollment = catchAsync(async (req: Request, res: Response) => {
  const result = await EnrollmentServices.createEnrollment(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Enrollment created successfully",
    data: result,
  });
});

const getAllEnrollments = catchAsync(async (req: Request, res: Response) => {
  const result = await EnrollmentServices.getAllEnrollments(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Enrollments retrieved successfully",
    data: result,
  });
});

const getEnrollmentById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EnrollmentServices.getEnrollmentById(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Enrollment retrieved successfully",
    data: result,
  });
});

const updateEnrollment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EnrollmentServices.updateEnrollment(
    id as string,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Enrollment updated successfully",
    data: result,
  });
});

const deleteEnrollment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EnrollmentServices.deleteEnrollment(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Enrollment deleted successfully",
    data: result,
  });
});

export const EnrollmentControllers = {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment,
};
