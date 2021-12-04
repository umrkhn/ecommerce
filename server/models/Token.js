import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    refreshToken: { type: String, requried: true },
    createdAt: { type: Date, default: Date.now() },
});

export default mongoose.model("Token", tokenSchema);
