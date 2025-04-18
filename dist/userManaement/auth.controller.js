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
exports.logout = exports.resetPassword = exports.forgotPassword = exports.login = exports.register = void 0;
const auth_module_1 = __importDefault(require("./auth.module"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_middleware_1 = require("./auth.middleware");
const crypto_1 = __importDefault(require("crypto"));
function createResponse(res, statusCode, success, message, data, error) {
    const response = {
        success, message, data, error
    };
    return res.status(statusCode).json(response);
}
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, phone, address, role } = req.body;
        const exist = yield auth_module_1.default.findOne({ email });
        if (exist) {
            createResponse(res, 400, false, "User is Already Exist");
            return;
        }
        const saltRouter = 10;
        const hashPassword = yield bcryptjs_1.default.hash(password, saltRouter);
        const user = new auth_module_1.default({ name, email, password: hashPassword, role, phone, address });
        yield user.save();
        createResponse(res, 200, true, "Successfully Register", user);
    }
    catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, error.message);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const data = yield auth_module_1.default.findOne({ email });
        if (!data) {
            createResponse(res, 400, false, "User is not Exist");
            return;
        }
        const comparePassword = yield bcryptjs_1.default.compare(password, data.password);
        if (!comparePassword)
            createResponse(res, 404, false, "In valid password");
        else {
            const userObj = data.toObject();
            const token = (0, auth_middleware_1.createToken)({ _id: String(userObj._id), email: userObj.email });
            createResponse(res, 200, true, "You are Login", token);
        }
    }
    catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, error.message);
    }
});
exports.login = login;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield auth_module_1.default.findOne({ email });
        if (!user) {
            createResponse(res, 404, false, "User is not Found");
            return;
        }
        const resetToken = crypto_1.default.randomBytes(32).toString('hex');
        const expiredAt = Date.now() + 36000000;
        user.token = resetToken;
        user.resetToken = String(expiredAt);
        yield user.save();
        createResponse(res, 200, true, "Pleas Reset password You are able", { token: resetToken, expiredAt });
    }
    catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, error.message);
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
            createResponse(res, 404, false, "Invalid or expired token");
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
            createResponse(res, 200, true, "password is changed", user);
        }
        createResponse(res, 400, false, "Your old password and New password Both are same");
    }
    catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, error.message);
    }
});
exports.resetPassword = resetPassword;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = req.header('Authorization');
        const logout = yield auth_module_1.default.findByIdAndUpdate({ _id: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }, { $pull: { token: token } });
        if (!logout) {
            createResponse(res, 404, false, "Invalid or expired token");
            return;
        }
        logout.token = undefined;
        createResponse(res, 200, true, "Logged out successfully", logout);
    }
    catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, error.message);
    }
});
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map