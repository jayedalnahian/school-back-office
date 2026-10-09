import { Router } from "express";
import validateRequest from "../../app/middleware/validateRequest";
import { UserControllers } from "./user.controllers";
import { UserValidators } from "./user.validators";

const router = Router();

router.post(
  "/",
  validateRequest(UserValidators.createUserSchema),
  UserControllers.createUser
);

router.get("/", UserControllers.getAllUsers);

router.get("/:id", UserControllers.getUserById);

router.patch(
  "/:id",
  validateRequest(UserValidators.updateUserSchema),
  UserControllers.updateUser
);

router.delete("/:id", UserControllers.deleteUser);

export const UserRoutes = router;
export default UserRoutes;
