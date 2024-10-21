import { Request, Response } from 'express';
// import {
//   getAvarage,
//   getStudentGradeByStudent
// } from '../services/classService';
import RequestWithUser from '../interfaces/requestWithUser';
import {
  addScoreToStudent,
  getAvarage,
  getStudentGradeByStudent,
  getStudentGradeByTeacher,
  updateScore
} from '../services/classService';

export const addGradeToStudent = async (
  req: RequestWithUser,
  res: Response
): Promise<void> => {
  try {
    const Sid = req.params.sid;

    const newScore = req.body.score; // Assuming req.body contains { score: <newScore> }
    const subject = req.params.subject;
    await addScoreToStudent(
      req.user.id,
      newScore,
      Sid,
      subject
    );
    res.status(201).json({ msg: 'add score done' });
  } catch (error:Error | any) {
    res.status(500).json({msg:error.message});
  }
};

export const updateGrade = async (
  req: RequestWithUser,
  res: Response
): Promise<void> => {
  try {
    await updateScore(
      req.user.id,
      req.body.score,
      req.params.sid,
      req.params.subject
    );
    res.status(201).json({ msg: 'add score done' });
  } catch (error:any) {
    res.status(500).json({msg:error.message});
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
    res
      .status(500)
      .json({ message: 'Internal server error' });
  }
};

export const getStudentGrade = async (
  req: RequestWithUser,
  res: Response
): Promise<void> => {
  try {
    const studentGrade = await getStudentGradeByStudent(
      req.user.id as any
    );
    res.status(200).json({ studentGrade });
  } catch (error:any) {
    res
      .status(500)
      .json({ message: error.message });
  }
};

export const getStudentScoreByTeacher = async (
  req: RequestWithUser,
  res: Response
): Promise<void> => {
  try {
    const studentGrade = await getStudentGradeByTeacher(
      req.user.id as any,
      req.params.sid
    );
    res.status(200).json({ studentGrade:studentGrade });
  } catch (error:any) {
    console.error(error);
    res
      .status(500)
      .json({ message:error.message });
  }
};
