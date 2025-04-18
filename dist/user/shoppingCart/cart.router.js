"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth_middleware_1 = require("../auth/auth.middleware");
const cart_controller_1 = require("./cart.controller");
const auth_middleware_2 = require("../../adminPanel/auth/auth.middleware");
const cart_validation_1 = require("./cart.validation");
router.post('/addShoppingCard', auth_middleware_2.checkAuthorization, auth_middleware_1.userBlocked, (0, auth_middleware_2.validateRequest)(cart_validation_1.shoppingCartValidation), cart_controller_1.addShoppingCard);
router.post('/deleteShoppingCard/:id', auth_middleware_2.checkAuthorization, auth_middleware_1.userBlocked, cart_controller_1.deleteShoppingCard);
router.get('/getShoppingCard', auth_middleware_2.checkAuthorization, auth_middleware_1.userBlocked, cart_controller_1.getShoppingCard);
exports.default = router;
//# sourceMappingURL=cart.router.js.map