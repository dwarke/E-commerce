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
exports.salesReport = void 0;
const order_module_1 = require("../../user/order/order.module");
const responseHandler_1 = require("../../responseHandler");
const salesReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { daily, weekly, monthly } = req.body;
        const pipeline = [];
        pipeline.push({ $unwind: "$products" });
        pipeline.push({
            $group: {
                _id: "$products.productId",
                productId: { $first: "$products.productId" },
                totalQuantitySold: { $sum: "$products.quantity" },
                totalSalesAmount: { $sum: "$products.totalPrice" },
                createdAt: { $first: "$createdAt" }
            }
        });
        if (daily) {
            pipeline.push({
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    totalSalesQuantity: { $sum: "$totalQuantitySold" },
                    totalSalesAmount: { $sum: '$totalSalesAmount' }
                }
            });
        }
        else if (weekly) {
            pipeline.push({
                $group: {
                    _id: { $dateToString: { format: "%Y-%U", date: "$createdAt" } },
                    totalSalesQuantity: { $sum: "$totalQuantitySold" },
                    totalSalesAmount: { $sum: '$totalSalesAmount' }
                }
            });
        }
        else if (monthly) {
            pipeline.push({
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    totalSalesQuantity: { $sum: "$totalQuantitySold" },
                    totalSalesAmount: { $sum: '$totalSalesAmount' }
                }
            });
        }
        else {
            pipeline.push({
                $lookup: {
                    from: "vendorproducts",
                    localField: "_id",
                    foreignField: "_id",
                    as: "productDetails"
                }
            }, { $unwind: "$productDetails" }, {
                $project: {
                    _id: 0,
                    productId: "$_id",
                    name: "$productDetails.name",
                    price: "$productDetails.price",
                    totalQuantitySold: 1,
                    totalSalesAmount: 1,
                    createdAt: 1
                }
            }, { $sort: { totalQuantitySold: -1 } });
        }
        ;
        const products = yield Promise.all([
            order_module_1.userOrderModel.aggregate(pipeline),
        ]);
        (0, responseHandler_1.createResponse)(res, 200, true, "Vendor`s Product Sales", products);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.salesReport = salesReport;
//# sourceMappingURL=report.controller.js.map