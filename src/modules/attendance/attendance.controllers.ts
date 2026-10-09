import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { AttendanceServices } from "./attendance.services";

const createAttendance = catchAsync(async (req: Request, res: Response) => {
  const result = await AttendanceServices.createAttendance(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Attendance recorded successfully",
    data: result,
  });
});

const getAllAttendances = catchAsync(async (req: Request, res: Response) => {
  const result = await AttendanceServices.getAllAttendances(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Attendances retrieved successfully",
    data: result,
  });
});

const getAttendanceById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AttendanceServices.getAttendanceById(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Attendance retrieved successfully",
    data: result,
  });
});

const updateAttendance = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AttendanceServices.updateAttendance(
    id as string,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Attendance updated successfully",
    data: result,
  });
});

const deleteAttendance = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AttendanceServices.deleteAttendance(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Attendance deleted successfully",
    data: result,
  });
});

export const AttendanceControllers = {
  createAttendance,
  getAllAttendances,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
};
