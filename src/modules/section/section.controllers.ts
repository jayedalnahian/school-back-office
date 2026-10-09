import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { SectionServices } from "./section.services";

const createSection = catchAsync(async (req: Request, res: Response) => {
  const result = await SectionServices.createSection(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Section created successfully",
    data: result,
  });
});

const getAllSections = catchAsync(async (req: Request, res: Response) => {
  const result = await SectionServices.getAllSections(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Sections retrieved successfully",
    data: result,
  });
});

const getSectionById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SectionServices.getSectionById(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Section retrieved successfully",
    data: result,
  });
});

const updateSection = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SectionServices.updateSection(id as string, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Section updated successfully",
    data: result,
  });
});

const deleteSection = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SectionServices.deleteSection(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Section deleted successfully",
    data: result,
  });
});

export const SectionControllers = {
  createSection,
  getAllSections,
  getSectionById,
  updateSection,
  deleteSection,
};
