"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const userManage_controller_1 = require("./userManage.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const auth_middleware_2 = require("../auth/auth.middleware");
router.post('/adminUserBlockUnblock/:id', auth_middleware_2.checkAuthorization, auth_middleware_1.adminRole, userManage_controller_1.adminUserBlockUnblock);
router.post('/adminUserBlocked/:id', auth_middleware_2.checkAuthorization, auth_middleware_1.adminRole, userManage_controller_1.adminUserBlocked);
router.post('/adminUserUpdate/:id', auth_middleware_2.checkAuthorization, auth_middleware_1.adminRole, userManage_controller_1.adminUserUpdate);
router.post('/adminUserOrderView', auth_middleware_2.checkAuthorization, auth_middleware_1.adminRole, userManage_controller_1.adminUserOrderView);
router.post('/adminVieWFeedback', auth_middleware_2.checkAuthorization, auth_middleware_1.adminRole, userManage_controller_1.adminVieWFeedback);
exports.default = router;
//# sourceMappingURL=userManage.router.js.map