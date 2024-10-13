import { IteacherOrStudent } from "../interfaces/IteacherOrStudent";

import mongoose, { Schema, Types, Model } from "mongoose";
import validator from "validator";

const teacherOrstudentSchema: Schema<IteacherOrStudent> =
  new Schema<IteacherOrStudent>({
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 10,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      select: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Invalid email address"],
    },
    roll: {
      type: String,
      required: true,
      enum: ["student", "teacher"],
    },
    classId: [{ type: Types.ObjectId, ref: "clases" }],
  });

const userModel: Model<IteacherOrStudent> = mongoose.model<IteacherOrStudent>(
  "users",
  teacherOrstudentSchema
);

export default userModel;
