import { Types } from "mongoose";

export interface Istudent extends Document {
  username: string;
  password: string;
  email: string;
  classId: Types.ObjectId;
}