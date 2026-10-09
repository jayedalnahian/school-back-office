import httpStatus from "http-status";
import AppError from "../../app/errorHelpers/AppError";
import prisma from "../../app/config/prisma";
import { AttendanceModels } from "./attendance.models";
import {
  IAttendance,
  IAttendanceFilters,
  ICreateAttendancePayload,
  IUpdateAttendancePayload,
} from "./attendance.types";

const createAttendance = async (
  payload: ICreateAttendancePayload
): Promise<IAttendance> => {
  const student = await prisma.students.findFirst({
    where: { id: payload.student_id, is_deleted: false },
  });
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, "Student not found");
  }

  const academicYear = await prisma.academic_years.findFirst({
    where: { id: payload.academic_year_id, is_deleted: false },
  });
  if (!academicYear) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic year not found");
  }

  const attendanceDate = new Date(payload.date);
  const existingAttendance = await AttendanceModels.findByStudentYearAndDate(
    payload.student_id,
    payload.academic_year_id,
    attendanceDate
  );
  if (existingAttendance) {
    throw new AppError(
      httpStatus.CONFLICT,
      "Attendance already recorded for this student on this date"
    );
  }

  return await AttendanceModels.create(payload);
};

const getAllAttendances = async (
  filters: IAttendanceFilters = {}
): Promise<IAttendance[]> => {
  return await AttendanceModels.findAll(filters);
};

const getAttendanceById = async (id: string): Promise<IAttendance> => {
  const attendance = await AttendanceModels.findById(id);
  if (!attendance) {
    throw new AppError(httpStatus.NOT_FOUND, "Attendance record not found");
  }

  return attendance;
};

const updateAttendance = async (
  id: string,
  payload: IUpdateAttendancePayload
): Promise<IAttendance> => {
  const attendance = await AttendanceModels.findById(id);
  if (!attendance) {
    throw new AppError(httpStatus.NOT_FOUND, "Attendance record not found");
  }

  return await AttendanceModels.update(id, payload);
};

const deleteAttendance = async (id: string): Promise<IAttendance> => {
  const attendance = await AttendanceModels.findById(id);
  if (!attendance) {
    throw new AppError(httpStatus.NOT_FOUND, "Attendance record not found");
  }

  return await AttendanceModels.softDelete(id);
};

export const AttendanceServices = {
  createAttendance,
  getAllAttendances,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
};
