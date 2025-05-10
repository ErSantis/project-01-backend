import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { LibroController } from "../controller/libro.controller";
import { authenticate } from "../middleware/auth.middleware";
import userRoutes from "./user.routes";
import libroRoutes from "./libro.routes";

const router = Router();

// Basic route
router.get("/", (req, res) => {
  res.send("Hello, World!");
});


// Register user
router.post("/register", UserController.register);
// Login user
router.post("/login", UserController.login);

// Search book by filters
router.get("/filters", LibroController.readByFilters); 
// Search book by ID
router.get("/:id", LibroController.readById); 

// Middleware for authentication
router.use(authenticate);

// Routes for user and book CRUD operations
router.use("/users", userRoutes);
router.use("/libros", libroRoutes);

export default router;