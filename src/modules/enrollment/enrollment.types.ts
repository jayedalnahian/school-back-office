import { enrollments } from "@prisma/client";

export type IEnrollment = enrollments;

export type ICreateEnrollmentPayload = {
  student_id: string;
  academic_year_id: string;
  section_id: string;
  roll_number: number;
  created_by?: string | null;
};

export type IUpdateEnrollmentPayload = Partial<ICreateEnrollmentPayload>;

export type IEnrollmentFilters = {
  searchTerm?: string;
  student_id?: string;
  academic_year_id?: string;
  section_id?: string;
  roll_number?: number;
};

export type IEnrollmentPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};
