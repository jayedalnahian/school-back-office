import prisma from "../../app/config/prisma";
import {
  ICreateTeacherPayload,
  ITeacherFilters,
  IUpdateTeacherPayload,
  ITeacher,
} from "./teacher.types";

const create = async (payload: ICreateTeacherPayload): Promise<ITeacher> => {
  return await prisma.teacher_profiles.create({
    data: {
      ...payload,
      joined_date: payload.joined_date ? new Date(payload.joined_date) : null,
    },
  });
};

const findById = async (id: string): Promise<ITeacher | null> => {
  return await prisma.teacher_profiles.findFirst({
    where: {
      id,
      is_deleted: false,
    },
    include: {
      schools: true,
      users_teacher_profiles_user_idTousers: true,
    },
  });
};

const findByUserId = async (user_id: string): Promise<ITeacher | null> => {
  return await prisma.teacher_profiles.findFirst({
    where: {
      user_id,
      is_deleted: false,
    },
  });
};

const findAll = async (
  filters: ITeacherFilters = {}
): Promise<ITeacher[]> => {
  const { searchTerm, school_id, user_id, designation, gender, is_active } =
    filters;

  return await prisma.teacher_profiles.findMany({
    where: {
      is_deleted: false,
      ...(school_id ? { school_id } : {}),
      ...(user_id ? { user_id } : {}),
      ...(gender ? { gender } : {}),
      ...(is_active !== undefined ? { is_active } : {}),
      ...(designation
        ? { designation: { contains: designation, mode: "insensitive" } }
        : {}),
      ...(searchTerm
        ? {
            OR: [
              { designation: { contains: searchTerm, mode: "insensitive" } },
              { qualification: { contains: searchTerm, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    include: {
      schools: true,
      users_teacher_profiles_user_idTousers: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
};

const update = async (
  id: string,
  payload: IUpdateTeacherPayload
): Promise<ITeacher> => {
  return await prisma.teacher_profiles.update({
    where: {
      id,
    },
    data: {
      ...payload,
      ...(payload.joined_date !== undefined
        ? {
            joined_date: payload.joined_date
              ? new Date(payload.joined_date)
              : null,
          }
        : {}),
    },
  });
};

const softDelete = async (id: string): Promise<ITeacher> => {
  return await prisma.teacher_profiles.update({
    where: {
      id,
    },
    data: {
      is_deleted: true,
      deleted_at: new Date(),
    },
  });
};

export const TeacherModels = {
  create,
  findById,
  findByUserId,
  findAll,
  update,
  softDelete,
};
