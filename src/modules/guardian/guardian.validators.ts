import { z } from "zod";

const createGuardianSchema = z.object({
  body: z.object({
    user_id: z
      .string({
        message: "User ID is required",
      })
      .uuid("Invalid user ID"),
    relation_type: z
      .string({
        message: "Relation type is required",
      })
      .min(1, "Relation type cannot be empty"),
    nid_number: z.string().optional().nullable(),
    created_by: z.string().uuid("Invalid creator ID").optional().nullable(),
  }),
});

const updateGuardianSchema = z.object({
  body: z.object({
    relation_type: z.string().min(1, "Relation type cannot be empty").optional(),
    nid_number: z.string().optional().nullable(),
  }),
});

export const GuardianValidators = {
  createGuardianSchema,
  updateGuardianSchema,
};
