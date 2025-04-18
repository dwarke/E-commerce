"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const product_middleware_1 = require("../product/product.middleware");
const auth_middleware_1 = require("../auth/auth.middleware");
const rating_controller_1 = require("./rating.controller");
router.post('/viewProductRating/:id', auth_middleware_1.checkAuthorization, auth_middleware_1.userBlocked, product_middleware_1.vendorRole, rating_controller_1.viewProductRating);
exports.default = router;
//# sourceMappingURL=rating.router.js.map