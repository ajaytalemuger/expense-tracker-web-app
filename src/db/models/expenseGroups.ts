import mongoose from "mongoose";
import { Schema } from "mongoose";

const expenseGroupSchema = new Schema(
  {
    admin: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    name: { type: String, required: true },
    description: String,
    otherUsers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "users",
      },
    ],
    createdBy: { type: mongoose.Types.ObjectId, required: true },

    updatedBy: { type: mongoose.Types.ObjectId, required: false },
  },
  { timestamps: true }
);

export default mongoose.models.expensegroups ||
  mongoose.model("expensegroups", expenseGroupSchema);
