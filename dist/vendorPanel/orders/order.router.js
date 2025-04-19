"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const product_middleware_1 = require("../product/product.middleware");
const auth_middleware_1 = require("../auth/auth.middleware");
const order_controller_1 = require("./order.controller");
router.post('/viewUserOrderList', auth_middleware_1.checkAuthorization, auth_middleware_1.userBlocked, product_middleware_1.vendorRole, order_controller_1.viewUserOrderList);
router.post('/userOrderStatus/:id', auth_middleware_1.checkAuthorization, auth_middleware_1.userBlocked, product_middleware_1.vendorRole, order_controller_1.userOrderStatus);
exports.default = router;
//# sourceMappingURL=order.router.js.map