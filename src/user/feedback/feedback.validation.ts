import Joi from "joi";
import mongoose from "mongoose";

// Helper to validate MongoDB ObjectIds
const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}, "ObjectId Validation");

export const feedbackSchema = Joi.object({
  userId: objectId,
  feedback: Joi.string()
  .trim()
  .min(3)
  .max(500)
  .required()
  .custom((value, helpers) => {
    if (!value.trim()) {
      return helpers.error("string.empty", { value });
    }
    return value;
  }, "Trimmed Non-Empty String")
});
