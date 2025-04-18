"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishlistValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const objectId = joi_1.default.string().custom((value, helpers) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
        return helpers.message({ custom: "Invalid ObjectId" });
    }
    return value;
}, "ObjectId Validation");
exports.wishlistValidation = joi_1.default.object({
    userId: objectId,
    productId: joi_1.default.array().items(objectId).min(1)
});
//# sourceMappingURL=wishlist.validation.js.map