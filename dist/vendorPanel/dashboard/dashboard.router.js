"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const product_middleware_1 = require("../product/product.middleware");
const auth_middleware_1 = require("../auth/auth.middleware");
const dashboard_controller_1 = require("./dashboard.controller");
router.post('/penalDashboard', auth_middleware_1.checkAuthorization, auth_middleware_1.userBlocked, product_middleware_1.vendorRole, dashboard_controller_1.penalDashboard);
exports.default = router;
//# sourceMappingURL=dashboard.router.js.map