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
exports.profile = exports.logout = exports.resetPassword = exports.forgotPassword = exports.login = exports.register = void 0;
const auth_module_1 = __importDefault(require("../../vendorPanel/auth/auth.module"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_middleware_1 = require("../../adminPanel/auth/auth.middleware");
const crypto_1 = __importDefault(require("crypto"));
const responseHandler_1 = require("../../responseHandler");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, phone, address, genderCategory } = req.body;
        const exist = yield auth_module_1.default.findOne({ email });
        if (exist) {
            (0, responseHandler_1.createResponse)(res, 400, false, "User is Already Exist");
            return;
        }
        const saltRouter = 10;
        const hashPassword = yield bcryptjs_1.default.hash(password, saltRouter);
        const role = 'user';
        const user = new auth_module_1.default({ name, email, password: hashPassword, role, phone, address, genderCategory });
        yield user.save();
        (0, responseHandler_1.createResponse)(res, 200, true, "Successfully Register", user);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const data = yield auth_module_1.default.findOne({ email });
        if (!data) {
            (0, responseHandler_1.createResponse)(res, 400, false, "User is not Exist");
            return;
        }
        const comparePassword = yield bcryptjs_1.default.compare(password, data.password);
        if (!comparePassword)
            (0, responseHandler_1.createResponse)(res, 404, false, "In valid password");
        if (data.role === 'vendor') {
            if (data.status === 'approve') {
                const userObj = data.toObject();
                const token = (0, auth_middleware_1.createToken)({ _id: String(userObj._id), email: userObj.email });
                (0, responseHandler_1.createResponse)(res, 200, true, "You are Login", token);
                return;
            }
            (0, responseHandler_1.createResponse)(res, 404, false, "vendor is not approve");
            return;
        }
        else {
            const userObj = data.toObject();
            const token = (0, auth_middleware_1.createToken)({ _id: String(userObj._id), email: userObj.email });
            (0, responseHandler_1.createResponse)(res, 200, true, "You are Login", token);
            return;
        }
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.login = login;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield auth_module_1.default.findOne({ email });
        if (!user) {
            (0, responseHandler_1.createResponse)(res, 404, false, "User is not Found");
            return;
        }
        const resetToken = crypto_1.default.randomBytes(32).toString('hex');
        const expiredAt = Date.now() + 36000000;
        user.token = resetToken;
        user.resetToken = String(expiredAt);
        yield user.save();
        (0, responseHandler_1.createResponse)(res, 200, true, "Pleas Reset password You are able", { token: resetToken, expiredAt });
        return;
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, token, newPassword } = req.body;
    console.log(req.body);
    try {
        const user = yield auth_module_1.default.findOne({
            email, token
        });
        if (!user) {
            (0, responseHandler_1.createResponse)(res, 404, false, "Invalid or expired token");
            return;
        }
        const compar = yield bcryptjs_1.default.compare(user.password, newPassword);
        console.log("...compar", compar, typeof compar);
        if (compar === false) {
            const saltRounds = 10;
            user.password = yield bcryptjs_1.default.hash(newPassword, saltRounds);
            console.log(bcryptjs_1.default.hash(newPassword, saltRounds));
            user.token = undefined;
            user.resetToken = undefined;
            yield user.save();
            (0, responseHandler_1.createResponse)(res, 200, true, "password is changed", user);
        }
        (0, responseHandler_1.createResponse)(res, 400, false, "Your old password and New password Both are same");
        return;
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.resetPassword = resetPassword;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = req.header('Authorization');
        const logout = yield auth_module_1.default.findByIdAndUpdate({ _id: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }, { $pull: { token: token } });
        if (!logout) {
            (0, responseHandler_1.createResponse)(res, 404, false, "Invalid or expired token");
            return;
        }
        logout.token = undefined;
        (0, responseHandler_1.createResponse)(res, 200, true, "Logged out successfully", logout);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.logout = logout;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const { name, email, address, genderCategory, phone } = req.body;
        const userUpdate = yield auth_module_1.default.findOneAndUpdate({ _id: userId }, { name, email, address, genderCategory, phone }, { new: true });
        (0, responseHandler_1.createResponse)(res, 200, true, "Logged out successfully", userUpdate);
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
});
exports.profile = profile;
//# sourceMappingURL=auth.controller.js.map