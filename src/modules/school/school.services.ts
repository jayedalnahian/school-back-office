import httpStatus from "http-status";
import AppError from "../../app/errorHelpers/AppError";
import prisma from "../../app/config/prisma";
import { SchoolModels } from "./school.models";
import {
  ICreateSchoolPayload,
  IOnboardSchoolPayload,
  IOnboardSchoolResult,
  ISchool,
  ISchoolFilters,
  IUpdateSchoolPayload,
} from "./school.types";

const createSchool = async (payload: ICreateSchoolPayload): Promise<ISchool> => {
  const existingSchool = await SchoolModels.findByGpsCode(payload.gps_code);
  if (existingSchool) {
    throw new AppError(
      httpStatus.CONFLICT,
      `School with GPS code '${payload.gps_code}' already exists`
    );
  }

  return await SchoolModels.create(payload);
};

const onboardSchool = async (
  payload: IOnboardSchoolPayload
): Promise<IOnboardSchoolResult> => {
  const existingSchool = await SchoolModels.findByGpsCode(payload.school.gps_code);
  if (existingSchool) {
    throw new AppError(
      httpStatus.CONFLICT,
      `School with GPS code '${payload.school.gps_code}' already exists`
    );
  }

  const existingAdminPhone = await prisma.users.findFirst({
    where: {
      phone: payload.admin.phone,
      is_deleted: false,
    },
  });
  if (existingAdminPhone) {
    throw new AppError(
      httpStatus.CONFLICT,
      `User with phone '${payload.admin.phone}' already exists`
    );
  }

  if (payload.admin.email) {
    const existingAdminEmail = await prisma.users.findFirst({
      where: {
        email: payload.admin.email,
        is_deleted: false,
      },
    });
    if (existingAdminEmail) {
      throw new AppError(
        httpStatus.CONFLICT,
        `User with email '${payload.admin.email}' already exists`
      );
    }
  }

  return await SchoolModels.onboardWithAdmin(payload);
};

const getAllSchools = async (
  filters: ISchoolFilters = {}
): Promise<ISchool[]> => {
  return await SchoolModels.findAll(filters);
};

const getSchoolById = async (id: string): Promise<ISchool> => {
  const school = await SchoolModels.findById(id);
  if (!school) {
    throw new AppError(httpStatus.NOT_FOUND, "School not found");
  }

  return school;
};

const updateSchool = async (
  id: string,
  payload: IUpdateSchoolPayload
): Promise<ISchool> => {
  const school = await SchoolModels.findById(id);
  if (!school) {
    throw new AppError(httpStatus.NOT_FOUND, "School not found");
  }

  if (payload.gps_code && payload.gps_code !== school.gps_code) {
    const existingSchool = await SchoolModels.findByGpsCode(payload.gps_code);
    if (existingSchool) {
      throw new AppError(
        httpStatus.CONFLICT,
        `School with GPS code '${payload.gps_code}' already exists`
      );
    }
  }

  return await SchoolModels.update(id, payload);
};

const deleteSchool = async (id: string): Promise<ISchool> => {
  const school = await SchoolModels.findById(id);
  if (!school) {
    throw new AppError(httpStatus.NOT_FOUND, "School not found");
  }

  return await SchoolModels.softDelete(id);
};

export const SchoolServices = {
  createSchool,
  onboardSchool,
  getAllSchools,
  getSchoolById,
  updateSchool,
  deleteSchool,
};
