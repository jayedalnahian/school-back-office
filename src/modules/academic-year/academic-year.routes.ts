import { Router } from "express";
import validateRequest from "../../app/middleware/validateRequest";
import { AcademicYearControllers } from "./academic-year.controllers";
import { AcademicYearValidators } from "./academic-year.validators";

const router = Router();

router.post(
  "/",
  validateRequest(AcademicYearValidators.createAcademicYearSchema),
  AcademicYearControllers.createAcademicYear
);

router.get("/", AcademicYearControllers.getAllAcademicYears);

router.get("/:id", AcademicYearControllers.getAcademicYearById);

router.patch(
  "/:id",
  validateRequest(AcademicYearValidators.updateAcademicYearSchema),
  AcademicYearControllers.updateAcademicYear
);

router.delete("/:id", AcademicYearControllers.deleteAcademicYear);

export const AcademicYearRoutes = router;
export default AcademicYearRoutes;
