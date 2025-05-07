import express from "express";
import userRoutes from "./routes/user.routes";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

//usar env


dotenv.config();


// Database connection

if (!process.env.MONGO_URI) {
    console.error("Error: MONGO_URI is not defined in the environment variables.");
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

app.use("/users", userRoutes);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
