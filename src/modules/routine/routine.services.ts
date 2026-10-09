import httpStatus from "http-status";
import AppError from "../../app/errorHelpers/AppError";
import prisma from "../../app/config/prisma";
import { RoutineModels } from "./routine.models";
import {
  ICreateRoutinePayload,
  IRoutine,
  IRoutineFilters,
  IUpdateRoutinePayload,
} from "./routine.types";

const createRoutine = async (
  payload: ICreateRoutinePayload
): Promise<IRoutine> => {
  const school = await prisma.school.findFirst({
    where: { id: payload.school_id, is_deleted: false },
  });
  if (!school) {
    throw new AppError(httpStatus.NOT_FOUND, "School not found");
  }

  const academicYear = await prisma.academic_years.findFirst({
    where: { id: payload.academic_year_id, is_deleted: false },
  });
  if (!academicYear) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic year not found");
  }

  const section = await prisma.sections.findFirst({
    where: { id: payload.section_id, is_deleted: false },
  });
  if (!section) {
    throw new AppError(httpStatus.NOT_FOUND, "Section not found");
  }

  const subject = await prisma.subjects.findFirst({
    where: { id: payload.subject_id, is_deleted: false },
  });
  if (!subject) {
    throw new AppError(httpStatus.NOT_FOUND, "Subject not found");
  }

  const teacher = await prisma.teacher_profiles.findFirst({
    where: { id: payload.teacher_id, is_deleted: false },
  });
  if (!teacher) {
    throw new AppError(httpStatus.NOT_FOUND, "Teacher not found");
  }

  const existingSlot = await RoutineModels.findRoutineSlot(
    payload.academic_year_id,
    payload.section_id,
    payload.day_of_week,
    payload.period_number
  );
  if (existingSlot) {
    throw new AppError(
      httpStatus.CONFLICT,
      `Routine slot for ${payload.day_of_week} period ${payload.period_number} already exists for this section`
    );
  }

  return await RoutineModels.create(payload);
};

const getAllRoutines = async (
  filters: IRoutineFilters = {}
): Promise<IRoutine[]> => {
  return await RoutineModels.findAll(filters);
};

const getRoutineById = async (id: string): Promise<IRoutine> => {
  const routine = await RoutineModels.findById(id);
  if (!routine) {
    throw new AppError(httpStatus.NOT_FOUND, "Routine not found");
  }

  return routine;
};

const updateRoutine = async (
  id: string,
  payload: IUpdateRoutinePayload
): Promise<IRoutine> => {
  const routine = await RoutineModels.findById(id);
  if (!routine) {
    throw new AppError(httpStatus.NOT_FOUND, "Routine not found");
  }

  const dayOfWeek = payload.day_of_week || routine.day_of_week;
  const periodNumber =
    payload.period_number !== undefined
      ? payload.period_number
      : routine.period_number;

  if (
    payload.day_of_week !== undefined ||
    payload.period_number !== undefined
  ) {
    const existingSlot = await RoutineModels.findRoutineSlot(
      routine.academic_year_id,
      routine.section_id,
      dayOfWeek,
      periodNumber
    );
    if (existingSlot && existingSlot.id !== id) {
      throw new AppError(
        httpStatus.CONFLICT,
        `Routine slot for ${dayOfWeek} period ${periodNumber} already exists for this section`
      );
    }
  }

  return await RoutineModels.update(id, payload);
};

const deleteRoutine = async (id: string): Promise<IRoutine> => {
  const routine = await RoutineModels.findById(id);
  if (!routine) {
    throw new AppError(httpStatus.NOT_FOUND, "Routine not found");
  }

  return await RoutineModels.softDelete(id);
};

export const RoutineServices = {
  createRoutine,
  getAllRoutines,
  getRoutineById,
  updateRoutine,
  deleteRoutine,
};
