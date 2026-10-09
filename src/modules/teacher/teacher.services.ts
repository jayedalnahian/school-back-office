import httpStatus from "http-status";
import AppError from "../../app/errorHelpers/AppError";
import prisma from "../../app/config/prisma";
import { TeacherModels } from "./teacher.models";
import {
  ICreateTeacherPayload,
  ITeacher,
  ITeacherFilters,
  IUpdateTeacherPayload,
} from "./teacher.types";

const createTeacher = async (
  payload: ICreateTeacherPayload
): Promise<ITeacher> => {
  const user = await prisma.users.findFirst({
    where: { id: payload.user_id, is_deleted: false },
  });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const school = await prisma.school.findFirst({
    where: { id: payload.school_id, is_deleted: false },
  });
  if (!school) {
    throw new AppError(httpStatus.NOT_FOUND, "School not found");
  }

  const existingTeacher = await TeacherModels.findByUserId(payload.user_id);
  if (existingTeacher) {
    throw new AppError(
      httpStatus.CONFLICT,
      `Teacher profile already exists for user ID '${payload.user_id}'`
    );
  }

  return await TeacherModels.create(payload);
};

const getAllTeachers = async (
  filters: ITeacherFilters = {}
): Promise<ITeacher[]> => {
  return await TeacherModels.findAll(filters);
};

const getTeacherById = async (id: string): Promise<ITeacher> => {
  const teacher = await TeacherModels.findById(id);
  if (!teacher) {
    throw new AppError(httpStatus.NOT_FOUND, "Teacher not found");
  }

  return teacher;
};

const updateTeacher = async (
  id: string,
  payload: IUpdateTeacherPayload
): Promise<ITeacher> => {
  const teacher = await TeacherModels.findById(id);
  if (!teacher) {
    throw new AppError(httpStatus.NOT_FOUND, "Teacher not found");
  }

  return await TeacherModels.update(id, payload);
};

const deleteTeacher = async (id: string): Promise<ITeacher> => {
  const teacher = await TeacherModels.findById(id);
  if (!teacher) {
    throw new AppError(httpStatus.NOT_FOUND, "Teacher not found");
  }

  return await TeacherModels.softDelete(id);
};

export const TeacherServices = {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};
