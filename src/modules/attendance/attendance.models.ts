import prisma from "../../app/config/prisma";
import {
  ICreateAttendancePayload,
  IAttendanceFilters,
  IUpdateAttendancePayload,
  IAttendance,
} from "./attendance.types";

const create = async (
  payload: ICreateAttendancePayload
): Promise<IAttendance> => {
  return await prisma.attendances.create({
    data: {
      ...payload,
      date: new Date(payload.date),
    },
  });
};

const findById = async (id: string): Promise<IAttendance | null> => {
  return await prisma.attendances.findFirst({
    where: {
      id,
      is_deleted: false,
    },
    include: {
      students: true,
      academic_years: true,
    },
  });
};

const findByStudentYearAndDate = async (
  student_id: string,
  academic_year_id: string,
  date: Date
): Promise<IAttendance | null> => {
  return await prisma.attendances.findFirst({
    where: {
      student_id,
      academic_year_id,
      date,
      is_deleted: false,
    },
  });
};

const findAll = async (
  filters: IAttendanceFilters = {}
): Promise<IAttendance[]> => {
  const { student_id, academic_year_id, status, date } = filters;

  return await prisma.attendances.findMany({
    where: {
      is_deleted: false,
      ...(student_id ? { student_id } : {}),
      ...(academic_year_id ? { academic_year_id } : {}),
      ...(status ? { status } : {}),
      ...(date ? { date: new Date(date) } : {}),
    },
    include: {
      students: true,
      academic_years: true,
    },
    orderBy: {
      date: "desc",
    },
  });
};

const update = async (
  id: string,
  payload: IUpdateAttendancePayload
): Promise<IAttendance> => {
  return await prisma.attendances.update({
    where: {
      id,
    },
    data: {
      ...payload,
      ...(payload.date ? { date: new Date(payload.date) } : {}),
    },
  });
};

const softDelete = async (id: string): Promise<IAttendance> => {
  return await prisma.attendances.update({
    where: {
      id,
    },
    data: {
      is_deleted: true,
      deleted_at: new Date(),
    },
  });
};

export const AttendanceModels = {
  create,
  findById,
  findByStudentYearAndDate,
  findAll,
  update,
  softDelete,
};
