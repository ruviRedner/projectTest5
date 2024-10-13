import { Router } from "express";
import { createUser, getStudent } from "../controllers/userController";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.get("/", getStudent);

export default userRouter;
