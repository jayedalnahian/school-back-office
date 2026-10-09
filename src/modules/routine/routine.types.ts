import { class_routines, day_of_week } from "@prisma/client";

export type IRoutine = class_routines;

export type ICreateRoutinePayload = {
  school_id: string;
  academic_year_id: string;
  section_id: string;
  subject_id: string;
  teacher_id: string;
  day_of_week: day_of_week;
  period_number: number;
  start_time: string;
  end_time: string;
  created_by?: string | null;
};

export type IUpdateRoutinePayload = Partial<ICreateRoutinePayload>;

export type IRoutineFilters = {
  searchTerm?: string;
  school_id?: string;
  academic_year_id?: string;
  section_id?: string;
  subject_id?: string;
  teacher_id?: string;
  day_of_week?: day_of_week;
};

export type IRoutinePaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};
