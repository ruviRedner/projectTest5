import { Types } from 'mongoose';

export interface IteacherOrStudent extends Document {
  username: string;
  password: string;
  roll: string;
  email: string;
  classId?: Types.ObjectId;
}
