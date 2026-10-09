import { z } from "zod";

const createAcademicYearSchema = z.object({
  body: z.object({
    school_id: z
      .string({
        message: "School ID is required",
      })
      .uuid("Invalid school ID"),
    year: z
      .number({
        message: "Year is required",
      })
      .int()
      .min(2000, "Year must be 2000 or later"),
    start_date: z
      .string({
        message: "Start date is required",
      })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid start date format",
      }),
    end_date: z
      .string({
        message: "End date is required",
      })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid end date format",
      }),
    is_current: z.boolean().optional(),
    created_by: z.string().uuid("Invalid creator ID").optional().nullable(),
  }),
});

const updateAcademicYearSchema = z.object({
  body: z.object({
    year: z.number().int().min(2000).optional(),
    start_date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid start date format",
      })
      .optional(),
    end_date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid end date format",
      })
      .optional(),
    is_current: z.boolean().optional(),
  }),
});

export const AcademicYearValidators = {
  createAcademicYearSchema,
  updateAcademicYearSchema,
};
