"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const objectId = joi_1.default.string().custom((value, helpers) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
    }
    return value;
}, "ObjectId Validation");
exports.feedbackSchema = joi_1.default.object({
    userId: objectId,
    feedback: joi_1.default.string()
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
//# sourceMappingURL=feedback.validation.js.map