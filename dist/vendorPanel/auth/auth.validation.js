"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerValidation = joi_1.default.object({
    name: joi_1.default.string().min(2).max(50).required(),
    email: joi_1.default.string()
        .email()
        .required(),
    password: joi_1.default.string()
        .required(),
    address: joi_1.default.string().min(3).max(255).required(),
    phone: joi_1.default.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
        'string.pattern.base': 'Phone number must be exactly 10 digits.',
    }),
    profile: joi_1.default.string().uri().optional(),
    genderCategory: joi_1.default.string()
        .valid('male', 'female')
        .required(),
    role: joi_1.default.string()
        .valid('user', 'vendor'),
    status: joi_1.default.string()
        .valid('pending', 'approve', 'reject')
        .optional(),
    isBlocked: joi_1.default.boolean().optional(),
    token: joi_1.default.string().optional(),
    resetToken: joi_1.default.string().optional()
});
//# sourceMappingURL=auth.validation.js.map