import mongoose, { Schema, model } from "mongoose";
import { wishlistInterface } from "./wishlist.interface";

const wishlistSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userRegister"
    },
    productId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vendorProduct'
    }],
}, { timestamps: true, versionKey: false });

export const userWishlistModel = model<wishlistInterface>("userWishlist", wishlistSchema);

