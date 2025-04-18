"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const registerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    profile: {
        type: String,
        default: 'https://oceantech-mgp.s3.ap-south-1.amazonaws.com/mgp/AvatarImages/avatarImage-1739382148532.png'
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'vendor'],
        required: true
    },
    token: {
        type: String,
    },
    resetToken: {
        type: String,
    },
}, { timestamps: true });
const register = (0, mongoose_1.model)('userRegister', registerSchema);
exports.default = register;
//# sourceMappingURL=auth.module.js.map