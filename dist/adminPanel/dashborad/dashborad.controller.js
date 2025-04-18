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
exports.adminDashboard = void 0;
const auth_module_1 = __importDefault(require("../../authManagement/auth.module"));
const responseHandler_1 = require("../../responseHandler");
const product_module_1 = require("../../vendor/product/product.module");
const order_module_1 = require("../../user/order/order.module");
const adminDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const productOrder = yield order_module_1.userOrderModel.find({});
        const [dashboard, totalUser, productPer] = yield Promise.all([
            yield order_module_1.userOrderModel.aggregate([
                { $unwind: '$products' },
                {
                    $group: {
                        _id: null,
                        totalSales: { $sum: '$products.quantity' }
                    }
                },
                {
                    $lookup: {
                        from: "vendorproducts",
                        localField: "products.vendorId",
                        foreignField: "vendorId",
                        as: "productDetails"
                    }
                },
                {
                    $project: {
                        _id: 0,
                        totalSales: 1,
                    }
                }
            ]),
            yield auth_module_1.default.aggregate([
                { $match: { createdAt: { $gte: twentyFourHoursAgo } } }
            ]),
            yield product_module_1.productModel.aggregate([
                {
                    $lookup: {
                        from: "vendorproductorders",
                        localField: "_id",
                        foreignField: "productId",
                        as: "productOrders"
                    }
                },
                {
                    $addFields: {
                        avgRating: { $avg: "$reviews.rating" }
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
                        productId: 1,
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
        console.log("productOrder-------------", productOrder);
        console.log("totalUser------", totalUser);
        console.log("productPer------", productPer);
        (0, responseHandler_1.createResponse)(res, 200, true, "All product Sales", {
            dashboard,
            newUsersLastTwentyFourHours: totalUser.length,
            topProducts: productPer
        });
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
    ;
});
exports.adminDashboard = adminDashboard;
//# sourceMappingURL=dashborad.controller.js.map