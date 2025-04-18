
import Joi from "joi";
import mongoose from "mongoose";

// Reusable ObjectId validation
const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message({custom:"Invalid ObjectId"});
  }
  return value;
}, "ObjectId Validation");

export const shoppingCartValidation = Joi.object({
  productId: objectId.required(),
  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "Quantity must be a number",
    "number.min": "Quantity must be at least 1",
    "any.required": "Quantity is required",
  }),
});
