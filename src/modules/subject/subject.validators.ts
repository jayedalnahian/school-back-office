import { z } from "zod";

const createSubjectSchema = z.object({
  body: z.object({
    school_id: z
      .string({
        message: "School ID is required",
      })
      .uuid("Invalid school ID"),
    class_id: z
      .string({
        message: "Class ID is required",
      })
      .uuid("Invalid class ID"),
    name: z
      .string({
        message: "Subject name is required",
      })
      .min(1, "Subject name cannot be empty"),
    code: z.string().optional().nullable(),
    created_by: z.string().uuid("Invalid creator ID").optional().nullable(),
  }),
});

const updateSubjectSchema = z.object({
  body: z.object({
    class_id: z.string().uuid("Invalid class ID").optional(),
    name: z.string().min(1, "Subject name cannot be empty").optional(),
    code: z.string().optional().nullable(),
  }),
});

export const SubjectValidators = {
  createSubjectSchema,
  updateSubjectSchema,
};
