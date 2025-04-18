import mongoose, { Schema, model } from "mongoose";
import { reviewRating } from "./rating.interface";

const productReviewSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vendorProduct",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userRegister",
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        validate: {
            validator: Number.isInteger,
            message: "Rating must be a whole number",
        },
    },
    review: {
        type: String,
        default: ""
    },
}, { timestamps: true, versionKey:false })

export const productReviewModel = model<reviewRating>('ProductReview', productReviewSchema);