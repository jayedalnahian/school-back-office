import { z } from "zod";

const createShiftSchema = z.object({
  body: z.object({
    school_id: z
      .string({
        message: "School ID is required",
      })
      .uuid("Invalid school ID"),
    name: z
      .string({
        message: "Shift name is required",
      })
      .min(1, "Shift name cannot be empty"),
    start_time: z
      .string({
        message: "Start time is required",
      })
      .min(1, "Start time cannot be empty"),
    end_time: z
      .string({
        message: "End time is required",
      })
      .min(1, "End time cannot be empty"),
    created_by: z.string().uuid("Invalid creator ID").optional().nullable(),
  }),
});

const updateShiftSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Shift name cannot be empty").optional(),
    start_time: z.string().min(1, "Start time cannot be empty").optional(),
    end_time: z.string().min(1, "End time cannot be empty").optional(),
  }),
});

export const ShiftValidators = {
  createShiftSchema,
  updateShiftSchema,
};
