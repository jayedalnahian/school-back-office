import { School, users } from "@prisma/client";

export type ISchool = School;

export type ICreateSchoolPayload = {
  gps_code: string;
  name: string;
  division?: string;
  district?: string;
  upazila?: string;
  cluster?: string;
  address?: string;
  phone?: string;
  is_active?: boolean;
};

export type IUpdateSchoolPayload = Partial<ICreateSchoolPayload>;

export type IOnboardAdminPayload = {
  full_name: string;
  phone: string;
  email?: string | null;
  role?: "SCHOOL_ADMIN";
};

export type IOnboardSchoolPayload = {
  school: ICreateSchoolPayload;
  admin: IOnboardAdminPayload;
};

export type IOnboardSchoolResult = {
  school: ISchool;
  admin: users;
};

export type ISchoolFilters = {
  searchTerm?: string;
  district?: string;
  upazila?: string;
  division?: string;
  cluster?: string;
  is_active?: boolean;
};

export type ISchoolPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};
