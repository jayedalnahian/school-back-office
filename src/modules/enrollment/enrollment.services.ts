import httpStatus from "http-status";
import AppError from "../../app/errorHelpers/AppError";
import prisma from "../../app/config/prisma";
import { EnrollmentModels } from "./enrollment.models";
import {
  ICreateEnrollmentPayload,
  IEnrollment,
  IEnrollmentFilters,
  IUpdateEnrollmentPayload,
} from "./enrollment.types";

const createEnrollment = async (
  payload: ICreateEnrollmentPayload
): Promise<IEnrollment> => {
  const student = await prisma.students.findFirst({
    where: { id: payload.student_id, is_deleted: false },
  });
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, "Student not found");
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

  const existingEnrollment = await EnrollmentModels.findByYearAndStudent(
    payload.academic_year_id,
    payload.student_id
  );
  if (existingEnrollment) {
    throw new AppError(
      httpStatus.CONFLICT,
      "Student is already enrolled in this academic year"
    );
  }

  const existingRoll = await EnrollmentModels.findByYearSectionAndRoll(
    payload.academic_year_id,
    payload.section_id,
    payload.roll_number
  );
  if (existingRoll) {
    throw new AppError(
      httpStatus.CONFLICT,
      `Roll number '${payload.roll_number}' already exists in this section for the academic year`
    );
  }

  return await EnrollmentModels.create(payload);
};

const getAllEnrollments = async (
  filters: IEnrollmentFilters = {}
): Promise<IEnrollment[]> => {
  return await EnrollmentModels.findAll(filters);
};

const getEnrollmentById = async (id: string): Promise<IEnrollment> => {
  const enrollment = await EnrollmentModels.findById(id);
  if (!enrollment) {
    throw new AppError(httpStatus.NOT_FOUND, "Enrollment not found");
  }

  return enrollment;
};

const updateEnrollment = async (
  id: string,
  payload: IUpdateEnrollmentPayload
): Promise<IEnrollment> => {
  const enrollment = await EnrollmentModels.findById(id);
  if (!enrollment) {
    throw new AppError(httpStatus.NOT_FOUND, "Enrollment not found");
  }

  const academicYearId =
    payload.academic_year_id || enrollment.academic_year_id;
  const sectionId = payload.section_id || enrollment.section_id;
  const rollNumber =
    payload.roll_number !== undefined
      ? payload.roll_number
      : enrollment.roll_number;

  if (
    payload.roll_number !== undefined ||
    payload.section_id !== undefined ||
    payload.academic_year_id !== undefined
  ) {
    const existingRoll = await EnrollmentModels.findByYearSectionAndRoll(
      academicYearId,
      sectionId,
      rollNumber
    );
    if (existingRoll && existingRoll.id !== id) {
      throw new AppError(
        httpStatus.CONFLICT,
        `Roll number '${rollNumber}' already exists in this section for the academic year`
      );
    }
  }

  return await EnrollmentModels.update(id, payload);
};

const deleteEnrollment = async (id: string): Promise<IEnrollment> => {
  const enrollment = await EnrollmentModels.findById(id);
  if (!enrollment) {
    throw new AppError(httpStatus.NOT_FOUND, "Enrollment not found");
  }

  return await EnrollmentModels.softDelete(id);
};

export const EnrollmentServices = {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment,
};
