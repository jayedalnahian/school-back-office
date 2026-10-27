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
  ISchoolUpdateFormData,
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
  query: Record<string, unknown> = {}
): Promise<{
  data: ISchool[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}> => {
  const page = Number(query.page) > 0 ? Number(query.page) : 1;
  const limit = Number(query.limit) > 0 ? Number(query.limit) : 10;
  const sortBy = (query.sortBy as string) || "created_at";
  const sortOrder = (query.sortOrder as "asc" | "desc") || "desc";

  const filters: ISchoolFilters = {
    searchTerm: (query.searchTerm as string) || (query.search as string) || undefined,
    district: (query.district as string) || undefined,
    upazila: (query.upazila as string) || undefined,
    division: (query.division as string) || undefined,
    cluster: (query.cluster as string) || undefined,
    is_active:
      query.is_active !== undefined
        ? (query.is_active as any)
        : (query.status as any),
  };

  const { data, total } = await SchoolModels.getAllSchoolsFromDB(filters, {
    page,
    limit,
    sortBy,
    sortOrder,
  });

  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit) || 1,
    },
  };
};

const getSchoolById = async (id: string): Promise<ISchoolUpdateFormData> => {
  const school = await SchoolModels.findById(id);
  if (!school) {
    throw new AppError(httpStatus.NOT_FOUND, "School not found");
  }

  return {
    id: school.id,
    name: school.name,
    gps_code: school.gps_code,
    division: school.division,
    district: school.district,
    upazila: school.upazila,
    cluster: school.cluster,
    address: school.address,
    phone: school.phone,
    is_active: Boolean(school.is_active),
    created_at: school.created_at,
    updated_at: school.updated_at,
  };
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
