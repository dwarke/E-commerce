import { Request, Response } from "express";
import { userOrderModel } from "../../user/order/order.module";
import userRegisterModel from '../auth/auth.module'
import { productModel } from "../product/product.module";
import { createResponse } from "../../responseHandler";
import mongoose from "mongoose";



export const penalDashboard = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;
        const product = await productModel.find({ vendorId: userId });

        const [totalProducts, revenue, productPer] = await Promise.all([
            await productModel.aggregate([
                {
                    $match: { vendorId: new mongoose.Types.ObjectId(userId) }
                },
            ]),
            await userOrderModel.aggregate([
                {
                    $unwind: '$products'
                },
                {
                    $match: { 'products.vendorId': new mongoose.Types.ObjectId(userId) }
                },
                {
                    $addFields: {
                        totalSales: "$products.quantity",
                    }
                },
                {
                    $group: {
                        _id: {
                            vendorId: '$products.vendorId'
                        },
                        totalSales: { $sum: "$totalSales" },
                        totalAmount: { $sum: "$totalAmount" },
                    }
                },
                {
                    $project: {
                        _id: 0,
                        vendorId: '$_id',
                        totalSales: 1,
                        totalAmount: 1
                    }
                }
            ]),
            await productModel.aggregate([
                {
                    $match: { vendorId: new mongoose.Types.ObjectId(userId) }
                },
                {
                    $lookup: {
                        from: "productreviews",
                        localField: "_id",
                        foreignField: "productId",
                        as: "productRating"
                    }
                },
                {
                    $unwind: '$productRating'
                },
                {
                    $addFields: {
                        avgRating: { $avg: "$productRating.rating" }
                    }
                },
                {
                    $addFields: {
                        popularity: {
                            $switch: {
                                branches: [
                                    { case: { $gte: ["$avgRating", 4.5] }, then: "high" },
                                    { case: { $gte: ["$avgRating", 3] }, then: "middle" }
                                ],
                                default: "low"
                            }
                        }
                    }
                },
                {
                    $project: {
                        vendorId: 1,
                        productId: '$_id',
                        name: 1,
                        description: 1,
                        category: 1,
                        images: 1,
                        avgRating: 1,
                        popularity: 1
                    }
                },
                { $sort: { avgRating: -1 } },
                { $limit: 5 }
            ])
        ]);
                
        const overallTotals = revenue.reduce(
            (acc, product) => {
                acc.totalSale += product.totalSales;
                acc.totalRevenue += product.totalAmount;
                return acc;
            },
            { totalSale: 0, totalRevenue: 0 }
        );
        createResponse(res, 200, true, "All Activities", {
            revenue: overallTotals,
            totalProducts: totalProducts.length,
            topProducts: productPer
        });

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        ReadableStreamDefaultController;
    }
} 