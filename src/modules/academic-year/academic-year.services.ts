import httpStatus from "http-status";
import AppError from "../../app/errorHelpers/AppError";
import prisma from "../../app/config/prisma";
import { AcademicYearModels } from "./academic-year.models";
import {
  IAcademicYear,
  IAcademicYearFilters,
  ICreateAcademicYearPayload,
  IUpdateAcademicYearPayload,
} from "./academic-year.types";

const createAcademicYear = async (
  payload: ICreateAcademicYearPayload
): Promise<IAcademicYear> => {
  const school = await prisma.school.findFirst({
    where: { id: payload.school_id, is_deleted: false },
  });
  if (!school) {
    throw new AppError(httpStatus.NOT_FOUND, "School not found");
  }

  const existingYear = await AcademicYearModels.findBySchoolAndYear(
    payload.school_id,
    payload.year
  );
  if (existingYear) {
    throw new AppError(
      httpStatus.CONFLICT,
      `Academic year '${payload.year}' already exists for this school`
    );
  }

  return await AcademicYearModels.create(payload);
};

const getAllAcademicYears = async (
  filters: IAcademicYearFilters = {}
): Promise<IAcademicYear[]> => {
  return await AcademicYearModels.findAll(filters);
};

const getAcademicYearById = async (id: string): Promise<IAcademicYear> => {
  const academicYear = await AcademicYearModels.findById(id);
  if (!academicYear) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic year not found");
  }

  return academicYear;
};

const updateAcademicYear = async (
  id: string,
  payload: IUpdateAcademicYearPayload
): Promise<IAcademicYear> => {
  const academicYear = await AcademicYearModels.findById(id);
  if (!academicYear) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic year not found");
  }

  if (payload.year && payload.year !== academicYear.year) {
    const existingYear = await AcademicYearModels.findBySchoolAndYear(
      academicYear.school_id,
      payload.year
    );
    if (existingYear) {
      throw new AppError(
        httpStatus.CONFLICT,
        `Academic year '${payload.year}' already exists for this school`
      );
    }
  }

  return await AcademicYearModels.update(id, payload);
};

const deleteAcademicYear = async (id: string): Promise<IAcademicYear> => {
  const academicYear = await AcademicYearModels.findById(id);
  if (!academicYear) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic year not found");
  }

  return await AcademicYearModels.softDelete(id);
};

export const AcademicYearServices = {
  createAcademicYear,
  getAllAcademicYears,
  getAcademicYearById,
  updateAcademicYear,
  deleteAcademicYear,
};
