"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const product_middleware_1 = require("./product.middleware");
const auth_middleware_1 = require("../auth/auth.middleware");
const auth_middleware_2 = require("../../adminPanel/auth/auth.middleware");
const product_validation_1 = require("./product.validation");
const product_controller_1 = require("./product.controller");
router.post('/addProduct', auth_middleware_1.checkAuthorization, auth_middleware_1.userBlocked, product_middleware_1.vendorRole, product_middleware_1.upload.array('images', 5), (0, auth_middleware_2.validateRequest)(product_validation_1.productValidation), product_controller_1.addProduct);
router.post('/deleteProduct/:id', auth_middleware_1.checkAuthorization, auth_middleware_1.userBlocked, product_middleware_1.vendorRole, product_controller_1.deleteProduct);
router.post('/updateProduct/:id', auth_middleware_1.checkAuthorization, auth_middleware_1.userBlocked, product_middleware_1.vendorRole, product_middleware_1.upload.array('images', 5), product_controller_1.updateProduct);
router.get('/viewProduct', auth_middleware_1.checkAuthorization, auth_middleware_1.userBlocked, product_middleware_1.vendorRole, product_controller_1.viewProduct);
exports.default = router;
//# sourceMappingURL=product.router.js.map