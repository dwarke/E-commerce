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
exports.userOrderStatus = exports.viewUserOrderList = void 0;
const order_module_1 = require("../../user/order/order.module");
const responseHandler_1 = require("../../responseHandler");
const mongoose_1 = __importDefault(require("mongoose"));
const viewUserOrderList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const vendorId = new mongoose_1.default.Types.ObjectId((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
        const orders = yield order_module_1.userOrderModel.aggregate([
            { $unwind: "$products" },
            {
                $match: {
                    "products.vendorId": vendorId
                }
            },
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
                $group: {
                    _id: {
                        productId: "$products.productId",
                        userId: "$userId",
                        name: "$usersDetails.name",
                        address: "$usersDetails.address",
                        phone: '$usersDetails.phone'
                    },
                    quantity: { $sum: "$products.quantity" },
                    name: { $first: "$products.name" },
                }
            },
            {
                $group: {
                    _id: "$_id.userId",
                    userId: { $first: "$_id.userId" },
                    name: { $first: "$_id.name" },
                    address: { $first: "$_id.address" },
                    phone: { $first: "$_id.phone" },
                    products: {
                        $push: {
                            productId: "$_id.productId",
                            name: "$name",
                            quantity: "$quantity",
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    userId: 1,
                    name: 1,
                    address: 1,
                    phone: 1,
                    products: 1
                }
            }
        ]);
        console.log("orders----------", orders);
        (0, responseHandler_1.createResponse)(res, 200, true, "All Products Order", orders);
        return;
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.viewUserOrderList = viewUserOrderList;
const userOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const userOrder = yield order_module_1.userOrderModel.findOneAndUpdate({ _id: id }, { status });
        (0, responseHandler_1.createResponse)(res, 200, true, "Order Status Update", userOrder);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.userOrderStatus = userOrderStatus;
//# sourceMappingURL=order.controller.js.map