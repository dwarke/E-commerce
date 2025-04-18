"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    category: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const categoryModel = (0, mongoose_1.model)('adminCategory', categorySchema);
exports.default = categoryModel;
//# sourceMappingURL=admin.module.js.map