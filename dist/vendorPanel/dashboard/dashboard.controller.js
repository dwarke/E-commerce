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
exports.penalDashboard = void 0;
const order_module_1 = require("../../user/order/order.module");
const product_module_1 = require("../product/product.module");
const responseHandler_1 = require("../../responseHandler");
const mongoose_1 = __importDefault(require("mongoose"));
const penalDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const product = yield product_module_1.productModel.find({ vendorId: userId });
        const [totalProducts, revenue, productPer] = yield Promise.all([
            yield product_module_1.productModel.aggregate([
                {
                    $match: { vendorId: new mongoose_1.default.Types.ObjectId(userId) }
                },
            ]),
            yield order_module_1.userOrderModel.aggregate([
                {
                    $unwind: '$products'
                },
                {
                    $match: { 'products.vendorId': new mongoose_1.default.Types.ObjectId(userId) }
                },
                {
                    $addFields: {
                        totalSales: "$products.quantity",
                    }
                },
                {
                    $group: {
                        _id: {
                            vendorId: '$products.vendorId'
                        },
                        totalSales: { $sum: "$totalSales" },
                        totalAmount: { $sum: "$totalAmount" },
                    }
                },
                {
                    $project: {
                        _id: 0,
                        vendorId: '$_id',
                        totalSales: 1,
                        totalAmount: 1
                    }
                }
            ]),
            yield product_module_1.productModel.aggregate([
                {
                    $match: { vendorId: new mongoose_1.default.Types.ObjectId(userId) }
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
                    $unwind: '$productRating'
                },
                {
                    $addFields: {
                        avgRating: { $avg: "$productRating.rating" }
                    }
                },
                {
                    $addFields: {
                        popularity: {
                            $switch: {
                                branches: [
                                    { case: { $gte: ["$avgRating", 4.5] }, then: "high" },
                                    { case: { $gte: ["$avgRating", 3] }, then: "middle" }
                                ],
                                default: "low"
                            }
                        }
                    }
                },
                {
                    $project: {
                        vendorId: 1,
                        productId: '$_id',
                        name: 1,
                        description: 1,
                        category: 1,
                        images: 1,
                        avgRating: 1,
                        popularity: 1
                    }
                },
                { $sort: { avgRating: -1 } },
                { $limit: 5 }
            ])
        ]);
        const overallTotals = revenue.reduce((acc, product) => {
            acc.totalSale += product.totalSales;
            acc.totalRevenue += product.totalAmount;
            return acc;
        }, { totalSale: 0, totalRevenue: 0 });
        (0, responseHandler_1.createResponse)(res, 200, true, "All Activities", {
            revenue: overallTotals,
            totalProducts: totalProducts.length,
            topProducts: productPer
        });
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        ReadableStreamDefaultController;
    }
});
exports.penalDashboard = penalDashboard;
//# sourceMappingURL=dashboard.controller.js.map