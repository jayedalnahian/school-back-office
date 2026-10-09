import { assessment_level, student_evaluations } from "@prisma/client";

export type IEvaluation = student_evaluations;

export type ICreateEvaluationPayload = {
  student_id: string;
  indicator_id: string;
  teacher_id: string;
  academic_year_id: string;
  level: assessment_level;
  evaluation_date?: Date | string | null;
  remarks?: string | null;
  created_by?: string | null;
};

export type IUpdateEvaluationPayload = Partial<ICreateEvaluationPayload>;

export type IEvaluationFilters = {
  searchTerm?: string;
  student_id?: string;
  indicator_id?: string;
  teacher_id?: string;
  academic_year_id?: string;
  level?: assessment_level;
};

export type IEvaluationPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};
