import { Router } from "express";
import validateRequest from "../../app/middleware/validateRequest";
import { AttendanceControllers } from "./attendance.controllers";
import { AttendanceValidators } from "./attendance.validators";

const router = Router();

router.post(
  "/",
  validateRequest(AttendanceValidators.createAttendanceSchema),
  AttendanceControllers.createAttendance
);

router.get("/", AttendanceControllers.getAllAttendances);

router.get("/:id", AttendanceControllers.getAttendanceById);

router.patch(
  "/:id",
  validateRequest(AttendanceValidators.updateAttendanceSchema),
  AttendanceControllers.updateAttendance
);

router.delete("/:id", AttendanceControllers.deleteAttendance);

export const AttendanceRoutes = router;
export default AttendanceRoutes;
