import { TRANSACTION_TYPES } from "@/utils/constants";
import mongoose from "mongoose";
import { Schema } from "mongoose";

const transactionSchema = new Schema({
    expenseGroup: { type: mongoose.Types.ObjectId, ref: "expensegroups" },
    name: String,
    description: String,
    amount: Number,
    type: { type: String, enum: Object.values(TRANSACTION_TYPES) },
    currency: String,
    date: Date,
    categories: [String],
    paymentMode: String,
    createdBy: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    updatedBy: { type: mongoose.Types.ObjectId, ref: "users" },
}, { timestamps: true });

export default mongoose.models.transactions || mongoose.model("transactions", transactionSchema);