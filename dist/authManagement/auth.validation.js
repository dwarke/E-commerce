"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.registerValidator = void 0;
const { body } = require("express-validator");
exports.registerValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("phone").notEmpty().withMessage("Phone number must be exactly 10 digits"),
    body("role").notEmpty().withMessage("Please enter the role user and vendor"),
];
exports.loginValidation = [
    body("email").notEmpty().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Invalid password format")
];
//# sourceMappingURL=auth.validation.js.map