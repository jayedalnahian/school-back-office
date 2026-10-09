import { z } from "zod";

const createEnrollmentSchema = z.object({
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
    section_id: z
      .string({
        message: "Section ID is required",
      })
      .uuid("Invalid section ID"),
    roll_number: z
      .number({
        message: "Roll number is required",
      })
      .int("Roll number must be an integer")
      .min(1, "Roll number must be positive"),
    created_by: z.string().uuid("Invalid creator ID").optional().nullable(),
  }),
});

const updateEnrollmentSchema = z.object({
  body: z.object({
    academic_year_id: z.string().uuid("Invalid academic year ID").optional(),
    section_id: z.string().uuid("Invalid section ID").optional(),
    roll_number: z
      .number()
      .int("Roll number must be an integer")
      .min(1, "Roll number must be positive")
      .optional(),
  }),
});

export const EnrollmentValidators = {
  createEnrollmentSchema,
  updateEnrollmentSchema,
};
