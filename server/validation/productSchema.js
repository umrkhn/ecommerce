import Joi from "joi";

const productSchema = Joi.object({
    title: Joi.string().min(40).max(70).required(),
    price: Joi.number().required(),
    media: {
        video: Joi.string(),
        images: Joi.array().items(Joi.string()),
    },
    totalReviews: Joi.number(),
    avgRating: Joi.number(),
    details: {
        size: Joi.array().items(Joi.string().alphanum().trim().uppercase().max(3)),
        color: Joi.array().items(Joi.string().hex().trim().uppercase().min(6).max(8)),
        features: Joi.object().unknown({ allow: true }),
    },
    user: Joi.string().hex().required().min(24).max(24),
    createdAt: Joi.date(),
});

export default productSchema;
