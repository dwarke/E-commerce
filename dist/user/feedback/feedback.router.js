"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth_middleware_1 = require("../auth/auth.middleware");
const auth_middleware_2 = require("../../adminPanel/auth/auth.middleware");
const feedback_controller_1 = require("./feedback.controller");
const feedback_validation_1 = require("./feedback.validation");
router.post('/addFeedback', auth_middleware_2.checkAuthorization, auth_middleware_1.userBlocked, (0, auth_middleware_2.validateRequest)(feedback_validation_1.feedbackSchema), feedback_controller_1.addFeedback);
router.get('/getFeedback', auth_middleware_2.checkAuthorization, auth_middleware_1.userBlocked, feedback_controller_1.getFeedback);
exports.default = router;
//# sourceMappingURL=feedback.router.js.map