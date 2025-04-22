"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const vendor_controller_1 = require("./vendor.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const auth_middleware_2 = require("../auth/auth.middleware");
router.get('/viewAllVendor', auth_middleware_2.checkAuthorization, auth_middleware_1.adminRole, vendor_controller_1.viewAllVendor);
router.post('/vendorApprove/:id', auth_middleware_2.checkAuthorization, auth_middleware_1.adminRole, vendor_controller_1.vendorApprove);
router.get('/vendorAllProducts', auth_middleware_2.checkAuthorization, auth_middleware_1.adminRole, vendor_controller_1.vendorAllProducts);
router.post('/vendorProductStatus/:id', auth_middleware_2.checkAuthorization, auth_middleware_1.adminRole, vendor_controller_1.vendorProductStatus);
router.post('/vendorProducts', auth_middleware_2.checkAuthorization, auth_middleware_1.adminRole, vendor_controller_1.vendorProducts);
exports.default = router;
//# sourceMappingURL=vendor.router.js.map