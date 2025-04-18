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
const mongoose_1 = __importDefault(require("mongoose"));
const auth_module_1 = __importDefault(require("./adminPanel/auth/auth.module"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db = mongoose_1.default.connect('mongodb://127.0.0.1:27017/E-Commerce-API-task', {})
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    const adminData = { name: 'nisha', email: 'nisha@gmail.com', password: '123', phone: '1234567891', address: 'dfgsfgfsd', genderCategory: 'female' };
    const exist = yield auth_module_1.default.findOne({ email: adminData.email });
    if (exist) {
        console.log('admin already exist!');
        return;
    }
    const saltRouter = 10;
    const hashPassword = yield bcryptjs_1.default.hash(adminData.password, saltRouter);
    const user = new auth_module_1.default({ role: 'admin', name: adminData.name, email: adminData.email, password: hashPassword, phone: adminData.phone, address: adminData.address, genderCategory: adminData.genderCategory });
    yield user.save();
    console.log('DB connect');
}))
    .catch((err) => console.log(err));
exports.default = db;
//# sourceMappingURL=db.js.map