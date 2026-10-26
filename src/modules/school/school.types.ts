import { Prisma, School, users } from "@prisma/client";

export type ISchool = School;
export type IUser = users;

/**
 * School creation DTO
 */
export interface ISchoolInput {
  gps_code: string;
  name: string;
  division: string;
  district: string;
  upazila: string;
  cluster: string;
  address?: string | null;
  email?: string | null;
  phone?: string | null;
  is_active?: boolean;
}

/**
 * School update DTO (gps_code is omitted/forbidden in updateSchoolZodSchema)
 */
export interface ISchoolUpdateInput {
  gps_code?: string;
  name?: string;
  division?: string;
  district?: string;
  upazila?: string;
  cluster?: string;
  address?: string | null;
  email?: string | null;
  phone?: string | null;
  is_active?: boolean;
}

/**
 * Admin user input DTO for school onboarding
 */
export interface IAdminInput {
  full_name: string;
  phone: string;
  email?: string | null;
}

/**
 * School onboarding payload combining school and admin inputs
 */
export interface ISchoolOnboardPayload {
  school: ISchoolInput;
  admin: IAdminInput;
}

/**
 * School onboarding transaction result
 */
export interface ISchoolOnboardResult {
  school: School;
  admin: users;
}

/**
 * School query filter options
 */
export interface ISchoolFilterOptions {
  searchTerm?: string;
  district?: string;
  upazila?: string;
  division?: string;
  cluster?: string;
  is_active?: boolean;
}

/**
 * Standard pagination and sorting options
 */
export interface IPaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

/**
 * School pagination query result
 */
export interface ISchoolPaginationResult {
  data: School[];
  total: number;
}

/**
 * School record including associated school admin users (excluding sensitive fields)
 */
export type ISchoolWithAdmins = Prisma.SchoolGetPayload<{
  include: {
    users: {
      select: {
        id: true;
        school_id: true;
        phone: true;
        email: true;
        full_name: true;
        role: true;
        is_active: true;
        created_at: true;
        updated_at: true;
      };
    };
  };
}>;

// Backwards compatibility aliases
export type ICreateSchoolPayload = ISchoolInput;
export type IUpdateSchoolPayload = ISchoolUpdateInput;
export type IOnboardAdminPayload = IAdminInput;
export type IOnboardSchoolPayload = ISchoolOnboardPayload;
export type IOnboardSchoolResult = ISchoolOnboardResult;
export type ISchoolFilters = ISchoolFilterOptions;
export type ISchoolPaginationOptions = IPaginationOptions;
