import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { AcademicYearServices } from "./academic-year.services";

const createAcademicYear = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicYearServices.createAcademicYear(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Academic year created successfully",
    data: result,
  });
});

const getAllAcademicYears = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicYearServices.getAllAcademicYears(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic years retrieved successfully",
    data: result,
  });
});

const getAcademicYearById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicYearServices.getAcademicYearById(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic year retrieved successfully",
    data: result,
  });
});

const updateAcademicYear = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicYearServices.updateAcademicYear(
    id as string,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic year updated successfully",
    data: result,
  });
});

const deleteAcademicYear = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicYearServices.deleteAcademicYear(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic year deleted successfully",
    data: result,
  });
});

export const AcademicYearControllers = {
  createAcademicYear,
  getAllAcademicYears,
  getAcademicYearById,
  updateAcademicYear,
  deleteAcademicYear,
};
