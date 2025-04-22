// validations/orderValidation.ts
import Joi from "joi";
import mongoose from "mongoose";

export const orderValidationSchema = Joi.object({
  userId: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }),
  userName: Joi.string(),
  products: Joi.array()
    .items(
      Joi.object({
        cartId: Joi.string().required(),
        productId: Joi.string().required().custom((value, helpers) => {
          if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error("any.invalid");
          }
          return value;
        }),
        name: Joi.string(),
        description: Joi.string(),
        price: Joi.number().positive(),
        stock: Joi.number().integer().min(0),
        images: Joi.array().items(Joi.string()),
        category: Joi.string().custom((value, helpers) => {
          if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error("any.invalid");
          }
          return value;
        }),
        quantity: Joi.number().integer().min(1),
        vendorId: Joi.string().custom((value, helpers) => {
          if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error("any.invalid");
          }
          return value;
        }),
        totalPrice: Joi.number().positive(),
      })
    )
    .min(1),

  userAddress: Joi.string(),

  totalAmount: Joi.number().positive(),

  status: Joi.string().valid("pending", "approve", "cancel").optional(),
});
