import { academic_years } from "@prisma/client";

export type IAcademicYear = academic_years;

export type ICreateAcademicYearPayload = {
  school_id: string;
  year: number;
  start_date: Date | string;
  end_date: Date | string;
  is_current?: boolean;
  created_by?: string | null;
};

export type IUpdateAcademicYearPayload = Partial<ICreateAcademicYearPayload>;

export type IAcademicYearFilters = {
  searchTerm?: string;
  school_id?: string;
  year?: number;
  is_current?: boolean;
};

export type IAcademicYearPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};
