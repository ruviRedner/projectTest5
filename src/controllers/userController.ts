import { Request, Response } from "express";
import { CreateClass, CreateNewUser,  GetstudentDetailsOfAllStudents } from "../services/userService";
import RequestWithUser from "../interfaces/requestWithUser";

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await CreateNewUser(req.body);
    res.status(201).json({newUser});
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

export const creatNewClass = async (req: RequestWithUser, res: Response) => {
    try {
        if(req.user.roll !== "teacher") {
            return res.status(403).json({ message: "You are not a teacher" });
        }
      const newClass = await CreateClass(req.body);
      res.status(201).json({ newClass });
    } catch (err) {
      res.status(500).json({ err: err });
    }
  };

export const getStudent = async (req: RequestWithUser, res: Response) => {
    try{
        const student = await GetstudentDetailsOfAllStudents(req.user.id as any);
        if(!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({ student });
    }catch(err){
        res.status(500).json({ err: err });
    }
}



