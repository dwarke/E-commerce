
import Joi from "joi";
import mongoose from "mongoose";

// Helper to validate MongoDB ObjectIds
const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}, "ObjectId Validation");

export const reviewValidationSchema = Joi.object({
  productId: objectId,
  rating: Joi.number().integer().min(1).max(5).required(),
  review: Joi.string().allow("").optional(),
});
