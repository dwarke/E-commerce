"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const objectId = joi_1.default.string().custom((value, helpers) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
    }
    return value;
}, "ObjectId Validation");
exports.reviewValidationSchema = joi_1.default.object({
    productId: objectId,
    rating: joi_1.default.number().integer().min(1).max(5).required(),
    review: joi_1.default.string().allow("").optional(),
});
//# sourceMappingURL=rating.validation.js.map