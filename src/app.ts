import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import { errorHandler } from "./middleware/errorHandler";
import connectDB from "./config/db";
import GradsRouter from "./routes/gradsRouter";
import authRouter from "./routes/authRouter";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());

connectDB();

// Routes
app.use("/user", userRouter);
app.use("/grads", GradsRouter);
app.use("/auth", authRouter);


// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
