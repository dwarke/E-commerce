"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const admin_controller_1 = require("./admin.controller");
const admin_middleware_1 = require("./admin.middleware");
const auth_middleware_1 = require("../authManagement/auth.middleware");
router.post('/adminVendorApprove/:id', auth_middleware_1.checkAuthorization, admin_middleware_1.adminRole, admin_controller_1.adminVendorApprove);
router.post('/adminAddCategory', auth_middleware_1.checkAuthorization, admin_middleware_1.adminRole, admin_controller_1.adminAddCategory);
exports.default = router;
//# sourceMappingURL=admin.router.js.map