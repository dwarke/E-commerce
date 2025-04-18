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
exports.viewProduct = exports.updateProduct = exports.deleteProduct = exports.addProduct = void 0;
const vendor_module_1 = require("./vendor.module");
const admin_module_1 = __importDefault(require("../admin/admin.module"));
function createResponse(res, statusCode, success, message, data, error) {
    const response = {
        success, message, data, error
    };
    return res.status(statusCode).json(response);
}
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const { name, description, price, stock, category } = req.body;
        const images = req.file ? req.file.path : null;
        const adminCategory = yield admin_module_1.default.findOne({ category });
        if (!adminCategory) {
            createResponse(res, 404, false, "Category not available");
            return;
        }
        const product = new vendor_module_1.productModel({ vendorId: userId, name, description, price, stock, category, images });
        yield product.save();
        createResponse(res, 200, true, "Successfully product added", product);
    }
    catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.addProduct = addProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const product = yield vendor_module_1.productModel.findOneAndDelete({ _id: id });
        createResponse(res, 200, true, "Successfully product Deleted", product);
    }
    catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.deleteProduct = deleteProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { name, description, price, stock, category } = req.body;
        const existingProduct = yield vendor_module_1.productModel.findById(id);
        if (!existingProduct) {
            createResponse(res, 404, false, "Product not found");
            return;
        }
        let images = req.file ? req.file.path : existingProduct.images;
        const adminCategory = yield admin_module_1.default.findOne({ category });
        if (category) {
            if (!adminCategory) {
                createResponse(res, 404, false, "Category not available");
                return;
            }
        }
        const productUpdate = yield vendor_module_1.productModel.findByIdAndUpdate({ _id: id }, { name, description, price, stock, category, images }, { new: true });
        createResponse(res, 200, true, "Successfully product Updated", productUpdate);
    }
    catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.updateProduct = updateProduct;
const viewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const productView = yield vendor_module_1.productModel.find({ userId });
        createResponse(res, 200, true, "your order All product", productView);
    }
    catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.viewProduct = viewProduct;
//# sourceMappingURL=vendor.controller.js.map