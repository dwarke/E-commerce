"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const objectId = joi_1.default.string().custom((value, helpers) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
    }
    return value;
}, 'ObjectId Validation');
exports.productValidation = joi_1.default.object({
    vendorId: objectId,
    name: joi_1.default.string().min(2).max(100).required(),
    description: joi_1.default.string().min(1).max(1000).required(),
    price: joi_1.default.number().min(0).required(),
    stock: joi_1.default.number().integer().min(0).required(),
    category: objectId.required(),
    status: joi_1.default.string().valid('pending', 'approve', 'reject').optional()
});
//# sourceMappingURL=product.validation.js.map