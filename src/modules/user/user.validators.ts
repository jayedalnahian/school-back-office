import { z } from "zod";

const roleEnum = z.enum(["SUPER_ADMIN", "SCHOOL_ADMIN", "TEACHER", "GUARDIAN"]);

const createUserSchema = z.object({
  body: z.object({
    school_id: z.string().uuid("Invalid school ID").optional().nullable(),
    phone: z
      .string({
        message: "Phone number is required",
      })
      .min(1, "Phone number cannot be empty"),
    email: z.string().email("Invalid email address").optional().nullable(),
    password_hash: z.string().optional().nullable(),
    full_name: z
      .string({
        message: "Full name is required",
      })
      .min(1, "Full name cannot be empty"),
    role: roleEnum,
    is_active: z.boolean().optional(),
    created_by: z.string().uuid("Invalid creator ID").optional().nullable(),
  }),
});

const updateUserSchema = z.object({
  body: z.object({
    school_id: z.string().uuid("Invalid school ID").optional().nullable(),
    phone: z.string().min(1, "Phone number cannot be empty").optional(),
    email: z.string().email("Invalid email address").optional().nullable(),
    password_hash: z.string().optional().nullable(),
    full_name: z.string().min(1, "Full name cannot be empty").optional(),
    role: roleEnum.optional(),
    is_active: z.boolean().optional(),
  }),
});

export const UserValidators = {
  createUserSchema,
  updateUserSchema,
};
