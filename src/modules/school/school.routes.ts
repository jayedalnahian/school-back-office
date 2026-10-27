import { Router } from "express";
import validateRequest from "../../app/middleware/validateRequest";
import { SchoolControllers } from "./school.controllers";
import { SchoolValidators } from "./school.validators";

const router = Router();

router.post(
  "/onboard",
  validateRequest(SchoolValidators.onboardSchoolSchema),
  SchoolControllers.onboardSchool
);

// https://skilled-profusely-foil.ngrok-free.dev/api/v1/schools/onboard


router.post(
  "/",
  validateRequest(SchoolValidators.createSchoolSchema),
  SchoolControllers.createSchool
);

router.get("/", SchoolControllers.getAllSchools);

router.get(
  "/:id",
  validateRequest(SchoolValidators.getSchoolByIdSchema),
  SchoolControllers.getSchoolById
);

router.patch(
  "/:id",
  validateRequest(SchoolValidators.updateSchoolSchema),
  SchoolControllers.updateSchool
);

router.delete("/:id", SchoolControllers.deleteSchool);

export const SchoolRoutes = router;
export default SchoolRoutes;
