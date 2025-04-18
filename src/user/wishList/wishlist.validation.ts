import Joi from "joi";
import mongoose from "mongoose";

const objectId = Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message({ custom: "Invalid ObjectId" });
    }
    return value;
}, "ObjectId Validation");

export const wishlistValidation = Joi.object({
    userId: objectId,
    productId: Joi.array().items(objectId).min(1)
});
