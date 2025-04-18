"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryModel = void 0;
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    category: {
        type: String,
        required: true,
    },
}, { timestamps: true, versionKey: false });
exports.categoryModel = (0, mongoose_1.model)('adminCategory', categorySchema);
//# sourceMappingURL=category.module.js.map