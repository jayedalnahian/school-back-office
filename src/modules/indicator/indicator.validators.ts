import { z } from "zod";

const indicatorTypeEnum = z.enum(["PI", "BI"]);

const createIndicatorSchema = z.object({
  body: z.object({
    school_id: z
      .string({
        message: "School ID is required",
      })
      .uuid("Invalid school ID"),
    subject_id: z.string().uuid("Invalid subject ID").optional().nullable(),
    type: indicatorTypeEnum,
    code: z
      .string({
        message: "Indicator code is required",
      })
      .min(1, "Indicator code cannot be empty"),
    title: z
      .string({
        message: "Indicator title is required",
      })
      .min(1, "Indicator title cannot be empty"),
    description: z.string().optional().nullable(),
    created_by: z.string().uuid("Invalid creator ID").optional().nullable(),
  }),
});

const updateIndicatorSchema = z.object({
  body: z.object({
    subject_id: z.string().uuid("Invalid subject ID").optional().nullable(),
    type: indicatorTypeEnum.optional(),
    code: z.string().min(1, "Indicator code cannot be empty").optional(),
    title: z.string().min(1, "Indicator title cannot be empty").optional(),
    description: z.string().optional().nullable(),
  }),
});

export const IndicatorValidators = {
  createIndicatorSchema,
  updateIndicatorSchema,
};
