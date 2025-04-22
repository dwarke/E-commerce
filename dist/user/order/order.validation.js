"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.orderValidationSchema = joi_1.default.object({
    userId: joi_1.default.string()
        .custom((value, helpers) => {
        if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
            return helpers.error("any.invalid");
        }
        return value;
    }),
    userName: joi_1.default.string(),
    products: joi_1.default.array()
        .items(joi_1.default.object({
        cartId: joi_1.default.string().required(),
        productId: joi_1.default.string().required().custom((value, helpers) => {
            if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
                return helpers.error("any.invalid");
            }
            return value;
        }),
        name: joi_1.default.string(),
        description: joi_1.default.string(),
        price: joi_1.default.number().positive(),
        stock: joi_1.default.number().integer().min(0),
        images: joi_1.default.array().items(joi_1.default.string()),
        category: joi_1.default.string().custom((value, helpers) => {
            if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
                return helpers.error("any.invalid");
            }
            return value;
        }),
        quantity: joi_1.default.number().integer().min(1),
        vendorId: joi_1.default.string().custom((value, helpers) => {
            if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
                return helpers.error("any.invalid");
            }
            return value;
        }),
        totalPrice: joi_1.default.number().positive(),
    }))
        .min(1),
    userAddress: joi_1.default.string(),
    totalAmount: joi_1.default.number().positive(),
    status: joi_1.default.string().valid("pending", "approve", "cancel").optional(),
});
//# sourceMappingURL=order.validation.js.map