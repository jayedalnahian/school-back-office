import { guardian_profiles } from "@prisma/client";

export type IGuardian = guardian_profiles;

export type ICreateGuardianPayload = {
  user_id: string;
  relation_type: string;
  nid_number?: string | null;
  created_by?: string | null;
};

export type IUpdateGuardianPayload = Partial<ICreateGuardianPayload>;

export type IGuardianFilters = {
  searchTerm?: string;
  user_id?: string;
  relation_type?: string;
};

export type IGuardianPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};
