import { Router } from "express";
import validateRequest from "../../app/middleware/validateRequest";
import { SubjectControllers } from "./subject.controllers";
import { SubjectValidators } from "./subject.validators";

const router = Router();

router.post(
  "/",
  validateRequest(SubjectValidators.createSubjectSchema),
  SubjectControllers.createSubject
);

router.get("/", SubjectControllers.getAllSubjects);

router.get("/:id", SubjectControllers.getSubjectById);

router.patch(
  "/:id",
  validateRequest(SubjectValidators.updateSubjectSchema),
  SubjectControllers.updateSubject
);

router.delete("/:id", SubjectControllers.deleteSubject);

export const SubjectRoutes = router;
export default SubjectRoutes;
