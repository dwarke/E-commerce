"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth_middleware_1 = require("../userManagement/auth.middleware");
const user_collection_1 = require("./user.collection");
router.post('/addShoppingCard', auth_middleware_1.checkAuthorization, user_collection_1.addShoppingCard);
router.post('/deleteShoppingCard/:id', auth_middleware_1.checkAuthorization, user_collection_1.deleteShoppingCard);
router.post('/UpdateShoppingCard/:id', auth_middleware_1.checkAuthorization, user_collection_1.UpdateShoppingCard);
router.post('/addRatingReviews/:id', auth_middleware_1.checkAuthorization, user_collection_1.addRatingReviews);
router.post('/deleteRatingReviews/:id', auth_middleware_1.checkAuthorization, user_collection_1.deleteRatingReviews);
router.post('/updateRatingReviews/:id', auth_middleware_1.checkAuthorization, user_collection_1.updateRatingReviews);
exports.default = router;
//# sourceMappingURL=user.router.js.map