import { Types } from "mongoose";

export interface Igrads extends Document {
  teacherId: Types.ObjectId;
  studentId: Types.ObjectId;
  classId: Types.ObjectId;
  greads: [
    {
      subject: string;
      grade: number;
      create_at: Date;
    },
  ];
  average: number;
}
