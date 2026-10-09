import httpStatus from "http-status";
import AppError from "../../app/errorHelpers/AppError";
import prisma from "../../app/config/prisma";
import { StudentModels } from "./student.models";
import {
  ICreateStudentPayload,
  IStudent,
  IStudentFilters,
  IUpdateStudentPayload,
} from "./student.types";

const createStudent = async (
  payload: ICreateStudentPayload
): Promise<IStudent> => {
  const school = await prisma.school.findFirst({
    where: { id: payload.school_id, is_deleted: false },
  });
  if (!school) {
    throw new AppError(httpStatus.NOT_FOUND, "School not found");
  }

  const guardian = await prisma.guardian_profiles.findFirst({
    where: { id: payload.guardian_id, is_deleted: false },
  });
  if (!guardian) {
    throw new AppError(httpStatus.NOT_FOUND, "Guardian profile not found");
  }

  const existingStudent = await StudentModels.findByAdmissionNo(
    payload.school_id,
    payload.admission_no
  );
  if (existingStudent) {
    throw new AppError(
      httpStatus.CONFLICT,
      `Student with admission number '${payload.admission_no}' already exists in this school`
    );
  }

  return await StudentModels.create(payload);
};

const getAllStudents = async (
  filters: IStudentFilters = {}
): Promise<IStudent[]> => {
  return await StudentModels.findAll(filters);
};

const getStudentById = async (id: string): Promise<IStudent> => {
  const student = await StudentModels.findById(id);
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, "Student not found");
  }

  return student;
};

const updateStudent = async (
  id: string,
  payload: IUpdateStudentPayload
): Promise<IStudent> => {
  const student = await StudentModels.findById(id);
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, "Student not found");
  }

  if (
    payload.admission_no &&
    payload.admission_no !== student.admission_no
  ) {
    const schoolId = payload.school_id || student.school_id;
    const existingStudent = await StudentModels.findByAdmissionNo(
      schoolId,
      payload.admission_no
    );
    if (existingStudent) {
      throw new AppError(
        httpStatus.CONFLICT,
        `Student with admission number '${payload.admission_no}' already exists in this school`
      );
    }
  }

  return await StudentModels.update(id, payload);
};

const deleteStudent = async (id: string): Promise<IStudent> => {
  const student = await StudentModels.findById(id);
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, "Student not found");
  }

  return await StudentModels.softDelete(id);
};

export const StudentServices = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
