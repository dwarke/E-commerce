"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const userManage_controller_1 = require("./userManage.controller");
const admin_middleware_1 = require("../adminPanel/admin.middleware");
const auth_middleware_1 = require("../../authManagement/auth.middleware");
router.post('/adminUserBlockUnblock/:id', auth_middleware_1.checkAuthorization, admin_middleware_1.adminRole, userManage_controller_1.adminUserBlockUnblock);
router.post('/adminUserUpdate/:id', auth_middleware_1.checkAuthorization, admin_middleware_1.adminRole, userManage_controller_1.adminUserUpdate);
router.post('/adminUserOrderView/:id', auth_middleware_1.checkAuthorization, admin_middleware_1.adminRole, userManage_controller_1.adminUserOrderView);
exports.default = router;
//# sourceMappingURL=userManage.route.js.map