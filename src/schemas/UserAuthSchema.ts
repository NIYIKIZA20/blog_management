import Joi from "joi";

export const UserLoginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

