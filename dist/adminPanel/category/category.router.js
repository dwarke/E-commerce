"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const category_controller_1 = require("./category.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const auth_middleware_2 = require("../auth/auth.middleware");
const category_validation_1 = require("./category.validation");
router.post('/addCategory', auth_middleware_2.checkAuthorization, auth_middleware_1.adminRole, (0, auth_middleware_2.validateRequest)(category_validation_1.categoryValidation), category_controller_1.addCategory);
router.post('/deleteCategory/:id', auth_middleware_2.checkAuthorization, auth_middleware_1.adminRole, category_controller_1.deleteCategory);
router.post('/getCategory', auth_middleware_2.checkAuthorization, auth_middleware_1.adminRole, category_controller_1.getCategory);
exports.default = router;
//# sourceMappingURL=category.router.js.map