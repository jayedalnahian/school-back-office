import prisma from "../../app/config/prisma";
import { Prisma, School, users } from "@prisma/client";
import {
  IAdminInput,
  IPaginationOptions,
  ISchoolFilterOptions,
  ISchoolInput,
  ISchoolOnboardPayload,
  ISchoolOnboardResult,
  ISchoolPaginationResult,
  ISchoolUpdateInput,
  ISchoolWithAdmins,
} from "./school.types";

/**
 * Onboards a school and its primary administrator within an atomic database transaction.
 * 1. Creates the school record.
 * 2. Creates the user record with role 'SCHOOL_ADMIN' linked to the school.
 * 3. Updates the school record setting 'created_by' to the new user's ID.
 */
export const onboardSchoolTransaction = async (
  schoolData: ISchoolInput,
  adminData: IAdminInput
): Promise<ISchoolOnboardResult> => {
  return await prisma.$transaction(async (tx) => {
    // 1st: Create the school record
    const school = await tx.school.create({
      data: {
        gps_code: schoolData.gps_code,
        name: schoolData.name,
        division: schoolData.division,
        district: schoolData.district,
        upazila: schoolData.upazila,
        cluster: schoolData.cluster,
        address: schoolData.address,
        phone: schoolData.phone,
        is_active: schoolData.is_active ?? true,
      },
    });

    // 2nd: Create user record in users table linked with school_id, role: 'SCHOOL_ADMIN', password_hash: null, full_name, phone, email
    const admin = await tx.users.create({
      data: {
        school_id: school.id,
        role: "SCHOOL_ADMIN",
        password_hash: null,
        full_name: adminData.full_name,
        phone: adminData.phone,
        email: adminData.email || null,
        is_active: true,
      },
    });

    // 3rd: Update schools record setting created_by to the newly created user's id
    const updatedSchool = await tx.school.update({
      where: {
        id: school.id,
      },
      data: {
        created_by: admin.id,
      },
    });

    return {
      school: updatedSchool,
      admin,
    };
  });
};

/**
 * Retrieves a non-deleted school by ID, including associated SCHOOL_ADMIN users
 * (excluding sensitive fields like password_hash and soft deletion metadata).
 */
export const findSchoolById = async (
  id: string
): Promise<ISchoolWithAdmins | null> => {
  return await prisma.school.findFirst({
    where: {
      id,
      is_deleted: false,
    },
    include: {
      users: {
        where: {
          role: "SCHOOL_ADMIN",
          is_deleted: false,
        },
        select: {
          id: true,
          school_id: true,
          phone: true,
          email: true,
          full_name: true,
          role: true,
          is_active: true,
          created_at: true,
          updated_at: true,
        },
      },
    },
  });
};

/**
 * Retrieves a non-deleted school by its unique GPS code.
 */
export const findSchoolByGpsCode = async (
  gps_code: string
): Promise<School | null> => {
  return await prisma.school.findFirst({
    where: {
      gps_code,
      is_deleted: false,
    },
  });
};

/**
 * Retrieves a non-deleted user by phone number to check for duplicate phone registrations.
 */
export const findUserByPhone = async (
  phone: string
): Promise<users | null> => {
  return await prisma.users.findFirst({
    where: {
      phone,
      is_deleted: false,
    },
  });
};

/**
 * Retrieves paginated schools from DB with fuzzy search and exact filtering.
 * - Searches searchTerm across name, gps_code, upazila, district (case-insensitive contains).
 * - Filters exact district, upazila, division.
 * - Enforces is_deleted: false.
 * - Applies dynamic sorting and pagination.
 */
export const getAllSchoolsFromDB = async (
  whereConditions: ISchoolFilterOptions = {},
  paginationOptions: IPaginationOptions = {}
): Promise<ISchoolPaginationResult> => {
  const { searchTerm, district, upazila, division, cluster, is_active } =
    whereConditions;

  const andConditions: Prisma.SchoolWhereInput[] = [
    {
      is_deleted: false,
    },
  ];

  if (searchTerm) {
    andConditions.push({
      OR: [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { gps_code: { contains: searchTerm, mode: "insensitive" } },
        { upazila: { contains: searchTerm, mode: "insensitive" } },
        { district: { contains: searchTerm, mode: "insensitive" } },
      ],
    });
  }

  // Exact filtering for district, upazila, division
  if (district) {
    andConditions.push({ district });
  }

  if (upazila) {
    andConditions.push({ upazila });
  }

  if (division) {
    andConditions.push({ division });
  }

  if (cluster) {
    andConditions.push({ cluster });
  }

  if (is_active !== undefined) {
    andConditions.push({ is_active });
  }

  const where: Prisma.SchoolWhereInput = {
    AND: andConditions,
  };

  const page =
    Number(paginationOptions.page) > 0 ? Number(paginationOptions.page) : 1;
  const limit =
    Number(paginationOptions.limit) > 0 ? Number(paginationOptions.limit) : 10;
  const skip = (page - 1) * limit;
  const take = limit;

  const allowedSortFields: (keyof School)[] = [
    "name",
    "gps_code",
    "division",
    "district",
    "upazila",
    "cluster",
    "created_at",
    "updated_at",
  ];

  const sortBy =
    paginationOptions.sortBy &&
    allowedSortFields.includes(paginationOptions.sortBy as keyof School)
      ? (paginationOptions.sortBy as keyof School)
      : "created_at";

  const sortOrder: Prisma.SortOrder =
    paginationOptions.sortOrder?.toLowerCase() === "asc" ? "asc" : "desc";

  const orderBy: Prisma.SchoolOrderByWithRelationInput = {
    [sortBy]: sortOrder,
  };

  const [data, total] = await Promise.all([
    prisma.school.findMany({
      where,
      skip,
      take,
      orderBy,
    }),
    prisma.school.count({
      where,
    }),
  ]);

  return {
    data,
    total,
  };
};

/**
 * Updates a school record by its unique ID.
 */
export const updateSchoolInDB = async (
  id: string,
  payload: ISchoolUpdateInput | Prisma.SchoolUpdateInput
): Promise<School> => {
  const { email: _email, ...schoolData } = payload as ISchoolUpdateInput;

  return await prisma.school.update({
    where: {
      id,
    },
    data: schoolData as Prisma.SchoolUpdateInput,
  });
};

/**
 * Soft deletes a school by setting is_deleted to true and recording deleted_at timestamp.
 */
export const softDeleteSchoolFromDB = async (
  id: string
): Promise<School> => {
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

export const SchoolModels = {
  onboardSchoolTransaction,
  findSchoolById,
  findSchoolByGpsCode,
  findUserByPhone,
  getAllSchoolsFromDB,
  updateSchoolInDB,
  softDeleteSchoolFromDB,
  // Backwards compatibility / convenience aliases
  create: async (
    payload: ISchoolInput | Prisma.SchoolCreateInput
  ): Promise<School> => {
    const { email: _email, ...data } = payload as ISchoolInput;
    return await prisma.school.create({
      data: {
        gps_code: data.gps_code,
        name: data.name,
        division: data.division,
        district: data.district,
        upazila: data.upazila,
        cluster: data.cluster,
        address: data.address,
        phone: data.phone,
        is_active: data.is_active ?? true,
      },
    });
  },
  findById: findSchoolById,
  findByGpsCode: findSchoolByGpsCode,
  findByPhone: findUserByPhone,
  findAll: async (filters: ISchoolFilterOptions = {}): Promise<School[]> => {
    const { data } = await getAllSchoolsFromDB(filters, { page: 1, limit: 1000 });
    return data;
  },
  update: updateSchoolInDB,
  softDelete: softDeleteSchoolFromDB,
  onboardWithAdmin: async (
    payload: ISchoolOnboardPayload
  ): Promise<ISchoolOnboardResult> => {
    return await onboardSchoolTransaction(payload.school, payload.admin);
  },
};
