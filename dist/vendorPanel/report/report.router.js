"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const product_middleware_1 = require("../product/product.middleware");
const auth_middleware_1 = require("../auth/auth.middleware");
const report_controller_1 = require("./report.controller");
router.post('/vendorProductReport', auth_middleware_1.checkAuthorization, auth_middleware_1.userBlocked, product_middleware_1.vendorRole, report_controller_1.vendorProductReport);
exports.default = router;
//# sourceMappingURL=report.router.js.map