"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const vendor_middleware_1 = require("./vendor.middleware");
const auth_middleware_1 = require("../userManagement/auth.middleware");
const vendor_controller_1 = require("./vendor.controller");
router.post('/addProduct', auth_middleware_1.checkAuthorization, vendor_middleware_1.vendorRole, vendor_middleware_1.upload.single('images'), vendor_controller_1.addProduct);
router.post('/deleteProduct/:id', auth_middleware_1.checkAuthorization, vendor_middleware_1.vendorRole, vendor_controller_1.deleteProduct);
router.post('/updateProduct/:id', auth_middleware_1.checkAuthorization, vendor_middleware_1.vendorRole, vendor_middleware_1.upload.single('images'), vendor_controller_1.updateProduct);
router.get('/viewProduct', auth_middleware_1.checkAuthorization, vendor_middleware_1.vendorRole, vendor_middleware_1.upload.single('images'), vendor_controller_1.viewProduct);
exports.default = router;
//# sourceMappingURL=vendor.router.js.map