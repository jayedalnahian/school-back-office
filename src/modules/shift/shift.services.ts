import httpStatus from "http-status";
import AppError from "../../app/errorHelpers/AppError";
import prisma from "../../app/config/prisma";
import { ShiftModels } from "./shift.models";
import {
  ICreateShiftPayload,
  IShift,
  IShiftFilters,
  IUpdateShiftPayload,
} from "./shift.types";

const createShift = async (payload: ICreateShiftPayload): Promise<IShift> => {
  const school = await prisma.school.findFirst({
    where: { id: payload.school_id, is_deleted: false },
  });
  if (!school) {
    throw new AppError(httpStatus.NOT_FOUND, "School not found");
  }

  const existingShift = await ShiftModels.findBySchoolAndName(
    payload.school_id,
    payload.name
  );
  if (existingShift) {
    throw new AppError(
      httpStatus.CONFLICT,
      `Shift '${payload.name}' already exists in this school`
    );
  }

  return await ShiftModels.create(payload);
};

const getAllShifts = async (filters: IShiftFilters = {}): Promise<IShift[]> => {
  return await ShiftModels.findAll(filters);
};

const getShiftById = async (id: string): Promise<IShift> => {
  const shift = await ShiftModels.findById(id);
  if (!shift) {
    throw new AppError(httpStatus.NOT_FOUND, "Shift not found");
  }

  return shift;
};

const updateShift = async (
  id: string,
  payload: IUpdateShiftPayload
): Promise<IShift> => {
  const shift = await ShiftModels.findById(id);
  if (!shift) {
    throw new AppError(httpStatus.NOT_FOUND, "Shift not found");
  }

  if (payload.name && payload.name !== shift.name) {
    const existingShift = await ShiftModels.findBySchoolAndName(
      shift.school_id,
      payload.name
    );
    if (existingShift) {
      throw new AppError(
        httpStatus.CONFLICT,
        `Shift '${payload.name}' already exists in this school`
      );
    }
  }

  return await ShiftModels.update(id, payload);
};

const deleteShift = async (id: string): Promise<IShift> => {
  const shift = await ShiftModels.findById(id);
  if (!shift) {
    throw new AppError(httpStatus.NOT_FOUND, "Shift not found");
  }

  return await ShiftModels.softDelete(id);
};

export const ShiftServices = {
  createShift,
  getAllShifts,
  getShiftById,
  updateShift,
  deleteShift,
};
