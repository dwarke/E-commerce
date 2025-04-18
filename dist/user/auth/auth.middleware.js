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
exports.userBlocked = exports.checkAuthorization = exports.createToken = void 0;
const auth_module_1 = __importDefault(require("../../vendorPanel/auth/auth.module"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = "Kaz5rw9hEwnEPP8m";
const createToken = (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
    };
    console.log(payload);
    return jsonwebtoken_1.default.sign(payload, secretKey);
};
exports.createToken = createToken;
const checkAuthorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            console.log('token not found');
            res.json({ msg: "token not found" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        const user = { _id: String(decoded._id), email: decoded.email };
        req.user = user;
        console.log("user---", user);
        next();
    }
    catch (error) {
        console.log('checkAuth : error', error);
        res.json({ msg: "checkAuth : error", error });
        throw error;
    }
});
exports.checkAuthorization = checkAuthorization;
const userBlocked = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const user = yield auth_module_1.default.findOne({ _id: userId });
    if ((user === null || user === void 0 ? void 0 : user.isBlocked) === false) {
        next();
    }
    else {
        res.json({ msg: "This User Are Blocked" });
        return;
    }
});
exports.userBlocked = userBlocked;
//# sourceMappingURL=auth.middleware.js.map