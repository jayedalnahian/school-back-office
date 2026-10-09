import { Router } from "express";
import validateRequest from "../../app/middleware/validateRequest";
import { RoutineControllers } from "./routine.controllers";
import { RoutineValidators } from "./routine.validators";

const router = Router();

router.post(
  "/",
  validateRequest(RoutineValidators.createRoutineSchema),
  RoutineControllers.createRoutine
);

router.get("/", RoutineControllers.getAllRoutines);

router.get("/:id", RoutineControllers.getRoutineById);

router.patch(
  "/:id",
  validateRequest(RoutineValidators.updateRoutineSchema),
  RoutineControllers.updateRoutine
);

router.delete("/:id", RoutineControllers.deleteRoutine);

export const RoutineRoutes = router;
export default RoutineRoutes;
