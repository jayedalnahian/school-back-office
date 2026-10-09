import prisma from "../../app/config/prisma";
import {
  ICreateUserPayload,
  IUserFilters,
  IUpdateUserPayload,
  IUser,
} from "./user.types";

const create = async (payload: ICreateUserPayload): Promise<IUser> => {
  return await prisma.users.create({
    data: payload,
  });
};

const findById = async (id: string): Promise<IUser | null> => {
  return await prisma.users.findFirst({
    where: {
      id,
      is_deleted: false,
    },
  });
};

const findByPhone = async (phone: string): Promise<IUser | null> => {
  return await prisma.users.findFirst({
    where: {
      phone,
      is_deleted: false,
    },
  });
};

const findByEmail = async (email: string): Promise<IUser | null> => {
  return await prisma.users.findFirst({
    where: {
      email,
      is_deleted: false,
    },
  });
};

const findAll = async (filters: IUserFilters = {}): Promise<IUser[]> => {
  const { searchTerm, school_id, phone, email, role, is_active } = filters;

  return await prisma.users.findMany({
    where: {
      is_deleted: false,
      ...(school_id ? { school_id } : {}),
      ...(role ? { role } : {}),
      ...(is_active !== undefined ? { is_active } : {}),
      ...(phone ? { phone: { contains: phone, mode: "insensitive" } } : {}),
      ...(email ? { email: { contains: email, mode: "insensitive" } } : {}),
      ...(searchTerm
        ? {
            OR: [
              { full_name: { contains: searchTerm, mode: "insensitive" } },
              { phone: { contains: searchTerm, mode: "insensitive" } },
              { email: { contains: searchTerm, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: {
      created_at: "desc",
    },
  });
};

const update = async (
  id: string,
  payload: IUpdateUserPayload
): Promise<IUser> => {
  return await prisma.users.update({
    where: {
      id,
    },
    data: payload,
  });
};

const softDelete = async (id: string): Promise<IUser> => {
  return await prisma.users.update({
    where: {
      id,
    },
    data: {
      is_deleted: true,
      deleted_at: new Date(),
    },
  });
};

export const UserModels = {
  create,
  findById,
  findByPhone,
  findByEmail,
  findAll,
  update,
  softDelete,
};
