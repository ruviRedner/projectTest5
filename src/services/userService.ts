import bcrypt from "bcrypt";
import userModel from "../models/teacherOrStudentModel";
import { IteacherOrStudent } from "../interfaces/IteacherOrStudent";
import classModel from "../models/ClassModel";

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



