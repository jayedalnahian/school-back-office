import { gender, teacher_profiles } from "@prisma/client";

export type ITeacher = teacher_profiles;

export type ICreateTeacherPayload = {
  user_id: string;
  school_id: string;
  designation: string;
  qualification?: string | null;
  joined_date?: Date | string | null;
  gender?: gender | null;
  is_active?: boolean;
  created_by?: string | null;
};

export type IUpdateTeacherPayload = Partial<ICreateTeacherPayload>;

export type ITeacherFilters = {
  searchTerm?: string;
  school_id?: string;
  user_id?: string;
  designation?: string;
  gender?: gender;
  is_active?: boolean;
};

export type ITeacherPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};
