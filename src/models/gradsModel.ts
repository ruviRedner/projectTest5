import mongoose, { Schema, Types, Model } from "mongoose";
import { Igrads } from "../interfaces/Igrads";

const gradsSchema: Schema<Igrads> = new Schema<Igrads>(
  {
    teacherId: [{ type: Types.ObjectId, ref: "users" }],

    studentId: [{ type: Types.ObjectId, ref: "users" }],

    classId: [{ type: Types.ObjectId, ref: "clases" }],

    greads: [{ subject: { type: String }, grad: { type: Number } }],
    average: { type: Number },
  },
  {
    timestamps: true,
  }
);

const gradsModel: Model<Igrads> = mongoose.model<Igrads>("users", gradsSchema);

export default gradsModel;
