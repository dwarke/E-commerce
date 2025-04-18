"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth_middleware_1 = require("../../adminPanel/auth/auth.middleware");
const auth_validation_1 = require("../../vendorPanel/auth/auth.validation");
const auth_controller_1 = require("./auth.controller");
router.post('/register', (0, auth_middleware_1.validateRequest)(auth_validation_1.registerValidation), auth_controller_1.register);
router.post('/login', auth_controller_1.login);
router.post('/forgotPassword', auth_controller_1.forgotPassword);
router.post('/resetPassword', auth_controller_1.resetPassword);
router.post('/logout', auth_controller_1.logout);
router.post('/profile', auth_middleware_1.checkAuthorization, auth_controller_1.profile);
exports.default = router;
//# sourceMappingURL=auth.router.js.map