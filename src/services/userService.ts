import bcrypt from "bcrypt"
import { IteacherOrStudent } from '../interfaces/IteacherOrStudent';
import userModel from '../models/teacherOrStudentModel';
import classModel from "../models/ClassModel";
import { Iclass } from "../interfaces/Iclass";

export const createUser = async (
  newUser: IteacherOrStudent
): Promise<void> => {
  try {
    const { username, password, roll, email,classId } = newUser;
    if(!username || !password || !roll || !email){
      throw new Error("fileds are required")
    }
    const hashPassword = await bcrypt.hash(password,10)
    if(!hashPassword){
      throw new Error("bcrypt are faild")
    }
    const newuser = await new userModel({
      username,
      password:hashPassword,
      roll,
      email
    })
    if(newUser.roll === "teacher"){
      const newClass = new classModel({
        name:"english"
      })
      await newClass.save()
      newuser.classId = newClass._id
    }
    if(newUser.roll === "student"){
      await getClasses()
      newUser.classId = classId
    }
    await newuser.save()
    
  } catch (error) {
    throw new Error("bad request")
  }
};
const getClasses = async () :Promise<Iclass[]> => {
  const clases:Iclass[] = await classModel.find({})
  return clases
}


