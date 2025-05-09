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
exports.getWebsiteFeedback = exports.vendorProductReport = void 0;
const order_module_1 = require("../../user/order/order.module");
const responseHandler_1 = require("../../responseHandler");
const mongoose_1 = __importDefault(require("mongoose"));
const feedback_module_1 = require("../../user/feedback/feedback.module");
const vendorProductReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const products = yield order_module_1.userOrderModel.aggregate([
            {
                $unwind: "$products"
            },
            {
                $match: { "products.vendorId": new mongoose_1.default.Types.ObjectId(userId) }
            },
            {
                $addFields: {
                    totalSales: "$products.quantity",
                    totalAmount: "$products.totalPrice",
                }
            },
            {
                $group: {
                    _id: '$products.productId',
                    name: { $first: '$products.name' },
                    description: { $first: '$products.description' },
                    price: { $first: '$products.price' },
                    category: { $first: '$products.category' },
                    images: { $first: '$products.images' },
                    totalSales: { $sum: "$totalSales" },
                    totalAmount: { $sum: "$totalAmount" },
                }
            },
            {
                $project: {
                    _id: 0,
                    productId: '$_id',
                    name: 1,
                    description: 1,
                    price: 1,
                    category: 1,
                    images: 1,
                    totalSales: 1,
                    totalAmount: 1,
                }
            }
        ]);
        const overallTotals = products.reduce((acc, product) => {
            acc.totalQuantity += product.totalSales;
            acc.totalRevenue += product.totalAmount;
            return acc;
        }, { totalQuantity: 0, totalRevenue: 0 });
        (0, responseHandler_1.createResponse)(res, 200, true, "All products report", { revenue: overallTotals, products });
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.vendorProductReport = vendorProductReport;
const getWebsiteFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alreadyFeedBack = yield feedback_module_1.feedbackModel.find([
            {
                $lookup: {
                    from: "userregisters",
                    localField: "userId",
                    foreignField: "_id",
                    as: "usersDetails"
                }
            },
            {
                $unwind: '$usersDetails'
            },
            {
                $project: {
                    _id: 0,
                    userId: 1,
                    feedback: 1,
                    name: '$usersDetails.name',
                    address: '$usersDetails.address',
                    phone: '$usersDetails.phone',
                    profile: '$usersDetails.profile',
                }
            }
        ]);
        (0, responseHandler_1.createResponse)(res, 200, true, "All Website`s Feedback", alreadyFeedBack);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.getWebsiteFeedback = getWebsiteFeedback;
//# sourceMappingURL=report.controller.js.map