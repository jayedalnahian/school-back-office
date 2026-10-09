import { Router } from "express";
import validateRequest from "../../app/middleware/validateRequest";
import { StudentControllers } from "./student.controllers";
import { StudentValidators } from "./student.validators";

const router = Router();

router.post(
  "/",
  validateRequest(StudentValidators.createStudentSchema),
  StudentControllers.createStudent
);

router.get("/", StudentControllers.getAllStudents);

router.get("/:id", StudentControllers.getStudentById);

router.patch(
  "/:id",
  validateRequest(StudentValidators.updateStudentSchema),
  StudentControllers.updateStudent
);

router.delete("/:id", StudentControllers.deleteStudent);

export const StudentRoutes = router;
export default StudentRoutes;
