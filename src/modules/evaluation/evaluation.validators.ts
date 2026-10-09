import { z } from "zod";

const assessmentLevelEnum = z.enum([
  "ELEMENTARY",
  "INTERMEDIATE",
  "ADVANCED",
]);

const createEvaluationSchema = z.object({
  body: z.object({
    student_id: z
      .string({
        message: "Student ID is required",
      })
      .uuid("Invalid student ID"),
    indicator_id: z
      .string({
        message: "Indicator ID is required",
      })
      .uuid("Invalid indicator ID"),
    teacher_id: z
      .string({
        message: "Teacher ID is required",
      })
      .uuid("Invalid teacher ID"),
    academic_year_id: z
      .string({
        message: "Academic year ID is required",
      })
      .uuid("Invalid academic year ID"),
    level: assessmentLevelEnum,
    evaluation_date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid evaluation date format",
      })
      .optional()
      .nullable(),
    remarks: z.string().optional().nullable(),
    created_by: z.string().uuid("Invalid creator ID").optional().nullable(),
  }),
});

const updateEvaluationSchema = z.object({
  body: z.object({
    level: assessmentLevelEnum.optional(),
    evaluation_date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid evaluation date format",
      })
      .optional()
      .nullable(),
    remarks: z.string().optional().nullable(),
  }),
});

export const EvaluationValidators = {
  createEvaluationSchema,
  updateEvaluationSchema,
};
