import { Types } from 'mongoose';
import { Itests } from './Igrads';

export interface Iclass extends Document {
  name: string;
  teacherId: Types.ObjectId;
  tests:Itests[];
}
