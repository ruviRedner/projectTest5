import { Types } from "mongoose";

export interface Igrads extends Document {
  teacherId: Types.ObjectId;
  studentId: Types.ObjectId;
  classId: Types.ObjectId;
  greads: [
    {
      subject: string;
      grade: number;
    },
  ];
  average: number;
}
