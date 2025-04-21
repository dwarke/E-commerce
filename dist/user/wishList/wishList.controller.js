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
exports.getWishlist = exports.addWishlist = void 0;
const wishList_module_1 = require("./wishList.module");
const product_module_1 = require("../../vendorPanel/product/product.module");
const responseHandler_1 = require("../../responseHandler");
const auth_module_1 = __importDefault(require("../../vendorPanel/auth/auth.module"));
const mongoose_1 = __importDefault(require("mongoose"));
const addWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = req.params.id;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const product = yield product_module_1.productModel.findOne({ _id: id, status: 'approve' });
        const vendorProduct = yield auth_module_1.default.findOne({ _id: product === null || product === void 0 ? void 0 : product.vendorId, isBlocked: false });
        if (!product || !vendorProduct) {
            (0, responseHandler_1.createResponse)(res, 404, false, "product Are not exist");
            return;
        }
        const wishlist = yield wishList_module_1.userWishlistModel.findOne({ userId });
        if (!wishlist) {
            const userWishlist = new wishList_module_1.userWishlistModel({ userId, productId: id });
            yield userWishlist.save();
            (0, responseHandler_1.createResponse)(res, 200, true, "product are added wishlist", userWishlist);
            return;
        }
        const userWishlist = yield wishList_module_1.userWishlistModel.findOne({ userId, productId: id });
        if (userWishlist) {
            const userWishlistUnLike = yield wishList_module_1.userWishlistModel.findOneAndUpdate({ userId, productId: id }, { $pull: { productId: id } }, { new: true });
            (0, responseHandler_1.createResponse)(res, 200, true, "product are remove wishlist", userWishlistUnLike);
            return;
        }
        if (!userWishlist) {
            const userWishlistLike = yield wishList_module_1.userWishlistModel.findOneAndUpdate({ userId }, { $push: { productId: id } }, { new: true });
            (0, responseHandler_1.createResponse)(res, 200, true, "product are remove wishlist", userWishlistLike);
            return;
        }
        yield wishList_module_1.userWishlistModel.deleteOne({ userId, productId: [] });
        (0, responseHandler_1.createResponse)(res, 200, true, "All remove Wishlist Products");
        return;
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.addWishlist = addWishlist;
const getWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const aggregation = [
            {
                $match: { userId: new mongoose_1.default.Types.ObjectId(userId) }
            },
            { $unwind: "$productId" },
            {
                $lookup: {
                    from: 'vendorproducts',
                    localField: "productId",
                    foreignField: "_id",
                    as: 'productDetails'
                }
            },
            { $unwind: "$productDetails" },
            {
                $group: {
                    _id: "$userId",
                    userId: { $first: "$userId" },
                    products: {
                        $push: {
                            productId: "$productId",
                            name: "$productDetails.name",
                            category: "$productDetails.category",
                            image: "$productDetails.images",
                            description: "$productDetails.description",
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    userId: 1,
                    products: 1
                }
            }
        ];
        const showWishlist = yield wishList_module_1.userWishlistModel.aggregate(aggregation);
        (0, responseHandler_1.createResponse)(res, 200, true, "Your All wishlist", showWishlist);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.getWishlist = getWishlist;
//# sourceMappingURL=wishList.controller.js.map