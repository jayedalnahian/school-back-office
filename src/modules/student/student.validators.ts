import { z } from "zod";

const genderEnum = z.enum(["MALE", "FEMALE", "OTHER"]);

const createStudentSchema = z.object({
  body: z.object({
    school_id: z
      .string({
        message: "School ID is required",
      })
      .uuid("Invalid school ID"),
    guardian_id: z
      .string({
        message: "Guardian ID is required",
      })
      .uuid("Invalid guardian ID"),
    admission_no: z
      .string({
        message: "Admission number is required",
      })
      .min(1, "Admission number cannot be empty"),
    full_name: z
      .string({
        message: "Full name is required",
      })
      .min(1, "Full name cannot be empty"),
    birth_date: z
      .string({
        message: "Birth date is required",
      })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid birth date format",
      }),
    birth_reg_no: z.string().optional().nullable(),
    gender: genderEnum,
    blood_group: z.string().optional().nullable(),
    address: z.string().optional().nullable(),
    avatar_url: z.string().url("Invalid avatar URL").optional().nullable(),
    is_active: z.boolean().optional(),
    created_by: z.string().uuid("Invalid creator ID").optional().nullable(),
  }),
});

const updateStudentSchema = z.object({
  body: z.object({
    school_id: z.string().uuid("Invalid school ID").optional(),
    guardian_id: z.string().uuid("Invalid guardian ID").optional(),
    admission_no: z.string().min(1, "Admission number cannot be empty").optional(),
    full_name: z.string().min(1, "Full name cannot be empty").optional(),
    birth_date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid birth date format",
      })
      .optional(),
    birth_reg_no: z.string().optional().nullable(),
    gender: genderEnum.optional(),
    blood_group: z.string().optional().nullable(),
    address: z.string().optional().nullable(),
    avatar_url: z.string().url("Invalid avatar URL").optional().nullable(),
    is_active: z.boolean().optional(),
  }),
});

export const StudentValidators = {
  createStudentSchema,
  updateStudentSchema,
};
