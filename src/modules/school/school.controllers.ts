import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { SchoolServices } from "./school.services";

const createSchool = catchAsync(async (req: Request, res: Response) => {
  const result = await SchoolServices.createSchool(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "School created successfully",
    data: result,
  });
});

const onboardSchool = catchAsync(async (req: Request, res: Response) => {
  const result = await SchoolServices.onboardSchool(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "School and admin onboarded successfully",
    data: result,
  });
});

const getAllSchools = catchAsync(async (req: Request, res: Response) => {
  const result = await SchoolServices.getAllSchools(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schools retrieved successfully",
    data: result,
  });
});

const getSchoolById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SchoolServices.getSchoolById(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "School retrieved successfully",
    data: result,
  });
});

const updateSchool = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SchoolServices.updateSchool(id as string, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "School updated successfully",
    data: result,
  });
});

const deleteSchool = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SchoolServices.deleteSchool(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "School deleted successfully",
    data: result,
  });
});

export const SchoolControllers = {
  createSchool,
  onboardSchool,
  getAllSchools,
  getSchoolById,
  updateSchool,
  deleteSchool,
};
