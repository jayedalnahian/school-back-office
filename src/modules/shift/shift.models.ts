import prisma from "../../app/config/prisma";
import {
  ICreateShiftPayload,
  IShiftFilters,
  IUpdateShiftPayload,
  IShift,
} from "./shift.types";

const create = async (payload: ICreateShiftPayload): Promise<IShift> => {
  return await prisma.shifts.create({
    data: payload,
  });
};

const findById = async (id: string): Promise<IShift | null> => {
  return await prisma.shifts.findFirst({
    where: {
      id,
      is_deleted: false,
    },
    include: {
      schools: true,
      sections: true,
    },
  });
};

const findBySchoolAndName = async (
  school_id: string,
  name: string
): Promise<IShift | null> => {
  return await prisma.shifts.findFirst({
    where: {
      school_id,
      name,
      is_deleted: false,
    },
  });
};

const findAll = async (filters: IShiftFilters = {}): Promise<IShift[]> => {
  const { searchTerm, school_id, name } = filters;

  return await prisma.shifts.findMany({
    where: {
      is_deleted: false,
      ...(school_id ? { school_id } : {}),
      ...(name ? { name: { contains: name, mode: "insensitive" } } : {}),
      ...(searchTerm
        ? {
            OR: [{ name: { contains: searchTerm, mode: "insensitive" } }],
          }
        : {}),
    },
    include: {
      schools: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
};

const update = async (
  id: string,
  payload: IUpdateShiftPayload
): Promise<IShift> => {
  return await prisma.shifts.update({
    where: {
      id,
    },
    data: payload,
  });
};

const softDelete = async (id: string): Promise<IShift> => {
  return await prisma.shifts.update({
    where: {
      id,
    },
    data: {
      is_deleted: true,
      deleted_at: new Date(),
    },
  });
};

export const ShiftModels = {
  create,
  findById,
  findBySchoolAndName,
  findAll,
  update,
  softDelete,
};
