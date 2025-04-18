"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const dashboard_controller_1 = require("./dashboard.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const auth_middleware_2 = require("../auth/auth.middleware");
router.post('/adminDashboard', auth_middleware_2.checkAuthorization, auth_middleware_1.adminRole, dashboard_controller_1.adminDashboard);
exports.default = router;
//# sourceMappingURL=dashboard.router.js.map