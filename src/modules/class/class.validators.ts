import { z } from "zod";

const createClassSchema = z.object({
  body: z.object({
    school_id: z
      .string({
        message: "School ID is required",
      })
      .uuid("Invalid school ID"),
    name: z
      .string({
        message: "Class name is required",
      })
      .min(1, "Class name cannot be empty"),
    grade_level: z
      .number({
        message: "Grade level is required",
      })
      .int("Grade level must be an integer"),
    created_by: z.string().uuid("Invalid creator ID").optional().nullable(),
  }),
});

const updateClassSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Class name cannot be empty").optional(),
    grade_level: z.number().int("Grade level must be an integer").optional(),
  }),
});

export const ClassValidators = {
  createClassSchema,
  updateClassSchema,
};
