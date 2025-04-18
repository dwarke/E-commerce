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
exports.vendorRole = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uploadDir = path_1.default.join(__dirname, '../../../uploads');
const auth_module_1 = __importDefault(require("../../authManagement/auth.module"));
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});
exports.upload = (0, multer_1.default)({ storage: storage });
const vendorRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const roleData = yield auth_module_1.default.findOne({ _id: data });
    if (!roleData) {
        console.log('data not found');
        return;
    }
    if (roleData.role === 'admin' || 'vendor') {
        next();
    }
    else {
        res.json({ msg: "You are note admin or vendor so Don`t view all data" });
        return;
    }
});
exports.vendorRole = vendorRole;
//# sourceMappingURL=product.middleware.js.map