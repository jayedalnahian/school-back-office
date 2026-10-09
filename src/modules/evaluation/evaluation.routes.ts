import { Router } from "express";
import validateRequest from "../../app/middleware/validateRequest";
import { EvaluationControllers } from "./evaluation.controllers";
import { EvaluationValidators } from "./evaluation.validators";

const router = Router();

router.post(
  "/",
  validateRequest(EvaluationValidators.createEvaluationSchema),
  EvaluationControllers.createEvaluation
);

router.get("/", EvaluationControllers.getAllEvaluations);

router.get("/:id", EvaluationControllers.getEvaluationById);

router.patch(
  "/:id",
  validateRequest(EvaluationValidators.updateEvaluationSchema),
  EvaluationControllers.updateEvaluation
);

router.delete("/:id", EvaluationControllers.deleteEvaluation);

export const EvaluationRoutes = router;
export default EvaluationRoutes;
