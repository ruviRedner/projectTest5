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

  await classModel.findByIdAndUpdate(
    findClass._id, // מזהה את הכיתה
    {
      $push: {
        tests: {
          // מוסיף מבחן חדש למערך המבחנים
          subject: subject, // הנושא של המבחן
          studentId: findStudent._id, // מזהה את התלמיד
          score: newScore // כאן נוסף הציון עצמו
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
    { $match:{ _id:findClass._id}  },
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
  const stuid = new mongoose.Types.ObjectId(Sid)
  const scores = await classModel.aggregate([
    { $unwind: '$tests' },

    { $match: { 'tests.studentId': stuid } },

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
  return scores
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
  
  const stuId = new mongoose.Types.ObjectId(Sid)
  const scores = await classModel.aggregate([
    { $match: { _id: findClass._id } }, // מצא את הכיתה
    { $unwind: '$tests' }, // פותח את המערך של המבחנים
    { $match: { 'tests.studentId': stuId } }, // סנן את המבחנים כדי לקבל רק של התלמיד הספציפי
    {
      $group: {
        _id: '$tests.subject', // קבץ לפי נושא
        scores: { $push: '$tests.score' } // שומר את כל הציונים לנושא
      }
    }
  ]);
  console.log(scores);
  


   // מחזיר את התוצאות


  if (!scores.length) {
    throw new Error('No scores found for this student.');
  }
  return scores;
   }
