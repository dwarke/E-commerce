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
exports.adminSalesReport = void 0;
const order_module_1 = require("../../user/order/order.module");
const responseHandler_1 = require("../../responseHandler");
const adminSalesReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sellingProduct = yield order_module_1.userOrderModel.aggregate([
            {
                $unwind: '$products'
            },
            {
                $group: {
                    _id: "$products.productId",
                    totalSales: { $sum: '$products.quantity' },
                }
            }
        ]);
        (0, responseHandler_1.createResponse)(res, 200, true, "User are Successfully UnBlocked", sellingProduct);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.adminSalesReport = adminSalesReport;
//# sourceMappingURL=report.controller.js.map