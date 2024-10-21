import { Request, Response } from 'express';

import RequestWithUser from '../interfaces/requestWithUser';
import { createNewUser, getClasses, getOneStudent, GetstudentDetailsOfAllStudents } from '../services/userService';

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await createNewUser(req.body);
    res.status(201).json({ msg:newUser });
  } catch (err:any) {
    res.status(500).json({ err:err.message });
  }
};
export const getAllClases = async (req: Request, res: Response) => {
  try {
    const result = await getClasses();
    res.status(200).json({ msg:result });
  } catch (err) {
    res.status(500).json({ err });
  }
};


export const getStudents = async (req: RequestWithUser, res: Response) => {
  try {
    const student = await GetstudentDetailsOfAllStudents(req.user.id as any);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ student });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

export const getStudentOne = async (req: RequestWithUser, res: Response) => {
  try {
    const student = await getOneStudent(req.user.id as any,req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ student });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
