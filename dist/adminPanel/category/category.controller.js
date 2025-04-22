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
exports.getCategory = exports.deleteCategory = exports.addCategory = void 0;
const category_module_1 = require("./category.module");
const responseHandler_1 = require("../../responseHandler");
const product_module_1 = require("../../vendorPanel/product/product.module");
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.body;
        const categoryList = new category_module_1.categoryModel({ category });
        yield categoryList.save();
        (0, responseHandler_1.createResponse)(res, 200, true, "Successfully category Added", categoryList);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.addCategory = addCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const category = yield category_module_1.categoryModel.findOneAndDelete({ _id: id });
        yield product_module_1.productModel.findOneAndDelete({ category: id });
        (0, responseHandler_1.createResponse)(res, 200, true, "Category deleted", category);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
    ;
});
exports.deleteCategory = deleteCategory;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_module_1.categoryModel.find({});
        (0, responseHandler_1.createResponse)(res, 200, true, "Successfully category Added", category);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
    ;
});
exports.getCategory = getCategory;
//# sourceMappingURL=category.controller.js.map