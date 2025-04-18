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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRatingReviews = exports.deleteRatingReviews = exports.addRatingReviews = exports.UpdateShoppingCard = exports.deleteShoppingCard = exports.addShoppingCard = void 0;
const vendor_module_1 = require("../vendor/vendor.module");
const user_module_1 = __importDefault(require("./user.module"));
function createResponse(res, statusCode, success, message, data, error) {
    const response = {
        success, message, data, error
    };
    return res.status(statusCode).json(response);
}
const addShoppingCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const { productId, quantity } = req.body;
        const vendorProduct = yield vendor_module_1.productModel.findById(productId);
        if (!vendorProduct) {
            createResponse(res, 404, false, "This product is not available");
            return;
        }
        if (vendorProduct.stock < quantity) {
            createResponse(res, 404, false, "Not enough stock available");
            return;
        }
        let userShopping = yield user_module_1.default.findOne({ userId, productId });
        if (userShopping) {
            userShopping.quantity += quantity;
        }
        else {
            userShopping = new user_module_1.default({ userId, productId, quantity });
        }
        yield userShopping.save();
        vendorProduct.stock -= quantity;
        yield vendorProduct.save();
        createResponse(res, 200, true, "Successfully product added", userShopping);
    }
    catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.addShoppingCard = addShoppingCard;
const deleteShoppingCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = req.params.id;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const deleteShoppingCard = yield user_module_1.default.findOneAndDelete({ _id: id, userId });
        createResponse(res, 200, true, "Successfully product Shopping Card Deleted", deleteShoppingCard);
    }
    catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.deleteShoppingCard = deleteShoppingCard;
const UpdateShoppingCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = req.params.id;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const { productId, quantity } = req.body;
        const product = yield vendor_module_1.productModel.findOne({ _id: productId });
        if (product) {
            product.stock += quantity;
            yield product.save();
        }
        const deleteShoppingCard = yield user_module_1.default.findOne({ _id: id, userId, productId });
        if (!deleteShoppingCard) {
            createResponse(res, 404, false, "Item not found in cart");
            return;
        }
        if (deleteShoppingCard.quantity <= quantity) {
            const deleteCart = yield user_module_1.default.deleteOne({ userId, productId });
            createResponse(res, 200, true, "Item removed from cart", deleteCart);
        }
        else {
            deleteShoppingCard.quantity -= quantity;
            yield deleteShoppingCard.save();
        }
        createResponse(res, 200, true, "Successfully product Shopping Card Updated", deleteShoppingCard);
    }
    catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.UpdateShoppingCard = UpdateShoppingCard;
const addRatingReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = req.params.id;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const { rating, review } = req.body;
        const productCart = yield user_module_1.default.findOne({ productId: id, userId });
        const productReview = yield vendor_module_1.productReviewModel.findOne({ userId, productId: id });
        if (rating < 1 || rating > 5) {
            createResponse(res, 404, false, "Rating must be between 1 and 5");
            return;
        }
        const addReview = new vendor_module_1.productReviewModel({ productId: id, userId, review, rating });
        yield addReview.save();
        createResponse(res, 200, true, "product Review and rating added", addReview);
    }
    catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.addRatingReviews = addRatingReviews;
const deleteRatingReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = req.params.id;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const deleteRateAndReview = yield vendor_module_1.productReviewModel.findOneAndDelete({ _id: id, userId });
        createResponse(res, 200, true, "product Review and rating deleted", deleteRateAndReview);
    }
    catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.deleteRatingReviews = deleteRatingReviews;
const updateRatingReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = req.params.id;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const { rating, review } = req.body;
        const updateRating = yield vendor_module_1.productReviewModel.findOneAndUpdate({ _id: id, userId }, { rating, review }, { new: true });
        createResponse(res, 200, true, "product Review and rating update", updateRating);
    }
    catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.updateRatingReviews = updateRatingReviews;
//# sourceMappingURL=user.collection.js.map