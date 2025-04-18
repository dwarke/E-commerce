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
exports.adminUserOrderView = exports.adminUserUpdate = exports.adminUserBlockUnblock = void 0;
const auth_module_1 = __importDefault(require("../../authManagement/auth.module"));
const order_module_1 = require("../../user/order/order.module");
const responseHandler_1 = require("../../responseHandler");
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
        const id = req.params.id;
        const userOrderData = yield order_module_1.userOrderModel.findOne({ userId: id });
        console.log("userOrderData--------", userOrderData);
        (0, responseHandler_1.createResponse)(res, 200, true, "All users Order List", userOrderData);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.adminUserOrderView = adminUserOrderView;
//# sourceMappingURL=userManage.controller.js.map