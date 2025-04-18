import { Request, Response } from "express"
import userRegisterModel from '../../vendorPanel/auth/auth.module'
import { createResponse } from "../../responseHandler";
import { productModel } from "../../vendorPanel/product/product.module";
import { userOrderModel } from "../../user/order/order.module";

export const adminDashboard = async (req: Request, res: Response): Promise<void> => {
    try {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const productOrder = await userOrderModel.find({})

        const [totalUsers, totalVendor, totalSale, activeUsers, productPer] = await Promise.all([
            await userRegisterModel.aggregate([
                {
                    $match: { role: 'user' }
                },
            ]),
            await userRegisterModel.aggregate([
                {
                    $match: { role: 'vendor' }
                },
            ]),
            await userOrderModel.aggregate([
                { $unwind: '$products' },
                {
                    $group: {
                        _id: null,
                        totalSales: { $sum: '$products.quantity' }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        totalSales: 1,
                    }
                }
            ]),
            await userRegisterModel.aggregate([
                { $match: { createdAt: { $gte: twentyFourHoursAgo } } }
            ]),
            await productModel.aggregate([
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
        console.log("productOrder-------------", productOrder);
        console.log("totalUser------", totalUsers);
        console.log("productPer------", productPer);

        createResponse(res, 200, true, "All product Sales", {
            totalSale,
            totalUsers:totalUsers.length,
            totalVendor:totalVendor.length,
            activeUsers: activeUsers.length,
            topProducts: productPer
        });

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return;
    };
};



