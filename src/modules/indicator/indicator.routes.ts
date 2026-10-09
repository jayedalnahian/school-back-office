import { Router } from "express";
import validateRequest from "../../app/middleware/validateRequest";
import { IndicatorControllers } from "./indicator.controllers";
import { IndicatorValidators } from "./indicator.validators";

const router = Router();

router.post(
  "/",
  validateRequest(IndicatorValidators.createIndicatorSchema),
  IndicatorControllers.createIndicator
);

router.get("/", IndicatorControllers.getAllIndicators);

router.get("/:id", IndicatorControllers.getIndicatorById);

router.patch(
  "/:id",
  validateRequest(IndicatorValidators.updateIndicatorSchema),
  IndicatorControllers.updateIndicator
);

router.delete("/:id", IndicatorControllers.deleteIndicator);

export const IndicatorRoutes = router;
export default IndicatorRoutes;
