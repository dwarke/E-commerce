import mongoose from "mongoose";

export interface shoppingCart {
    userId:mongoose.Types.ObjectId,
    productId:mongoose.Types.ObjectId,
    quantity: number,
    
};