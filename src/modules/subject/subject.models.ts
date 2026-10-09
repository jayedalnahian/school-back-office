import prisma from "../../app/config/prisma";
import {
  ICreateSubjectPayload,
  ISubjectFilters,
  IUpdateSubjectPayload,
  ISubject,
} from "./subject.types";

const create = async (payload: ICreateSubjectPayload): Promise<ISubject> => {
  return await prisma.subjects.create({
    data: payload,
  });
};

const findById = async (id: string): Promise<ISubject | null> => {
  return await prisma.subjects.findFirst({
    where: {
      id,
      is_deleted: false,
    },
    include: {
      schools: true,
      classes: true,
    },
  });
};

const findByClassAndName = async (
  class_id: string,
  name: string
): Promise<ISubject | null> => {
  return await prisma.subjects.findFirst({
    where: {
      class_id,
      name,
      is_deleted: false,
    },
  });
};

const findAll = async (filters: ISubjectFilters = {}): Promise<ISubject[]> => {
  const { searchTerm, school_id, class_id, name, code } = filters;

  return await prisma.subjects.findMany({
    where: {
      is_deleted: false,
      ...(school_id ? { school_id } : {}),
      ...(class_id ? { class_id } : {}),
      ...(name ? { name: { contains: name, mode: "insensitive" } } : {}),
      ...(code ? { code: { contains: code, mode: "insensitive" } } : {}),
      ...(searchTerm
        ? {
            OR: [
              { name: { contains: searchTerm, mode: "insensitive" } },
              { code: { contains: searchTerm, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    include: {
      schools: true,
      classes: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
};

const update = async (
  id: string,
  payload: IUpdateSubjectPayload
): Promise<ISubject> => {
  return await prisma.subjects.update({
    where: {
      id,
    },
    data: payload,
  });
};

const softDelete = async (id: string): Promise<ISubject> => {
  return await prisma.subjects.update({
    where: {
      id,
    },
    data: {
      is_deleted: true,
      deleted_at: new Date(),
    },
  });
};

export const SubjectModels = {
  create,
  findById,
  findByClassAndName,
  findAll,
  update,
  softDelete,
};
