import { Request, Response } from 'express';
// import {
//   getAvarage,
//   getStudentGradeByStudent
// } from '../services/classService';
import RequestWithUser from '../interfaces/requestWithUser';
import { addScoreToStudent, getAvarage, getStudentGradeByStudent, getStudentGradeByTeacher, updateScore } from '../services/classService';

export const addGradeToStudent = async (
  req: RequestWithUser,
  res: Response
): Promise<void> => {
  try {
     await addScoreToStudent(req.user.id,req.body,req.params.sid,req.params.subject)
    res.status(201).json({msg:"add score done"})
    
  } catch (error) {
    res.status(500).json(error)
    
  }
 
};

export const updateGrade = async (
  req: RequestWithUser,
  res: Response
): Promise<void> => {
  try {
    await updateScore(req.user.id,req.body,req.params.sid,req.params.subject)
   res.status(201).json({msg:"add score done"})
   
 } catch (error) {
   res.status(500).json(error)
   
 }
};

export const getAva = async (
  req: RequestWithUser,
  res: Response
): Promise<void> => {
  try {
    const ave = await getAvarage(req.user.id as any);
    res.status(200).json({ avarage: ave });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getStudentGrade = async (
  req: RequestWithUser,
  res: Response
): Promise<void> => {
  try {
    const studentGrade = await getStudentGradeByStudent(req.user.id as any);
    res.status(200).json({ studentGrade });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getStudentScoreByTeacher = async (
  req: RequestWithUser,
  res: Response
): Promise<void> => {
  try {
    const studentGrade = await getStudentGradeByTeacher(req.user.id as any,req.params.sid);
    res.status(200).json({ studentGrade });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
