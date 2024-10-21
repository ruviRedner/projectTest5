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

  const findClass = await classModel.findOne({
    teacherId: Tid
  });

  if (!findClass) {
    throw new Error('No class found for this teacher');
  }

  const findStudent = await userModel.findOne({
    _id: Sid,
    classId: findClass._id,
    roll: 'student'
  });
  if (!findStudent) {
    console.error('No student found in this class');
    throw new Error('No student found in this class');
  }

  await classModel.findByIdAndUpdate(findClass._id, {
    $push: {
      tests: {
        subject: subject,
        studentId: findStudent._id,
        score: newScore
      }
    }
  });
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
  const findClass = await classModel.findOne({
    teacherId: Tid
  });
  if (!findClass) {
    throw new Error('no class found');
  }
  const findStudent = await userModel.findOne({
    _id: Sid,
    classId: findClass._id,
    roll: 'student'
  });
  console.log(findStudent);

  if (!findStudent) {
    throw new Error('Student not found in this class');
  }
  await classModel.updateOne(
    {
      _id: findClass._id,
      'tests.subject': subject
    },
    {
      $set: {
        'tests.$.score': newScore
      }
    }
  );
};

export const getAvarage = async (
  Tid: mongoose.Types.ObjectId
): Promise<number> => {
  const findTeacher = await userModel.findById(Tid);
  if (!findTeacher || findTeacher.roll !== 'teacher') {
    throw new Error('you are not a teacher');
  }
  const findClass = await classModel.findOne({
    teacherId: Tid
  });
  if (!findClass) {
    throw new Error('no class found');
  }
  const ave = await classModel.aggregate([
    { $match: { _id: findClass._id } },
    { $unwind: '$tests' },
    {
      $group: {
        _id: null,
        aveScore: { $avg: '$tests.score' }
      }
    }
  ]);
  return ave.length > 0 ? ave[0].aveScore : 0;
};
export const getStudentGradeByStudent = async (
  Sid: mongoose.Types.ObjectId
): Promise<number[]> => {
  const findStudent = await userModel.findById(Sid);
  if (!findStudent || findStudent.roll !== 'student') {
    throw new Error('you are not a student');
  }
  const stuid = new mongoose.Types.ObjectId(Sid);
  const scores = await classModel.aggregate([
    { $unwind: '$tests' },

    { $match: { 'tests.studentId': stuid } },

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
  return scores;
};

export const getStudentGradeByTeacher = async (
  Tid: mongoose.Types.ObjectId,
  Sid: string
): Promise<number[]> => {
  //find teacher
  const findTeacher = await userModel.findById(Tid);
  if (!findTeacher || findTeacher.roll !== 'teacher') {
    throw new Error('you are not a teacher');
  }
  const findClass = await classModel.findOne({
    teacherId: Tid
  });
  if (!findClass) {
    throw new Error('no class found');
  }
  console.log(findClass);

  const stuId = new mongoose.Types.ObjectId(Sid);
  const scores = await classModel.aggregate([
    { $match: { _id: findClass._id } },
    { $unwind: '$tests' },
    { $match: { 'tests.studentId': stuId } },
    {
      $group: {
        _id: '$tests.subject',
        scores: { $push: '$tests.score' }
      }
    }
  ]);
  console.log(scores);

  if (!scores.length) {
    throw new Error('No scores found for this student.');
  }
  return scores;
};
