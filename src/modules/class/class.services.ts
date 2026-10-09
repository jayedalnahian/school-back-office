import httpStatus from "http-status";
import AppError from "../../app/errorHelpers/AppError";
import prisma from "../../app/config/prisma";
import { ClassModels } from "./class.models";
import {
  ICreateClassPayload,
  IClass,
  IClassFilters,
  IUpdateClassPayload,
} from "./class.types";

const createClass = async (payload: ICreateClassPayload): Promise<IClass> => {
  const school = await prisma.school.findFirst({
    where: { id: payload.school_id, is_deleted: false },
  });
  if (!school) {
    throw new AppError(httpStatus.NOT_FOUND, "School not found");
  }

  const existingClass = await ClassModels.findBySchoolAndGradeLevel(
    payload.school_id,
    payload.grade_level
  );
  if (existingClass) {
    throw new AppError(
      httpStatus.CONFLICT,
      `Class with grade level '${payload.grade_level}' already exists in this school`
    );
  }

  return await ClassModels.create(payload);
};

const getAllClasses = async (filters: IClassFilters = {}): Promise<IClass[]> => {
  return await ClassModels.findAll(filters);
};

const getClassById = async (id: string): Promise<IClass> => {
  const classItem = await ClassModels.findById(id);
  if (!classItem) {
    throw new AppError(httpStatus.NOT_FOUND, "Class not found");
  }

  return classItem;
};

const updateClass = async (
  id: string,
  payload: IUpdateClassPayload
): Promise<IClass> => {
  const classItem = await ClassModels.findById(id);
  if (!classItem) {
    throw new AppError(httpStatus.NOT_FOUND, "Class not found");
  }

  if (
    payload.grade_level !== undefined &&
    payload.grade_level !== classItem.grade_level
  ) {
    const existingClass = await ClassModels.findBySchoolAndGradeLevel(
      classItem.school_id,
      payload.grade_level
    );
    if (existingClass) {
      throw new AppError(
        httpStatus.CONFLICT,
        `Class with grade level '${payload.grade_level}' already exists in this school`
      );
    }
  }

  return await ClassModels.update(id, payload);
};

const deleteClass = async (id: string): Promise<IClass> => {
  const classItem = await ClassModels.findById(id);
  if (!classItem) {
    throw new AppError(httpStatus.NOT_FOUND, "Class not found");
  }

  return await ClassModels.softDelete(id);
};

export const ClassServices = {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
};
