import express from "express";
import userRoutes from "./routes/user.routes";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { UserController } from "./controller/user.controller";
import { authenticate } from "./middleware/auth.middleware";
import libroRoutes from "./routes/libro.routes";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

//usar env

dotenv.config();

// Database connection

if (!process.env.MONGO_URI) {
  console.error(
    "Error: MONGO_URI is not defined in the environment variables."
  );
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/register", UserController.register);
app.post("/login", UserController.login);

app.use(authenticate);

app.use("/users", userRoutes);
app.use("/libros", libroRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
