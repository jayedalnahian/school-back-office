import prisma from "../../app/config/prisma";
import {
  ICreateStudentPayload,
  IStudentFilters,
  IUpdateStudentPayload,
  IStudent,
} from "./student.types";

const create = async (payload: ICreateStudentPayload): Promise<IStudent> => {
  return await prisma.students.create({
    data: {
      ...payload,
      birth_date: new Date(payload.birth_date),
    },
  });
};

const findById = async (id: string): Promise<IStudent | null> => {
  return await prisma.students.findFirst({
    where: {
      id,
      is_deleted: false,
    },
    include: {
      schools: true,
      guardian_profiles: true,
      enrollments: true,
    },
  });
};

const findByAdmissionNo = async (
  school_id: string,
  admission_no: string
): Promise<IStudent | null> => {
  return await prisma.students.findFirst({
    where: {
      school_id,
      admission_no,
      is_deleted: false,
    },
  });
};

const findAll = async (
  filters: IStudentFilters = {}
): Promise<IStudent[]> => {
  const { searchTerm, school_id, guardian_id, admission_no, gender, is_active } =
    filters;

  return await prisma.students.findMany({
    where: {
      is_deleted: false,
      ...(school_id ? { school_id } : {}),
      ...(guardian_id ? { guardian_id } : {}),
      ...(gender ? { gender } : {}),
      ...(is_active !== undefined ? { is_active } : {}),
      ...(admission_no
        ? { admission_no: { contains: admission_no, mode: "insensitive" } }
        : {}),
      ...(searchTerm
        ? {
            OR: [
              { full_name: { contains: searchTerm, mode: "insensitive" } },
              { admission_no: { contains: searchTerm, mode: "insensitive" } },
              { birth_reg_no: { contains: searchTerm, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    include: {
      schools: true,
      guardian_profiles: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
};

const update = async (
  id: string,
  payload: IUpdateStudentPayload
): Promise<IStudent> => {
  return await prisma.students.update({
    where: {
      id,
    },
    data: {
      ...payload,
      ...(payload.birth_date
        ? { birth_date: new Date(payload.birth_date) }
        : {}),
    },
  });
};

const softDelete = async (id: string): Promise<IStudent> => {
  return await prisma.students.update({
    where: {
      id,
    },
    data: {
      is_deleted: true,
      deleted_at: new Date(),
    },
  });
};

export const StudentModels = {
  create,
  findById,
  findByAdmissionNo,
  findAll,
  update,
  softDelete,
};
