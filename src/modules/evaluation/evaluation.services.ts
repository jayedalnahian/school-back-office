import httpStatus from "http-status";
import AppError from "../../app/errorHelpers/AppError";
import prisma from "../../app/config/prisma";
import { EvaluationModels } from "./evaluation.models";
import {
  ICreateEvaluationPayload,
  IEvaluation,
  IEvaluationFilters,
  IUpdateEvaluationPayload,
} from "./evaluation.types";

const createEvaluation = async (
  payload: ICreateEvaluationPayload
): Promise<IEvaluation> => {
  const student = await prisma.students.findFirst({
    where: { id: payload.student_id, is_deleted: false },
  });
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, "Student not found");
  }

  const indicator = await prisma.evaluation_indicators.findFirst({
    where: { id: payload.indicator_id, is_deleted: false },
  });
  if (!indicator) {
    throw new AppError(httpStatus.NOT_FOUND, "Evaluation indicator not found");
  }

  const teacher = await prisma.teacher_profiles.findFirst({
    where: { id: payload.teacher_id, is_deleted: false },
  });
  if (!teacher) {
    throw new AppError(httpStatus.NOT_FOUND, "Teacher not found");
  }

  const academicYear = await prisma.academic_years.findFirst({
    where: { id: payload.academic_year_id, is_deleted: false },
  });
  if (!academicYear) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic year not found");
  }

  return await EvaluationModels.create(payload);
};

const getAllEvaluations = async (
  filters: IEvaluationFilters = {}
): Promise<IEvaluation[]> => {
  return await EvaluationModels.findAll(filters);
};

const getEvaluationById = async (id: string): Promise<IEvaluation> => {
  const evaluation = await EvaluationModels.findById(id);
  if (!evaluation) {
    throw new AppError(httpStatus.NOT_FOUND, "Evaluation record not found");
  }

  return evaluation;
};

const updateEvaluation = async (
  id: string,
  payload: IUpdateEvaluationPayload
): Promise<IEvaluation> => {
  const evaluation = await EvaluationModels.findById(id);
  if (!evaluation) {
    throw new AppError(httpStatus.NOT_FOUND, "Evaluation record not found");
  }

  return await EvaluationModels.update(id, payload);
};

const deleteEvaluation = async (id: string): Promise<IEvaluation> => {
  const evaluation = await EvaluationModels.findById(id);
  if (!evaluation) {
    throw new AppError(httpStatus.NOT_FOUND, "Evaluation record not found");
  }

  return await EvaluationModels.softDelete(id);
};

export const EvaluationServices = {
  createEvaluation,
  getAllEvaluations,
  getEvaluationById,
  updateEvaluation,
  deleteEvaluation,
};
