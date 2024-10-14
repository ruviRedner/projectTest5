import { Types } from 'mongoose';

export interface Igrads extends Document {
  teacherId: Types.ObjectId;

  classId: Types.ObjectId;
  greads: [
    {
      subject: string;
      grade: number;
      studentId: Types.ObjectId;
    }
  ];
  average: number;
}
