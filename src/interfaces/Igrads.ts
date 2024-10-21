
import { Document, Schema, Types } from "mongoose";

export interface Itests extends Document {
    subject: string;
    studentId: Types.ObjectId | string;
    score: number
  }
  export const testSchema: Schema<Itests> = new Schema<Itests>({
    subject: {
      type: String,
      required: true
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    score: {
      type: Number,
      required: true
    }
  });
