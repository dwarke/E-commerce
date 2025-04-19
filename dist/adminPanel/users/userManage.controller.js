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
exports.adminVieWFeedback = exports.adminUserOrderView = exports.adminUserUpdate = exports.adminUserBlocked = exports.adminUserBlockUnblock = void 0;
const auth_module_1 = __importDefault(require("../../vendorPanel/auth/auth.module"));
const order_module_1 = require("../../user/order/order.module");
const responseHandler_1 = require("../../responseHandler");
const feedback_module_1 = require("../../user/feedback/feedback.module");
const adminUserBlockUnblock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params._id;
        const user = yield auth_module_1.default.findOne({ _id: id });
        if (!user) {
            (0, responseHandler_1.createResponse)(res, 400, true, "Invalid User");
            return;
        }
        if (user.isBlocked === false) {
            user.isBlocked = true;
            yield user.save();
            (0, responseHandler_1.createResponse)(res, 200, true, "User are Successfully Blocked", user);
        }
        else {
            user.isBlocked = false;
            yield user.save();
            (0, responseHandler_1.createResponse)(res, 200, true, "User are Successfully UnBlocked", user);
        }
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.adminUserBlockUnblock = adminUserBlockUnblock;
const adminUserBlocked = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userBlocked = yield auth_module_1.default.find({ isBlocked: true });
        (0, responseHandler_1.createResponse)(res, 200, true, "This users are Blocked", userBlocked);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.adminUserBlocked = adminUserBlocked;
const adminUserUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { name, email, address, phone, role } = req.body;
        const profileUpdate = yield auth_module_1.default.findOneAndUpdate({ _id: id }, { name, email, address, phone, role }, { new: true });
        (0, responseHandler_1.createResponse)(res, 200, true, "User Profile Successfully Updated", profileUpdate);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.adminUserUpdate = adminUserUpdate;
const adminUserOrderView = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userOrderData = yield order_module_1.userOrderModel.aggregate([
            {
                $unwind: '$products'
            },
            {
                $group: {
                    _id: {
                        productId: '$products.productId',
                        name: '$products.name',
                        userId: '$userId'
                    },
                    quantity: { $sum: '$products.quantity' },
                    totalAmount: { $sum: '$products.totalPrice' },
                    description: { $first: '$products.description' },
                    images: { $first: '$products.images' },
                    category: { $first: '$products.category' },
                }
            },
            {
                $group: {
                    _id: '$_id.userId',
                    userId: { $first: '$_id.userId' },
                    products: {
                        $push: {
                            productId: '$_id.productId',
                            name: '$_id.name',
                            quantity: '$quantity',
                            totalAmount: '$totalAmount',
                            description: '$description',
                            images: '$images',
                            category: '$category'
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
        ]);
        console.log("userOrderData--------", userOrderData);
        (0, responseHandler_1.createResponse)(res, 200, true, "All users Order List", userOrderData);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
    ;
});
exports.adminUserOrderView = adminUserOrderView;
const adminVieWFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alreadyFeedBack = yield feedback_module_1.feedbackModel.find({});
        (0, responseHandler_1.createResponse)(res, 200, true, "All Website`s Feedback", alreadyFeedBack);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
    ;
});
exports.adminVieWFeedback = adminVieWFeedback;
//# sourceMappingURL=userManage.controller.js.map