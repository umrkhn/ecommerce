import Joi from "joi";

const cartSchema = Joi.object({
    user: Joi.string().hex().required().min(24).max(24),
    total: Joi.number(),
    cartItems: Joi.array().items({
        size: Joi.string().alphanum().trim().uppercase().max(3),
        color: Joi.string().hex().trim().uppercase().min(6).max(8),
        quantity: Joi.number().required().min(1),
        product: Joi.string().hex().required().min(24).max(24),
        createdAt: Joi.date(),
    }),
    createdAt: Joi.date(),
});

export default cartSchema;
