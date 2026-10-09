import prisma from "../../app/config/prisma";
import {
  ICreateAcademicYearPayload,
  IAcademicYearFilters,
  IUpdateAcademicYearPayload,
  IAcademicYear,
} from "./academic-year.types";

const create = async (
  payload: ICreateAcademicYearPayload
): Promise<IAcademicYear> => {
  return await prisma.academic_years.create({
    data: {
      ...payload,
      start_date: new Date(payload.start_date),
      end_date: new Date(payload.end_date),
    },
  });
};

const findById = async (id: string): Promise<IAcademicYear | null> => {
  return await prisma.academic_years.findFirst({
    where: {
      id,
      is_deleted: false,
    },
    include: {
      schools: true,
    },
  });
};

const findBySchoolAndYear = async (
  school_id: string,
  year: number
): Promise<IAcademicYear | null> => {
  return await prisma.academic_years.findFirst({
    where: {
      school_id,
      year,
      is_deleted: false,
    },
  });
};

const findAll = async (
  filters: IAcademicYearFilters = {}
): Promise<IAcademicYear[]> => {
  const { school_id, year, is_current } = filters;

  return await prisma.academic_years.findMany({
    where: {
      is_deleted: false,
      ...(school_id ? { school_id } : {}),
      ...(year ? { year } : {}),
      ...(is_current !== undefined ? { is_current } : {}),
    },
    include: {
      schools: true,
    },
    orderBy: {
      year: "desc",
    },
  });
};

const update = async (
  id: string,
  payload: IUpdateAcademicYearPayload
): Promise<IAcademicYear> => {
  return await prisma.academic_years.update({
    where: {
      id,
    },
    data: {
      ...payload,
      ...(payload.start_date
        ? { start_date: new Date(payload.start_date) }
        : {}),
      ...(payload.end_date ? { end_date: new Date(payload.end_date) } : {}),
    },
  });
};

const softDelete = async (id: string): Promise<IAcademicYear> => {
  return await prisma.academic_years.update({
    where: {
      id,
    },
    data: {
      is_deleted: true,
      deleted_at: new Date(),
    },
  });
};

export const AcademicYearModels = {
  create,
  findById,
  findBySchoolAndYear,
  findAll,
  update,
  softDelete,
};
