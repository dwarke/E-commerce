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
exports.viewProduct = exports.updateProduct = exports.deleteProduct = exports.addProduct = void 0;
const product_module_1 = require("./product.module");
const category_module_1 = require("../../adminPanel/category/category.module");
const responseHandler_1 = require("../../responseHandler");
const BASE_URL = process.env.BASE_URL;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const { name, description, price, stock, category } = req.body;
        const imagePaths = req.files && Array.isArray(req.files)
            ? req.files.map((file) => `${BASE_URL}/images/${file.filename}`)
            : [];
        const adminCategory = yield category_module_1.categoryModel.findOne({ _id: category });
        if (!adminCategory) {
            (0, responseHandler_1.createResponse)(res, 404, false, "Category not available");
            return;
        }
        const product = new product_module_1.productModel({ vendorId: userId, name, description, price, stock, category, images: imagePaths });
        yield product.save();
        (0, responseHandler_1.createResponse)(res, 200, true, "Successfully product added", product);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.addProduct = addProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const product = yield product_module_1.productModel.findOneAndDelete({ _id: id });
        (0, responseHandler_1.createResponse)(res, 200, true, "product are Deleted", product);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.deleteProduct = deleteProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { name, description, price, stock, category } = req.body;
        const existingProduct = yield product_module_1.productModel.findById(id);
        if (!existingProduct) {
            (0, responseHandler_1.createResponse)(res, 404, false, "Product not found");
            return;
        }
        const imagePaths = req.files && Array.isArray(req.files)
            ? req.files.map((file) => `${BASE_URL}/uploads/${file.filename}`)
            : [];
        const adminCategory = yield category_module_1.categoryModel.findOne({ category });
        if (category) {
            if (!adminCategory) {
                (0, responseHandler_1.createResponse)(res, 404, false, "Category not available");
                return;
            }
        }
        const productUpdate = yield product_module_1.productModel.findByIdAndUpdate({ _id: id }, { name, description, price, stock, category, images: imagePaths }, { new: true });
        (0, responseHandler_1.createResponse)(res, 200, true, "Product Successfully Updated", productUpdate);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.updateProduct = updateProduct;
const viewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const category = yield category_module_1.categoryModel.find({});
        const productView = yield product_module_1.productModel.find({ vendorId: userId, category: category.map((a) => a._id) });
        console.log("productView------", productView);
        (0, responseHandler_1.createResponse)(res, 200, true, "All product", productView);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.viewProduct = viewProduct;
//# sourceMappingURL=product.controller.js.map