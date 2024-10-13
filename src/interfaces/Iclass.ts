import { Types } from "mongoose";

export interface Iclass extends Document {
  name: string;
  teacherId: Types.ObjectId;
  studentsId: Types.ObjectId[];
}