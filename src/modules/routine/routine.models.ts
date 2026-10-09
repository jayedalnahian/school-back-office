import { day_of_week } from "@prisma/client";
import prisma from "../../app/config/prisma";
import {
  ICreateRoutinePayload,
  IRoutineFilters,
  IUpdateRoutinePayload,
  IRoutine,
} from "./routine.types";

const create = async (payload: ICreateRoutinePayload): Promise<IRoutine> => {
  return await prisma.class_routines.create({
    data: payload,
  });
};

const findById = async (id: string): Promise<IRoutine | null> => {
  return await prisma.class_routines.findFirst({
    where: {
      id,
      is_deleted: false,
    },
    include: {
      schools: true,
      academic_years: true,
      sections: true,
      subjects: true,
      teacher_profiles: true,
    },
  });
};

const findRoutineSlot = async (
  academic_year_id: string,
  section_id: string,
  day_of_week: day_of_week,
  period_number: number
): Promise<IRoutine | null> => {
  return await prisma.class_routines.findFirst({
    where: {
      academic_year_id,
      section_id,
      day_of_week,
      period_number,
      is_deleted: false,
    },
  });
};

const findAll = async (filters: IRoutineFilters = {}): Promise<IRoutine[]> => {
  const {
    school_id,
    academic_year_id,
    section_id,
    subject_id,
    teacher_id,
    day_of_week,
  } = filters;

  return await prisma.class_routines.findMany({
    where: {
      is_deleted: false,
      ...(school_id ? { school_id } : {}),
      ...(academic_year_id ? { academic_year_id } : {}),
      ...(section_id ? { section_id } : {}),
      ...(subject_id ? { subject_id } : {}),
      ...(teacher_id ? { teacher_id } : {}),
      ...(day_of_week ? { day_of_week } : {}),
    },
    include: {
      schools: true,
      academic_years: true,
      sections: true,
      subjects: true,
      teacher_profiles: true,
    },
    orderBy: [
      { day_of_week: "asc" },
      { period_number: "asc" },
    ],
  });
};

const update = async (
  id: string,
  payload: IUpdateRoutinePayload
): Promise<IRoutine> => {
  return await prisma.class_routines.update({
    where: {
      id,
    },
    data: payload,
  });
};

const softDelete = async (id: string): Promise<IRoutine> => {
  return await prisma.class_routines.update({
    where: {
      id,
    },
    data: {
      is_deleted: true,
      deleted_at: new Date(),
    },
  });
};

export const RoutineModels = {
  create,
  findById,
  findRoutineSlot,
  findAll,
  update,
  softDelete,
};
