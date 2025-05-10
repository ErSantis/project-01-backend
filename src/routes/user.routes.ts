import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { authorize } from "../middleware/authorize.middleware";

const router = Router();

router.patch("/update/:id", authorize("update_user"), UserController.update);
router.delete("/disable/:id", authorize("disable_user"), UserController.disable);

export default router;
