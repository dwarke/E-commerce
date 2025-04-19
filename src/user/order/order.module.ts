import mongoose, { Schema, model } from "mongoose";
import { userOrder } from "./order.interface";

const userOrderSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userRegister",
    },
    products:[{
        cartId: String,
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "vendorProduct" },
        name: String,
        description: String,
        price: Number,
        stock: Number,
        images: [String],
        category: { type: mongoose.Schema.Types.ObjectId, ref: "adminCategory" },
        quantity: Number,
        vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "userRegister" },
        totalPrice: Number,
    }, { _id: false }],
    userAddress: {
        type: String,
        required: true 
    },
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approve', 'cancel'],
        default: 'pending'
    }
}, { timestamps: true, versionKey:false });

export const userOrderModel = model<userOrder>('userPlaceOrder', userOrderSchema);