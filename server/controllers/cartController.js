import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

import { successRes } from "../helpers/index.js";
import ServerError from "../helpers/class/ServerError.js";
import cartSchema from "../validation/cartSchema.js";

export const createCart = async (req, res) => {
    const userId = req.user.id;
    if (!userId) new ServerError("User_Id not found!", 404);
    const cart = await Cart.create({ user: userId });
    cart.__v = undefined;
    res.status(201).json(successRes("Cart created successfully.", res.statusCode, cart));
};

export const getCart = async (req, res) => {
    const userId = req.user.id;
    if (!userId) throw new ServerError("User_Id not found!", 404);
    const foundCart = await Cart.findOne({ user: userId });
    if (!foundCart) throw new ServerError("Cart not found!", 404);
    foundCart.__v = undefined;
    res.status(200).json(successRes("Success", res.statusCode, foundCart));
};

export const resetCart = async (req, res) => {
    const cartId = req.params.id;
    const userId = req.user.id;
    if (!userId) throw new ServerError("User_Id not found!", 404);
    const foundCart = await Cart.findOne({ user: userId, _id: cartId });
    foundCart.cartItems = [];
    const newCart = await foundCart.save();
    newCart.__v = undefined;
    res.status(200).json(successRes("Cart reset successful.", res.statusCode, newCart));
};

export const addItem = async (req, res) => {
    const cartId = req.params.id;
    const userId = req.user.id;
    if (!userId) throw new ServerError("User_Id not found!", 404);
    const { value, error } = cartSchema.validate({ user: userId, cartItems: [req.body] });
    if (error) throw new ServerError("Validation Error Occurred", 422, error);
    const foundProduct = await Product.findById(req.body.product);
    if (!foundProduct) throw new ServerError("Product with the provided Id not found!", 404);
    const foundCart = await Cart.findOne({ user: userId, _id: cartId });
    if (!foundCart) throw new ServerError("Cart not found!", 404);
    foundCart.cartItems.push({ title: foundProduct.title, price: foundProduct.price, image: foundProduct.images[0], ...req.body });
    const newCart = await foundCart.save();
    newCart.__v = undefined;
    res.status(201).json(successRes("Item added to cart.", res.statusCode, newCart));
};

export const editItem = async (req, res) => {
    const { id, itemId } = req.params;
    const { type } = req.query;
    const userId = req.user.id;
    if (!userId) throw new ServerError("User_Id not found!", 404);
    const foundCart = await Cart.findOne({ user: userId, _id: id, "cartItems._id": itemId });
    if (!foundCart) throw new ServerError("Cart not found!", 404);
    const cartItems = foundCart.cartItems;
    for (const item of cartItems) {
        if (item._id.equals(itemId)) {
            if (type !== "INCREASE_QTY" && type !== "DECREASE_QTY") throw new ServerError("Edit failed! Invalid Type", 400);
            if (type === "INCREASE_QTY") item.quantity = item.quantity + 1;
            if (type === "DECREASE_QTY") item.quantity = item.quantity - 1;
        }
    }
    const newCart = await foundCart.save();
    newCart.__v = undefined;
    return res.status(200).json(successRes("Success", res.statusCode, newCart));
};

export const removeItem = async (req, res) => {
    const { id, itemId } = req.params;
    const cartId = id;
    const userId = req.user.id;
    if (!userId) throw new ServerError("User_Id not found!", 404);
    const foundCart = await Cart.findOne({ user: userId, _id: cartId, "cartItems._id": itemId });
    if (!foundCart) throw new ServerError("Cart not found!", 404);
    foundCart.cartItems.pull(itemId);
    const newCart = await foundCart.save();
    newCart.__v = undefined;
    res.status(200).json(successRes("Item removed from the cart.", res.statusCode, newCart));
};
