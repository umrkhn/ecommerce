import Joi from 'joi';

const reviewSchema = Joi.object({
  user: Joi.string().hex().required().min(24).max(24),
  product: Joi.string().hex().required().min(24).max(24),
  createdAt: Joi.date(),
  rating: Joi.number().required().max(5),
  description: Joi.string().required().max(300),
  firstName: Joi.string().pattern(new RegExp('^[a-zA-Z]{3,20}$')),
  lastName: Joi.string().pattern(new RegExp('^[a-zA-Z]{3,20}$')),
});

export default reviewSchema;
