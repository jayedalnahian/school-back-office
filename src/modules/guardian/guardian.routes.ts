import { Router } from "express";
import validateRequest from "../../app/middleware/validateRequest";
import { GuardianControllers } from "./guardian.controllers";
import { GuardianValidators } from "./guardian.validators";

const router = Router();

router.post(
  "/",
  validateRequest(GuardianValidators.createGuardianSchema),
  GuardianControllers.createGuardian
);

router.get("/", GuardianControllers.getAllGuardians);

router.get("/:id", GuardianControllers.getGuardianById);

router.patch(
  "/:id",
  validateRequest(GuardianValidators.updateGuardianSchema),
  GuardianControllers.updateGuardian
);

router.delete("/:id", GuardianControllers.deleteGuardian);

export const GuardianRoutes = router;
export default GuardianRoutes;
