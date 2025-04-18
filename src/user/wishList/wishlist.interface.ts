import mongoose from "mongoose";

export interface wishlistInterface {
    userId: mongoose.Types.ObjectId
    productId: mongoose.Types.ObjectId,
}