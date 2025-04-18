import mongoose, { Schema, model, AggregatePaginateModel } from "mongoose";
import { product } from "./product.interface";
import aggregatePagination from 'mongoose-aggregate-paginate-v2';

const productSchema = new Schema({
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userRegister'
    },
    name: {
        type: String,
        required: true,
        unique: true,
        index: "text"
    },
    description: {
        type: String,
        required: true,
        index: "text"
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'adminCategory',
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    status: {
        type: String,
        enum: ['pending', 'approve', 'reject'],
        default: 'pending'
    },
}, { timestamps: true, versionKey: false });

productSchema.plugin(aggregatePagination);

export const productModel = model<product, AggregatePaginateModel<product>>('vendorProduct', productSchema);

