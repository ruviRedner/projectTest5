// import { Types } from 'mongoose';

// export interface Igrads extends Document {
//   teacherId: Types.ObjectId;

//   classId: Types.ObjectId;
//   greads: [
//     {
//       subject: string;
//       grade: number;
//       studentId: Types.ObjectId;
//     }
//   ];
//   average: number;
// }
import { Document, Schema, Types } from "mongoose";

export interface Itests extends Document {
    subject: string;
    studentId: Types.ObjectId | string;
    score: number
  }
 export const testSchema:Schema<Itests> = new Schema<Itests>({})
