import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    createdAt: { type: Date, default: Date.now() },
    rating: { type: Number, max: 5, required: true },
    description: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});

export default mongoose.model("Review", reviewSchema);
