import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleware";

const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);

// Llamar al update pero con el mideleware de autenticación
router.patch(
  "/update/:id",
  authenticate,
  authorize("update_user"),
  UserController.update
);

export default router;
