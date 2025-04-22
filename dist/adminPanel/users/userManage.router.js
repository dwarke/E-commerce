"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const userManage_controller_1 = require("./userManage.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const auth_middleware_2 = require("../auth/auth.middleware");
router.post('/allUser', auth_middleware_2.checkAuthorization, auth_middleware_1.adminRole, userManage_controller_1.allUser);
router.post('/userBlockUnblock/:id', auth_middleware_2.checkAuthorization, auth_middleware_1.adminRole, userManage_controller_1.userBlockUnblock);
router.post('/userBlocked', auth_middleware_2.checkAuthorization, auth_middleware_1.adminRole, userManage_controller_1.userBlocked);
router.post('/userUpdate/:id', auth_middleware_2.checkAuthorization, auth_middleware_1.adminRole, userManage_controller_1.userUpdate);
router.post('/userOrderView', auth_middleware_2.checkAuthorization, auth_middleware_1.adminRole, userManage_controller_1.userOrderView);
router.post('/viewFeedback', auth_middleware_2.checkAuthorization, auth_middleware_1.adminRole, userManage_controller_1.viewFeedback);
exports.default = router;
//# sourceMappingURL=userManage.router.js.map