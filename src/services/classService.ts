import mongoose from 'mongoose';
import userModel from '../models/teacherOrStudentModel';
import classModel from '../models/ClassModel';

export const addScoreToStudent = async (
  Tid: mongoose.Types.ObjectId,
  newScore: number,
  Sid: string,
  subject: string
): Promise<void> => {
  //find teacher
  const findTeacher = await userModel.findById(Tid);
  if (!findTeacher || findTeacher.roll !== 'teacher') {
    throw new Error('you are not a teacher');
  }
  const findClass = await classModel.findById(Tid);
  if (!findClass) {
    throw new Error('no class found');
  }
  const findStudent = await userModel.findOne({
    _id: Sid,
    classId: findClass._id,
    roll: 'student'
  });
  classModel.updateOne(
    {
      _id: findClass._id,
      'tests.subject': subject
    },
    {
      $push: {
        'tests.$.score': {
          studentId: findStudent?._id,
          score: newScore
        }
      }
    }
  );
};

export const updateScore = async (
  Tid: mongoose.Types.ObjectId,
  newScore: number,
  Sid: string,
  subject: string
): Promise<void> => {
  //find teacher
  const findTeacher = await userModel.findById(Tid);
  if (!findTeacher || findTeacher.roll !== 'teacher') {
    throw new Error('you are not a teacher');
  }
  const findClass = await classModel.findById(Tid);
  if (!findClass) {
    throw new Error('no class found');
  }
  const findStudent = await userModel.findOne({
    _id: Sid,
    classId: findClass._id,
    roll: 'student'
  });
  if (!findStudent) {
    throw new Error('Student not found in this class');
  }
  classModel.updateOne(
    {
      _id: findClass._id,
      'tests.subject': subject
    },
    {
      $set: {
        'tests.$.grades.$[grade].score': newScore
      }
    }
  );
};

export const getAvarage = async (
  Tid: mongoose.Types.ObjectId
): Promise<void> => {
  const findTeacher = await userModel.findById(Tid);
  if (!findTeacher || findTeacher.roll !== 'teacher') {
    throw new Error('you are not a teacher');
  }
  // const findClass = await classModel.findById(Tid);
  // if (!findClass) {
  //   throw new Error('no class found');
  // }
  classModel.aggregate([
    { $match: Tid },
    { $unwind: '$tests' },
    {
      $group: {
        _id: null,
        aveScore: { $avg: '$tests.score' }
      }
    }
  ]);
};
export const getStudentGradeByStudent = async (
  Sid: mongoose.Types.ObjectId
): Promise<void> => {
  const findStudent = await userModel.findById(Sid);
  if (!findStudent || findStudent.roll !== 'student') {
    throw new Error('you are not a student');
  }

  const scores = await classModel.aggregate([
    { $unwind: '$tests' },

    { $match: { 'tests.studentId': Sid } },

    {
      $group: {
        _id: {
          subject: '$tests.subject',
          testId: '$tests._id'
        },
        score: { $first: '$tests.score' } // קח את הציון של המבחן
      }
    }
  ]);

  if (!scores.length) {
    throw new Error('No scores found for this student.');
  }
};

export const getStudentGradeByTeacher = async (
  Tid: mongoose.Types.ObjectId,
  Sid: string
): Promise<void> => {
  //find teacher
  const findTeacher = await userModel.findById(Tid);
  if (!findTeacher || findTeacher.roll !== 'teacher') {
    throw new Error('you are not a teacher');
  }

  const scores = await classModel.aggregate([
    { $unwind: '$tests' },

    { $match: { 'tests.studentId': Sid } },

    {
      $group: {
        _id: {
          subject: '$tests.subject',
          testId: '$tests._id'
        },
        score: { $first: '$tests.score' } 
      }
    }
  ]);

  if (!scores.length) {
    throw new Error('No scores found for this student.');
  }
};
