import ServerError from "../helpers/class/ServerError.js";
import { successRes } from "../helpers/index.js";
import Product from "../models/Product.js";
import productSchema from "../validation/productSchema.js";

export const getProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).json(successRes("Success", res.statusCode, products));
};

export const createProduct = async (req, res) => {
    const userId = req.user.id;
    const { value, error } = productSchema.validate({ ...req.body, user: userId });
    if (error) throw new ServerError("Validation Error Occurred", 422, error);
    const newProduct = await Product.create(value);
    res.status(201).json(successRes("Product created successfully.", res.statusCode, newProduct));
};

export const showProduct = async (req, res) => {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);
    res.status(200).json(successRes("Success", res.statusCode, foundProduct));
};

// export const editProduct = async (req, res) => {
//     const { id } = req.params;
//     const { value, error } = productSchema.validate(req.body);
//     if (error) throw new ServerError("Validation Error Occurred", 422, error);
//     const foundProduct = await Product.findById(id);
//     foundProduct.set(value);
//     await foundProduct.save();
//     res.status(200).json(successRes("Product edited successfully.", res.statusCode, foundProduct));
// };

// export const deleteProduct = async (req, res) => {
//     const { id } = req.params;
//     await Product.findByIdAndDelete(id);
//     res.status(200).json(successRes("Product deleted successfully.", res.statusCode, null));
// };
