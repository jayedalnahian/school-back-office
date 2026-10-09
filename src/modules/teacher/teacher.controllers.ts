import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { TeacherServices } from "./teacher.services";

const createTeacher = catchAsync(async (req: Request, res: Response) => {
  const result = await TeacherServices.createTeacher(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Teacher profile created successfully",
    data: result,
  });
});

const getAllTeachers = catchAsync(async (req: Request, res: Response) => {
  const result = await TeacherServices.getAllTeachers(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Teachers retrieved successfully",
    data: result,
  });
});

const getTeacherById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TeacherServices.getTeacherById(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Teacher retrieved successfully",
    data: result,
  });
});

const updateTeacher = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TeacherServices.updateTeacher(id as string, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Teacher updated successfully",
    data: result,
  });
});

const deleteTeacher = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TeacherServices.deleteTeacher(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Teacher deleted successfully",
    data: result,
  });
});

export const TeacherControllers = {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};
