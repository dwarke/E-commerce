import Joi from "joi";

export const categoryValidation = Joi.object({
    category: Joi.string()
    .alphanum()
    .required()
})