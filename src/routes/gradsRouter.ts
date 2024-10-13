import { Router } from "express";

import { addGradeToStudent,  getAvarage, getStudentGrade, getStudentGradeByTeacher, updateGrade } from "../controllers/gradsController";

const GradsRouter = Router();

GradsRouter.post("/",addGradeToStudent );
GradsRouter.put("/", updateGrade);
GradsRouter.get("/", getStudentGrade);
GradsRouter.put("/", getStudentGradeByTeacher);
GradsRouter.delete("/", getAvarage);

export default GradsRouter;
