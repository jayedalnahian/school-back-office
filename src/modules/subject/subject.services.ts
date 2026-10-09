import httpStatus from "http-status";
import AppError from "../../app/errorHelpers/AppError";
import prisma from "../../app/config/prisma";
import { SubjectModels } from "./subject.models";
import {
  ICreateSubjectPayload,
  ISubject,
  ISubjectFilters,
  IUpdateSubjectPayload,
} from "./subject.types";

const createSubject = async (
  payload: ICreateSubjectPayload
): Promise<ISubject> => {
  const school = await prisma.school.findFirst({
    where: { id: payload.school_id, is_deleted: false },
  });
  if (!school) {
    throw new AppError(httpStatus.NOT_FOUND, "School not found");
  }

  const classItem = await prisma.classes.findFirst({
    where: { id: payload.class_id, is_deleted: false },
  });
  if (!classItem) {
    throw new AppError(httpStatus.NOT_FOUND, "Class not found");
  }

  const existingSubject = await SubjectModels.findByClassAndName(
    payload.class_id,
    payload.name
  );
  if (existingSubject) {
    throw new AppError(
      httpStatus.CONFLICT,
      `Subject '${payload.name}' already exists in this class`
    );
  }

  return await SubjectModels.create(payload);
};

const getAllSubjects = async (
  filters: ISubjectFilters = {}
): Promise<ISubject[]> => {
  return await SubjectModels.findAll(filters);
};

const getSubjectById = async (id: string): Promise<ISubject> => {
  const subject = await SubjectModels.findById(id);
  if (!subject) {
    throw new AppError(httpStatus.NOT_FOUND, "Subject not found");
  }

  return subject;
};

const updateSubject = async (
  id: string,
  payload: IUpdateSubjectPayload
): Promise<ISubject> => {
  const subject = await SubjectModels.findById(id);
  if (!subject) {
    throw new AppError(httpStatus.NOT_FOUND, "Subject not found");
  }

  const classId = payload.class_id || subject.class_id;
  const name = payload.name || subject.name;

  if (
    (payload.name && payload.name !== subject.name) ||
    (payload.class_id && payload.class_id !== subject.class_id)
  ) {
    const existingSubject = await SubjectModels.findByClassAndName(
      classId,
      name
    );
    if (existingSubject && existingSubject.id !== id) {
      throw new AppError(
        httpStatus.CONFLICT,
        `Subject '${name}' already exists in this class`
      );
    }
  }

  return await SubjectModels.update(id, payload);
};

const deleteSubject = async (id: string): Promise<ISubject> => {
  const subject = await SubjectModels.findById(id);
  if (!subject) {
    throw new AppError(httpStatus.NOT_FOUND, "Subject not found");
  }

  return await SubjectModels.softDelete(id);
};

export const SubjectServices = {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};
