import { subjects } from "@prisma/client";

export type ISubject = subjects;

export type ICreateSubjectPayload = {
  school_id: string;
  class_id: string;
  name: string;
  code?: string | null;
  created_by?: string | null;
};

export type IUpdateSubjectPayload = Partial<ICreateSubjectPayload>;

export type ISubjectFilters = {
  searchTerm?: string;
  school_id?: string;
  class_id?: string;
  name?: string;
  code?: string;
};

export type ISubjectPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};
