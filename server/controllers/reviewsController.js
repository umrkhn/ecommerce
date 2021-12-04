import Product from "../models/Product.js";
import Review from "../models/Review.js";
import { successRes } from "../helpers/index.js";
import ServerError from "../helpers/class/ServerError.js";
import reviewSchema from "../validation/reviewSchema.js";

export const getReviews = async (req, res) => {
    const { id: pid } = req.params;
    const foundProduct = await Product.findById(pid);
    if (!foundProduct) throw new ServerError("Product not found!", 404);
    const foundReviews = await Review.find({ product: pid });
    res.status(200).json(successRes("Reviews found successfully", res.statusCode, foundReviews));
};

export const createReview = async (req, res) => {
    const { id: pid } = req.params;
    const { firstName, lastName, id: uid } = req.user;
    const { value, error } = reviewSchema.validate({ ...req.body, product: pid, user: uid, firstName, lastName });
    if (error) throw new ServerError("Validation Error Occurred", 422, error);
    const foundProduct = await Product.findById(pid);
    if (!foundProduct) throw new ServerError("Product not found!", 404);
    const review = await Review.create(value);
    res.status(201).json(successRes("Review created successfully", res.statusCode, review));
};
