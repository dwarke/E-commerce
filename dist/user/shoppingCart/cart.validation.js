"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shoppingCartValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const objectId = joi_1.default.string().custom((value, helpers) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
        return helpers.message({ custom: "Invalid ObjectId" });
    }
    return value;
}, "ObjectId Validation");
exports.shoppingCartValidation = joi_1.default.object({
    productId: objectId.required(),
    quantity: joi_1.default.number().integer().min(1).required().messages({
        "number.base": "Quantity must be a number",
        "number.min": "Quantity must be at least 1",
        "any.required": "Quantity is required",
    }),
});
//# sourceMappingURL=cart.validation.js.map