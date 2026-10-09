import prisma from "../../app/config/prisma";
import {
  ICreateIndicatorPayload,
  IIndicatorFilters,
  IUpdateIndicatorPayload,
  IIndicator,
} from "./indicator.types";

const create = async (
  payload: ICreateIndicatorPayload
): Promise<IIndicator> => {
  return await prisma.evaluation_indicators.create({
    data: payload,
  });
};

const findById = async (id: string): Promise<IIndicator | null> => {
  return await prisma.evaluation_indicators.findFirst({
    where: {
      id,
      is_deleted: false,
    },
    include: {
      schools: true,
      subjects: true,
    },
  });
};

const findBySchoolAndCode = async (
  school_id: string,
  code: string
): Promise<IIndicator | null> => {
  return await prisma.evaluation_indicators.findFirst({
    where: {
      school_id,
      code,
      is_deleted: false,
    },
  });
};

const findAll = async (
  filters: IIndicatorFilters = {}
): Promise<IIndicator[]> => {
  const { searchTerm, school_id, subject_id, type, code } = filters;

  return await prisma.evaluation_indicators.findMany({
    where: {
      is_deleted: false,
      ...(school_id ? { school_id } : {}),
      ...(subject_id ? { subject_id } : {}),
      ...(type ? { type } : {}),
      ...(code ? { code: { contains: code, mode: "insensitive" } } : {}),
      ...(searchTerm
        ? {
            OR: [
              { code: { contains: searchTerm, mode: "insensitive" } },
              { title: { contains: searchTerm, mode: "insensitive" } },
              { description: { contains: searchTerm, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    include: {
      schools: true,
      subjects: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
};

const update = async (
  id: string,
  payload: IUpdateIndicatorPayload
): Promise<IIndicator> => {
  return await prisma.evaluation_indicators.update({
    where: {
      id,
    },
    data: payload,
  });
};

const softDelete = async (id: string): Promise<IIndicator> => {
  return await prisma.evaluation_indicators.update({
    where: {
      id,
    },
    data: {
      is_deleted: true,
      deleted_at: new Date(),
    },
  });
};

export const IndicatorModels = {
  create,
  findById,
  findBySchoolAndCode,
  findAll,
  update,
  softDelete,
};
