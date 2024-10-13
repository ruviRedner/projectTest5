import bcrypt from "bcrypt";
import userModel from "../models/teacherOrStudentModel";
import { IteacherOrStudent } from "../interfaces/IteacherOrStudent";
import classModel from "../models/ClassModel";
import gradsModel from "../models/gradsModel";

export const CreateNewUser = async (newUser: IteacherOrStudent) => {
  try {
    const { username, email, roll, password} = newUser;

    // Validate input fields
    if (!username || !email || !password) {
      throw new Error("Missing required fields: username, email, or password.");
    }

    // const hashedPassword = await bcrypt.hash(password, 10);

    const dbUser = new userModel({
      username,
      password,
      email,
      roll,
    });
   
    await dbUser.save();
    return dbUser;
    } catch (err) {
    console.error("Error creating user:", err);
    throw err;
    }

}

export const CreateClass = async (classs: string) => {
    try {
    const dbClass =  new classModel({
        name: classs,
    })
    await dbClass.save();
    return dbClass;
    } catch (err) {
    console.error("Error getting class:", err);
    throw err;
    }
}

export const GetstudentDetailsAmdGrads = async (Tid:string,StudentId:string) => {
    try {
    const student = await userModel.findById(StudentId)
    if (!student) {
        throw new Error("Student not found.");
    }
    const teacher = await userModel.findById(Tid)
    if (!teacher) {
        throw new Error("Teacher not found.");
    }
    const grads = await gradsModel.findOne({ teacherId: Tid, studentId: StudentId}).populate("grads");
    if (!grads) {
        throw new Error("Grades not found.");
    }
    return {
        student,
        teacher,
        grads,
    };
}catch (err) {
    console.error("Error getting student details and grades:", err);
    throw err;
    
}
}

export const AddGrad = async (Tid:string, StudentId:string, grad: number) => {

}




