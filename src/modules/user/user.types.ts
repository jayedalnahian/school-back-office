import { role, users } from "@prisma/client";

export type IUser = users;

export type ICreateUserPayload = {
  school_id?: string | null;
  phone: string;
  email?: string | null;
  password_hash?: string | null;
  full_name: string;
  role: role;
  is_active?: boolean;
  created_by?: string | null;
};

export type IUpdateUserPayload = Partial<ICreateUserPayload>;

export type IUserFilters = {
  searchTerm?: string;
  school_id?: string;
  phone?: string;
  email?: string;
  role?: role;
  is_active?: boolean;
};

export type IUserPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};
