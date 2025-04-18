"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth_middleware_1 = require("../auth/auth.middleware");
const order_controller_1 = require("./order.controller");
const auth_middleware_2 = require("../../adminPanel/auth/auth.middleware");
const order_validation_1 = require("./order.validation");
router.post('/addOrder', auth_middleware_2.checkAuthorization, auth_middleware_1.userBlocked, (0, auth_middleware_2.validateRequest)(order_validation_1.orderValidationSchema), order_controller_1.addOrder);
router.get('/getOrders', auth_middleware_2.checkAuthorization, auth_middleware_1.userBlocked, order_controller_1.getOrders);
exports.default = router;
//# sourceMappingURL=order.router.js.map