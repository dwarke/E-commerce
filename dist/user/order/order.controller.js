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
exports.getOrders = exports.addOrder = void 0;
const order_module_1 = require("./order.module");
const cart_module_1 = __importDefault(require("../../user/shoppingCart/cart.module"));
const mongoose_1 = __importDefault(require("mongoose"));
const product_module_1 = require("../../vendorPanel/product/product.module");
const auth_module_1 = __importDefault(require("../../vendorPanel/auth/auth.module"));
const responseHandler_1 = require("../../responseHandler");
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        console.log(userId);
        const users = yield auth_module_1.default.findOne({ _id: userId });
        const { userAddress } = req.body;
        const cartItems = yield cart_module_1.default.aggregate([
            { $match: { userId: new mongoose_1.default.Types.ObjectId(userId) } },
            {
                $lookup: {
                    from: "vendorproducts",
                    localField: "productId",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            { $unwind: "$productDetails" },
            {
                $project: {
                    cartId: { $toString: "$_id" },
                    productId: "$productDetails._id",
                    name: "$productDetails.name",
                    description: "$productDetails.description",
                    price: "$productDetails.price",
                    stock: "$productDetails.stock",
                    images: "$productDetails.images",
                    category: "$productDetails.category",
                    quantity: 1,
                    vendorId: "$productDetails.vendorId",
                    totalPrice: { $multiply: ["$quantity", "$productDetails.price"] }
                }
            }
        ]);
        if (!cartItems.length) {
            (0, responseHandler_1.createResponse)(res, 400, false, "Cart is empty!");
            return;
        }
        const totalAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
        for (const item of cartItems) {
            if (item.quantity > item.stock) {
                (0, responseHandler_1.createResponse)(res, 400, false, `Insufficient stock for ${item.name}`);
                return;
            }
        }
        ;
        const user = yield auth_module_1.default.findById(userId).select("email name");
        if (!user) {
            (0, responseHandler_1.createResponse)(res, 400, false, "user not login");
            return;
        }
        ;
        const newOrder = new order_module_1.userOrderModel({
            userId,
            userName: users === null || users === void 0 ? void 0 : users.name,
            userAddress,
            products: cartItems,
            totalAmount,
        });
        yield newOrder.save();
        for (const item of cartItems) {
            yield product_module_1.productModel.updateOne({ _id: item.productId }, { $inc: { stock: -item.quantity } }, { new: true });
        }
        ;
        const vendorMap = {};
        cartItems.forEach(item => {
            const vendorId = item.vendorId.toString();
            if (!vendorMap[vendorId]) {
                vendorMap[vendorId] = [];
            }
            vendorMap[vendorId].push({
                productId: item.productId,
                quantity: item.quantity
            });
        });
        yield cart_module_1.default.deleteMany({ userId });
        (0, responseHandler_1.createResponse)(res, 200, true, "Order placed successfully!", newOrder);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.addOrder = addOrder;
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        console.log("userId-----", userId);
        const allOrder = yield order_module_1.userOrderModel.find({ userId });
        console.log("userId-----", allOrder);
        (0, responseHandler_1.createResponse)(res, 200, true, "All Your Orders", allOrder);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.getOrders = getOrders;
//# sourceMappingURL=order.controller.js.map