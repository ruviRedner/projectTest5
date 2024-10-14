import { Types } from 'mongoose';

export default interface payloedDTO {
  username: string;
  id: Types.ObjectId;
  email: string;
  roll: string;
}
