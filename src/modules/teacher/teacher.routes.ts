import { Router } from "express";
import validateRequest from "../../app/middleware/validateRequest";
import { TeacherControllers } from "./teacher.controllers";
import { TeacherValidators } from "./teacher.validators";

const router = Router();

router.post(
  "/",
  validateRequest(TeacherValidators.createTeacherSchema),
  TeacherControllers.createTeacher
);

router.get("/", TeacherControllers.getAllTeachers);

router.get("/:id", TeacherControllers.getTeacherById);

router.patch(
  "/:id",
  validateRequest(TeacherValidators.updateTeacherSchema),
  TeacherControllers.updateTeacher
);

router.delete("/:id", TeacherControllers.deleteTeacher);

export const TeacherRoutes = router;
export default TeacherRoutes;
