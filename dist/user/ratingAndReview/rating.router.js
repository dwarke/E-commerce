"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth_middleware_1 = require("../auth/auth.middleware");
const rating_controller_1 = require("./rating.controller");
const auth_middleware_2 = require("../../adminPanel/auth/auth.middleware");
const rating_validation_1 = require("./rating.validation");
router.post('/addRatingReviews/:id', auth_middleware_2.checkAuthorization, auth_middleware_1.userBlocked, (0, auth_middleware_2.validateRequest)(rating_validation_1.reviewValidationSchema), rating_controller_1.addRatingReviews);
router.post('/deleteRatingReviews/:id', auth_middleware_2.checkAuthorization, auth_middleware_1.userBlocked, rating_controller_1.deleteRatingReviews);
router.get('/getRatingReviews/:id', auth_middleware_2.checkAuthorization, auth_middleware_1.userBlocked, rating_controller_1.getRatingReviews);
exports.default = router;
//# sourceMappingURL=rating.router.js.map