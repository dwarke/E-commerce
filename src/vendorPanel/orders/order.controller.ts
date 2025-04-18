import { Request, Response } from "express";
import { userOrderModel } from "../../user/order/order.module";
import { productModel } from "../product/product.module";
import { createResponse } from "../../responseHandler";
import mongoose from "mongoose";


export const viewUserOrderList = async (req: Request, res: Response): Promise<void> => {
    try {
        const vendorId = new mongoose.Types.ObjectId(req.user?._id);
        const orders = await userOrderModel.aggregate([
            { $unwind: "$products" },
            {
                $match: {
                    "products.vendorId": vendorId
                }
            },
            {
                $group: {
                    _id: {
                        productId: "$products.productId",
                        userId: "$userId",
                    },
                    quantity: { $sum: "$products.quantity" },
                    name: { $first: "$products.name" }
                }
            },
            {
                $group: {
                    _id: "$_id.userId",
                    userId: { $first: "$_id.userId" },
                    products: {
                        $push: {
                            productId: "$_id.productId",
                            name: "$name",
                            quantity: "$quantity",
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    userId: 1,
                    products: 1
                }
            }
        ]);
        console.log("orders----------", orders);
        createResponse(res, 200, true, "Successfully product added", orders);
        return

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return
    }
};


export const userOrderStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id
        const { status } = req.body
        const userOrder = await userOrderModel.findOneAndUpdate({ _id: id }, { status });
        createResponse(res, 200, true, "Order Status Update", userOrder);

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return
    }
};