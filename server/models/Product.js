import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: { type: String, required: true, minLength: 40, maxLength: 70 },
    price: { type: Number, required: true },
    images: [String],
    totalReviews: { type: Number, default: 0 },
    avgRating: { type: Number, default: 0 },
    details: {
        size: [{ type: String, uppercase: true, trim: true, minLength: 1, maxLength: 3 }],
        color: [{ type: String, uppercase: true, trim: true, minLength: 6, maxLength: 8 }],
        features: { type: Map, of: String },
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now() },
});

export default mongoose.model("Product", productSchema);
