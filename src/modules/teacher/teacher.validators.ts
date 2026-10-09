import { z } from "zod";

const genderEnum = z.enum(["MALE", "FEMALE", "OTHER"]);

const createTeacherSchema = z.object({
  body: z.object({
    user_id: z
      .string({
        message: "User ID is required",
      })
      .uuid("Invalid user ID"),
    school_id: z
      .string({
        message: "School ID is required",
      })
      .uuid("Invalid school ID"),
    designation: z
      .string({
        message: "Designation is required",
      })
      .min(1, "Designation cannot be empty"),
    qualification: z.string().optional().nullable(),
    joined_date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid joined date format",
      })
      .optional()
      .nullable(),
    gender: genderEnum.optional().nullable(),
    is_active: z.boolean().optional(),
    created_by: z.string().uuid("Invalid creator ID").optional().nullable(),
  }),
});

const updateTeacherSchema = z.object({
  body: z.object({
    school_id: z.string().uuid("Invalid school ID").optional(),
    designation: z.string().min(1, "Designation cannot be empty").optional(),
    qualification: z.string().optional().nullable(),
    joined_date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid joined date format",
      })
      .optional()
      .nullable(),
    gender: genderEnum.optional().nullable(),
    is_active: z.boolean().optional(),
  }),
});

export const TeacherValidators = {
  createTeacherSchema,
  updateTeacherSchema,
};
