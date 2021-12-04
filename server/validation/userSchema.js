import Joi from "joi";

const userSchema = Joi.object({
    email: Joi.string().trim().lowercase().email().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")).required(),
    firstName: Joi.string().pattern(new RegExp("^[a-zA-Z]{3,20}$")),
    lastName: Joi.string().pattern(new RegExp("^[a-zA-Z]{3,20}$")),
    createdAt: Joi.date(),
});

export default userSchema;
