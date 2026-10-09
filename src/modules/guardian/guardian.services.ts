import httpStatus from "http-status";
import AppError from "../../app/errorHelpers/AppError";
import prisma from "../../app/config/prisma";
import { GuardianModels } from "./guardian.models";
import {
  ICreateGuardianPayload,
  IGuardian,
  IGuardianFilters,
  IUpdateGuardianPayload,
} from "./guardian.types";

const createGuardian = async (
  payload: ICreateGuardianPayload
): Promise<IGuardian> => {
  const user = await prisma.users.findFirst({
    where: { id: payload.user_id, is_deleted: false },
  });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const existingGuardian = await GuardianModels.findByUserId(payload.user_id);
  if (existingGuardian) {
    throw new AppError(
      httpStatus.CONFLICT,
      `Guardian profile already exists for user ID '${payload.user_id}'`
    );
  }

  return await GuardianModels.create(payload);
};

const getAllGuardians = async (
  filters: IGuardianFilters = {}
): Promise<IGuardian[]> => {
  return await GuardianModels.findAll(filters);
};

const getGuardianById = async (id: string): Promise<IGuardian> => {
  const guardian = await GuardianModels.findById(id);
  if (!guardian) {
    throw new AppError(httpStatus.NOT_FOUND, "Guardian not found");
  }

  return guardian;
};

const updateGuardian = async (
  id: string,
  payload: IUpdateGuardianPayload
): Promise<IGuardian> => {
  const guardian = await GuardianModels.findById(id);
  if (!guardian) {
    throw new AppError(httpStatus.NOT_FOUND, "Guardian not found");
  }

  return await GuardianModels.update(id, payload);
};

const deleteGuardian = async (id: string): Promise<IGuardian> => {
  const guardian = await GuardianModels.findById(id);
  if (!guardian) {
    throw new AppError(httpStatus.NOT_FOUND, "Guardian not found");
  }

  return await GuardianModels.softDelete(id);
};

export const GuardianServices = {
  createGuardian,
  getAllGuardians,
  getGuardianById,
  updateGuardian,
  deleteGuardian,
};
