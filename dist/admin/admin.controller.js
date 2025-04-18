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
exports.adminAddCategory = exports.adminVendorApprove = void 0;
const auth_module_1 = __importDefault(require("../authManagement/auth.module"));
const admin_module_1 = __importDefault(require("./admin.module"));
function createResponse(res, statusCode, success, message, data, error) {
    const response = {
        success, message, data, error
    };
    return res.status(statusCode).json(response);
}
const adminVendorApprove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const vendorRole = yield auth_module_1.default.findOne({ _id: id, role: 'vendor' });
        console.log("vendor---------", vendorRole);
        if (!vendorRole) {
            createResponse(res, 400, false, "User are not Exist");
            return;
        }
        ;
        if (status === 'approve') {
            const vendorStatus = yield auth_module_1.default.findOneAndUpdate({ _id: id }, { status }, { new: true });
            createResponse(res, 200, true, "Appointment Approved", vendorStatus);
        }
        if (status === 'reject') {
            const vendorStatus = yield auth_module_1.default.findOneAndDelete({ _id: id }, { status });
            createResponse(res, 200, true, "Appointment rejected", vendorStatus);
        }
        if (status != 'approve' && 'reject') {
            createResponse(res, 400, false, "You only have two options in the status: approve and reject");
        }
    }
    catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.adminVendorApprove = adminVendorApprove;
const adminAddCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.body;
        const categoryList = new admin_module_1.default({ category });
        yield categoryList.save();
        createResponse(res, 200, true, "Successfully category Added", categoryList);
    }
    catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.adminAddCategory = adminAddCategory;
//# sourceMappingURL=admin.controller.js.map