import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    total: { type: Number, default: 0 },
    cartItems: [
        {
            title: { type: String, required: true, minLength: 40, maxLength: 70 },
            price: { type: Number, required: true },
            image: { type: String, required: true },
            size: { type: String, uppercase: true, trim: true, minLength: 1, maxLength: 3 },
            color: { type: String, uppercase: true, trim: true, minLength: 6, maxLength: 8 },
            quantity: { type: Number, required: true, min: 1 },
            product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
            createdAt: { type: Date, default: Date.now() },
        },
    ],
    createdAt: { type: Date, default: Date.now() },
});

export default mongoose.model("Cart", cartSchema);
