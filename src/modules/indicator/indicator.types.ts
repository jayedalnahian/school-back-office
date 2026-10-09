import { evaluation_indicators, indicator_type } from "@prisma/client";

export type IIndicator = evaluation_indicators;

export type ICreateIndicatorPayload = {
  school_id: string;
  subject_id?: string | null;
  type: indicator_type;
  code: string;
  title: string;
  description?: string | null;
  created_by?: string | null;
};

export type IUpdateIndicatorPayload = Partial<ICreateIndicatorPayload>;

export type IIndicatorFilters = {
  searchTerm?: string;
  school_id?: string;
  subject_id?: string;
  type?: indicator_type;
  code?: string;
};

export type IIndicatorPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};
