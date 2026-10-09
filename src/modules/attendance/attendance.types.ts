import { attendance_status, attendances } from "@prisma/client";

export type IAttendance = attendances;

export type ICreateAttendancePayload = {
  student_id: string;
  academic_year_id: string;
  date: Date | string;
  status?: attendance_status | null;
  remarks?: string | null;
  created_by?: string | null;
};

export type IUpdateAttendancePayload = Partial<ICreateAttendancePayload>;

export type IAttendanceFilters = {
  searchTerm?: string;
  student_id?: string;
  academic_year_id?: string;
  status?: attendance_status;
  date?: string;
};

export type IAttendancePaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};
