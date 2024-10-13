import { Request, Response } from "express";
import { getAvarage, getStudentGradeByStudent } from "../services/graedsService";
import RequestWithUser from "../interfaces/requestWithUser";

export const addGradeToStudent = async (
  req: Request,
  res: Response
): Promise<void> => {};

export const updateGrade = async (
  req: Request,
  res: Response
): Promise<void> => {};

export const getAva = async (
  req: RequestWithUser,
  res: Response
): Promise<void> => {
  try {
    const ave = await getAvarage(req.user.id as any)
    res.status(200).json({ avarage: ave });

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
    
  }
};

export const getStudentGrade = async (
  req:  RequestWithUser,
  res: Response
): Promise<void> => {
  try {
    const studentGrade = await getStudentGradeByStudent(req.user.id as any)
    res.status(200).json({ studentGrade });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
    
  }
};

export const getStudentGradeByTeacher = async (
  req: Request,
  res: Response
): Promise<void> => {};
