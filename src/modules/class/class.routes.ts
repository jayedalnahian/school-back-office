import { Router } from "express";
import validateRequest from "../../app/middleware/validateRequest";
import { ClassControllers } from "./class.controllers";
import { ClassValidators } from "./class.validators";

const router = Router();

router.post(
  "/",
  validateRequest(ClassValidators.createClassSchema),
  ClassControllers.createClass
);

router.get("/", ClassControllers.getAllClasses);

router.get("/:id", ClassControllers.getClassById);

router.patch(
  "/:id",
  validateRequest(ClassValidators.updateClassSchema),
  ClassControllers.updateClass
);

router.delete("/:id", ClassControllers.deleteClass);

export const ClassRoutes = router;
export default ClassRoutes;
