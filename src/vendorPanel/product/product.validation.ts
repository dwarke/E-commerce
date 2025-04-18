import Joi from 'joi';
import mongoose from 'mongoose';

// Validate ObjectId using custom method
const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}, 'ObjectId Validation');

export const productValidation = Joi.object({
  vendorId: objectId,
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(1).max(1000).required(),
  price: Joi.number().min(0).required(),
  stock: Joi.number().integer().min(0).required(),
  category: objectId.required(),
  status: Joi.string().valid('pending', 'approve', 'reject').optional()
});
