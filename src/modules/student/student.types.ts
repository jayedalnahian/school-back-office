import { gender, students } from "@prisma/client";

export type IStudent = students;

export type ICreateStudentPayload = {
  school_id: string;
  guardian_id: string;
  admission_no: string;
  full_name: string;
  birth_date: Date | string;
  birth_reg_no?: string | null;
  gender: gender;
  blood_group?: string | null;
  address?: string | null;
  avatar_url?: string | null;
  is_active?: boolean;
  created_by?: string | null;
};

export type IUpdateStudentPayload = Partial<ICreateStudentPayload>;

export type IStudentFilters = {
  searchTerm?: string;
  school_id?: string;
  guardian_id?: string;
  admission_no?: string;
  gender?: gender;
  is_active?: boolean;
};

export type IStudentPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};
