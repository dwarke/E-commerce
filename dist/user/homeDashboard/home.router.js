"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth_middleware_1 = require("../auth/auth.middleware");
const auth_middleware_2 = require("../../adminPanel/auth/auth.middleware");
const home_controller_1 = require("./home.controller");
router.post('/userGetProduct', auth_middleware_2.checkAuthorization, auth_middleware_1.userBlocked, home_controller_1.userGetProduct);
exports.default = router;
//# sourceMappingURL=home.router.js.map