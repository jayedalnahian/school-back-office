import prisma from "../../app/config/prisma";
import {
  ICreateSectionPayload,
  ISectionFilters,
  IUpdateSectionPayload,
  ISection,
} from "./section.types";

const create = async (payload: ICreateSectionPayload): Promise<ISection> => {
  return await prisma.sections.create({
    data: payload,
  });
};

const findById = async (id: string): Promise<ISection | null> => {
  return await prisma.sections.findFirst({
    where: {
      id,
      is_deleted: false,
    },
    include: {
      classes: true,
      shifts: true,
      teacher_profiles: true,
      enrollments: true,
    },
  });
};

const findByClassShiftAndName = async (
  class_id: string,
  shift_id: string,
  name: string
): Promise<ISection | null> => {
  return await prisma.sections.findFirst({
    where: {
      class_id,
      shift_id,
      name,
      is_deleted: false,
    },
  });
};

const findAll = async (filters: ISectionFilters = {}): Promise<ISection[]> => {
  const { searchTerm, class_id, shift_id, class_teacher_id } = filters;

  return await prisma.sections.findMany({
    where: {
      is_deleted: false,
      ...(class_id ? { class_id } : {}),
      ...(shift_id ? { shift_id } : {}),
      ...(class_teacher_id ? { class_teacher_id } : {}),
      ...(searchTerm
        ? {
            OR: [{ name: { contains: searchTerm, mode: "insensitive" } }],
          }
        : {}),
    },
    include: {
      classes: true,
      shifts: true,
      teacher_profiles: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
};

const update = async (
  id: string,
  payload: IUpdateSectionPayload
): Promise<ISection> => {
  return await prisma.sections.update({
    where: {
      id,
    },
    data: payload,
  });
};

const softDelete = async (id: string): Promise<ISection> => {
  return await prisma.sections.update({
    where: {
      id,
    },
    data: {
      is_deleted: true,
      deleted_at: new Date(),
    },
  });
};

export const SectionModels = {
  create,
  findById,
  findByClassShiftAndName,
  findAll,
  update,
  softDelete,
};
