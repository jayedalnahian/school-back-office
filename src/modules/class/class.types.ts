import { classes } from "@prisma/client";

export type IClass = classes;

export type ICreateClassPayload = {
  school_id: string;
  name: string;
  grade_level: number;
  created_by?: string | null;
};

export type IUpdateClassPayload = Partial<ICreateClassPayload>;

export type IClassFilters = {
  searchTerm?: string;
  school_id?: string;
  grade_level?: number;
};

export type IClassPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};
