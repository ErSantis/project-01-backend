import { Router } from "express";
import { LibroController } from "../controller/libro.controller";
import { authorize } from "../middleware/authorize.middleware";

const router = Router();


router.post("/", authorize("create_book"), LibroController.create);
router.patch("/:id", authorize("update_book"), LibroController.update);
router.delete("/:id", authorize("disable_book"), LibroController.disable);

export default router;
