import { z } from "zod";

const dayOfWeekEnum = z.enum([
  "SATURDAY",
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
]);

const createRoutineSchema = z.object({
  body: z.object({
    school_id: z
      .string({
        message: "School ID is required",
      })
      .uuid("Invalid school ID"),
    academic_year_id: z
      .string({
        message: "Academic year ID is required",
      })
      .uuid("Invalid academic year ID"),
    section_id: z
      .string({
        message: "Section ID is required",
      })
      .uuid("Invalid section ID"),
    subject_id: z
      .string({
        message: "Subject ID is required",
      })
      .uuid("Invalid subject ID"),
    teacher_id: z
      .string({
        message: "Teacher ID is required",
      })
      .uuid("Invalid teacher ID"),
    day_of_week: dayOfWeekEnum,
    period_number: z
      .number({
        message: "Period number is required",
      })
      .int("Period number must be an integer")
      .min(1, "Period number must be positive"),
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

const updateRoutineSchema = z.object({
  body: z.object({
    subject_id: z.string().uuid("Invalid subject ID").optional(),
    teacher_id: z.string().uuid("Invalid teacher ID").optional(),
    day_of_week: dayOfWeekEnum.optional(),
    period_number: z
      .number()
      .int("Period number must be an integer")
      .min(1, "Period number must be positive")
      .optional(),
    start_time: z.string().min(1, "Start time cannot be empty").optional(),
    end_time: z.string().min(1, "End time cannot be empty").optional(),
  }),
});

export const RoutineValidators = {
  createRoutineSchema,
  updateRoutineSchema,
};
