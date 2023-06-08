import mongoose from "mongoose";
import { Schema } from "mongoose";

const expenseGroupSchema = new Schema({
    admin: { type: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true },
    description: String,
    users: [mongoose.Types.ObjectId],
    createdBy: { type: mongoose.Types.ObjectId, required: true }
}, { timestamps: true });

export default mongoose.models.expensegroups || mongoose.model("expensegroups", expenseGroupSchema);