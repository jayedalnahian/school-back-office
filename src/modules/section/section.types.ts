import { sections } from "@prisma/client";

export type ISection = sections;

export type ICreateSectionPayload = {
  class_id: string;
  shift_id: string;
  name: string;
  class_teacher_id?: string | null;
  created_by?: string | null;
};

export type IUpdateSectionPayload = Partial<ICreateSectionPayload>;

export type ISectionFilters = {
  searchTerm?: string;
  class_id?: string;
  shift_id?: string;
  class_teacher_id?: string;
};

export type ISectionPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};
