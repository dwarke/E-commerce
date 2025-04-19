import { Request, Response } from "express"
import { userOrderModel } from "../../user/order/order.module";
import { createResponse } from "../../responseHandler";
import mongoose from "mongoose";
import { feedbackModel } from "../../user/feedback/feedback.module";


export const vendorProductReport = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id
        const products = await userOrderModel.aggregate([
            {
                $unwind: "$products"
            },
            {
                $match: { "products.vendorId": new mongoose.Types.ObjectId(userId) }
            },
            {
                $addFields: {
                    totalSales: "$products.quantity",
                    totalAmount: "$products.totalPrice",
                }
            },
            {
                $group: {
                    _id: '$products.productId',
                    name: { $first: '$products.name' },
                    description: { $first: '$products.description' },
                    price: { $first: '$products.price' },
                    category: { $first: '$products.category' },
                    images: { $first: '$products.images' },
                    totalSales: { $sum: "$totalSales" },
                    totalAmount: { $sum: "$totalAmount" },

                }
            },
            {
                $project: {
                    _id: 0,
                    productId: '$_id',
                    name: 1,
                    description: 1,
                    price: 1,
                    category: 1,
                    images: 1,
                    totalSales: 1,
                    totalAmount: 1,
                }
            }
        ]);

        const overallTotals = products.reduce(
            (acc, product) => {
                acc.totalQuantity += product.totalSales;
                acc.totalRevenue += product.totalAmount;
                return acc;
            },
            { totalQuantity: 0, totalRevenue: 0 }
        );
        createResponse(res, 200, true, "All products report", { revenue: overallTotals, products });

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return
    }
};

export const getWebsiteFeedback = async (req: Request, res: Response): Promise<void> => {
    try {
        const alreadyFeedBack = await feedbackModel.find({});
        createResponse(res, 200, true, "All Website`s Feedback", alreadyFeedBack);

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return
    }
}