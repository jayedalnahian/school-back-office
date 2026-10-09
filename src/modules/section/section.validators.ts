import { z } from "zod";

const createSectionSchema = z.object({
  body: z.object({
    class_id: z
      .string({
        message: "Class ID is required",
      })
      .uuid("Invalid class ID"),
    shift_id: z
      .string({
        message: "Shift ID is required",
      })
      .uuid("Invalid shift ID"),
    name: z
      .string({
        message: "Section name is required",
      })
      .min(1, "Section name cannot be empty"),
    class_teacher_id: z
      .string()
      .uuid("Invalid class teacher ID")
      .optional()
      .nullable(),
    created_by: z.string().uuid("Invalid creator ID").optional().nullable(),
  }),
});

const updateSectionSchema = z.object({
  body: z.object({
    class_id: z.string().uuid("Invalid class ID").optional(),
    shift_id: z.string().uuid("Invalid shift ID").optional(),
    name: z.string().min(1, "Section name cannot be empty").optional(),
    class_teacher_id: z
      .string()
      .uuid("Invalid class teacher ID")
      .optional()
      .nullable(),
  }),
});

export const SectionValidators = {
  createSectionSchema,
  updateSectionSchema,
};
