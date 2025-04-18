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
exports.placeOrder = void 0;
const order_module_1 = require("../order/order.module");
const product_module_1 = require("../../vendor/product/product.module");
const cart_module_1 = __importDefault(require("../shoppingCart/cart.module"));
const mongoose_1 = __importDefault(require("mongoose"));
const placeOrder = (userId, userAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
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
                    _id: 1,
                    productId: "$productDetails._id",
                    name: "$productDetails.name",
                    price: "$productDetails.price",
                    quantity: 1,
                    subtotal: { $multiply: ["$quantity", "$productDetails.price"] }
                }
            }
        ]);
        if (!cartItems.length) {
            throw new Error("Your shopping cart is empty.");
        }
        const totalAmount = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
        const order = new order_module_1.userOrderModel({
            userId,
            cartId: cartItems.map(item => item._id),
            userAddress,
            totalAmount
        });
        yield order.save({ session });
        for (const item of cartItems) {
            yield product_module_1.productModel.updateOne({ _id: item.productId }, { $inc: { stock: -item.quantity } }, { session });
        }
        yield cart_module_1.default.deleteMany({ userId }, { session });
        yield session.commitTransaction();
        session.endSession();
        return { message: "Order placed successfully", order };
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
exports.placeOrder = placeOrder;
//# sourceMappingURL=order.server.js.map