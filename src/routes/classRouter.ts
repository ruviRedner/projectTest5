import { NextFunction, Router } from "express";
import verifyUser from "../middleware/verifidUser";
import { addGradeToStudent } from "../controllers/classController";

const classRouter = Router()


classRouter.post("/:sid/:subject",verifyUser as any,addGradeToStudent as unknown as NextFunction)










export default classRouter
