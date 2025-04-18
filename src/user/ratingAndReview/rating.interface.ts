import mongoose from "mongoose";
export interface reviewRating {
    userId:mongoose.Types.ObjectId,
    productId:mongoose.Types.ObjectId,
    rating?: number,
    review?:string,
}