import prisma from "../../app/config/prisma";
import {
  ICreateClassPayload,
  IClassFilters,
  IUpdateClassPayload,
  IClass,
} from "./class.types";

const create = async (payload: ICreateClassPayload): Promise<IClass> => {
  return await prisma.classes.create({
    data: payload,
  });
};

const findById = async (id: string): Promise<IClass | null> => {
  return await prisma.classes.findFirst({
    where: {
      id,
      is_deleted: false,
    },
    include: {
      schools: true,
      sections: true,
      subjects: true,
    },
  });
};

const findBySchoolAndGradeLevel = async (
  school_id: string,
  grade_level: number
): Promise<IClass | null> => {
  return await prisma.classes.findFirst({
    where: {
      school_id,
      grade_level,
      is_deleted: false,
    },
  });
};

const findAll = async (filters: IClassFilters = {}): Promise<IClass[]> => {
  const { searchTerm, school_id, grade_level } = filters;

  return await prisma.classes.findMany({
    where: {
      is_deleted: false,
      ...(school_id ? { school_id } : {}),
      ...(grade_level !== undefined ? { grade_level } : {}),
      ...(searchTerm
        ? {
            OR: [{ name: { contains: searchTerm, mode: "insensitive" } }],
          }
        : {}),
    },
    include: {
      schools: true,
      sections: true,
    },
    orderBy: {
      grade_level: "asc",
    },
  });
};

const update = async (
  id: string,
  payload: IUpdateClassPayload
): Promise<IClass> => {
  return await prisma.classes.update({
    where: {
      id,
    },
    data: payload,
  });
};

const softDelete = async (id: string): Promise<IClass> => {
  return await prisma.classes.update({
    where: {
      id,
    },
    data: {
      is_deleted: true,
      deleted_at: new Date(),
    },
  });
};

export const ClassModels = {
  create,
  findById,
  findBySchoolAndGradeLevel,
  findAll,
  update,
  softDelete,
};
