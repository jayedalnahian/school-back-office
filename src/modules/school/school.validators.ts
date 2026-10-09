import { z } from "zod";

const createSchoolSchema = z.object({
  body: z.object({
    gps_code: z
      .string({
        message: "GPS code is required",
      })
      .min(1, "GPS code cannot be empty"),
    name: z
      .string({
        message: "School name is required",
      })
      .min(1, "School name cannot be empty"),
    upazila: z.string().optional(),
    district: z.string().optional(),
    division: z.string().optional(),
    cluster: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    is_active: z.boolean().optional(),
  }),
});

const updateSchoolSchema = z.object({
  body: z.object({
    gps_code: z.string().min(1, "GPS code cannot be empty").optional(),
    name: z.string().min(1, "School name cannot be empty").optional(),
    upazila: z.string().optional(),
    district: z.string().optional(),
    division: z.string().optional(),
    cluster: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    is_active: z.boolean().optional(),
  }),
});

const onboardSchoolSchema = z.object({
  body: z.object({
    school: z.object({
      gps_code: z
        .string({
          message: "GPS code is required",
        })
        .min(1, "GPS code cannot be empty"),
      name: z
        .string({
          message: "School name is required",
        })
        .min(1, "School name cannot be empty"),
      upazila: z.string().optional(),
      district: z.string().optional(),
      division: z.string().optional(),
      cluster: z.string().optional(),
      address: z.string().optional(),
      phone: z.string().optional(),
      is_active: z.boolean().optional(),
    }),
    admin: z.object({
      full_name: z
        .string({
          message: "Admin full name is required",
        })
        .min(1, "Admin full name cannot be empty"),
      phone: z
        .string({
          message: "Admin phone number is required",
        })
        .min(1, "Admin phone number cannot be empty"),
      email: z.string().email("Invalid email address").optional().nullable(),
      role: z.literal("SCHOOL_ADMIN").default("SCHOOL_ADMIN"),
    }),
  }),
});

export const SchoolValidators = {
  createSchoolSchema,
  updateSchoolSchema,
  onboardSchoolSchema,
};
