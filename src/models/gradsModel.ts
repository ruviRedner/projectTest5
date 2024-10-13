import mongoose, { Schema, Model } from "mongoose";
import { Igrads } from "../interfaces/Igrads";

const gradsSchema: Schema<Igrads> = new Schema<Igrads>(
  {
    teacherId: { type: Schema.Types.ObjectId, ref: "users" },

    classId: { type: Schema.Types.ObjectId, ref: "clases" },

    greads: [
      {
        subject: { type: String },
        grad: { type: Number },
        studentId: { type: Schema.Types.ObjectId, ref: "users" },
      },
    ],
    average: { type: Number },
  },
  {
    timestamps: true,
  }
);

const gradsModel: Model<Igrads> = mongoose.model<Igrads>("grads", gradsSchema);

export default gradsModel;
