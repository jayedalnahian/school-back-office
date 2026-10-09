import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { SubjectServices } from "./subject.services";

const createSubject = catchAsync(async (req: Request, res: Response) => {
  const result = await SubjectServices.createSubject(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Subject created successfully",
    data: result,
  });
});

const getAllSubjects = catchAsync(async (req: Request, res: Response) => {
  const result = await SubjectServices.getAllSubjects(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subjects retrieved successfully",
    data: result,
  });
});

const getSubjectById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SubjectServices.getSubjectById(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subject retrieved successfully",
    data: result,
  });
});

const updateSubject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SubjectServices.updateSubject(id as string, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subject updated successfully",
    data: result,
  });
});

const deleteSubject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SubjectServices.deleteSubject(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subject deleted successfully",
    data: result,
  });
});

export const SubjectControllers = {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};
