import { Iclass } from '../interfaces/Iclass';

import mongoose, { Schema, Model } from 'mongoose';
import { testSchema } from '../interfaces/Igrads';

const classSchema: Schema<Iclass> = new Schema<Iclass>({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 10
  },
  teacherId: { type: Schema.Types.ObjectId, ref: 'users' },
  tests: [testSchema]
});

const classModel: Model<Iclass> = mongoose.model<Iclass>(
  'clases',
  classSchema
);

export default classModel;
