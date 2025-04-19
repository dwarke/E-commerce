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
exports.userGetProduct = void 0;
const product_module_1 = require("../../vendorPanel/product/product.module");
const mongoose_1 = __importDefault(require("mongoose"));
const responseHandler_1 = require("../../responseHandler");
const userGetProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { vendorId, minPrice, maxPrice, searchWord, category, sortBy, sortOrder, price, page, limit = 10 } = req.body;
        const pageNumber = Math.max(Number(page), 1);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;
        const pipeline = [];
        if (searchWord) {
            pipeline.push({
                $match: { name: { $regex: searchWord, $options: "i" } },
            });
        }
        ;
        if (vendorId) {
            pipeline.push({
                $match: { vendorId: new mongoose_1.default.Types.ObjectId(vendorId) },
            });
        }
        ;
        if (category) {
            pipeline.push({
                $match: { category: new mongoose_1.default.Types.ObjectId(category) },
            });
        }
        ;
        if (price) {
            pipeline.push({
                $match: { price: Number(price) },
            });
        }
        ;
        if (minPrice || maxPrice) {
            const priceFilter = {};
            if (minPrice)
                priceFilter.$gte = Number(minPrice);
            if (maxPrice)
                priceFilter.$lte = Number(maxPrice);
            pipeline.push({ $match: { price: priceFilter } });
        }
        ;
        pipeline.push({
            $match: { status: 'approve' }
        }, {
            $lookup: {
                from: "productreviews",
                localField: "_id",
                foreignField: "productId",
                as: "reviews"
            }
        }, {
            $addFields: {
                avgRating: { $avg: "$reviews.rating" }
            }
        }, {
            $project: { reviews: 0 }
        }, {
            $addFields: {
                popularity: {
                    $switch: {
                        branches: [
                            { case: { $gte: ["$avgRating", 4.5] }, then: "high" },
                            { case: { $gte: ["$avgRating", 3] }, then: "middle" },
                        ],
                        default: "low"
                    }
                }
            }
        }, {
            $lookup: {
                from: "admincategories",
                localField: "category",
                foreignField: "_id",
                as: "categoryDetails",
            },
        }, { $unwind: "$categoryDetails" }, {
            $project: {
                stock: 0,
                "categoryDetails._id": 0,
                "categoryDetails.createdAt": 0,
                "categoryDetails.updatedAt": 0,
                "categoryDetails.__v": 0,
                createdAt: 0,
                updatedAt: 0,
                __v: 0
            },
        });
        const validSortFields = ["popularity", "avgRating", "price"];
        if (sortBy && validSortFields.includes(sortBy)) {
            const order = sortOrder === "asc" ? 1 : -1;
            pipeline.push({ $sort: { [sortBy]: order } });
        }
        else {
            pipeline.push({ $sort: { createdAt: -1 } });
        }
        pipeline.push({ $skip: skip }, { $limit: limitNumber });
        const countPipeline = [
            { $match: ((_a = pipeline[0]) === null || _a === void 0 ? void 0 : _a.$match) || {} },
            { $count: "totalCount" },
        ];
        const [products, countResult] = yield Promise.all([
            product_module_1.productModel.aggregate(pipeline),
            product_module_1.productModel.aggregate(countPipeline),
        ]);
        const totalCount = ((_b = countResult[0]) === null || _b === void 0 ? void 0 : _b.totalCount) || 0;
        const totalPages = Math.ceil(totalCount / limitNumber);
        (0, responseHandler_1.createResponse)(res, 200, true, "All Products", {
            products,
            totalCount,
            totalPages,
            currentPage: pageNumber,
            limit: limitNumber,
        });
    }
    catch (error) {
        (0, responseHandler_1.createResponse)(res, 500, false, "Failed to fetch User", null, error.message);
        return;
    }
    ;
});
exports.userGetProduct = userGetProduct;
//# sourceMappingURL=home.controller.js.map