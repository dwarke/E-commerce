"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
router.post('/register', auth_validation_1.registerValidator, auth_controller_1.register);
router.post('/login', auth_validation_1.loginValidation, auth_controller_1.login);
router.post('/forgotPassword', auth_controller_1.forgotPassword);
router.post('/resetPassword', auth_controller_1.resetPassword);
router.post('/logout', auth_controller_1.logout);
exports.default = router;
//# sourceMappingURL=auth.router.js.map