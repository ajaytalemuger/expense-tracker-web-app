import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    name: String,
    email: String,
    pwd: String,
});

export default mongoose.models.users || mongoose.model("users", userSchema);