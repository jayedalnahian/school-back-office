import { z } from "zod";

const attendanceStatusEnum = z.enum(["PRESENT", "ABSENT", "LATE", "EXCUSED"]);

const createAttendanceSchema = z.object({
  body: z.object({
    student_id: z
      .string({
        message: "Student ID is required",
      })
      .uuid("Invalid student ID"),
    academic_year_id: z
      .string({
        message: "Academic year ID is required",
      })
      .uuid("Invalid academic year ID"),
    date: z
      .string({
        message: "Date is required",
      })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      }),
    status: attendanceStatusEnum.optional().nullable(),
    remarks: z.string().optional().nullable(),
    created_by: z.string().uuid("Invalid creator ID").optional().nullable(),
  }),
});

const updateAttendanceSchema = z.object({
  body: z.object({
    status: attendanceStatusEnum.optional().nullable(),
    remarks: z.string().optional().nullable(),
  }),
});

export const AttendanceValidators = {
  createAttendanceSchema,
  updateAttendanceSchema,
};
