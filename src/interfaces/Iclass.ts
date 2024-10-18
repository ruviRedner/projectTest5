import { Types } from 'mongoose';
import { Itests } from './Igrads';

export interface Iclass extends Document {
  _id : Types.ObjectId
  name: string;
  teacherId: Types.ObjectId;
  tests:Itests[];
}
