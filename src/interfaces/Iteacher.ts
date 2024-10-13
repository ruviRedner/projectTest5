import { Types } from "mongoose";

export interface Iteacher extends Document {
  username: string;
  password: string;
  email: string;
  classId: Types.ObjectId;
}
