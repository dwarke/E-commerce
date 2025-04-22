import { Request, Response } from "express";
import { userOrderModel } from './order.module';
import shoppingCartModel from "../../user/shoppingCart/cart.module";
import mongoose from "mongoose";
import { productModel } from "../../vendorPanel/product/product.module";
import sendEmail from "./order.middleware";
import userRegisterModel from '../../vendorPanel/auth/auth.module'
import { createResponse } from "../../responseHandler";


export const addOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;  // Assuming user is authenticated
        console.log(userId);
const users = await userRegisterModel.findOne({_id:userId});

        const { userAddress } = req.body;

        //  Step 1: Fetch User Cart and Calculate Total Amount
        const cartItems = await shoppingCartModel.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },  // Filter by user
            {
                $lookup: {
                    from: "vendorproducts", // Join with products collection
                    localField: "productId",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            { $unwind: "$productDetails" }, // Unwind product details
            {
                $project: {
                    cartId: { $toString: "$_id" },
                    productId: "$productDetails._id",
                    name: "$productDetails.name",
                    description: "$productDetails.description",
                    price: "$productDetails.price",
                    stock: "$productDetails.stock",
                    images: "$productDetails.images",
                    category: "$productDetails.category",
                    quantity: 1,
                    vendorId: "$productDetails.vendorId",
                    totalPrice: { $multiply: ["$quantity", "$productDetails.price"] }
                }
            }
        ]);

        if (!cartItems.length) {
            createResponse(res, 400, false, "Cart is empty!");
            return;
        }
        const totalAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

        for (const item of cartItems) {
            if (item.quantity > item.stock) {
                createResponse(res, 400, false, `Insufficient stock for ${item.name}`);
                return;
            }
        };

        const user = await userRegisterModel.findById(userId).select("email name"); 
        if (!user) {
            createResponse(res, 400, false, "user not login");
            return;
        };

        const newOrder = new userOrderModel({
            userId,
            userName:users?.name,
            userAddress,                          
            products: cartItems,
            totalAmount,
        });                
        await newOrder.save();

        for (const item of cartItems) {
            await productModel.updateOne(
                { _id: item.productId },
                { $inc: { stock: -item.quantity } }, // Reduce stock by purchased quantity
                { new: true }
            );
        };
        const vendorMap: Record<string, any[]> = {};

        cartItems.forEach(item => {
            const vendorId = item.vendorId.toString();
            if (!vendorMap[vendorId]) {
                vendorMap[vendorId] = [];
            }
            vendorMap[vendorId].push({
                productId: item.productId,
                quantity: item.quantity
            });
        });


        //  Step 6: Remove Cart Items
        await shoppingCartModel.deleteMany({ userId });

        // const vendorIds = [...new Set(cartItems.map(item => item.vendorId?.toString()))];
        // const vendors = await userRegisterModel.find({ _id: { $in: vendorIds } }).select("email name");
        // console.log("vendors------", vendors);

        // const orderDetails = cartItems.map(item => `
        //     <li>${item.name} - ${item.quantity} x ${item.price} = $${item.totalPrice}</li>
        // `).join("");

        // //  Email to User
        // const userEmailContent = `
        //     <h2>Order Confirmation</h2>
        //     <p>Hi ${user?.name},</p>
        //     <p>Your order has been placed successfully.</p>
        //     <h3>Order Details:</h3>
        //     <ul>${orderDetails}</ul>
        //     <p><strong>Total Amount:</strong> $${totalAmount}</p>
        //     <p>Thank you for shopping with us!</p>
        // `;
        // await sendEmail(user?.email, "Order Confirmation", userEmailContent);

        // //  Email to Vendors
        // for (const vendor of vendors) {
        //     const vendorEmailContent = `
        //         <h2>New Order Received</h2>
        //         <p>Hi ${vendor?.name},</p>
        //         <p>You have received a new order.</p>
        //         <h3>Order Details:</h3>
        //         <ul>${orderDetails}</ul>
        //         <p><strong>Total Amount:</strong> Rs. ${totalAmount}</p>
        //         <p>Please prepare the items for shipment.</p>
        //     `;
        //     await sendEmail(vendor?.email, "New Order Received", vendorEmailContent);
        // }
        createResponse(res, 200, true, "Order placed successfully!", newOrder);

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return
    }
};

export const getOrders = async(req:Request,res:Response):Promise<void>=>{
    // console.log("userId-----",req.user?);
    try {
        const userId = req.user?._id
        console.log("userId-----",userId);
        
        const allOrder = await userOrderModel.find({userId});
        console.log("userId-----",allOrder);
        createResponse(res, 200, true, "Order placed successfully!", allOrder);
        
    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return
    }
}

