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
exports.getRatingReviews = exports.deleteRatingReviews = exports.addRatingReviews = void 0;
const rating_module_1 = require("./rating.module");
const responseHandler_1 = require("../../responseHandler");
const addRatingReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = req.params.id;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const { rating, review } = req.body;
        const productReview = yield rating_module_1.productReviewModel.findOne({ userId, productId: id });
        if (productReview) {
            const updateRatingAndReview = yield rating_module_1.productReviewModel.findOneAndUpdate({ userId, productId: id }, { review, rating }, { new: true });
            (0, responseHandler_1.createResponse)(res, 200, true, "product Review and rating added", updateRatingAndReview);
            return;
        }
        const addReview = new rating_module_1.productReviewModel({ productId: id, userId, review, rating });
        yield addReview.save();
        (0, responseHandler_1.createResponse)(res, 200, true, "product Review and rating added", addReview);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.addRatingReviews = addRatingReviews;
const deleteRatingReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = req.params.id;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const deleteRateAndReview = yield rating_module_1.productReviewModel.findOneAndDelete({ _id: id, userId });
        (0, responseHandler_1.createResponse)(res, 200, true, "product Review and rating deleted", deleteRateAndReview);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.deleteRatingReviews = deleteRatingReviews;
const getRatingReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const productReview = yield rating_module_1.productReviewModel.find({ productId: id }).sort({ "createdAt": -1 });
        if (!productReview) {
            (0, responseHandler_1.createResponse)(res, 404, false, "Your product not exist");
            return;
        }
        (0, responseHandler_1.createResponse)(res, 200, true, "product Review and Rating ", productReview);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
    ;
});
exports.getRatingReviews = getRatingReviews;
//# sourceMappingURL=rating.controller.js.map