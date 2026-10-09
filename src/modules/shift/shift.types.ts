import { shifts } from "@prisma/client";

export type IShift = shifts;

export type ICreateShiftPayload = {
  school_id: string;
  name: string;
  start_time: string;
  end_time: string;
  created_by?: string | null;
};

export type IUpdateShiftPayload = Partial<ICreateShiftPayload>;

export type IShiftFilters = {
  searchTerm?: string;
  school_id?: string;
  name?: string;
};

export type IShiftPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};
