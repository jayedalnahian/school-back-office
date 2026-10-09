import prisma from "../../app/config/prisma";
import {
  ICreateEvaluationPayload,
  IEvaluationFilters,
  IUpdateEvaluationPayload,
  IEvaluation,
} from "./evaluation.types";

const create = async (
  payload: ICreateEvaluationPayload
): Promise<IEvaluation> => {
  return await prisma.student_evaluations.create({
    data: {
      ...payload,
      evaluation_date: payload.evaluation_date
        ? new Date(payload.evaluation_date)
        : undefined,
    },
  });
};

const findById = async (id: string): Promise<IEvaluation | null> => {
  return await prisma.student_evaluations.findFirst({
    where: {
      id,
      is_deleted: false,
    },
    include: {
      students: true,
      evaluation_indicators: true,
      teacher_profiles: true,
      academic_years: true,
    },
  });
};

const findAll = async (
  filters: IEvaluationFilters = {}
): Promise<IEvaluation[]> => {
  const {
    student_id,
    indicator_id,
    teacher_id,
    academic_year_id,
    level,
  } = filters;

  return await prisma.student_evaluations.findMany({
    where: {
      is_deleted: false,
      ...(student_id ? { student_id } : {}),
      ...(indicator_id ? { indicator_id } : {}),
      ...(teacher_id ? { teacher_id } : {}),
      ...(academic_year_id ? { academic_year_id } : {}),
      ...(level ? { level } : {}),
    },
    include: {
      students: true,
      evaluation_indicators: true,
      teacher_profiles: true,
      academic_years: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
};

const update = async (
  id: string,
  payload: IUpdateEvaluationPayload
): Promise<IEvaluation> => {
  return await prisma.student_evaluations.update({
    where: {
      id,
    },
    data: {
      ...payload,
      ...(payload.evaluation_date !== undefined
        ? {
            evaluation_date: payload.evaluation_date
              ? new Date(payload.evaluation_date)
              : null,
          }
        : {}),
    },
  });
};

const softDelete = async (id: string): Promise<IEvaluation> => {
  return await prisma.student_evaluations.update({
    where: {
      id,
    },
    data: {
      is_deleted: true,
      deleted_at: new Date(),
    },
  });
};

export const EvaluationModels = {
  create,
  findById,
  findAll,
  update,
  softDelete,
};
