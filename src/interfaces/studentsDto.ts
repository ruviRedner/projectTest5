import { Types } from 'mongoose';

export interface studentsDto  {
  username: string;
  email: string;
  classId: Types.ObjectId;
}