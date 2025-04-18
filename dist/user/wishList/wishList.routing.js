"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const wishList_controller_1 = require("./wishList.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const auth_middleware_2 = require("../../adminPanel/auth/auth.middleware");
const wishlist_validation_1 = require("./wishlist.validation");
router.post('/addWishlist/:id', auth_middleware_2.checkAuthorization, auth_middleware_1.userBlocked, (0, auth_middleware_2.validateRequest)(wishlist_validation_1.wishlistValidation), wishList_controller_1.addWishlist);
router.get('/getWishlist', auth_middleware_2.checkAuthorization, auth_middleware_1.userBlocked, wishList_controller_1.getWishlist);
exports.default = router;
//# sourceMappingURL=wishList.routing.js.map