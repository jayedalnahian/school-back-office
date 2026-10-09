import httpStatus from "http-status";
import AppError from "../../app/errorHelpers/AppError";
import prisma from "../../app/config/prisma";
import { SectionModels } from "./section.models";
import {
  ICreateSectionPayload,
  ISection,
  ISectionFilters,
  IUpdateSectionPayload,
} from "./section.types";

const createSection = async (
  payload: ICreateSectionPayload
): Promise<ISection> => {
  const classItem = await prisma.classes.findFirst({
    where: { id: payload.class_id, is_deleted: false },
  });
  if (!classItem) {
    throw new AppError(httpStatus.NOT_FOUND, "Class not found");
  }

  const shift = await prisma.shifts.findFirst({
    where: { id: payload.shift_id, is_deleted: false },
  });
  if (!shift) {
    throw new AppError(httpStatus.NOT_FOUND, "Shift not found");
  }

  if (payload.class_teacher_id) {
    const teacher = await prisma.teacher_profiles.findFirst({
      where: { id: payload.class_teacher_id, is_deleted: false },
    });
    if (!teacher) {
      throw new AppError(httpStatus.NOT_FOUND, "Class teacher not found");
    }
  }

  const existingSection = await SectionModels.findByClassShiftAndName(
    payload.class_id,
    payload.shift_id,
    payload.name
  );
  if (existingSection) {
    throw new AppError(
      httpStatus.CONFLICT,
      `Section '${payload.name}' already exists for this class and shift`
    );
  }

  return await SectionModels.create(payload);
};

const getAllSections = async (
  filters: ISectionFilters = {}
): Promise<ISection[]> => {
  return await SectionModels.findAll(filters);
};

const getSectionById = async (id: string): Promise<ISection> => {
  const section = await SectionModels.findById(id);
  if (!section) {
    throw new AppError(httpStatus.NOT_FOUND, "Section not found");
  }

  return section;
};

const updateSection = async (
  id: string,
  payload: IUpdateSectionPayload
): Promise<ISection> => {
  const section = await SectionModels.findById(id);
  if (!section) {
    throw new AppError(httpStatus.NOT_FOUND, "Section not found");
  }

  const classId = payload.class_id || section.class_id;
  const shiftId = payload.shift_id || section.shift_id;
  const name = payload.name || section.name;

  if (
    (payload.name && payload.name !== section.name) ||
    (payload.class_id && payload.class_id !== section.class_id) ||
    (payload.shift_id && payload.shift_id !== section.shift_id)
  ) {
    const existingSection = await SectionModels.findByClassShiftAndName(
      classId,
      shiftId,
      name
    );
    if (existingSection && existingSection.id !== id) {
      throw new AppError(
        httpStatus.CONFLICT,
        `Section '${name}' already exists for this class and shift`
      );
    }
  }

  return await SectionModels.update(id, payload);
};

const deleteSection = async (id: string): Promise<ISection> => {
  const section = await SectionModels.findById(id);
  if (!section) {
    throw new AppError(httpStatus.NOT_FOUND, "Section not found");
  }

  return await SectionModels.softDelete(id);
};

export const SectionServices = {
  createSection,
  getAllSections,
  getSectionById,
  updateSection,
  deleteSection,
};
