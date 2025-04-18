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
        validate: {
            validator: (num) => /^[0-9]{10}$/.test(num.trim()),
            message: (props) => `${props.value} is not a valid mobile number! Please must be exactly 10 digits`,
        },
    },
    profile: {
        type: String,
        default: 'https://oceantech-mgp.s3.ap-south-1.amazonaws.com/mgp/AvatarImages/avatarImage-1739382148532.png'
    },
    genderCategory: {
        type: String,
        required: true,
        enum: ['male', 'female'],
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin', 'vendor'],
    },
    status: {
        type: String,
        enum: ['pending', 'approve', 'reject'],
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
    },
    resetToken: {
        type: String,
    },
}, { timestamps: true, versionKey: false });
const register = (0, mongoose_1.model)('userRegister', registerSchema);
exports.default = register;
//# sourceMappingURL=auth.module.js.map