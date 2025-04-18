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
exports.checkAuthorization = exports.createToken = void 0;
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
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        const user = { _id: String(decoded._id), email: decoded.email };
        req.user = user;
        next();
    }
    catch (error) {
        console.log('checkAuth : error', error);
        throw error;
    }
});
exports.checkAuthorization = checkAuthorization;
//# sourceMappingURL=auth.middleware.js.map