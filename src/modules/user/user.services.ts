import httpStatus from "http-status";
import AppError from "../../app/errorHelpers/AppError";
import prisma from "../../app/config/prisma";
import { UserModels } from "./user.models";
import {
  ICreateUserPayload,
  IUser,
  IUserFilters,
  IUpdateUserPayload,
} from "./user.types";

const createUser = async (payload: ICreateUserPayload): Promise<IUser> => {
  if (payload.school_id) {
    const school = await prisma.school.findFirst({
      where: { id: payload.school_id, is_deleted: false },
    });
    if (!school) {
      throw new AppError(httpStatus.NOT_FOUND, "School not found");
    }
  }

  const existingPhone = await UserModels.findByPhone(payload.phone);
  if (existingPhone) {
    throw new AppError(
      httpStatus.CONFLICT,
      `User with phone '${payload.phone}' already exists`
    );
  }

  if (payload.email) {
    const existingEmail = await UserModels.findByEmail(payload.email);
    if (existingEmail) {
      throw new AppError(
        httpStatus.CONFLICT,
        `User with email '${payload.email}' already exists`
      );
    }
  }

  return await UserModels.create(payload);
};

const getAllUsers = async (filters: IUserFilters = {}): Promise<IUser[]> => {
  return await UserModels.findAll(filters);
};

const getUserById = async (id: string): Promise<IUser> => {
  const user = await UserModels.findById(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  return user;
};

const updateUser = async (
  id: string,
  payload: IUpdateUserPayload
): Promise<IUser> => {
  const user = await UserModels.findById(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (payload.school_id) {
    const school = await prisma.school.findFirst({
      where: { id: payload.school_id, is_deleted: false },
    });
    if (!school) {
      throw new AppError(httpStatus.NOT_FOUND, "School not found");
    }
  }

  if (payload.phone && payload.phone !== user.phone) {
    const existingPhone = await UserModels.findByPhone(payload.phone);
    if (existingPhone) {
      throw new AppError(
        httpStatus.CONFLICT,
        `User with phone '${payload.phone}' already exists`
      );
    }
  }

  if (payload.email && payload.email !== user.email) {
    const existingEmail = await UserModels.findByEmail(payload.email);
    if (existingEmail) {
      throw new AppError(
        httpStatus.CONFLICT,
        `User with email '${payload.email}' already exists`
      );
    }
  }

  return await UserModels.update(id, payload);
};

const deleteUser = async (id: string): Promise<IUser> => {
  const user = await UserModels.findById(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  return await UserModels.softDelete(id);
};

export const UserServices = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
