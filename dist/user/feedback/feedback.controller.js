"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeedback = exports.addFeedback = void 0;
const feedback_module_1 = require("./feedback.module");
const responseHandler_1 = require("../../responseHandler");
const addFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const { feedback } = req.body;
        const alreadyFeedBack = yield feedback_module_1.feedbackModel.findOne({ userId });
        if (alreadyFeedBack) {
            const updateFeedBack = yield feedback_module_1.feedbackModel.findOneAndUpdate({ userId }, { feedback });
            (0, responseHandler_1.createResponse)(res, 200, true, "Thank you for providing Feedback on the Website.", updateFeedBack);
        }
        const addFeedback = new feedback_module_1.feedbackModel({ userId, feedback });
        yield addFeedback.save();
        (0, responseHandler_1.createResponse)(res, 200, true, "Thank you for providing Feedback on the Website.", addFeedback);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
    ;
});
exports.addFeedback = addFeedback;
const getFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const alreadyFeedBack = yield feedback_module_1.feedbackModel.findOne({ userId });
        (0, responseHandler_1.createResponse)(res, 200, true, "Your website`s feedBack", alreadyFeedBack);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.getFeedback = getFeedback;
//# sourceMappingURL=feedback.controller.js.map