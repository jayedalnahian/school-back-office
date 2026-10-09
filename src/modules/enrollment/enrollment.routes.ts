import { Router } from "express";
import validateRequest from "../../app/middleware/validateRequest";
import { EnrollmentControllers } from "./enrollment.controllers";
import { EnrollmentValidators } from "./enrollment.validators";

const router = Router();

router.post(
  "/",
  validateRequest(EnrollmentValidators.createEnrollmentSchema),
  EnrollmentControllers.createEnrollment
);

router.get("/", EnrollmentControllers.getAllEnrollments);

router.get("/:id", EnrollmentControllers.getEnrollmentById);

router.patch(
  "/:id",
  validateRequest(EnrollmentValidators.updateEnrollmentSchema),
  EnrollmentControllers.updateEnrollment
);

router.delete("/:id", EnrollmentControllers.deleteEnrollment);

export const EnrollmentRoutes = router;
export default EnrollmentRoutes;
