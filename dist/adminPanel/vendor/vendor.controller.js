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
exports.vendorProducts = exports.vendorProductStatus = exports.vendorAllProducts = exports.vendorApprove = exports.viewAllVendor = void 0;
const auth_module_1 = __importDefault(require("../../vendorPanel/auth/auth.module"));
const responseHandler_1 = require("../../responseHandler");
const product_module_1 = require("../../vendorPanel/product/product.module");
const order_module_1 = require("../../user/order/order.module");
const auth_module_2 = __importDefault(require("../../vendorPanel/auth/auth.module"));
const viewAllVendor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendors = yield auth_module_2.default.find({ role: 'vendor' }).sort({ 'createdAt': -1 });
        (0, responseHandler_1.createResponse)(res, 200, true, "All Vendors", vendors);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.viewAllVendor = viewAllVendor;
const vendorApprove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const vendorRole = yield auth_module_1.default.findOne({ _id: id, role: 'vendor' });
        console.log("vendor---------", vendorRole);
        if (!vendorRole) {
            (0, responseHandler_1.createResponse)(res, 400, false, "User are not Exist");
            return;
        }
        ;
        if (status === 'approve') {
            const vendorStatus = yield auth_module_1.default.findOneAndUpdate({ _id: id }, { status }, { new: true });
            (0, responseHandler_1.createResponse)(res, 200, true, "Appointment Approved", vendorStatus);
            return;
        }
        ;
        if (status === 'reject') {
            const vendorStatus = yield auth_module_1.default.findOneAndDelete({ _id: id }, { status });
            (0, responseHandler_1.createResponse)(res, 200, true, "Appointment rejected", vendorStatus);
            return;
        }
        ;
        if (status != 'approve' && 'reject') {
            (0, responseHandler_1.createResponse)(res, 400, false, "You only have two options in the status: approve and reject");
            return;
        }
        ;
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.vendorApprove = vendorApprove;
const vendorAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_module_1.productModel.find({}).sort({ 'createdAt': -1 });
        (0, responseHandler_1.createResponse)(res, 200, true, "All Products", products);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.vendorAllProducts = vendorAllProducts;
const vendorProductStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const vendorProduct = yield product_module_1.productModel.findOneAndUpdate({ _id: id }, { status }, { new: true });
        (0, responseHandler_1.createResponse)(res, 200, true, `this Product are ${status} `, vendorProduct);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.vendorProductStatus = vendorProductStatus;
const vendorProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield order_module_1.userOrderModel.aggregate([
            {
                $unwind: '$products'
            },
            {
                $addFields: {
                    totalSales: "$products.quantity",
                }
            },
            {
                $group: {
                    _id: '$products.productId',
                    vendorId: { $first: '$products.vendorId' },
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
                    vendorId: 1,
                    productId: '$_id',
                    name: 1,
                    description: 1,
                    price: 1,
                    category: 1,
                    images: 1,
                    totalSales: 1,
                    totalAmount: 1
                }
            }
        ]);
        const overallTotals = products.reduce((acc, product) => {
            acc.totalQuantity += product.totalSales;
            acc.totalRevenue += product.totalAmount;
            return acc;
        }, { totalQuantity: 0, totalRevenue: 0 });
        (0, responseHandler_1.createResponse)(res, 200, true, "All product Sales", { revenue: overallTotals, products });
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
    ;
});
exports.vendorProducts = vendorProducts;
//# sourceMappingURL=vendor.controller.js.map