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

router.post(
  "/",
  validateRequest(SchoolValidators.createSchoolSchema),
  SchoolControllers.createSchool
);

router.get("/", SchoolControllers.getAllSchools);

router.get("/:id", SchoolControllers.getSchoolById);

router.patch(
  "/:id",
  validateRequest(SchoolValidators.updateSchoolSchema),
  SchoolControllers.updateSchool
);

router.delete("/:id", SchoolControllers.deleteSchool);

export const SchoolRoutes = router;
export default SchoolRoutes;
