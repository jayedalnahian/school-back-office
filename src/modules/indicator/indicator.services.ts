import httpStatus from "http-status";
import AppError from "../../app/errorHelpers/AppError";
import prisma from "../../app/config/prisma";
import { IndicatorModels } from "./indicator.models";
import {
  ICreateIndicatorPayload,
  IIndicator,
  IIndicatorFilters,
  IUpdateIndicatorPayload,
} from "./indicator.types";

const createIndicator = async (
  payload: ICreateIndicatorPayload
): Promise<IIndicator> => {
  const school = await prisma.school.findFirst({
    where: { id: payload.school_id, is_deleted: false },
  });
  if (!school) {
    throw new AppError(httpStatus.NOT_FOUND, "School not found");
  }

  if (payload.subject_id) {
    const subject = await prisma.subjects.findFirst({
      where: { id: payload.subject_id, is_deleted: false },
    });
    if (!subject) {
      throw new AppError(httpStatus.NOT_FOUND, "Subject not found");
    }
  }

  const existingIndicator = await IndicatorModels.findBySchoolAndCode(
    payload.school_id,
    payload.code
  );
  if (existingIndicator) {
    throw new AppError(
      httpStatus.CONFLICT,
      `Indicator with code '${payload.code}' already exists in this school`
    );
  }

  return await IndicatorModels.create(payload);
};

const getAllIndicators = async (
  filters: IIndicatorFilters = {}
): Promise<IIndicator[]> => {
  return await IndicatorModels.findAll(filters);
};

const getIndicatorById = async (id: string): Promise<IIndicator> => {
  const indicator = await IndicatorModels.findById(id);
  if (!indicator) {
    throw new AppError(httpStatus.NOT_FOUND, "Indicator not found");
  }

  return indicator;
};

const updateIndicator = async (
  id: string,
  payload: IUpdateIndicatorPayload
): Promise<IIndicator> => {
  const indicator = await IndicatorModels.findById(id);
  if (!indicator) {
    throw new AppError(httpStatus.NOT_FOUND, "Indicator not found");
  }

  if (payload.subject_id) {
    const subject = await prisma.subjects.findFirst({
      where: { id: payload.subject_id, is_deleted: false },
    });
    if (!subject) {
      throw new AppError(httpStatus.NOT_FOUND, "Subject not found");
    }
  }

  if (payload.code && payload.code !== indicator.code) {
    const existingIndicator = await IndicatorModels.findBySchoolAndCode(
      indicator.school_id,
      payload.code
    );
    if (existingIndicator) {
      throw new AppError(
        httpStatus.CONFLICT,
        `Indicator with code '${payload.code}' already exists in this school`
      );
    }
  }

  return await IndicatorModels.update(id, payload);
};

const deleteIndicator = async (id: string): Promise<IIndicator> => {
  const indicator = await IndicatorModels.findById(id);
  if (!indicator) {
    throw new AppError(httpStatus.NOT_FOUND, "Indicator not found");
  }

  return await IndicatorModels.softDelete(id);
};

export const IndicatorServices = {
  createIndicator,
  getAllIndicators,
  getIndicatorById,
  updateIndicator,
  deleteIndicator,
};
