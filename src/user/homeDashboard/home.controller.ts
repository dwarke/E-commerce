import { Request, Response } from "express"
import { productModel } from '../../vendorPanel/product/product.module'
import mongoose from "mongoose";
import { createResponse } from "../../responseHandler";


export const userGetProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { vendorId, minPrice, maxPrice, searchWord, category, sortBy, sortOrder, price, page, limit = 10 } = req.body;

        // Convert pagination values to numbers
        const pageNumber = Math.max(Number(page), 1);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;

        // MongoDB Aggregation Pipeline
        const pipeline: any[] = [];
        //  Search by name using $regex (case-insensitive)
        if (searchWord) {
            pipeline.push({
                $match: { name: { $regex: searchWord, $options: "i" } },
            });
        };

        //  Filter by Vendor
        if (vendorId) {
            pipeline.push({
                $match: { vendorId: new mongoose.Types.ObjectId(vendorId) },
            });
        };

        //  Filter by Category
        if (category) {
            pipeline.push({
                $match: { category: new mongoose.Types.ObjectId(category) },
            });
        };

        if (price) {
            pipeline.push({
                $match: { price: Number(price) },
            });
        };

        //  Filter by Price Range
        if (minPrice || maxPrice) {
            const priceFilter: any = {};
            if (minPrice) priceFilter.$gte = Number(minPrice);
            if (maxPrice) priceFilter.$lte = Number(maxPrice);
            pipeline.push({ $match: { price: priceFilter } });
        };

        pipeline.push(
            {
                $match: { status: 'approve' }
            },
            {
                $lookup: {
                    from: "productreviews",
                    localField: "_id",
                    foreignField: "productId",
                    as: "reviews"
                }
            },
            {
                $addFields: {
                    avgRating: { $avg: "$reviews.rating" }
                }
            },
            {
                $project: { reviews: 0 }
            },
            {
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
            },
            //  Populate Category and Remove Unnecessary Fields
            {
                $lookup: {
                    from: "admincategories",
                    localField: "category",
                    foreignField: "_id",
                    as: "categoryDetails",
                },
            },
            { $unwind: "$categoryDetails" },
            {
                $project: {
                    stock: 0, // Exclude stock field
                    "categoryDetails._id": 0,
                    "categoryDetails.createdAt": 0,
                    "categoryDetails.updatedAt": 0,
                    "categoryDetails.__v": 0,
                    createdAt: 0,
                    updatedAt: 0,
                    __v: 0
                },
            }
        );

        //  Sorting Logic (Default: Sort by `createdAt` Descending)
        const validSortFields = ["popularity", "avgRating", "price"];
        if (sortBy && validSortFields.includes(sortBy)) {
            const order = sortOrder === "asc" ? 1 : -1; // Ascending or Descending
            pipeline.push({ $sort: { [sortBy]: order } });
        } else {
            pipeline.push({ $sort: { createdAt: -1 } }); // Default: Latest products first
        }

        //  Pagination: Skip & Limit
        pipeline.push({ $skip: skip }, { $limit: limitNumber });

        //  Count total documents before applying pagination
        const countPipeline = [
            { $match: pipeline[0]?.$match || {} }, // Use the same match condition as the first pipeline
            { $count: "totalCount" },
        ];

        // Execute Aggregation Queries
        const [products, countResult] = await Promise.all([
            productModel.aggregate(pipeline),
            productModel.aggregate(countPipeline),
        ]);

        // Extract total count
        const totalCount = countResult[0]?.totalCount || 0;
        const totalPages = Math.ceil(totalCount / limitNumber);
        createResponse(res, 200, true, "All Products", {
            products,
            totalCount,
            totalPages,
            currentPage: pageNumber,
            limit: limitNumber,
        });

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return;
    };
};
