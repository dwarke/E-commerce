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
exports.viewProductRating = void 0;
const product_module_1 = require("../product/product.module");
const responseHandler_1 = require("../../responseHandler");
const mongoose_1 = __importDefault(require("mongoose"));
const viewProductRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const product = yield product_module_1.productModel.aggregate([
            {
                $match: {
                    vendorId: new mongoose_1.default.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: "productreviews",
                    localField: "_id",
                    foreignField: "productId",
                    as: "productRating"
                }
            },
            {
                $unwind: "$productRating"
            },
            {
                $group: {
                    _id: "$_id",
                    name: { $first: '$name' },
                    ratingAndReview: {
                        $push: {
                            userId: '$productRating.userId',
                            rating: '$productRating.rating',
                            review: '$productRating.review',
                        }
                    }
                }
            },
        ]);
        (0, responseHandler_1.createResponse)(res, 200, true, "All products Rating", product);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.viewProductRating = viewProductRating;
//# sourceMappingURL=rating.controller.js.map