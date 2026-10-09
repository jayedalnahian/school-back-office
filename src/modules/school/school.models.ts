import prisma from "../../app/config/prisma";
import {
  ICreateSchoolPayload,
  ISchoolFilters,
  IUpdateSchoolPayload,
  ISchool,
  IOnboardSchoolPayload,
  IOnboardSchoolResult,
} from "./school.types";

const create = async (payload: ICreateSchoolPayload): Promise<ISchool> => {
  return await prisma.school.create({
    data: payload,
  });
};

const findById = async (id: string): Promise<ISchool | null> => {
  return await prisma.school.findFirst({
    where: {
      id,
      is_deleted: false,
    },
  });
};

const findByGpsCode = async (gps_code: string): Promise<ISchool | null> => {
  return await prisma.school.findFirst({
    where: {
      gps_code,
      is_deleted: false,
    },
  });
};

const findAll = async (filters: ISchoolFilters = {}): Promise<ISchool[]> => {
  const { searchTerm, district, upazila, division, cluster, is_active } = filters;

  return await prisma.school.findMany({
    where: {
      is_deleted: false,
      ...(is_active !== undefined ? { is_active } : {}),
      ...(district
        ? { district: { contains: district, mode: "insensitive" } }
        : {}),
      ...(upazila
        ? { upazila: { contains: upazila, mode: "insensitive" } }
        : {}),
      ...(division
        ? { division: { contains: division, mode: "insensitive" } }
        : {}),
      ...(cluster
        ? { cluster: { contains: cluster, mode: "insensitive" } }
        : {}),
      ...(searchTerm
        ? {
            OR: [
              { name: { contains: searchTerm, mode: "insensitive" } },
              { gps_code: { contains: searchTerm, mode: "insensitive" } },
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
  payload: IUpdateSchoolPayload
): Promise<ISchool> => {
  return await prisma.school.update({
    where: {
      id,
    },
    data: payload,
  });
};

const softDelete = async (id: string): Promise<ISchool> => {
  return await prisma.school.update({
    where: {
      id,
    },
    data: {
      is_deleted: true,
      deleted_at: new Date(),
    },
  });
};

const onboardWithAdmin = async (
  payload: IOnboardSchoolPayload
): Promise<IOnboardSchoolResult> => {
  return await prisma.$transaction(async (tx) => {
    const school = await tx.school.create({
      data: payload.school,
    });

    const admin = await tx.users.create({
      data: {
        school_id: school.id,
        phone: payload.admin.phone,
        email: payload.admin.email || null,
        full_name: payload.admin.full_name,
        role: "SCHOOL_ADMIN",
        is_active: true,
      },
    });

    return {
      school,
      admin,
    };
  });
};

export const SchoolModels = {
  create,
  findById,
  findByGpsCode,
  findAll,
  update,
  softDelete,
  onboardWithAdmin,
};
