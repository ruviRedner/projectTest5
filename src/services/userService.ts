import bcrypt from 'bcrypt';
import { IteacherOrStudent } from '../interfaces/IteacherOrStudent';
import userModel from '../models/teacherOrStudentModel';
import classModel from '../models/ClassModel';
import { Iclass } from '../interfaces/Iclass';
import mongoose from 'mongoose';
import { studentsDto } from '../interfaces/studentsDto';

export const createNewUser = async (
  newUser: IteacherOrStudent
): Promise<void> => {
  try {
    const { username, password, roll, email, classId } =
      newUser;
    if (!username || !password || !roll || !email) {
      throw new Error('fileds are required');
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newuser = await new userModel({
      username,
      password: hashPassword,
      roll,
      email
    });
    if (newUser.roll === 'teacher') {
      const newClass = new classModel({
        name: 'english'
      });
      await newClass.save();
      newuser.classId = newClass._id;
    }
    if (newUser.roll === 'student') {
      const clases = await getClasses();
      if (
        !classId ||
        !clases.find((cla) =>
          cla._id.equals(
            new mongoose.Types.ObjectId(classId)
          )
        )
      ) {
        throw new Error('invalid class id');
      }
      newUser.classId = classId;
    }
    await newuser.save();
  } catch (error) {
    throw new Error('bad request');
  }
};
const getClasses = async (): Promise<Iclass[]> => {
  const clases: Iclass[] = await classModel.find({});
  return clases;
};

export const GetstudentDetailsOfAllStudents = async (
  Tid: string
): Promise<studentsDto[] | unknown> => {
  try {
    //find teacher
    const findTeacher = await userModel.findById(Tid);
    if (!findTeacher || findTeacher.roll !== 'teacher') {
      throw new Error('you are not a teacher');
    }
    //make array of students id
    const findStudents = await classModel.aggregate([
      //only the class with this teacher
      {
        $match: {
          teacherId: new mongoose.Types.ObjectId(Tid)
        }
      },
      //unpaka tests
      { $unwind: '$tests' },
      //make a group of all students ids
      {
        $group: {
          _id: null,
          studentsIds: { $addToSet: '$tests.studentId' }
        }
      }
    ]);
    if (!findStudents.length) {
      throw new Error(
        'No class found for this teacher or no tests available.'
      );
    }
    //pulling out the students ids
    const studentIds = findStudents[0].studentIds;
    //finding them in users
    const students = await userModel.find({
      _id: { $in: studentIds }
    });
    //return details
    const studentDetails = students.map((student) => ({
      username: student.username,
      email: student.email,
      classId: student.classId
    }));
    return studentDetails;
  } catch (error) {
    throw new Error('no can do');
  }
};

export const getOneStudent = async (
  Tid: mongoose.Types.ObjectId,
  Sid: string
): Promise<studentsDto | unknown> => {
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
    throw new Error('no such student');
  }
  const studentDetails = {
    username: findStudent.username,
    email: findStudent.email,
    classId: findStudent.classId
  };
  return studentDetails;
};
