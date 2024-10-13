import { Types } from "mongoose";

export interface Iclass extends Document {
  username: string;
  teacherId: Types.ObjectId;
  students: Types.ObjectId[];
}