import { z } from "zod";

const BD_PHONE_REGEX = /^01[3-9]\d{8}$/;
const GPS_CODE_REGEX = /^\d{8}$/;

/**
 * Zod schema for onboarding a school along with its school admin user
 */
export const onboardSchoolZodSchema = z.object({
  body: z.object({
    school: z.object({
      name: z
        .string({
          message: "School name is required",
        })
        .min(1, "School name cannot be empty"),
      gps_code: z
        .string({
          message: "GPS code is required",
        })
        .regex(GPS_CODE_REGEX, "GPS code must be exactly 8 digits"),
      division: z
        .string({
          message: "Division is required",
        })
        .min(1, "Division cannot be empty"),
      district: z
        .string({
          message: "District is required",
        })
        .min(1, "District cannot be empty"),
      upazila: z
        .string({
          message: "Upazila is required",
        })
        .min(1, "Upazila cannot be empty"),
      cluster: z
        .string({
          message: "Cluster is required",
        })
        .min(1, "Cluster cannot be empty"),
      address: z.string().optional().nullable(),
      email: z.string().email("Invalid school email address").optional().nullable(),
      phone: z
        .string()
        .regex(BD_PHONE_REGEX, "Invalid Bangladeshi phone number for school")
        .optional()
        .nullable(),
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
        .regex(BD_PHONE_REGEX, "Invalid Bangladeshi phone number for admin"),
      email: z.string().email("Invalid admin email address").optional().nullable(),
    }),
  }),
});

/**
 * Zod schema for updating a school
 * All fields are optional and gps_code cannot be updated
 */
export const updateSchoolZodSchema = z.object({
  body: z
    .object({
      gps_code: z
        .never({
          message: "GPS code cannot be updated",
        })
        .optional(),
      name: z.string().min(1, "School name cannot be empty").optional(),
      division: z.string().min(1, "Division cannot be empty").optional(),
      district: z.string().min(1, "District cannot be empty").optional(),
      upazila: z.string().min(1, "Upazila cannot be empty").optional(),
      cluster: z.string().min(1, "Cluster cannot be empty").optional(),
      address: z.string().optional().nullable(),
      email: z.string().email("Invalid school email address").optional().nullable(),
      phone: z
        .string()
        .regex(BD_PHONE_REGEX, "Invalid Bangladeshi phone number for school")
        .optional()
        .nullable(),
      is_active: z.boolean().optional(),
    })
    .refine((data) => !("gps_code" in data), {
      message: "GPS code cannot be updated",
      path: ["gps_code"],
    }),
});

/**
 * Zod schema for standalone school creation
 */
export const createSchoolZodSchema = z.object({
  body: z.object({
    gps_code: z
      .string({
        message: "GPS code is required",
      })
      .regex(GPS_CODE_REGEX, "GPS code must be exactly 8 digits"),
    name: z
      .string({
        message: "School name is required",
      })
      .min(1, "School name cannot be empty"),
    division: z
      .string({
        message: "Division is required",
      })
      .min(1, "Division cannot be empty"),
    district: z
      .string({
        message: "District is required",
      })
      .min(1, "District cannot be empty"),
    upazila: z
      .string({
        message: "Upazila is required",
      })
      .min(1, "Upazila cannot be empty"),
    cluster: z
      .string({
        message: "Cluster is required",
      })
      .min(1, "Cluster cannot be empty"),
    address: z.string().optional().nullable(),
    email: z.string().email("Invalid school email address").optional().nullable(),
    phone: z
      .string()
      .regex(BD_PHONE_REGEX, "Invalid Bangladeshi phone number for school")
      .optional()
      .nullable(),
    is_active: z.boolean().optional(),
  }),
});

export const SchoolValidators = {
  onboardSchoolZodSchema,
  updateSchoolZodSchema,
  createSchoolZodSchema,
  // Backwards compatibility aliases
  onboardSchoolSchema: onboardSchoolZodSchema,
  updateSchoolSchema: updateSchoolZodSchema,
  createSchoolSchema: createSchoolZodSchema,
};
