"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const report_controller_1 = require("./report.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const auth_middleware_2 = require("../auth/auth.middleware");
router.post('/adminSalesReport', auth_middleware_2.checkAuthorization, auth_middleware_1.adminRole, report_controller_1.adminSalesReport);
exports.default = router;
//# sourceMappingURL=report.router.js.map