import prisma from "../../app/config/prisma";
import {
  ICreateEnrollmentPayload,
  IEnrollmentFilters,
  IUpdateEnrollmentPayload,
  IEnrollment,
} from "./enrollment.types";

const create = async (
  payload: ICreateEnrollmentPayload
): Promise<IEnrollment> => {
  return await prisma.enrollments.create({
    data: payload,
  });
};

const findById = async (id: string): Promise<IEnrollment | null> => {
  return await prisma.enrollments.findFirst({
    where: {
      id,
      is_deleted: false,
    },
    include: {
      students: true,
      academic_years: true,
      sections: true,
    },
  });
};

const findByYearAndStudent = async (
  academic_year_id: string,
  student_id: string
): Promise<IEnrollment | null> => {
  return await prisma.enrollments.findFirst({
    where: {
      academic_year_id,
      student_id,
      is_deleted: false,
    },
  });
};

const findByYearSectionAndRoll = async (
  academic_year_id: string,
  section_id: string,
  roll_number: number
): Promise<IEnrollment | null> => {
  return await prisma.enrollments.findFirst({
    where: {
      academic_year_id,
      section_id,
      roll_number,
      is_deleted: false,
    },
  });
};

const findAll = async (
  filters: IEnrollmentFilters = {}
): Promise<IEnrollment[]> => {
  const { student_id, academic_year_id, section_id, roll_number } = filters;

  return await prisma.enrollments.findMany({
    where: {
      is_deleted: false,
      ...(student_id ? { student_id } : {}),
      ...(academic_year_id ? { academic_year_id } : {}),
      ...(section_id ? { section_id } : {}),
      ...(roll_number !== undefined ? { roll_number } : {}),
    },
    include: {
      students: true,
      academic_years: true,
      sections: true,
    },
    orderBy: {
      roll_number: "asc",
    },
  });
};

const update = async (
  id: string,
  payload: IUpdateEnrollmentPayload
): Promise<IEnrollment> => {
  return await prisma.enrollments.update({
    where: {
      id,
    },
    data: payload,
  });
};

const softDelete = async (id: string): Promise<IEnrollment> => {
  return await prisma.enrollments.update({
    where: {
      id,
    },
    data: {
      is_deleted: true,
      deleted_at: new Date(),
    },
  });
};

export const EnrollmentModels = {
  create,
  findById,
  findByYearAndStudent,
  findByYearSectionAndRoll,
  findAll,
  update,
  softDelete,
};
