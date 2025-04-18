import { Request, Response } from "express";
import userRegisterModel from '../../vendorPanel/auth/auth.module'
import { userOrderModel } from "../../user/order/order.module";
import { createResponse } from "../../responseHandler";
import { SalesReportRequestBody } from "./report.interface";


export const adminSalesReport = async (req: Request<{}, {}, SalesReportRequestBody>, res: Response): Promise<void> => {
    try {
        const { daily, weekly, monthly } = req.body
        const pipeline: any[] = [];

        pipeline.push({ $unwind: "$products" });
        pipeline.push(
            {
                $group: {
                    _id: "$products.productId",
                    productId: { $first: "$products.productId" },
                    totalQuantitySold: { $sum: "$products.quantity" },
                    totalSalesAmount: { $sum: "$products.totalPrice" },
                    createdAt: { $first: "$createdAt" }
                }
            },
        );

        if (daily) {
            pipeline.push(
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                        totalSalesQuantity: { $sum: "$totalQuantitySold" },
                        totalSalesAmount: { $sum: '$totalSalesAmount' }
                    }
                },
            )
        } else if (weekly) {
            pipeline.push(
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%U", date: "$createdAt" } },
                        totalSalesQuantity: { $sum: "$totalQuantitySold" },
                        totalSalesAmount: { $sum: '$totalSalesAmount' }
                    }
                }
            )
        } else if (monthly) {
            pipeline.push(
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                        totalSalesQuantity: { $sum: "$totalQuantitySold" },
                        totalSalesAmount: { $sum: '$totalSalesAmount' }
                    }
                }
            )
        } else {
            pipeline.push(
                {
                    $lookup: {
                        from: "vendorproducts", // Make sure the collection name is correct
                        localField: "_id",
                        foreignField: "_id",
                        as: "productDetails"
                    }
                },
                { $unwind: "$productDetails" },
                {
                    $project: {
                        _id: 0,
                        productId: "$_id",
                        name: "$productDetails.name",
                        price: "$productDetails.price",
                        totalQuantitySold: 1,
                        totalSalesAmount: 1,
                        createdAt: 1
                    }
                },
                { $sort: { totalQuantitySold: -1 } }, // Top selling first
            )
        };

        const products = await Promise.all([
            userOrderModel.aggregate(pipeline),
        ]);
        createResponse(res, 200, true, "Vendor`s Product Sales", products);

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return
    }
}