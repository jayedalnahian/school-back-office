import { Router } from "express";
import validateRequest from "../../app/middleware/validateRequest";
import { SectionControllers } from "./section.controllers";
import { SectionValidators } from "./section.validators";

const router = Router();

router.post(
  "/",
  validateRequest(SectionValidators.createSectionSchema),
  SectionControllers.createSection
);

router.get("/", SectionControllers.getAllSections);

router.get("/:id", SectionControllers.getSectionById);

router.patch(
  "/:id",
  validateRequest(SectionValidators.updateSectionSchema),
  SectionControllers.updateSection
);

router.delete("/:id", SectionControllers.deleteSection);

export const SectionRoutes = router;
export default SectionRoutes;
