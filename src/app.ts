import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes';
import { errorHandler } from './middleware/errorHandler';
import connectDB from './config/db';
import classRouter from "../src/routes/classRouter"
import authRouter from './routes/authRouter';
import swaggerUi, { specs } from './config/swagger';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));

connectDB();

// Routes
app.use('/user', userRouter);
app.use('/class', classRouter);
app.use('/auth', authRouter);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
