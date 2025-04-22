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
exports.getShoppingCard = exports.deleteShoppingCard = exports.addShoppingCard = void 0;
const product_module_1 = require("../../vendorPanel/product/product.module");
const cart_module_1 = __importDefault(require("./cart.module"));
const responseHandler_1 = require("../../responseHandler");
const auth_module_1 = __importDefault(require("../../vendorPanel/auth/auth.module"));
const category_module_1 = require("../../adminPanel/category/category.module");
const addShoppingCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        console.log(userId);
        const { productId, quantity } = req.body;
        const product = yield product_module_1.productModel.findOne({ _id: productId, status: 'approve' });
        const vendorProduct = yield auth_module_1.default.findOne({ _id: product === null || product === void 0 ? void 0 : product.vendorId, isBlocked: false });
        if (!product || !vendorProduct) {
            (0, responseHandler_1.createResponse)(res, 404, false, "product Are not exist");
            return;
        }
        const shoppingCart = yield cart_module_1.default.findOne({ productId, userId });
        console.log("shoppingCart-----", shoppingCart);
        if (shoppingCart) {
            const shoppingCartAdded = yield cart_module_1.default.findOneAndUpdate({ userId, productId }, { $inc: { quantity: quantity } }, { new: true });
            (0, responseHandler_1.createResponse)(res, 200, true, "Product Are Updated", shoppingCartAdded);
            return;
        }
        const shoppingCartAdded = new cart_module_1.default({ userId, productId, quantity });
        yield shoppingCartAdded.save();
        (0, responseHandler_1.createResponse)(res, 200, true, "Successfully product added", shoppingCartAdded);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.addShoppingCard = addShoppingCard;
const deleteShoppingCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = req.params.id;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const deleteShoppingCard = yield cart_module_1.default.findOneAndDelete({ _id: id, userId });
        (0, responseHandler_1.createResponse)(res, 200, true, "Your Card Deleted", deleteShoppingCard);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.deleteShoppingCard = deleteShoppingCard;
const getShoppingCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const category = yield category_module_1.categoryModel.find({});
        const productView = yield product_module_1.productModel.find({ category: category.map((a) => a._id) });
        console.log("productView-----", productView);
        const getCart = yield cart_module_1.default.find({ userId, productId: productView.map((p) => p._id) });
        console.log("getCart-----", getCart);
        if (!getCart) {
            (0, responseHandler_1.createResponse)(res, 404, false, "Cart are not exist!");
            return;
        }
        ;
        (0, responseHandler_1.createResponse)(res, 200, true, "All your Shopping Carts", getCart);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.getShoppingCard = getShoppingCard;
//# sourceMappingURL=cart.controller.js.map