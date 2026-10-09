import prisma from "../../app/config/prisma";
import {
  ICreateGuardianPayload,
  IGuardianFilters,
  IUpdateGuardianPayload,
  IGuardian,
} from "./guardian.types";

const create = async (
  payload: ICreateGuardianPayload
): Promise<IGuardian> => {
  return await prisma.guardian_profiles.create({
    data: payload,
  });
};

const findById = async (id: string): Promise<IGuardian | null> => {
  return await prisma.guardian_profiles.findFirst({
    where: {
      id,
      is_deleted: false,
    },
    include: {
      users_guardian_profiles_user_idTousers: true,
      students: true,
    },
  });
};

const findByUserId = async (user_id: string): Promise<IGuardian | null> => {
  return await prisma.guardian_profiles.findFirst({
    where: {
      user_id,
      is_deleted: false,
    },
  });
};

const findAll = async (
  filters: IGuardianFilters = {}
): Promise<IGuardian[]> => {
  const { searchTerm, user_id, relation_type } = filters;

  return await prisma.guardian_profiles.findMany({
    where: {
      is_deleted: false,
      ...(user_id ? { user_id } : {}),
      ...(relation_type
        ? { relation_type: { contains: relation_type, mode: "insensitive" } }
        : {}),
      ...(searchTerm
        ? {
            OR: [
              { relation_type: { contains: searchTerm, mode: "insensitive" } },
              { nid_number: { contains: searchTerm, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    include: {
      users_guardian_profiles_user_idTousers: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
};

const update = async (
  id: string,
  payload: IUpdateGuardianPayload
): Promise<IGuardian> => {
  return await prisma.guardian_profiles.update({
    where: {
      id,
    },
    data: payload,
  });
};

const softDelete = async (id: string): Promise<IGuardian> => {
  return await prisma.guardian_profiles.update({
    where: {
      id,
    },
    data: {
      is_deleted: true,
      deleted_at: new Date(),
    },
  });
};

export const GuardianModels = {
  create,
  findById,
  findByUserId,
  findAll,
  update,
  softDelete,
};
