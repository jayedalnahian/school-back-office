import { Router } from "express";
import validateRequest from "../../app/middleware/validateRequest";
import { ShiftControllers } from "./shift.controllers";
import { ShiftValidators } from "./shift.validators";

const router = Router();

router.post(
  "/",
  validateRequest(ShiftValidators.createShiftSchema),
  ShiftControllers.createShift
);

router.get("/", ShiftControllers.getAllShifts);

router.get("/:id", ShiftControllers.getShiftById);

router.patch(
  "/:id",
  validateRequest(ShiftValidators.updateShiftSchema),
  ShiftControllers.updateShift
);

router.delete("/:id", ShiftControllers.deleteShift);

export const ShiftRoutes = router;
export default ShiftRoutes;
